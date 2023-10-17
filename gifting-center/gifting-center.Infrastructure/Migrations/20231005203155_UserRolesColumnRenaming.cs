using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace giftingcenter.Data.Migrations
{
    /// <inheritdoc />
    public partial class UserRolesColumnRenaming : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_UserRoles_Users_UserDbId",
                table: "UserRoles");

            migrationBuilder.RenameColumn(
                name: "UserDbId",
                table: "UserRoles",
                newName: "UserEntityId");

            migrationBuilder.RenameIndex(
                name: "IX_UserRoles_UserDbId",
                table: "UserRoles",
                newName: "IX_UserRoles_UserEntityId");

            migrationBuilder.AddForeignKey(
                name: "FK_UserRoles_Users_UserEntityId",
                table: "UserRoles",
                column: "UserEntityId",
                principalTable: "Users",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_UserRoles_Users_UserEntityId",
                table: "UserRoles");

            migrationBuilder.RenameColumn(
                name: "UserEntityId",
                table: "UserRoles",
                newName: "UserDbId");

            migrationBuilder.RenameIndex(
                name: "IX_UserRoles_UserEntityId",
                table: "UserRoles",
                newName: "IX_UserRoles_UserDbId");

            migrationBuilder.AddForeignKey(
                name: "FK_UserRoles_Users_UserDbId",
                table: "UserRoles",
                column: "UserDbId",
                principalTable: "Users",
                principalColumn: "Id");
        }
    }
}
