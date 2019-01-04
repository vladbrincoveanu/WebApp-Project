using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using WebApplication1.Services;
using WebApplication1.ViewModels;

namespace WebApplication1.Controllers
{
    [Route("api/[controller]")]
    public class UserController : Controller
    {
        private readonly IUserService _userService;
        public UserController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpGet("[action]")]
        public IEnumerable<UserViewModel> All()
        {
            return _userService.GetAll();
        }

        [HttpPost("[action]")]
        public IActionResult AddOrUpdate([FromBody] UserViewModel user)
        {
            _userService.AddUpdateUser(user);
            return StatusCode(200);
        }

        [HttpPost]
        public ActionResult Delete(string name)
        {
            _userService.DeleteUser(name);
            return StatusCode(200);
        }

        [HttpPost("[action]")]
        public IActionResult NotifyAllUsers()
        {
            var users = _userService.GetAll();
            _userService.NotifyAllUsers(users.Select(x=>x.Email).ToList(),"Mere ba!","Ba chiar mere!");
            return StatusCode(200);
        }

        [HttpPost("[action]")]
        public UserViewModel LogIn([FromBody] UserViewModel user)
        {
            var testReturn = _userService.LogIn(user.UserName,user.PasswordHash);
            return testReturn;
        }
    }
}