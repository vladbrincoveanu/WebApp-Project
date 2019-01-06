using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using RecipesBox.Domain.Models;

namespace WebApplication1.Models
{
    public class ShoppingList
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public virtual List<ItemListModel> ItemList { get; set; }
    }
}
