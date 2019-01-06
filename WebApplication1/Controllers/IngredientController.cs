using System;
using System.Collections;
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

        [HttpPost("[action]")]
        public ActionResult AddOrUpdateIngredient([FromBody]IngredientViewModel ingredient)
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

        [HttpGet("[action]")]
        public IEnumerable<QuantityTypeViewModel> GetQuantityTypes()
        {
            //            var test = _ingredientsRepository.GetIngredients()
            //                .Select(o => new QuantityTypeViewModel {Id = o.Id, Name = o.QuantityType.ToString()});
            //            var manualQuantity = test.GroupBy(elem => elem.Name).Select(group => group.First());

            var values = (QuantityType[])Enum.GetValues(typeof(QuantityType));
            var types = new List<QuantityType>(values);
            return types.Select(type => new QuantityTypeViewModel { Id = (int)type, Name = type.ToString() }).ToList();

        }
    }
}