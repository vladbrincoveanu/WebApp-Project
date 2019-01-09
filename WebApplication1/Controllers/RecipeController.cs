using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using WebApplication1.Services;
using WebApplication1.ViewModels;

namespace WebApplication1.Controllers
{
        [Route("api/[controller]")]
        public class RecipesController : Controller
        {
            private readonly IRecipeService _recipesService;
            private readonly IUserService _userService;

            public RecipesController(IRecipeService recipesService,IUserService userService)
            {
                _recipesService = recipesService;
                _userService = userService;
            }

            [HttpGet("[action]")]
            public List<RecipeViewModel> All()
            {
                return _recipesService.GetAll();
            }

            [HttpGet("GetRecipeById/{id}")]
            public RecipeViewModel GetRecipeById(int id)
            {
                return _recipesService.GetRecipeById(id); ;
            }

            [HttpPost("[action]")]
            public ActionResult AddOrUpdateRecipe([FromBody]RecipeViewModel recipe)
            {
                var users = _userService.GetAll();
                var content = "";
                content = content + recipe.Name + " " + "Rating " + recipe.Rating;
                _userService.NotifyAllUsers(users.Select(x=>x.Email).ToList(),"Added a new Recipe!", content);
                _recipesService.AddOrUpdateRecipe(recipe);
                return Ok(new { status = "Ok" });

            }

            [HttpGet("Delete/{id}")]
            public ActionResult Delete(int id)
            {
                try
                {
                    _recipesService.DeleteRecipe(id);
                    return StatusCode(200);
                }
                catch (Exception)
                {
                    return StatusCode(500);
                }
            }
    }
}