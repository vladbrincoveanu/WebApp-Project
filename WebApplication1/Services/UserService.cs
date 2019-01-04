using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Identity;
using WebApplication1.Models;
using WebApplication1.Repositories;
using WebApplication1.ViewModels;

namespace WebApplication1.Services
{
    public class UserService : IUserService
    {
        private readonly IUserRepository _userRepository;
        private readonly IMapper _mapper;

        public UserService(IUserRepository userRepository, IMapper mapper)
        {
            _userRepository = userRepository;
            _mapper = mapper;
        }

        public void AddUpdateUser(UserViewModel user)
        {
            user.PasswordHash = PasswordEncoder.EncodePasswordMd5(user.PasswordHash);
            _userRepository.AddOrUpdateUser(_mapper.Map<IdentityUser>(user));
            _userRepository.Save();
            EmailSend.SendEmailTo(user.Email, "Registered at Shopping Site", "You have registered succesfully " + user.UserName);
        }

        public List<UserViewModel> GetAll()
        {
            return _mapper.Map<List<UserViewModel>>(_userRepository.GetUsers());
        }


        public void DeleteUser(string name)
        {
            var user = _userRepository.GetUserByName(name);
            _userRepository.DeleteUser(user);
            _userRepository.Save();
        }

        public void NotifyAllUsers(List<string> mails, string title, string content)
        {
            foreach (var mail in mails)
            {
                EmailSend.SendEmailTo(mail,title,content);
            }
        }

        public UserViewModel LogIn(string username, string password)
        {
            return _mapper.Map<UserViewModel>(_userRepository.GetUserByName(username));
//            if (matchedUser == null) return new UserViewModel();
//            if (!matchedUser.PasswordHash.Equals(PasswordEncoder.EncodePasswordMd5(password))) return new UserViewModel();
//            if (matchedUser.Id != null) return _mapper.Map<UserViewModel>(matchedUser);
//            var guidString = System.Guid.NewGuid().ToString();
//            matchedUser.Id = guidString;
//            _userRepository.AddOrUpdateUser(matchedUser);
//            return _mapper.Map<UserViewModel>(matchedUser);

        }
//
//        public void LogOut(UserViewModel user)
//        {
//            var matchedUser = _userRepository.GetUserByName(user.Email);
//
//            if (matchedUser == null) return;
//            matchedUser.Id = null;
//            _userRepository.AddOrUpdateUser(matchedUser);
//
//        }

    }


}
