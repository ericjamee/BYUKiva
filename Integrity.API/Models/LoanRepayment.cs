using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace Integrity.API.Models;

public class DonationRepayment
{
    public string Id { get; set; } = Guid.NewGuid().ToString();
    
    [Required]
    public string StudentId { get; set; } = string.Empty;
    
    [Required]
    public decimal Amount { get; set; }
    
    public DateTime Date { get; set; } = DateTime.UtcNow;
    
    [Required]
    public RepaymentStatus Status { get; set; }
    
    [StringLength(500)]
    public string Notes { get; set; } = string.Empty;
    
    [JsonIgnore]
    public Student? Student { get; set; }
}

public enum RepaymentStatus
{
    Scheduled,
    Paid,
    Late,
    Missed
} 