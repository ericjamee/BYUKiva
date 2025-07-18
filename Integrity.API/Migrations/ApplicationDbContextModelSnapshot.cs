﻿// <auto-generated />
using System;
using Integrity.API.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace Integrity.API.Migrations
{
    [DbContext(typeof(ApplicationDbContext))]
    partial class ApplicationDbContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "8.0.1")
                .HasAnnotation("Relational:MaxIdentifierLength", 63);

            NpgsqlModelBuilderExtensions.UseIdentityByDefaultColumns(modelBuilder);

            modelBuilder.Entity("Integrity.API.Models.Donation", b =>
                {
                    b.Property<string>("Id")
                        .HasColumnType("text");

                    b.Property<decimal>("Amount")
                        .HasPrecision(18, 2)
                        .HasColumnType("numeric(18,2)");

                    b.Property<DateTime>("Date")
                        .HasColumnType("timestamp with time zone");

                    b.Property<string>("DonorName")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("Message")
                        .HasColumnType("text");

                    b.Property<string>("Status")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("StudentId")
                        .IsRequired()
                        .HasColumnType("varchar(450)");

                    b.HasKey("Id");

                    b.HasIndex("StudentId");

                    b.ToTable("Donations");
                });

            modelBuilder.Entity("Integrity.API.Models.ProgressReport", b =>
                {
                    b.Property<string>("Id")
                        .HasColumnType("text");

                    b.Property<string>("Achievements")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("Challenges")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<DateTime>("Date")
                        .HasColumnType("timestamp with time zone");

                    b.Property<string>("FamilyHistoryActivities")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<int>("NamesIndexed")
                        .HasColumnType("integer");

                    b.Property<string>("PathwayProgress")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("StudentId")
                        .IsRequired()
                        .HasColumnType("varchar(450)");

                    b.HasKey("Id");

                    b.HasIndex("StudentId");

                    b.ToTable("ProgressReports");
                });

            modelBuilder.Entity("Integrity.API.Models.Student", b =>
                {
                    b.Property<string>("Id")
                        .HasColumnType("varchar(450)");

                    b.Property<string>("AcademicProgress")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("AdminNotes")
                        .HasColumnType("text");

                    b.Property<decimal>("AmountRaised")
                        .HasPrecision(18, 2)
                        .HasColumnType("numeric(18,2)");

                    b.Property<DateTime>("ApplicationDate")
                        .HasColumnType("timestamp with time zone");

                    b.Property<string>("ApplicationStatus")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("Country")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("DesiredDegree")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<int>("EstimatedNamesPerYear")
                        .HasColumnType("integer");

                    b.Property<string>("FamilyHistoryExperience")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("FirstName")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<decimal>("FundingGoal")
                        .HasPrecision(18, 2)
                        .HasColumnType("numeric(18,2)");

                    b.Property<string>("FutureGoals")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("LastName")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("PathwayProgram")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("ProfilePictureUrl")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<DateTime>("StartDate")
                        .HasColumnType("timestamp with time zone");

                    b.Property<string>("Story")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("WhyNeedDonation")
                        .IsRequired()
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.ToTable("Students");
                });

            modelBuilder.Entity("Integrity.API.Models.Donation", b =>
                {
                    b.HasOne("Integrity.API.Models.Student", "Student")
                        .WithMany("Donations")
                        .HasForeignKey("StudentId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Student");
                });

            modelBuilder.Entity("Integrity.API.Models.ProgressReport", b =>
                {
                    b.HasOne("Integrity.API.Models.Student", "Student")
                        .WithMany("ProgressReports")
                        .HasForeignKey("StudentId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Student");
                });

            modelBuilder.Entity("Integrity.API.Models.Student", b =>
                {
                    b.Navigation("Donations");

                    b.Navigation("ProgressReports");
                });
#pragma warning restore 612, 618
        }
    }
}
