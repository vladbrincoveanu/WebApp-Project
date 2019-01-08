using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using RecipesBox.Domain.Models;
using WebApplication1.Data;

namespace WebApplication1.Repositories
{
    public class ItemListRepository : IItemListRepository
    {
        private readonly ApplicationDbContext _context;

        public ItemListRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public IEnumerable<ItemListModel> GetAll()
        {
            return _context.ItemListModels.ToList();
        }
    }
}
