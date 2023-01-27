using AngularNetProject.Model;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace AngularNetProject.Controllers
{
    [Authorize(AuthenticationSchemes = "Bearer")]
    [ApiController]
    [Route("[controller]")]
    public class AdministrationController : ControllerBase
    {
        private readonly UserManager<IdentityUser> _userManager;

        public AdministrationController(UserManager<IdentityUser> userManager)
        {
            _userManager = userManager;
        }

        [HttpGet]
        //[Authorize(Roles = "Premium")]
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
