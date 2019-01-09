using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace WebApplication1.Data.Migrations
{
    public partial class redoShoppingList : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Ingredients_ShoppingLists_ShoppingListId",
                table: "Ingredients");

            migrationBuilder.DropForeignKey(
                name: "FK_Recipes_ShoppingLists_ShoppingListId",
                table: "Recipes");

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

            migrationBuilder.CreateTable(
                name: "ItemListModels",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Content = table.Column<string>(nullable: true),
                    Quantity = table.Column<double>(nullable: false),
                    QuantityType = table.Column<int>(nullable: false),
                    ShoppingListId = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ItemListModels", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ItemListModels_ShoppingLists_ShoppingListId",
                        column: x => x.ShoppingListId,
                        principalTable: "ShoppingLists",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.NoAction);
                });

            migrationBuilder.CreateIndex(
                name: "IX_ItemListModels_ShoppingListId",
                table: "ItemListModels",
                column: "ShoppingListId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ItemListModels");

            migrationBuilder.AddColumn<int>(
                name: "ShoppingListId",
                table: "Recipes",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "ShoppingListId",
                table: "Ingredients",
                nullable: true);

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
                onDelete: ReferentialAction.NoAction);
        }
    }
}
