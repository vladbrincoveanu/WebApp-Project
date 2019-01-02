using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace WebApplication1.Data.Migrations
{
    public partial class addedShoppingListTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "ShoppingListId",
                table: "Recipes",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "ShoppingListId",
                table: "Ingredients",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "ShoppingLists",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Name = table.Column<string>(nullable: true),
                    Description = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ShoppingLists", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Recipes_ShoppingListId",
                table: "Recipes",
                column: "ShoppingListId");

            migrationBuilder.CreateIndex(
                name: "IX_Ingredients_ShoppingListId",
                table: "Ingredients",
                column: "ShoppingListId");

            migrationBuilder.AddForeignKey(
                name: "FK_Ingredients_ShoppingLists_ShoppingListId",
                table: "Ingredients",
                column: "ShoppingListId",
                principalTable: "ShoppingLists",
                principalColumn: "Id",
                onDelete: ReferentialAction.NoAction);

            migrationBuilder.AddForeignKey(
                name: "FK_Recipes_ShoppingLists_ShoppingListId",
                table: "Recipes",
                column: "ShoppingListId",
                principalTable: "ShoppingLists",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Ingredients_ShoppingLists_ShoppingListId",
                table: "Ingredients");

            migrationBuilder.DropForeignKey(
                name: "FK_Recipes_ShoppingLists_ShoppingListId",
                table: "Recipes");

            migrationBuilder.DropTable(
                name: "ShoppingLists");

            migrationBuilder.DropIndex(
                name: "IX_Recipes_ShoppingListId",
                table: "Recipes");

            migrationBuilder.DropIndex(
                name: "IX_Ingredients_ShoppingListId",
                table: "Ingredients");

            migrationBuilder.DropColumn(
                name: "ShoppingListId",
                table: "Recipes");

            migrationBuilder.DropColumn(
                name: "ShoppingListId",
                table: "Ingredients");
        }
    }
}
