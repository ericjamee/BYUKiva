using Integrity.API.Models;
using Microsoft.EntityFrameworkCore;

namespace Integrity.API.Data;

public static class DataSeeder
{
    public static async Task SeedData(ApplicationDbContext context)
    {
        // Update all existing students to have the standard funding goal
        var students = await context.Students.ToListAsync();
        foreach (var student in students)
        {
            student.FundingGoal = 1000;
            if (student.AmountRaised > student.FundingGoal)
            {
                student.AmountRaised = student.FundingGoal;
            }
        }
        await context.SaveChangesAsync();

        // Only add sample data if no students exist
        if (!context.Students.Any())
        {
            var student = new Student
            {
                FirstName = "John",
                LastName = "Doe",
                Name = "John Doe",
                Country = "United States",
                ProfilePictureUrl = "/uploads/students/placeholder.jpg",
                FundingGoal = 1000,
                AmountRaised = 0,
                PathwayProgram = "BYU-Pathway",
                DesiredDegree = "Computer Science",
                FamilyHistoryExperience = "I have been doing family history work for 2 years...",
                FutureGoals = "I want to become a software developer...",
                EstimatedNamesPerYear = 100000,
                StartDate = DateTime.UtcNow,
                Story = "I am passionate about education...",
                WhyNeedDonation = "I need this loan to continue my education...",
                AcademicProgress = "Currently maintaining a 3.8 GPA...",
                ApplicationStatus = "Approved"
            };

            context.Students.Add(student);
            await context.SaveChangesAsync();
        }
    }
} 