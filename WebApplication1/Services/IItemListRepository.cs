using System.Collections.Generic;
using RecipesBox.Domain.Models;

namespace WebApplication1.Repositories
{
    public interface IItemListRepository
    {
        IEnumerable<ItemListModel> GetAll();
    }
}