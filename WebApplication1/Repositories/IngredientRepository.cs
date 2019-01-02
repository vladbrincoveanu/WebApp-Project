using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using WebApplication1.Data;
using WebApplication1.Models;

namespace WebApplication1.Repositories
{
    public class IngredientRepository:IIngredientsRepository
    {
        private readonly ApplicationDbContext _context;

        public IngredientRepository(ApplicationDbContext context)
        {
            _context = context;
        }
        public IEnumerable<Ingredient> GetIngredients()
        {
            return _context.Ingredients.ToList();
        }

        public Ingredient GetIngredientById(int id)
        {
            return _context.Ingredients.Find(id);
        }

        public void InsertIngredient(Ingredient ingredient)
        {
            _context.Ingredients.Add(ingredient);
        }

        public void DeleteIngredient(int id)
        {
            var ingredient = _context.Ingredients.Find(id);
            _context.Ingredients.Remove(ingredient);
        }

        public void UpdateIngredient(Ingredient ingredient)
        {
            _context.Entry(ingredient).State = EntityState.Modified;
        }

        public void Save()
        {
            _context.SaveChanges();
        }

        private bool disposed = false;

        protected virtual void Dispose(bool disposing)
        {
 
            if (!this.disposed)
            {
                if (disposing)
                {
                    _context.Dispose();
                }
            }
            this.disposed = true;
        }

        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }
    }
}
