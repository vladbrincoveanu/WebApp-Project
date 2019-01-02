using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace WebApplication1.Services
{
    public class PasswordEncoder
    {
        public static string EncodePasswordMd5(string pass) //Encrypt using MD5    
        {
            //Instantiate MD5CryptoServiceProvider, get bytes for original password and compute hash (encoded password)    
            var md5 = new SHA256Managed();
            var originalBytes = Encoding.Default.GetBytes(pass);
            var encodedBytes = md5.ComputeHash(originalBytes);
            //Convert encoded bytes back to a 'readable' string    
            return BitConverter.ToString(encodedBytes);
        }
    }
}
