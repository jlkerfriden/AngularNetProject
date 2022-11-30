using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace AngularNetProject.Model
{
    public class AppUser : IdentityUser
    {
        public string Name { get; set; }
        public string Email { get; set; }
    }
}
