using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using RecipesBox.Domain.Models;
using WebApplication1.Models;
using WebApplication1.Repositories;
using WebApplication1.ViewModels;

namespace WebApplication1.Services
{
    public class RecipeService:IRecipeService
    {
        private readonly IRecipesRepository _recipesRepository;
        private readonly IMapper _mapper;

        public RecipeService(IRecipesRepository recipesRepository, IMapper mapper)
        {
            _recipesRepository = recipesRepository;
            _mapper = mapper;
        }

        public List<RecipeViewModel> GetAll()
        {
            return _mapper.Map<List<RecipeViewModel>>(_recipesRepository.GetRecipes());
        }

        public RecipeViewModel GetRecipeById(int id)
        {
            return _mapper.Map<RecipeViewModel>(_recipesRepository.GetRecipeById(id));
        }

        public void AddOrUpdateRecipe(RecipeViewModel recipe)
        {
            var recipeModel = _mapper.Map<Recipe>(recipe);
            _recipesRepository.AddOrUpdateRecipe(recipeModel);
            _recipesRepository.Save();
        }

        public void DeleteRecipe(int recipeId)
        {
            var recipe = _recipesRepository.GetRecipeById(recipeId);
            _recipesRepository.DeleteRecipe(recipe);
            _recipesRepository.Save();
        }

        public ActionResult CreatePdfReport(List<Ingredient> ingredients,List<ItemListModel> itemList)
        {
            return PdfReportService.CreateReportPdfofIngredients(ingredients,itemList);
        }
    }
}
