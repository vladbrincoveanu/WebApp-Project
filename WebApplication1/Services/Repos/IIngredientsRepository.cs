using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApplication1.Models;

namespace WebApplication1.Repositories
{
    public interface IIngredientsRepository : IDisposable
    {
        IEnumerable<Ingredient> GetIngredients();
        Ingredient GetIngredientById(int id);
        void InsertIngredient(Ingredient ingredient);
        void DeleteIngredient(int id);
        void UpdateIngredient(Ingredient ingredient);
        void Save();
    }
}
