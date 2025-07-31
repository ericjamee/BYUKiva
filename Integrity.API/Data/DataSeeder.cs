using Integrity.API.Models;
using Microsoft.EntityFrameworkCore;

namespace Integrity.API.Data;

public static class DataSeeder
{
    public static async Task SeedData(ApplicationDbContext context)
    {
        // Clear existing students
        context.Students.RemoveRange(context.Students);
        await context.SaveChangesAsync();

        var studentsToAdd = new List<Student>
        {
            new Student
            {
                FirstName = "Faith",
                LastName = "Otejiri",
                Name = "Faith Otejiri",
                Country = "Nigeria",
                ProfilePictureUrl = "/uploads/students/FaithOtejiri.jpg",
                FundingGoal = 1000,
                AmountRaised = 0,
                PathwayProgram = "Project Management",
                DesiredDegree = "Project Management",
                Story = "Outside of work and studies, I'm a passionate swimmer and enjoy coaching beginners; it's rewarding to help others build confidence in the water. I also love to draw and paint, as a creative expression helps me stay balanced and inspired. I'm also very family-oriented and value continuous personal and professional growth.",
                WhyNeedDonation = "To build a dynamic career at the intersection of project management, psychology, and people development. With a background in psychology and hands-on experience in customer service, data entry, operations supervision, and sales, I've developed a strong foundation in understanding people, solving problems, and improving systems.",
                ApplicationStatus = "Approved",
                StartDate = DateTime.UtcNow,
                EstimatedNamesPerYear = 1000,
                AcademicProgress = "In progress"
            },
            new Student
            {
                FirstName = "Lucky",
                LastName = "Isowo",
                Name = "Lucky Isowo",
                Country = "Nigeria",
                ProfilePictureUrl = "/uploads/students/LuckyIsowo.jpg",
                FundingGoal = 1000,
                AmountRaised = 0,
                PathwayProgram = "Family History Research",
                DesiredDegree = "Family History",
                Story = "I'm naturally curious and love learning new things! In my free time, I enjoy organizing, watching inspiring documentaries, and exploring tech tools that make life easier. I also love spending time with my family they keep me grounded and motivated",
                WhyNeedDonation = "My long-term goal is to grow in a creative and supportive role where I can keep learning, take on more responsibilities, and eventually manage projects or a team. I'm passionate about helping others succeed and hope to build a career that combines organization, creativity, and impact.",
                ApplicationStatus = "Approved",
                StartDate = DateTime.UtcNow,
                EstimatedNamesPerYear = 1000,
                AcademicProgress = "In progress",
                FamilyHistoryExperience = "Currently serving at Nigeria Ibadan Mission"
            },
            new Student
            {
                FirstName = "Rose",
                LastName = "Kalu",
                Name = "Rose Kalu",
                Country = "Nigeria",
                ProfilePictureUrl = "/uploads/students/RoseKalu.jpg",
                FundingGoal = 1000,
                AmountRaised = 0,
                PathwayProgram = "Family History Research",
                DesiredDegree = "Family History",
                Story = "Reading, Dancing. I am a mother of 4 children and married. I have a diploma in computer science with my interest in bringing families together through genealogy work.",
                WhyNeedDonation = "Having to become a consultant in Family History research.",
                ApplicationStatus = "Approved",
                StartDate = DateTime.UtcNow,
                EstimatedNamesPerYear = 1000,
                AcademicProgress = "In progress"
            },
            new Student
            {
                FirstName = "Samuel",
                LastName = "Ofori-Okyere",
                Name = "Samuel Ofori-Okyere",
                Country = "Ghana",
                ProfilePictureUrl = "/uploads/students/SamuelOfori-Okyere.jpg",
                FundingGoal = 1000,
                AmountRaised = 0,
                PathwayProgram = "Applied Business Management",
                DesiredDegree = "Applied Business Management",
                Story = "I am a hardworking individual with strong leadership skills and love learning. I already have a degree in computer engineering and am currently studying for a degree on applied business management with pathway. I love to watch movies, especially science fiction and criminal investigative movies.",
                WhyNeedDonation = "Become a product manager working in Fintech blending my knowledge of software engineering, project management and business administration",
                ApplicationStatus = "Approved",
                StartDate = DateTime.UtcNow,
                EstimatedNamesPerYear = 1000,
                AcademicProgress = "In progress",
                FamilyHistoryExperience = "Served in Nigeria Port Harcourt Mission"
            },
            new Student
            {
                FirstName = "Thandiwe",
                LastName = "Mnkandla",
                Name = "Thandiwe Mnkandla",
                Country = "Zimbabwe",
                ProfilePictureUrl = "/uploads/students/ThandiweMnkandla.jpg",
                FundingGoal = 1000,
                AmountRaised = 0,
                PathwayProgram = "Applied Business Management",
                DesiredDegree = "Applied Business Management",
                Story = "I am a 43 year old mother of three. My oldest son is currently serving his mission in Kenya. I enjoy spending time with my family and ministering activities with my relief society sisters.",
                WhyNeedDonation = "To be a project manager for a prestigious company or NGO",
                ApplicationStatus = "Approved",
                StartDate = DateTime.UtcNow,
                EstimatedNamesPerYear = 1000,
                AcademicProgress = "In progress"
            },
            new Student
            {
                FirstName = "William",
                LastName = "Njoku",
                Name = "William Njoku",
                Country = "Nigeria",
                ProfilePictureUrl = "/uploads/students/williamNjoku.jpg",
                FundingGoal = 1000,
                AmountRaised = 0,
                PathwayProgram = "Software Development",
                DesiredDegree = "Software Development",
                Story = "I love playing basketball, I train several times a week, I used to play semi-pro basketball in Nigeria and I hope to be able to play professionally some day.",
                WhyNeedDonation = "My long-term goals are to grow professionally, improve my skills, and increase my employability. Ultimately, I aim to start a stable business and establish an NGO to support my community and make a lasting difference.",
                ApplicationStatus = "Approved",
                StartDate = DateTime.UtcNow,
                EstimatedNamesPerYear = 1000,
                AcademicProgress = "In progress"
            }
        };

        context.Students.AddRange(studentsToAdd);
        await context.SaveChangesAsync();
    }
} 