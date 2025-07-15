using System.Text.Json.Serialization;

namespace Integrity.API.Models;

public class User
{
    public string Id { get; set; } = Guid.NewGuid().ToString();
    public string Email { get; set; } = string.Empty;
    public string PasswordHash { get; set; } = string.Empty;
    
    [JsonConverter(typeof(JsonStringEnumConverter))]
    public UserRole Role { get; set; }
    public string Name { get; set; } = string.Empty;
}

public enum UserRole
{
    Admin = 0,
    Student = 1,
    Donor = 2
} 