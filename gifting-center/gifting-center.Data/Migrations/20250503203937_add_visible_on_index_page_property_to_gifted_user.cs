using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace giftingcenter.Data.Migrations
{
    /// <inheritdoc />
    public partial class addvisibleonindexpagepropertytogifteduser : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "VisibleOnIndexPage",
                table: "GiftedUsers",
                type: "boolean",
                nullable: false,
                defaultValue: false);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "VisibleOnIndexPage",
                table: "GiftedUsers");
        }
    }
}
