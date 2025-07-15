using Microsoft.EntityFrameworkCore;
using Integrity.API.Models;

namespace Integrity.API.Data;

public class ApplicationDbContext : DbContext
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
        : base(options)
    {
    }

    public DbSet<Student> Students { get; set; } = null!;
    public DbSet<Donation> Donations { get; set; } = null!;
    public DbSet<ProgressReport> ProgressReports { get; set; } = null!;

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Student>()
            .HasKey(s => s.Id);

        modelBuilder.Entity<Student>()
            .Property(s => s.FirstName)
            .IsRequired();

        modelBuilder.Entity<Student>()
            .Property(s => s.LastName)
            .IsRequired();

        modelBuilder.Entity<Student>()
            .Property(s => s.Country)
            .IsRequired();

        modelBuilder.Entity<Student>()
            .Property(s => s.FundingGoal)
            .HasPrecision(18, 2);

        modelBuilder.Entity<Student>()
            .Property(s => s.AmountRaised)
            .HasPrecision(18, 2);

        modelBuilder.Entity<Student>()
            .HasMany(s => s.Donations)
            .WithOne(d => d.Student)
            .HasForeignKey(d => d.StudentId)
            .OnDelete(DeleteBehavior.Cascade);

        modelBuilder.Entity<Student>()
            .HasMany(s => s.ProgressReports)
            .WithOne(p => p.Student)
            .HasForeignKey(p => p.StudentId)
            .OnDelete(DeleteBehavior.Cascade);

        modelBuilder.Entity<Donation>()
            .HasKey(d => d.Id);

        modelBuilder.Entity<Donation>()
            .Property(d => d.Amount)
            .HasPrecision(18, 2);

        modelBuilder.Entity<ProgressReport>()
            .HasKey(p => p.Id);
    }
} 