using AngularNetProject.Model;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace AngularNetProject.Controllers
{
    [Authorize(AuthenticationSchemes = "Bearer")]
    [Route("[controller]")]
    [ApiController]
    public class AppUserController : ControllerBase
    {
        private readonly UserManager<IdentityUser> _userManager;

        public AppUserController(UserManager<IdentityUser> userManager)
        {
            _userManager = userManager;
        }

        [HttpGet]
        [Authorize(Roles = "Premium")]
        public IEnumerable<AppUser> Get()
        {
            List<IdentityUser> lstUsers = _userManager.Users.ToList();

            return lstUsers.Select(user => new AppUser
            {
                Email = user.Email,
                Name = user.UserName
            })
            .ToArray();
        }
    }
}
