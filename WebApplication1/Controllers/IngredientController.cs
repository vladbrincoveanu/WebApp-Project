using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using WebApplication1.Models;
using WebApplication1.Repositories;
using WebApplication1.ViewModels;

namespace WebApplication1.Controllers
{
    [Route("api/[controller]")]
    public class IngredientController : Controller
    {
        private readonly IIngredientsRepository _ingredientsRepository;
        private readonly IMapper _mapper;

        public IngredientController(IIngredientsRepository ingredientsRepository, IMapper mapper)
        {
            _ingredientsRepository = ingredientsRepository;
            _mapper = mapper;
        }
        [HttpGet("[action]")]
        public List<IngredientViewModel> All()
        {
            return _mapper.Map<List<IngredientViewModel>>(_ingredientsRepository.GetIngredients());
        }

        [Route("GetIngredient/{id}")]
        public IngredientViewModel GetIngredient(int id)
        {
            return _mapper.Map<IngredientViewModel>(_ingredientsRepository.GetIngredientById(id));
        }

        [Route("add")]
        [HttpPost]
        public ActionResult AddOrUpdateRecipe([FromBody]IngredientViewModel ingredient)
        {
            _ingredientsRepository.InsertIngredient(_mapper.Map<Ingredient>(ingredient));
            _ingredientsRepository.Save();
            return Ok(new { status = "Ok" });
        }

        [HttpDelete("Delete/{id}")]
        public ActionResult Delete(int id)
        {
            try
            {
                _ingredientsRepository.DeleteIngredient(id);
                _ingredientsRepository.Save();
                return StatusCode(200);
            }
            catch (Exception)
            {
                return StatusCode(500);
            }
        }
    }
}