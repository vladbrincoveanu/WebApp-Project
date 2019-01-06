using System.Collections.Generic;
using RecipesBox.ViewModels;

namespace WebApplication1.Services
{
    public class ShoppingListViewModel
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public List<ItemListViewModel> ItemList { get; set; }
    }
}