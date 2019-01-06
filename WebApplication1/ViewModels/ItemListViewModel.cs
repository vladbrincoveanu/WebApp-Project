using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApplication1.ViewModels;

namespace RecipesBox.ViewModels
{
    public class ItemListViewModel
    {
        public int Id { get; set; }

        public string Content { get; set; }

        public double Quantity { get; set; }

        public QuantityTypeViewModel QuantityType { get; set; }
    }
}
