using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using WebApplication1.Data;
using WebApplication1.Models;

namespace WebApplication1.Repositories
{
    public class RecipesRepository:IRecipesRepository
    {
        private readonly ApplicationDbContext _context;
        private bool _disposed;

        public RecipesRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public IEnumerable<Recipe> GetRecipes()
        {
            return _context.Recipes
                .Include(e => e.Ingredients)
                .Include(e => e.Steps)
                .ToList();
        }

        public Recipe GetRecipeById(int id)
        {
            return _context.Recipes.Include(e => e.Ingredients)
                .Include(e => e.Steps)
                .SingleOrDefault(e => e.Id == id);
        }

        public void AddOrUpdateRecipe(Recipe recipe)
        {
            if (recipe.Id != 0)
            {
                var recipeEntity = _context.Recipes.Include("Steps").Include("Ingredients").FirstOrDefault(it => it.Id == recipe.Id);
                recipeEntity.Name = recipe.Name;
                recipeEntity.Summary = recipe.Summary;
                recipeEntity.Rating = recipe.Rating;
                DeleteData(recipeEntity.Ingredients);
                recipeEntity.Ingredients.AddRange(recipe.Ingredients);
                DeleteData(recipeEntity.Steps);
                recipeEntity.Steps.AddRange(recipe.Steps);
                _context.Recipes.Update(recipeEntity);
            }
            else
            {
                _context.Recipes.Add(recipe);
            }
        }

        private void DeleteData<T>(IEnumerable<T> data) where T : class
        {
            foreach (var entity in data)
            {
                _context.Entry(entity).State = EntityState.Deleted;
            }
        }

        public void DeleteRecipe(Recipe recipe)
        {
            _context.Steps.RemoveRange(recipe.Steps);
            _context.Ingredients.RemoveRange(recipe.Ingredients);
            _context.Recipes.Remove(recipe);
        }

        public void Save()
        {
            _context.SaveChanges();
        }
      

        protected virtual void Dispose(bool disposing)
        {
            if (!_disposed)
            {
                if (disposing)
                {
                    _context.Dispose();
                }
            }
            _disposed = true;
        }

        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }
    }
}
