using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Integrity.API.Data;
using Integrity.API.Models;

namespace Integrity.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class StudentsController : ControllerBase
{
    private readonly ApplicationDbContext _context;
    private readonly IWebHostEnvironment _environment;

    public StudentsController(ApplicationDbContext context, IWebHostEnvironment environment)
    {
        _context = context;
        _environment = environment;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Student>>> GetStudents()
    {
        return await _context.Students
            .OrderBy(s => (s.AmountRaised / s.FundingGoal)) // Order by percentage funded (lowest first)
            .ToListAsync();
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Student>> GetStudent(string id)
    {
        var student = await _context.Students
            .FirstOrDefaultAsync(s => s.Id == id);

        if (student == null)
        {
            return NotFound();
        }

        return student;
    }

    [HttpGet("{id}/progress-reports")]
    public async Task<ActionResult<IEnumerable<ProgressReport>>> GetStudentProgressReports(string id)
    {
        var progressReports = await _context.ProgressReports
            .Where(pr => pr.StudentId == id)
            .ToListAsync();

        return Ok(progressReports);
    }

    [HttpGet("{id}/donations")]
    public async Task<ActionResult<IEnumerable<Donation>>> GetStudentDonations(string id)
    {
        var donations = await _context.Donations
            .Where(d => d.StudentId == id)
            .ToListAsync();

        return Ok(donations);
    }

    public class StudentDto
    {
        public string FirstName { get; set; } = string.Empty;
        public string LastName { get; set; } = string.Empty;
        public string Country { get; set; } = string.Empty;
        public decimal FundingGoal { get; set; }
        public string PathwayProgram { get; set; } = string.Empty;
        public string DesiredDegree { get; set; } = string.Empty;
        public string FamilyHistoryExperience { get; set; } = string.Empty;
        public string FutureGoals { get; set; } = string.Empty;
        public int EstimatedNamesPerYear { get; set; }
    }
} 