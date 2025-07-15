using System.ComponentModel.DataAnnotations;

namespace Integrity.API.Models;

public class Donation
{
    public string Id { get; set; } = Guid.NewGuid().ToString();
    public decimal Amount { get; set; }
    public DateTime Date { get; set; } = DateTime.UtcNow;
    public string StudentId { get; set; } = string.Empty;
    public Student? Student { get; set; }
    public string DonorName { get; set; } = string.Empty;
    public string DonorEmail { get; set; } = string.Empty;
    public string Status { get; set; } = "Pending"; // Pending, Completed, Cancelled
    public string? ExternalPaymentId { get; set; }
    public string? ExternalPaymentUrl { get; set; }
} 