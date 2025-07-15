using System.ComponentModel.DataAnnotations;

namespace Integrity.API.Models;

public class Student
{
    public string Id { get; set; } = Guid.NewGuid().ToString();
    public string FirstName { get; set; } = string.Empty;
    public string LastName { get; set; } = string.Empty;
    public string Country { get; set; } = string.Empty;
    public string ProfilePictureUrl { get; set; } = string.Empty;
    public decimal FundingGoal { get; set; }
    public decimal AmountRaised { get; set; }
    public string PathwayProgram { get; set; } = string.Empty;
    public string DesiredDegree { get; set; } = string.Empty;
    public string FamilyHistoryExperience { get; set; } = string.Empty;
    public string FutureGoals { get; set; } = string.Empty;
    public int EstimatedNamesPerYear { get; set; } = 100000;
    public DateTime StartDate { get; set; }
    public ICollection<Donation> Donations { get; set; } = new List<Donation>();
    public ICollection<ProgressReport> ProgressReports { get; set; } = new List<ProgressReport>();
} 