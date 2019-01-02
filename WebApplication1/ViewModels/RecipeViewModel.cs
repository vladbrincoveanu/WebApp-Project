using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApplication1.ViewModels
{
    public class RecipeViewModel
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Summary { get; set; }
        public int Rating { get; set; }
        public List<IngredientViewModel> Ingredients { get; set; }
        public List<StepViewModel> Steps { get; set; }
    }
}
