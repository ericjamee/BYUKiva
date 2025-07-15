namespace Integrity.API.Models;

public class ProgressReport
{
    public string Id { get; set; } = Guid.NewGuid().ToString();
    public string StudentId { get; set; } = string.Empty;
    public Student? Student { get; set; }
    public DateTime Date { get; set; } = DateTime.UtcNow;
    public int NamesIndexed { get; set; }
    public string FamilyHistoryActivities { get; set; } = string.Empty;
    public string Challenges { get; set; } = string.Empty;
    public string Achievements { get; set; } = string.Empty;
    public string PathwayProgress { get; set; } = string.Empty;
} 