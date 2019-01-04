using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApplication1.ViewModels;

namespace WebApplication1.Services
{
    public interface IUserService
    {
        void AddUpdateUser(UserViewModel user);
        List<UserViewModel> GetAll();
        void DeleteUser(string name);
        void NotifyAllUsers(List<string> mails, string title, string content);
        UserViewModel LogIn(string username, string password);
    }
}
