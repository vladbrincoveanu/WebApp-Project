using System.Collections.Generic;

namespace WebApplication1.Services
{
    public interface IShoppingListService
    {
        void AddOrUpdateShoppingList(ShoppingListViewModel recipe);
        void DeleteShoppingList(int shoppingListId);
        List<ShoppingListViewModel> GetAll();
        ShoppingListViewModel GetShoppingListById(int id);
        void ProcessShoppingList(ShoppingListViewModel soShoppingListViewModel);
    }
}