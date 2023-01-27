using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace AngularNetProject.Migrations
{
    public partial class roleConfig : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { "df075d49-0703-4468-b635-a6c1c44ef212", "69658261-e023-4e4c-9813-2a3a8d2864af", "Guest", "GUEST" });

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { "e72f4359-7526-467c-b19c-0c6d6c843d78", "dca1fe50-5159-4600-b3ff-8afc64f763db", "Premium", "PREMIUM" });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "df075d49-0703-4468-b635-a6c1c44ef212");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "e72f4359-7526-467c-b19c-0c6d6c843d78");
        }
    }
}
