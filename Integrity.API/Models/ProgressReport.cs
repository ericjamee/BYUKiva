using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace Integrity.API.Models;

public class ProgressReport
{
    [Key]
    public string Id { get; set; } = Guid.NewGuid().ToString();
    
    [ForeignKey("Student")]
    public string StudentId { get; set; } = string.Empty;
    
    [JsonIgnore]
    public virtual Student? Student { get; set; }
    
    public DateTime Date { get; set; } = DateTime.UtcNow;
    public int NamesIndexed { get; set; }
    public string FamilyHistoryActivities { get; set; } = string.Empty;
    public string Challenges { get; set; } = string.Empty;
    public string Achievements { get; set; } = string.Empty;
    public string PathwayProgress { get; set; } = string.Empty;
} 