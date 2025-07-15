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
        var student = await _context.Students.FindAsync(donationDto.StudentId);
        if (student == null)
        {
            return NotFound("Student not found");
        }

        var donation = new Donation
        {
            StudentId = donationDto.StudentId,
            Amount = donationDto.Amount,
            DonorName = donationDto.DonorName,
            DonorEmail = donationDto.DonorEmail,
            Status = "Pending"
        };

        // In a real implementation, you would integrate with the external payment system here
        // For now, we'll just generate a mock external payment URL
        var externalPaymentBaseUrl = _configuration["ExternalPayment:BaseUrl"] ?? "https://external-payment-system.com";
        donation.ExternalPaymentUrl = $"{externalPaymentBaseUrl}/pay?amount={donation.Amount}&reference={donation.Id}";

        _context.Donations.Add(donation);
        await _context.SaveChangesAsync();

        return Ok(new { 
            donation.Id, 
            donation.Amount, 
            donation.Status,
            RedirectUrl = donation.ExternalPaymentUrl 
        });
    }

    public class DonationDto
    {
        public string StudentId { get; set; } = string.Empty;
        public decimal Amount { get; set; }
        public string DonorName { get; set; } = string.Empty;
        public string DonorEmail { get; set; } = string.Empty;
    }
} 