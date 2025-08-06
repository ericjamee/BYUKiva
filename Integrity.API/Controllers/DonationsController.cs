using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Integrity.API.Data;
using Integrity.API.Models;

namespace Integrity.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class DonationsController : ControllerBase
{
    private readonly ApplicationDbContext _context;
    private readonly IConfiguration _configuration;

    public DonationsController(ApplicationDbContext context, IConfiguration configuration)
    {
        _context = context;
        _configuration = configuration;
    }

    [HttpPost]
    public async Task<ActionResult<Donation>> CreateDonation([FromBody] DonationDto donationDto)
    {
        var student = await _context.Students
            .FirstOrDefaultAsync(s => s.Id == donationDto.StudentId);

        if (student == null)
        {
            return NotFound("Student not found");
        }

        // Validate donation amount
        if (donationDto.Amount <= 0)
        {
            return BadRequest("Donation amount must be greater than 0");
        }

        // Check if this donation would exceed the funding goal
        var totalAfterDonation = student.AmountRaised + donationDto.Amount;
        if (totalAfterDonation > student.FundingGoal)
        {
            return BadRequest($"This donation would exceed the student's funding goal. Maximum donation amount allowed: ${student.FundingGoal - student.AmountRaised}");
        }

        var donation = new Donation
        {
            StudentId = donationDto.StudentId,
            Amount = donationDto.Amount,
            DonorName = donationDto.DonorName ?? "Anonymous",
            Message = donationDto.Message,
            Date = DateTime.UtcNow,
            Status = "Completed" // For MVP, we'll mark it as completed immediately
        };

        // Update student's amount raised
        student.AmountRaised += donation.Amount;

        // Add donation to database
        _context.Donations.Add(donation);
        await _context.SaveChangesAsync();

        return Ok(new
        {
            donation.Id,
            donation.Amount,
            donation.Status,
            donation.DonorName,
            donation.Message,
            StudentAmountRaised = student.AmountRaised,
            RemainingAmount = student.FundingGoal - student.AmountRaised
        });
    }

    [HttpGet("student/{studentId}")]
    public async Task<ActionResult<IEnumerable<Donation>>> GetStudentDonations(string studentId)
    {
        var donations = await _context.Donations
            .Where(d => d.StudentId == studentId)
            .OrderByDescending(d => d.Date)
            .ToListAsync();

        return Ok(donations);
    }

    public class DonationDto
    {
        public string StudentId { get; set; } = string.Empty;
        public decimal Amount { get; set; }
        public string? DonorName { get; set; }
        public string? Message { get; set; }
    }
} 