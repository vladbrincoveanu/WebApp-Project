using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Mail;
using System.Text;
using System.Threading.Tasks;

namespace WebApplication1.Services
{
    public class EmailSend
    {
        public static void SendEmailTo(string email, string title, string body)
        {
            // Command line argument must the the SMTP host.
            var client = new SmtpClient
            {
                Port = 587,
                Host = "smtp.gmail.com",
                EnableSsl = true,
                Timeout = 10000,
                DeliveryMethod = SmtpDeliveryMethod.Network,
                UseDefaultCredentials = false,
                Credentials = new System.Net.NetworkCredential("gg.vladbrincoveanu@gmail.com", "Thefloc21!")
            };

            var mm = new MailMessage("gg.vladbrincoveanu@gmail.com", email, title, body)
            {
                BodyEncoding = Encoding.UTF8,
                DeliveryNotificationOptions = DeliveryNotificationOptions.OnFailure
            };

            client.Send(mm);
        }
    }
}
