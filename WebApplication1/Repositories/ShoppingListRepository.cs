using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using WebApplication1.Data;
using WebApplication1.Models;

namespace WebApplication1.Repositories
{
    public class ShoppingListRepository : IShoppingListRepository
    {
        private readonly ApplicationDbContext _context;
        private bool _disposed;

        public ShoppingListRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public List<ShoppingList> GetAll()
        {
            return _context.ShoppingLists
                .Include(sl=>sl.ItemList)
                .ToList();
        }

        public ShoppingList GetById(int shoppingListId)
        {
            return _context.ShoppingLists
                .Include(e=>e.ItemList)
                .SingleOrDefault(e=> e.Id == shoppingListId);
        }

        public void AddOrUpdateShoppingList(ShoppingList shoppingList)
        {
            if (shoppingList.Id != 0)
            {
                var shoppingListEntity = _context.ShoppingLists.FirstOrDefault(n => n.Id == shoppingList.Id);
                shoppingListEntity.Name = shoppingList.Name;
                shoppingListEntity.Description = shoppingList.Description;
                DeleteData(shoppingListEntity.ItemList);
                shoppingListEntity.ItemList.AddRange(shoppingList.ItemList);
                _context.ShoppingLists.Update(shoppingListEntity);
            }
            else
            {
                _context.ShoppingLists.Add(shoppingList);
            }
        }

        private void DeleteData<T>(IEnumerable<T> data) where T : class
        {
            foreach (var entity in data)
            {
                _context.Entry(entity).State = EntityState.Deleted;
            }
        }
        public void DeleteShoppingList(ShoppingList shoppingList)
        {
            _context.ItemListModels.RemoveRange(shoppingList.ItemList);
            _context.ShoppingLists.Remove(shoppingList);
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
