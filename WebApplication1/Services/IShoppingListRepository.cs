using System.Collections.Generic;
using WebApplication1.Models;

namespace WebApplication1.Repositories
{
    public interface IShoppingListRepository
    {
        void AddOrUpdateShoppingList(ShoppingList shoppingList);
        void DeleteShoppingList(ShoppingList shoppingList);
        List<ShoppingList> GetAll();
        ShoppingList GetById(int shoppingListId);
        void Save();
    }
}