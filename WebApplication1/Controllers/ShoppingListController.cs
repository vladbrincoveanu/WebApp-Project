using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using WebApplication1.Services;

namespace WebApplication1.Controllers
{
    [Route("api/[controller]")]
    public class ShoppingListController : Controller
    {
        private readonly IShoppingListService _shoppingListService;

        public ShoppingListController(IShoppingListService shoppingListService)
        {
            _shoppingListService = shoppingListService;
        }
        [HttpGet("[action]")]
        public List<ShoppingListViewModel> All()
        {
            var data = _shoppingListService.GetAll();
            return data;
        }

        [Route("GetShoppingListById/{id}")]
        public ShoppingListViewModel GetShoppingListById(int id)
        {
            return _shoppingListService.GetShoppingListById(id);
        }

        [HttpPost("[action]")]
        public ActionResult AddOrUpdateShoppingList([FromBody]ShoppingListViewModel shoppingList)
        {
            _shoppingListService.AddOrUpdateShoppingList(shoppingList);
            _shoppingListService.ProcessShoppingList(shoppingList);
          
            return Ok(new { status = "Ok" });
        }

        [HttpDelete("[action]/{id}")]
        public ActionResult Delete(int id)
        {
            try
            {
                _shoppingListService.DeleteShoppingList(id);
                return StatusCode(200);
            }
            catch (Exception)
            {
                return StatusCode(500);
            }
        }
    }
}