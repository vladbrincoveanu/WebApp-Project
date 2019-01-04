using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using WebApplication1.Data;

namespace WebApplication1.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly ApplicationDbContext _context;
        private bool _disposed;

        public UserRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public IEnumerable<IdentityUser> GetUsers()
        {
            return _context.Users;
        }

        public IdentityUser GetUserByName(string name)
        {
            return _context.Users.FirstOrDefault(x => x.UserName == name);
        }

        public void AddOrUpdateUser(IdentityUser user)
        {
            if (user.Id != null)
            {
                var userEntity = _context.Users.FirstOrDefault(x => x.Id == user.Id);
                userEntity.UserName = user.UserName;
                userEntity.Email = user.Email;
                userEntity.PasswordHash = user.PasswordHash;
                _context.Users.Update(userEntity);
            }
            else
            {
                _context.Users.Add(user);
            }

        }

        public void DeleteUser(IdentityUser user)
        {
            _context.Users.Remove(user);
        }

        public void Save()
        {
            _context.SaveChanges();
        }

        protected virtual void Dispose(bool disposing)
        {
            if (!_disposed)
            {
                if (disposing)
                {
                    _context.Dispose();
                }
            }
            _disposed = true;
        }

        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }

    }
}
