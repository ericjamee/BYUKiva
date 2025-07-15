using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Integrity.API.Migrations
{
    /// <inheritdoc />
    public partial class UpdateModelsWithNewFields : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Approved",
                table: "ProgressReports");

            migrationBuilder.DropColumn(
                name: "PhotoUrl",
                table: "ProgressReports");

            migrationBuilder.RenameColumn(
                name: "Text",
                table: "ProgressReports",
                newName: "NextSteps");

            migrationBuilder.AddColumn<string>(
                name: "Notes",
                table: "TutoringSessions",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "AcademicPerformance",
                table: "ProgressReports",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Challenges",
                table: "ProgressReports",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Goals",
                table: "ProgressReports",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Message",
                table: "Donations",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Notes",
                table: "TutoringSessions");

            migrationBuilder.DropColumn(
                name: "AcademicPerformance",
                table: "ProgressReports");

            migrationBuilder.DropColumn(
                name: "Challenges",
                table: "ProgressReports");

            migrationBuilder.DropColumn(
                name: "Goals",
                table: "ProgressReports");

            migrationBuilder.DropColumn(
                name: "Message",
                table: "Donations");

            migrationBuilder.RenameColumn(
                name: "NextSteps",
                table: "ProgressReports",
                newName: "Text");

            migrationBuilder.AddColumn<bool>(
                name: "Approved",
                table: "ProgressReports",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<string>(
                name: "PhotoUrl",
                table: "ProgressReports",
                type: "nvarchar(max)",
                nullable: true);
        }
    }
}
