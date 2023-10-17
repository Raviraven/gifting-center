using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace giftingcenter.Data.Migrations
{
    /// <inheritdoc />
    public partial class UpdateUserRoleDb : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "UserRole",
                table: "UserRoles");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "UserRole",
                table: "UserRoles",
                type: "integer",
                nullable: false,
                defaultValue: 0);
        }
    }
}
