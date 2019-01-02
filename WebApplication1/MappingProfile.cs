using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Identity;
using WebApplication1.Models;
using WebApplication1.Services;
using WebApplication1.ViewModels;

namespace WebApplication1
{
    public class MappingProfile:Profile
    {
        public MappingProfile()
        {
            CreateMap<Step, StepViewModel>();
            CreateMap<StepViewModel, StepViewModel>();
            CreateMap<Ingredient, IngredientViewModel>();
            CreateMap<IngredientViewModel, Ingredient>();
            CreateMap<Recipe, RecipeViewModel>();
            CreateMap<RecipeViewModel, Recipe>();
            CreateMap<QuantityTypeViewModel, QuantityType>();
            CreateMap<QuantityType, QuantityTypeViewModel>();
            CreateMap<IdentityUser, UserViewModel>();
            CreateMap<UserViewModel,IdentityUser>();
            CreateMap<ShoppingList, ShoppingListViewModel>();
            CreateMap<ShoppingListViewModel, ShoppingList>();
        }
    }
}
