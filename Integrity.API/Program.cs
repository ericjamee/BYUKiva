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
    var connectionString = Environment.GetEnvironmentVariable("DATABASE_URL") ?? 
                          builder.Configuration.GetConnectionString("DefaultConnection");
    
    if (string.IsNullOrEmpty(connectionString))
    {
        throw new InvalidOperationException("No database connection string configured. Please set DATABASE_URL environment variable or DefaultConnection in appsettings.json");
    }
    
    // If we have a DATABASE_URL (from Heroku/Render), convert it to Npgsql format
    if (connectionString.StartsWith("postgres://") || connectionString.StartsWith("postgresql://"))
    {
        try
        {
            var uri = new Uri(connectionString);
            var userInfo = uri.UserInfo.Split(':');
            
            if (userInfo.Length != 2)
            {
                throw new InvalidOperationException("Invalid DATABASE_URL format. Expected format: postgres://username:password@host:port/database");
            }
            
            var builder = new NpgsqlConnectionStringBuilder
            {
                Host = uri.Host,
                Database = uri.AbsolutePath.TrimStart('/'),
                Username = userInfo[0],
                Password = userInfo[1],
                SslMode = SslMode.Require
            };

            // Only set port if it's valid
            if (uri.Port > 0)
            {
                builder.Port = uri.Port;
            }
            else
            {
                // Use default PostgreSQL port
                builder.Port = 5432;
            }

            connectionString = builder.ToString();
            Console.WriteLine($"Using database host: {builder.Host} with port {builder.Port}");
        }
        catch (Exception ex)
        {
            throw new InvalidOperationException($"Failed to parse DATABASE_URL: {ex.Message}");
        }
    }

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

builder.Services.AddControllers()
    .AddJsonOptions(options =>
    {
        options.JsonSerializerOptions.MaxDepth = 64;
        options.JsonSerializerOptions.PropertyNamingPolicy = null;
        options.JsonSerializerOptions.WriteIndented = false;
    });
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Configure CORS
builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
    {
        policy.WithOrigins(
                "https://byukiva.vercel.app",
                "https://humanconnectionprojectbyu.vercel.app",
                "https://humanconnectionprojectbyu-2r8lxwxpm-james-ericksons-projects.vercel.app",
                "https://humanconnectionprojectbyu-jvkbpajso-james-ericksons-projects.vercel.app",
                "https://humanconnectionprojectbyu-hqqeoajbk-james-ericksons-projects.vercel.app",
                "https://humanconnectionprojectbyu-bv429gq7q-james-ericksons-projects.vercel.app",
                "http://localhost:5173", // Local development
                "http://localhost:5174"  // Local development alternative port
            )
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

// Remove HTTPS redirection since Render.com handles it
// app.UseHttpsRedirection();

// Enable static file serving
app.UseStaticFiles();

app.UseCors();

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

// Apply migrations and seed the database with better error handling
try
{
    using (var scope = app.Services.CreateScope())
    {
        var services = scope.ServiceProvider;
        var context = services.GetRequiredService<ApplicationDbContext>();
        
        Console.WriteLine("Attempting to apply migrations...");
        await context.Database.MigrateAsync();
        Console.WriteLine("Migrations applied successfully");
        
        Console.WriteLine("Attempting to seed database...");
        await DataSeeder.SeedData(context);
        Console.WriteLine("Database seeding completed successfully");
    }
}
catch (Exception ex)
{
    Console.WriteLine($"Error setting up database: {ex.Message}");
    if (app.Environment.IsDevelopment())
    {
        throw; // Only rethrow in development
    }
}

app.Run();
