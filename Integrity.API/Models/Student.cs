using System.ComponentModel.DataAnnotations;

namespace Integrity.API.Models;

public class Student
{
    public string Id { get; set; } = Guid.NewGuid().ToString();
    public string FirstName { get; set; } = string.Empty;
    public string LastName { get; set; } = string.Empty;
    public string Name { get; set; } = string.Empty;
    public string Country { get; set; } = string.Empty;
    public string ProfilePictureUrl { get; set; } = string.Empty;
    public decimal FundingGoal { get; set; } = 1000; // Standard loan amount for all students
    public decimal AmountRaised { get; set; } = 0;
    public string PathwayProgram { get; set; } = string.Empty;
    public string DesiredDegree { get; set; } = string.Empty;
    public string FamilyHistoryExperience { get; set; } = string.Empty;
    public string FutureGoals { get; set; } = string.Empty;
    public int EstimatedNamesPerYear { get; set; } = 100000;
    public DateTime StartDate { get; set; }
    public DateTime ApplicationDate { get; set; } = DateTime.UtcNow;
    public string Story { get; set; } = string.Empty;
    public string WhyNeedLoan { get; set; } = string.Empty;
    public string AcademicProgress { get; set; } = string.Empty;
    public string ApplicationStatus { get; set; } = "Pending";
    public string? AdminNotes { get; set; }
    public ICollection<Donation> Donations { get; set; } = new List<Donation>();
    public ICollection<ProgressReport> ProgressReports { get; set; } = new List<ProgressReport>();
} 