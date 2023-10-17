using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace giftingcenter.Data.Migrations
{
    /// <inheritdoc />
    public partial class Initial : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "GiftCategories",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Name = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_GiftCategories", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "GiftedUsers",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Name = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_GiftedUsers", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Gifts",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Name = table.Column<string>(type: "text", nullable: false),
                    Price = table.Column<float>(type: "real", nullable: false),
                    Url = table.Column<string>(type: "text", nullable: false),
                    Reserved = table.Column<bool>(type: "boolean", nullable: false),
                    Deleted = table.Column<bool>(type: "boolean", nullable: false),
                    CategoryId = table.Column<int>(type: "integer", nullable: false),
                    GiftedUserId = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Gifts", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Gifts_GiftCategories_CategoryId",
                        column: x => x.CategoryId,
                        principalTable: "GiftCategories",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Gifts_GiftedUsers_GiftedUserId",
                        column: x => x.GiftedUserId,
                        principalTable: "GiftedUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    Guid = table.Column<Guid>(type: "uuid", nullable: false),
                    Username = table.Column<string>(type: "text", nullable: false),
                    Password = table.Column<string>(type: "text", nullable: false),
                    GiftedUserId = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.Guid);
                    table.ForeignKey(
                        name: "FK_Users_GiftedUsers_GiftedUserId",
                        column: x => x.GiftedUserId,
                        principalTable: "GiftedUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "UserRoles",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Name = table.Column<string>(type: "text", nullable: false),
                    UserRole = table.Column<int>(type: "integer", nullable: false),
                    UserDbGuid = table.Column<Guid>(type: "uuid", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserRoles", x => x.Id);
                    table.ForeignKey(
                        name: "FK_UserRoles_Users_UserDbGuid",
                        column: x => x.UserDbGuid,
                        principalTable: "Users",
                        principalColumn: "Guid");
                });

            migrationBuilder.CreateIndex(
                name: "IX_Gifts_CategoryId",
                table: "Gifts",
                column: "CategoryId");

            migrationBuilder.CreateIndex(
                name: "IX_Gifts_GiftedUserId",
                table: "Gifts",
                column: "GiftedUserId");

            migrationBuilder.CreateIndex(
                name: "IX_UserRoles_UserDbGuid",
                table: "UserRoles",
                column: "UserDbGuid");

            migrationBuilder.CreateIndex(
                name: "IX_Users_GiftedUserId",
                table: "Users",
                column: "GiftedUserId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Gifts");

            migrationBuilder.DropTable(
                name: "UserRoles");

            migrationBuilder.DropTable(
                name: "GiftCategories");

            migrationBuilder.DropTable(
                name: "Users");

            migrationBuilder.DropTable(
                name: "GiftedUsers");
        }
    }
}
