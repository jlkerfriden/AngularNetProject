using AngularNetProject.Model.DataTransferModels;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.IdentityModel.Tokens.Jwt;

namespace AngularNetProject.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class LoginController : ControllerBase
    {
        private readonly SignInManager<IdentityUser> _signInManager;
        private readonly UserManager<IdentityUser> _userManager;
        private readonly JwtHandler _jwtHandler;

        public LoginController(SignInManager<IdentityUser> signInManager, UserManager<IdentityUser> userManager, JwtHandler jwtHandler)
        {
            _signInManager = signInManager;
            _userManager = userManager;
            _jwtHandler = jwtHandler;
        }

        [HttpPost]
        public async Task<IActionResult> Login([FromBody] UserLoginDto _userLogin)
        {
            var user = await _userManager.FindByEmailAsync(_userLogin.Email);

            if (user == null || !await _userManager.CheckPasswordAsync(user, _userLogin.Password))
                return Unauthorized(new UserLoginResponseDto { Errors = new List<string>() { "Invalid email or password" }, IsSuccess = false });

            var loginCredentials = _jwtHandler.GetSigningCredentials();
            var claims = await _jwtHandler.GetClaims(user);
            var tokenOptions = _jwtHandler.GenerateTokenOptions(loginCredentials, claims);
            var token = new JwtSecurityTokenHandler().WriteToken(tokenOptions);

            return Ok(new UserLoginResponseDto { IsSuccess = true, Token = token });
        }
    }
}
