using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace Integrity.API.Models;

public class Student
{
    [Key]
    [Column(TypeName = "varchar(450)")]
    public string Id { get; set; } = Guid.NewGuid().ToString();
    
    [Column(TypeName = "text")]
    public string FirstName { get; set; } = string.Empty;
    
    [Column(TypeName = "text")]
    public string LastName { get; set; } = string.Empty;
    
    [Column(TypeName = "text")]
    public string Name { get; set; } = string.Empty;
    
    [Column(TypeName = "text")]
    public string Country { get; set; } = string.Empty;
    
    [Column(TypeName = "text")]
    public string ProfilePictureUrl { get; set; } = string.Empty;
    
    public decimal FundingGoal { get; set; } = 1000; // Standard donation amount for all students
    public decimal AmountRaised { get; set; } = 0;
    
    [Column(TypeName = "text")]
    public string PathwayProgram { get; set; } = string.Empty;
    
    [Column(TypeName = "text")]
    public string DesiredDegree { get; set; } = string.Empty;
    
    [Column(TypeName = "text")]
    public string FamilyHistoryExperience { get; set; } = string.Empty;
    
    [Column(TypeName = "text")]
    public string FutureGoals { get; set; } = string.Empty;
    
    public int EstimatedNamesPerYear { get; set; } = 100000;
    public DateTime StartDate { get; set; }
    public DateTime ApplicationDate { get; set; } = DateTime.UtcNow;
    
    [Column(TypeName = "text")]
    public string Story { get; set; } = string.Empty;
    
    [Column(TypeName = "text")]
    public string WhyNeedDonation { get; set; } = string.Empty;
    
    [Column(TypeName = "text")]
    public string AcademicProgress { get; set; } = string.Empty;
    
    [Column(TypeName = "text")]
    public string ApplicationStatus { get; set; } = "Pending";
    
    [Column(TypeName = "text")]
    public string? AdminNotes { get; set; }

    [InverseProperty("Student")]
    [JsonIgnore]
    public virtual ICollection<Donation> Donations { get; set; } = new List<Donation>();

    [InverseProperty("Student")]
    [JsonIgnore]
    public virtual ICollection<ProgressReport> ProgressReports { get; set; } = new List<ProgressReport>();
} 