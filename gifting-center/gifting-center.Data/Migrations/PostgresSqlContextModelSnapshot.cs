﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;
using gifting_center.Data.Database;

#nullable disable

namespace giftingcenter.Data.Migrations
{
    [DbContext(typeof(PostgresSqlContext))]
    partial class PostgresSqlContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "7.0.0")
                .HasAnnotation("Relational:MaxIdentifierLength", 63);

            NpgsqlModelBuilderExtensions.UseIdentityByDefaultColumns(modelBuilder);

            modelBuilder.Entity("gifting_center.Data.Database.Models.GiftCategoryDb", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.ToTable("GiftCategories");
                });

            modelBuilder.Entity("gifting_center.Data.Database.Models.GiftDb", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<int>("CategoryId")
                        .HasColumnType("integer");

                    b.Property<bool>("Deleted")
                        .HasColumnType("boolean");

                    b.Property<int>("GiftedUserId")
                        .HasColumnType("integer");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<float>("Price")
                        .HasColumnType("real");

                    b.Property<bool>("Reserved")
                        .HasColumnType("boolean");

                    b.Property<string>("Url")
                        .IsRequired()
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.HasIndex("CategoryId");

                    b.HasIndex("GiftedUserId");

                    b.ToTable("Gifts");
                });

            modelBuilder.Entity("gifting_center.Data.Database.Models.GiftedUserDb", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.ToTable("GiftedUsers");
                });

            modelBuilder.Entity("gifting_center.Data.Database.Models.UserDb", b =>
                {
                    b.Property<Guid>("Guid")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uuid");

                    b.Property<int>("GiftedUserId")
                        .HasColumnType("integer");

                    b.Property<string>("Password")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("Username")
                        .IsRequired()
                        .HasColumnType("text");

                    b.HasKey("Guid");

                    b.HasIndex("GiftedUserId");

                    b.ToTable("Users");
                });

            modelBuilder.Entity("gifting_center.Data.Database.Models.UserRoleDb", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<Guid?>("UserDbGuid")
                        .HasColumnType("uuid");

                    b.Property<int>("UserRole")
                        .HasColumnType("integer");

                    b.HasKey("Id");

                    b.HasIndex("UserDbGuid");

                    b.ToTable("UserRoles");
                });

            modelBuilder.Entity("gifting_center.Data.Database.Models.GiftDb", b =>
                {
                    b.HasOne("gifting_center.Data.Database.Models.GiftCategoryDb", "Category")
                        .WithMany("Gifts")
                        .HasForeignKey("CategoryId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("gifting_center.Data.Database.Models.GiftedUserDb", "GiftedUser")
                        .WithMany("Gifts")
                        .HasForeignKey("GiftedUserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Category");

                    b.Navigation("GiftedUser");
                });

            modelBuilder.Entity("gifting_center.Data.Database.Models.UserDb", b =>
                {
                    b.HasOne("gifting_center.Data.Database.Models.GiftedUserDb", "GiftedUser")
                        .WithMany()
                        .HasForeignKey("GiftedUserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("GiftedUser");
                });

            modelBuilder.Entity("gifting_center.Data.Database.Models.UserRoleDb", b =>
                {
                    b.HasOne("gifting_center.Data.Database.Models.UserDb", null)
                        .WithMany("Roles")
                        .HasForeignKey("UserDbGuid");
                });

            modelBuilder.Entity("gifting_center.Data.Database.Models.GiftCategoryDb", b =>
                {
                    b.Navigation("Gifts");
                });

            modelBuilder.Entity("gifting_center.Data.Database.Models.GiftedUserDb", b =>
                {
                    b.Navigation("Gifts");
                });

            modelBuilder.Entity("gifting_center.Data.Database.Models.UserDb", b =>
                {
                    b.Navigation("Roles");
                });
#pragma warning restore 612, 618
        }
    }
}