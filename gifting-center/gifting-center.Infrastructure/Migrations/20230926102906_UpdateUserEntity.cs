using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace giftingcenter.Data.Migrations
{
    /// <inheritdoc />
    public partial class UpdateUserEntity : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Users_GiftedUsers_GiftedUserId",
                table: "Users");

            migrationBuilder.AlterColumn<int>(
                name: "GiftedUserId",
                table: "Users",
                type: "integer",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "integer");

            migrationBuilder.AddForeignKey(
                name: "FK_Users_GiftedUsers_GiftedUserId",
                table: "Users",
                column: "GiftedUserId",
                principalTable: "GiftedUsers",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Users_GiftedUsers_GiftedUserId",
                table: "Users");

            migrationBuilder.AlterColumn<int>(
                name: "GiftedUserId",
                table: "Users",
                type: "integer",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "integer",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Users_GiftedUsers_GiftedUserId",
                table: "Users",
                column: "GiftedUserId",
                principalTable: "GiftedUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
