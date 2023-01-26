using AngularNetProject.Model.DataTransferModels;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace AngularNetProject.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class RegisterController : ControllerBase
    {
        private readonly UserManager<IdentityUser> _userManager;

        private static readonly string[] Summaries = new[]
        {
            "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
        };

        private readonly ILogger<WeatherForecastController> _logger;

        public RegisterController(ILogger<WeatherForecastController> logger, UserManager<IdentityUser> userManager)
        {
            _logger = logger;
            _userManager = userManager;
        }

        //[HttpPost]
        //public async Task<int> Register(string _strName)
        //{
        //    var user = new IdentityUser { UserName = _strName, Email = "testhardcode@gmil.com" };
        //    var result = await _userManager.CreateAsync(user, "testHardcode-12");

        //    return 12;
        //}

        [HttpPost]
        public async Task<IActionResult> Register([FromBody] UserRegistrationDto _userRegistration)
        {
            var user = new IdentityUser { UserName = _userRegistration.Email, Email = _userRegistration.Email,  };
            var result = await _userManager.CreateAsync(user, _userRegistration.Password);
            if (!result.Succeeded)
            {
                var errors = result.Errors.Select(e => e.Description);

                return BadRequest(new UserRegistrationResponseDto { Errors = errors });
            }

            await _userManager.AddToRoleAsync(user, "Guest");

            return StatusCode(201);
        }
    }
}
