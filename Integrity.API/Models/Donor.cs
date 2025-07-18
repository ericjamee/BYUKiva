namespace Integrity.API.Models;

public class Donor
{
    public string Id { get; set; } = Guid.NewGuid().ToString();
    public string Name { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    
    public List<Donation> Donations { get; set; } = new();
} 