using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Integrity.API.Migrations
{
    /// <inheritdoc />
    public partial class UpdateDonationAndStudentModels : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "DonorEmail",
                table: "Donations");

            migrationBuilder.DropColumn(
                name: "ExternalPaymentId",
                table: "Donations");

            migrationBuilder.RenameColumn(
                name: "ExternalPaymentUrl",
                table: "Donations",
                newName: "Message");

            migrationBuilder.AddColumn<string>(
                name: "AcademicProgress",
                table: "Students",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "AdminNotes",
                table: "Students",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "ApplicationDate",
                table: "Students",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<string>(
                name: "ApplicationStatus",
                table: "Students",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Name",
                table: "Students",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Story",
                table: "Students",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "WhyNeedLoan",
                table: "Students",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "AcademicProgress",
                table: "Students");

            migrationBuilder.DropColumn(
                name: "AdminNotes",
                table: "Students");

            migrationBuilder.DropColumn(
                name: "ApplicationDate",
                table: "Students");

            migrationBuilder.DropColumn(
                name: "ApplicationStatus",
                table: "Students");

            migrationBuilder.DropColumn(
                name: "Name",
                table: "Students");

            migrationBuilder.DropColumn(
                name: "Story",
                table: "Students");

            migrationBuilder.DropColumn(
                name: "WhyNeedLoan",
                table: "Students");

            migrationBuilder.RenameColumn(
                name: "Message",
                table: "Donations",
                newName: "ExternalPaymentUrl");

            migrationBuilder.AddColumn<string>(
                name: "DonorEmail",
                table: "Donations",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "ExternalPaymentId",
                table: "Donations",
                type: "nvarchar(max)",
                nullable: true);
        }
    }
}
