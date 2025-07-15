using System.ComponentModel.DataAnnotations;

namespace Integrity.API.Models;

public class Donation
{
    public string Id { get; set; } = Guid.NewGuid().ToString();
    public decimal Amount { get; set; }
    public DateTime Date { get; set; } = DateTime.UtcNow;
    public string StudentId { get; set; } = string.Empty;
    public Student? Student { get; set; }
    public string DonorName { get; set; } = "Anonymous";
    public string? Message { get; set; }
    public string Status { get; set; } = "Completed"; // For MVP, all donations are completed immediately
} 