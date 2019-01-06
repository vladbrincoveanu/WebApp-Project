using System;
using System.Collections.Generic;
using System.Text;
using WebApplication1.Models;

namespace RecipesBox.Domain.Models
{
    public class ItemListModel
    {
        public int Id { get; set; }

        public string Content { get; set; }

        public double Quantity { get; set; }

        public QuantityType QuantityType { get; set; }
    }
}
