using System.Collections.Generic;
using Microsoft.AspNetCore.Identity;

namespace WebApplication1.Repositories
{
    public interface IUserRepository
    {
        void AddOrUpdateUser(IdentityUser user);
        void DeleteUser(IdentityUser user);
        IdentityUser GetUserByName(string name);
        IEnumerable<IdentityUser> GetUsers();
        void Save();
    }
}