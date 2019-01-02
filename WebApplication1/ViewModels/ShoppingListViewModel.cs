using System.Collections.Generic;
using WebApplication1.Models;
using WebApplication1.ViewModels;

namespace WebApplication1.Services
{
    public class ShoppingListViewModel
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public List<RecipeViewModel> Recipes { get; set; }
        public List<IngredientViewModel> Ingredients { get; set; }
    }
}