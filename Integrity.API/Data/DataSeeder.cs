using Integrity.API.Models;
using Microsoft.Extensions.Logging;
using System.Text.Json;

namespace Integrity.API.Data;

public static class DataSeeder
{
    public static async Task SeedData(ApplicationDbContext context)
    {
        // Clear existing data
        context.Students.RemoveRange(context.Students);
        context.SaveChanges();

        var countries = new[] { 
            "Philippines", "Brazil", "Mexico", "Peru", "Colombia", "Ghana", "Kenya", "Nigeria", 
            "India", "Indonesia", "Guatemala", "Ecuador", "Dominican Republic", "South Africa", 
            "Uganda", "Thailand", "Vietnam", "Cambodia", "El Salvador", "Honduras" 
        };
        
        var pathwayPrograms = new[] { 
            "Business Management", "Computer Science", "Healthcare Administration", 
            "Information Technology", "Web Development", "Applied Technology", 
            "Professional Studies", "Software Development" 
        };

        var desiredDegrees = new[] {
            "Bachelor of Science in Business Administration",
            "Bachelor of Science in Computer Science",
            "Bachelor of Science in Information Technology",
            "Bachelor of Science in Healthcare Administration",
            "Bachelor of Arts in Professional Studies",
            "Bachelor of Science in Software Engineering",
            "Bachelor of Science in Web Development",
            "Bachelor of Science in Information Systems"
        };

        var random = new Random();
        var students = new List<Student>();

        for (int i = 0; i < 75; i++)
        {
            var firstName = GenerateFirstName(random);
            var lastName = GenerateLastName(random);
            var country = countries[random.Next(countries.Length)];
            
            // Create a more professional avatar using UI Avatars
            // This service creates clean, professional avatars based on initials with consistent styling
            var backgroundColor = new[] { "2196f3", "1976d2", "0d47a1" }[random.Next(3)]; // Professional blue shades
            var avatarUrl = $"https://ui-avatars.com/api/?name={Uri.EscapeDataString($"{firstName}+{lastName}")}&background={backgroundColor}&color=fff&size=256&font-size=0.35&length=2&bold=true";

            var student = new Student
            {
                FirstName = firstName,
                LastName = lastName,
                Country = country,
                PathwayProgram = pathwayPrograms[random.Next(pathwayPrograms.Length)],
                DesiredDegree = desiredDegrees[random.Next(desiredDegrees.Length)],
                ProfilePictureUrl = avatarUrl,
                FamilyHistoryExperience = GenerateFamilyHistoryExperience(firstName, country),
                FutureGoals = GenerateFutureGoals(firstName),
                StartDate = DateTime.Now.AddDays(-random.Next(90)),
                FundingGoal = random.Next(4000, 8001),
                AmountRaised = random.Next(0, 4000),
                EstimatedNamesPerYear = random.Next(80000, 120001)
            };

            students.Add(student);
        }

        await context.Students.AddRangeAsync(students);
        await context.SaveChangesAsync();
    }

    private static string GenerateFirstName(Random random)
    {
        var firstNames = new[] {
            // International names reflecting our diverse student body
            "Maria", "Jose", "Juan", "Ana", "Carlos", "Sofia", "Miguel", "Isabella",
            "Raj", "Priya", "Arun", "Deepa", "Amit", "Neha", "Rahul", "Anita",
            "John", "Grace", "David", "Sarah", "Michael", "Elizabeth", "Daniel", "Rachel",
            "Wei", "Li", "Zhang", "Chen", "Wang", "Liu", "Yang", "Huang",
            "Mohammed", "Fatima", "Ahmed", "Aisha", "Omar", "Zainab", "Ali", "Maryam",
            "Gabriel", "Lucas", "Mateo", "Valentina", "Santiago", "Camila", "Diego", "Luna",
            "Kwame", "Abena", "Kofi", "Efua", "Kwesi", "Adanna", "Chidi", "Chioma",
            "Thiago", "Beatriz", "Pedro", "Julia", "Rafael", "Luiza", "Bruno", "Clara",
            "Andre", "Marie", "Pierre", "Claire", "Louis", "Sophie", "Henri", "Emma",
            "Liam", "Olivia", "Noah", "Ava", "Ethan", "Charlotte", "Mason", "Sophia"
        };
        return firstNames[random.Next(firstNames.Length)];
    }

    private static string GenerateLastName(Random random)
    {
        var lastNames = new[] {
            // International surnames
            "Silva", "Santos", "Rodriguez", "Garcia", "Martinez", "Lopez", "Gonzalez", "Perez",
            "Patel", "Kumar", "Singh", "Shah", "Sharma", "Verma", "Gupta", "Reddy",
            "Smith", "Johnson", "Williams", "Brown", "Jones", "Miller", "Davis", "Wilson",
            "Wang", "Li", "Zhang", "Liu", "Chen", "Yang", "Huang", "Wu",
            "Al-Sayed", "Khan", "Ahmed", "Hassan", "Ali", "Ibrahim", "Mohammed", "Rahman",
            "Fernandez", "Torres", "Ramirez", "Flores", "Rivera", "Morales", "Cruz", "Reyes",
            "Okafor", "Adebayo", "Mensah", "Osei", "Adeyemi", "Okoro", "Afolabi", "Oluwaseun",
            "Costa", "Oliveira", "Ferreira", "Rodrigues", "Almeida", "Carvalho", "Sousa", "Ribeiro",
            "Dubois", "Martin", "Bernard", "Thomas", "Robert", "Richard", "Petit", "Durand",
            "Anderson", "Taylor", "Moore", "Jackson", "White", "Harris", "Clark", "Lewis"
        };
        return lastNames[random.Next(lastNames.Length)];
    }

    private static string GenerateFamilyHistoryExperience(string firstName, string country)
    {
        var experiences = new[] {
            $"Growing up in {country}, {firstName} was inspired by stories of their ancestors who preserved family records through generations. They have already digitized over 200 family documents and are eager to help others do the same.",
            $"As the first in their family to pursue higher education, {firstName} is passionate about preserving their family's history in {country}. They have interviewed elderly relatives and documented oral histories that span three generations.",
            $"{firstName} discovered their great-grandfather's journal written in their native language, which sparked their interest in family history. They've since traced their family line back to the 1800s in {country}.",
            $"In {country}, {firstName} helped establish a community project to digitize local church records, preserving thousands of historical documents for future generations.",
            $"After learning about their family's migration story to {country}, {firstName} began collecting and organizing family photographs and documents, creating a digital archive for their extended family.",
            $"Through their research in {country}, {firstName} uncovered their family's role in important historical events, motivating them to preserve these stories for future generations.",
            $"Working with their local genealogical society in {country}, {firstName} has helped numerous families reconnect with their ancestral heritage and preserve their family stories.",
            $"{firstName} has been documenting their family's traditional recipes and stories from {country}, creating a cultural legacy that bridges generations.",
            $"Inspired by their grandmother's stories about life in {country}, {firstName} has been recording and transcribing oral histories from elderly community members.",
            $"As a volunteer at their local family history center in {country}, {firstName} has developed expertise in genealogical research methods and document preservation."
        };
        return experiences[new Random().Next(experiences.Length)];
    }

    private static string GenerateFutureGoals(string firstName)
    {
        var goals = new[] {
            $"{firstName} aims to develop innovative digital tools for preserving family histories, making it easier for future generations to connect with their roots.",
            $"After completing their degree, {firstName} plans to create educational programs teaching young people the importance of family history and genealogical research.",
            $"{firstName}'s goal is to combine their technical skills with genealogical research to develop more efficient methods of digitizing and organizing historical records.",
            $"With their education, {firstName} hopes to establish a non-profit organization focused on preserving family histories in underserved communities.",
            $"{firstName} plans to use their expertise to help modernize family history centers and make genealogical resources more accessible to everyone.",
            $"After graduation, {firstName} aims to work with international organizations to preserve endangered historical records and family documents.",
            $"{firstName}'s vision is to create a platform that connects people with their cultural heritage through family history research and storytelling.",
            $"Using their technical skills, {firstName} plans to develop mobile applications that make family history research more engaging for younger generations.",
            $"{firstName} hopes to work with museums and historical societies to create interactive exhibits that bring family histories to life.",
            $"After completing their studies, {firstName} plans to focus on developing AI-powered tools to assist in genealogical research and family tree building."
        };
        return goals[new Random().Next(goals.Length)];
    }
} 