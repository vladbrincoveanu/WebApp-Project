using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using WebApplication1.Models;
using WebApplication1.Repositories;

namespace WebApplication1.Services
{
    public class ShoppingListService : IShoppingListService
    {
        private readonly IShoppingListRepository _shoppingListRepository;
        private readonly IMapper _mapper;

        public ShoppingListService(IShoppingListRepository shoppingListRepository,IMapper mapper)
        {
            _shoppingListRepository = shoppingListRepository;
            _mapper = mapper;
        }

        public List<ShoppingListViewModel> GetAll()
        {
            return _mapper.Map<List<ShoppingListViewModel>>(_shoppingListRepository.GetAll());
        }

        public ShoppingListViewModel GetShoppingListById(int id)
        {
            return _mapper.Map<ShoppingListViewModel>(_shoppingListRepository.GetById(id));
        }

        public void AddOrUpdateShoppingList(ShoppingListViewModel recipe)
        {
            var recipeModel = _mapper.Map<ShoppingList>(recipe);
            _shoppingListRepository.AddOrUpdateShoppingList(recipeModel);
            _shoppingListRepository.Save();
        }

        public void DeleteShoppingList(int shoppingListId)
        {
            var shoppingList = _shoppingListRepository.GetById(shoppingListId);
            _shoppingListRepository.DeleteShoppingList(shoppingList);
            _shoppingListRepository.Save();
        }
    }
}
