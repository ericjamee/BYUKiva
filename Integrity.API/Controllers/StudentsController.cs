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
        try
        {
            var students = await _context.Students
                .Include(s => s.ProgressReports)
                .Include(s => s.Donations)
                .OrderBy(s => (s.AmountRaised / s.FundingGoal)) // Order by percentage funded (lowest first)
                .ToListAsync();
            
            return Ok(students);
        }
        catch (Exception ex)
        {
            // Log the error for debugging
            Console.WriteLine($"Error fetching students: {ex.Message}");
            return StatusCode(500, new { error = "An error occurred while fetching students data" });
        }
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Student>> GetStudent(string id)
    {
        try
        {
            var student = await _context.Students
                .Include(s => s.ProgressReports)
                .Include(s => s.Donations)
                .FirstOrDefaultAsync(s => s.Id == id);

            if (student == null)
            {
                return NotFound();
            }

            return Ok(student);
        }
        catch (Exception ex)
        {
            // Log the error for debugging
            Console.WriteLine($"Error fetching student {id}: {ex.Message}");
            return StatusCode(500, new { error = "An error occurred while fetching student data" });
        }
    }

    [HttpGet("{id}/progress-reports")]
    public async Task<ActionResult<IEnumerable<ProgressReport>>> GetStudentProgressReports(string id)
    {
        var student = await _context.Students
            .Include(s => s.ProgressReports)
            .FirstOrDefaultAsync(s => s.Id == id);

        if (student == null)
        {
            return NotFound();
        }

        return Ok(student.ProgressReports);
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