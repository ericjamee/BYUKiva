using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Integrity.API.Migrations
{
    /// <inheritdoc />
    public partial class UpdateStudentModel : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Age",
                table: "Students");

            migrationBuilder.DropColumn(
                name: "YearlyFundingGoal",
                table: "Students");

            migrationBuilder.RenameColumn(
                name: "Story",
                table: "Students",
                newName: "LastName");

            migrationBuilder.RenameColumn(
                name: "Name",
                table: "Students",
                newName: "FirstName");

            migrationBuilder.AddColumn<decimal>(
                name: "FundingGoal",
                table: "Students",
                type: "decimal(18,2)",
                precision: 18,
                scale: 2,
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AddColumn<string>(
                name: "StudentId1",
                table: "ProgressReports",
                type: "nvarchar(450)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "StudentId1",
                table: "Donations",
                type: "nvarchar(450)",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_ProgressReports_StudentId1",
                table: "ProgressReports",
                column: "StudentId1");

            migrationBuilder.CreateIndex(
                name: "IX_Donations_StudentId1",
                table: "Donations",
                column: "StudentId1");

            migrationBuilder.AddForeignKey(
                name: "FK_Donations_Students_StudentId1",
                table: "Donations",
                column: "StudentId1",
                principalTable: "Students",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_ProgressReports_Students_StudentId1",
                table: "ProgressReports",
                column: "StudentId1",
                principalTable: "Students",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Donations_Students_StudentId1",
                table: "Donations");

            migrationBuilder.DropForeignKey(
                name: "FK_ProgressReports_Students_StudentId1",
                table: "ProgressReports");

            migrationBuilder.DropIndex(
                name: "IX_ProgressReports_StudentId1",
                table: "ProgressReports");

            migrationBuilder.DropIndex(
                name: "IX_Donations_StudentId1",
                table: "Donations");

            migrationBuilder.DropColumn(
                name: "FundingGoal",
                table: "Students");

            migrationBuilder.DropColumn(
                name: "StudentId1",
                table: "ProgressReports");

            migrationBuilder.DropColumn(
                name: "StudentId1",
                table: "Donations");

            migrationBuilder.RenameColumn(
                name: "LastName",
                table: "Students",
                newName: "Story");

            migrationBuilder.RenameColumn(
                name: "FirstName",
                table: "Students",
                newName: "Name");

            migrationBuilder.AddColumn<int>(
                name: "Age",
                table: "Students",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<decimal>(
                name: "YearlyFundingGoal",
                table: "Students",
                type: "decimal(18,2)",
                nullable: false,
                defaultValue: 0m);
        }
    }
}
