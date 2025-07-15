using Microsoft.EntityFrameworkCore;
using Integrity.API.Data;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using Npgsql;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddDbContext<ApplicationDbContext>(options =>
{
    var connectionString = Environment.GetEnvironmentVariable("DATABASE_URL");
    
    if (string.IsNullOrEmpty(connectionString))
    {
        // Log warning about missing DATABASE_URL
        Console.WriteLine("Warning: DATABASE_URL environment variable is not set, falling back to DefaultConnection");
        connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
        
        if (string.IsNullOrEmpty(connectionString))
        {
            throw new InvalidOperationException("No database connection string configured. Please set DATABASE_URL environment variable or DefaultConnection in appsettings.json");
        }
    }
    
    // If we have a DATABASE_URL (from Heroku/Render), convert it to Npgsql format
    if (connectionString.StartsWith("postgres://"))
    {
        try
        {
            var uri = new Uri(connectionString);
            var userInfo = uri.UserInfo.Split(':');
            
            if (userInfo.Length != 2)
            {
                throw new InvalidOperationException("Invalid DATABASE_URL format. Expected format: postgres://username:password@host:port/database");
            }
            
            connectionString = new NpgsqlConnectionStringBuilder
            {
                Host = uri.Host,
                Port = uri.Port,
                Database = uri.AbsolutePath.TrimStart('/'),
                Username = userInfo[0],
                Password = userInfo[1],
                SslMode = SslMode.Require,
            }.ToString();
        }
        catch (Exception ex)
        {
            throw new InvalidOperationException($"Failed to parse DATABASE_URL: {ex.Message}");
        }
    }

    Console.WriteLine($"Connecting to database host: {new Uri(connectionString.StartsWith("postgres://") ? connectionString : $"postgres://{connectionString}").Host}");
    options.UseNpgsql(connectionString);
});

// Configure JWT authentication
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuerSigningKey = true,
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(builder.Configuration["Jwt:Key"] ?? "your-256-bit-secret")),
            ValidateIssuer = false,
            ValidateAudience = false,
            ClockSkew = TimeSpan.Zero
        };
    });

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Configure CORS
builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
    {
        policy.AllowAnyOrigin()
              .AllowAnyMethod()
              .AllowAnyHeader();
    });
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

// Enable static file serving
app.UseStaticFiles();

app.UseCors();

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

// Seed the database with better error handling
try
{
    using (var scope = app.Services.CreateScope())
    {
        var services = scope.ServiceProvider;
        var context = services.GetRequiredService<ApplicationDbContext>();
        
        Console.WriteLine("Attempting to seed database...");
        await DataSeeder.SeedData(context);
        Console.WriteLine("Database seeding completed successfully");
    }
}
catch (Exception ex)
{
    Console.WriteLine($"Error seeding database: {ex.Message}");
    if (app.Environment.IsDevelopment())
    {
        throw; // Only rethrow in development
    }
}

app.Run();
