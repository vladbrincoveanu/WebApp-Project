using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApplication1.Models
{
    public class Recipe
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Summary { get; set; }
        public int Rating { get; set; }
        public virtual List<Ingredient> Ingredients { get; set; }
        public virtual List<Step> Steps { get; set; }
    }
}
