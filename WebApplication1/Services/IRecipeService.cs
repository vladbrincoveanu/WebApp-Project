using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using RecipesBox.Domain.Models;
using WebApplication1.Models;
using WebApplication1.ViewModels;

namespace WebApplication1.Services
{
    public interface IRecipeService
    {
        List<RecipeViewModel> GetAll();
        RecipeViewModel GetRecipeById(int id);
        void AddOrUpdateRecipe(RecipeViewModel recipe);
        void DeleteRecipe(int recipeId);
        ActionResult CreatePdfReport(List<Ingredient> ingredients, List<ItemListModel> itemList);
    }
}
