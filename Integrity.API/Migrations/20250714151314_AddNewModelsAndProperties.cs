using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Integrity.API.Migrations
{
    /// <inheritdoc />
    public partial class AddNewModelsAndProperties : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Donations_Donors_DonorId",
                table: "Donations");

            migrationBuilder.DropTable(
                name: "TutoringSessions");

            migrationBuilder.DropTable(
                name: "Tutors");

            migrationBuilder.DropIndex(
                name: "IX_Users_Email",
                table: "Users");

            migrationBuilder.DropIndex(
                name: "IX_Students_Country",
                table: "Students");

            migrationBuilder.DropIndex(
                name: "IX_Donations_Date",
                table: "Donations");

            migrationBuilder.DropColumn(
                name: "CurrentStage",
                table: "Students");

            migrationBuilder.DropColumn(
                name: "Stage",
                table: "Donations");

            migrationBuilder.RenameColumn(
                name: "WhyNeedSponsorship",
                table: "Students",
                newName: "WhyNeedLoan");

            migrationBuilder.RenameColumn(
                name: "SchoolName",
                table: "Students",
                newName: "PathwayProgram");

            migrationBuilder.RenameColumn(
                name: "FundingRaised",
                table: "Students",
                newName: "MonthlyPaymentCapacity");

            migrationBuilder.RenameColumn(
                name: "FundingGoal",
                table: "Students",
                newName: "LoanAmount");

            migrationBuilder.RenameColumn(
                name: "EducationLevel",
                table: "Students",
                newName: "DesiredDegree");

            migrationBuilder.RenameColumn(
                name: "AcademicAchievements",
                table: "Students",
                newName: "AcademicProgress");

            migrationBuilder.RenameColumn(
                name: "ForTutoring",
                table: "Donations",
                newName: "IsAnonymous");

            migrationBuilder.AlterColumn<string>(
                name: "Email",
                table: "Users",
                type: "nvarchar(max)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(450)");

            migrationBuilder.AddColumn<decimal>(
                name: "AmountRaised",
                table: "Students",
                type: "decimal(18,2)",
                precision: 18,
                scale: 2,
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AddColumn<DateTime>(
                name: "ExpectedGraduation",
                table: "Students",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AlterColumn<string>(
                name: "Message",
                table: "Donations",
                type: "nvarchar(1000)",
                maxLength: 1000,
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AddColumn<int>(
                name: "Type",
                table: "Donations",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateTable(
                name: "LoanRepayments",
                columns: table => new
                {
                    Id = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    StudentId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Amount = table.Column<decimal>(type: "decimal(18,2)", precision: 18, scale: 2, nullable: false),
                    Date = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Status = table.Column<int>(type: "int", nullable: false),
                    Notes = table.Column<string>(type: "nvarchar(500)", maxLength: 500, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_LoanRepayments", x => x.Id);
                    table.ForeignKey(
                        name: "FK_LoanRepayments_Students_StudentId",
                        column: x => x.StudentId,
                        principalTable: "Students",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_LoanRepayments_StudentId",
                table: "LoanRepayments",
                column: "StudentId");

            migrationBuilder.AddForeignKey(
                name: "FK_Donations_Donors_DonorId",
                table: "Donations",
                column: "DonorId",
                principalTable: "Donors",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Donations_Donors_DonorId",
                table: "Donations");

            migrationBuilder.DropTable(
                name: "LoanRepayments");

            migrationBuilder.DropColumn(
                name: "AmountRaised",
                table: "Students");

            migrationBuilder.DropColumn(
                name: "ExpectedGraduation",
                table: "Students");

            migrationBuilder.DropColumn(
                name: "Type",
                table: "Donations");

            migrationBuilder.RenameColumn(
                name: "WhyNeedLoan",
                table: "Students",
                newName: "WhyNeedSponsorship");

            migrationBuilder.RenameColumn(
                name: "PathwayProgram",
                table: "Students",
                newName: "SchoolName");

            migrationBuilder.RenameColumn(
                name: "MonthlyPaymentCapacity",
                table: "Students",
                newName: "FundingRaised");

            migrationBuilder.RenameColumn(
                name: "LoanAmount",
                table: "Students",
                newName: "FundingGoal");

            migrationBuilder.RenameColumn(
                name: "DesiredDegree",
                table: "Students",
                newName: "EducationLevel");

            migrationBuilder.RenameColumn(
                name: "AcademicProgress",
                table: "Students",
                newName: "AcademicAchievements");

            migrationBuilder.RenameColumn(
                name: "IsAnonymous",
                table: "Donations",
                newName: "ForTutoring");

            migrationBuilder.AlterColumn<string>(
                name: "Email",
                table: "Users",
                type: "nvarchar(450)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AddColumn<int>(
                name: "CurrentStage",
                table: "Students",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AlterColumn<string>(
                name: "Message",
                table: "Donations",
                type: "nvarchar(max)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(1000)",
                oldMaxLength: 1000);

            migrationBuilder.AddColumn<int>(
                name: "Stage",
                table: "Donations",
                type: "int",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "Tutors",
                columns: table => new
                {
                    Id = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    HourlyRate = table.Column<decimal>(type: "decimal(18,2)", precision: 18, scale: 2, nullable: false),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    SessionsCompleted = table.Column<int>(type: "int", nullable: false),
                    Subjects = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Tutors", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "TutoringSessions",
                columns: table => new
                {
                    Id = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    StudentId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    TutorId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Date = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Duration = table.Column<int>(type: "int", nullable: false),
                    Notes = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Status = table.Column<int>(type: "int", nullable: false),
                    Subject = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TutoringSessions", x => x.Id);
                    table.ForeignKey(
                        name: "FK_TutoringSessions_Students_StudentId",
                        column: x => x.StudentId,
                        principalTable: "Students",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_TutoringSessions_Tutors_TutorId",
                        column: x => x.TutorId,
                        principalTable: "Tutors",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Users_Email",
                table: "Users",
                column: "Email",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Students_Country",
                table: "Students",
                column: "Country");

            migrationBuilder.CreateIndex(
                name: "IX_Donations_Date",
                table: "Donations",
                column: "Date");

            migrationBuilder.CreateIndex(
                name: "IX_TutoringSessions_Date",
                table: "TutoringSessions",
                column: "Date");

            migrationBuilder.CreateIndex(
                name: "IX_TutoringSessions_StudentId",
                table: "TutoringSessions",
                column: "StudentId");

            migrationBuilder.CreateIndex(
                name: "IX_TutoringSessions_TutorId",
                table: "TutoringSessions",
                column: "TutorId");

            migrationBuilder.AddForeignKey(
                name: "FK_Donations_Donors_DonorId",
                table: "Donations",
                column: "DonorId",
                principalTable: "Donors",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
