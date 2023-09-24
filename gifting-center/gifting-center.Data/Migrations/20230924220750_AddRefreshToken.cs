using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace giftingcenter.Data.Migrations
{
    /// <inheritdoc />
    public partial class AddRefreshToken : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_UserRoles_Users_UserDbGuid",
                table: "UserRoles");

            migrationBuilder.RenameColumn(
                name: "Password",
                table: "Users",
                newName: "PasswordHash");

            migrationBuilder.RenameColumn(
                name: "Guid",
                table: "Users",
                newName: "Id");

            migrationBuilder.RenameColumn(
                name: "UserDbGuid",
                table: "UserRoles",
                newName: "UserDbId");

            migrationBuilder.RenameIndex(
                name: "IX_UserRoles_UserDbGuid",
                table: "UserRoles",
                newName: "IX_UserRoles_UserDbId");

            migrationBuilder.AddColumn<string>(
                name: "Email",
                table: "Users",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<DateTime>(
                name: "RefreshToken_Created",
                table: "Users",
                type: "timestamp with time zone",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "RefreshToken_Expires",
                table: "Users",
                type: "timestamp with time zone",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "RefreshToken_Revoked",
                table: "Users",
                type: "timestamp with time zone",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "RefreshToken_Token",
                table: "Users",
                type: "text",
                nullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_UserRoles_Users_UserDbId",
                table: "UserRoles",
                column: "UserDbId",
                principalTable: "Users",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_UserRoles_Users_UserDbId",
                table: "UserRoles");

            migrationBuilder.DropColumn(
                name: "Email",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "RefreshToken_Created",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "RefreshToken_Expires",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "RefreshToken_Revoked",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "RefreshToken_Token",
                table: "Users");

            migrationBuilder.RenameColumn(
                name: "PasswordHash",
                table: "Users",
                newName: "Password");

            migrationBuilder.RenameColumn(
                name: "Id",
                table: "Users",
                newName: "Guid");

            migrationBuilder.RenameColumn(
                name: "UserDbId",
                table: "UserRoles",
                newName: "UserDbGuid");

            migrationBuilder.RenameIndex(
                name: "IX_UserRoles_UserDbId",
                table: "UserRoles",
                newName: "IX_UserRoles_UserDbGuid");

            migrationBuilder.AddForeignKey(
                name: "FK_UserRoles_Users_UserDbGuid",
                table: "UserRoles",
                column: "UserDbGuid",
                principalTable: "Users",
                principalColumn: "Guid");
        }
    }
}
