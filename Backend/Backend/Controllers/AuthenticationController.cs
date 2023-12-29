using Back_End.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using Microsoft.AspNetCore.Http;
using System.Text;
using System.Text.Json;
using Microsoft.VisualBasic;
using System.Net;

namespace Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthenticationController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        SqlConnection _connection;
        AppDBmanager _dbmanager;

        public AuthenticationController(IConfiguration configuration)
        {
            _configuration = configuration;
            _connection = new SqlConnection(_configuration.GetConnectionString("conn"));
            _dbmanager = new AppDBmanager();
            _connection.Open();
        }
    [AllowAnonymous]
    [HttpPost]
    public async Task<IActionResult> Login([FromBody] UserLogin userlogin)
    {
            try
            {
                User user = _dbmanager.CheckEmail(_connection, userlogin.Username, userlogin.Password);
                IEnumerable<User> list = new List<User>();
                list = _dbmanager.getCurrentUser(_connection, Convert.ToInt32(user.Ssn));
                string token = "";
                if (!list.IsNullOrEmpty())
                {
                token = Generate(list.ElementAt(0));
                    
                    return Ok(token);
                }
                list = _dbmanager.getCurrentJournalist(_connection, Convert.ToInt32(user.Ssn));
                if (!list.IsNullOrEmpty())
                {
                    token = Generate(list.ElementAt(0));
                    return Ok(token);
                }
                list = _dbmanager.getCurrentAdmin(_connection, Convert.ToInt32(user.Ssn));

                    token = Generate(list.ElementAt(0));
                return Ok(token);
            }
            catch (Exception ex) {
                string message = ex.Message;
                return BadRequest(message);
            }
    }
        private string Generate(User user)
        {
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            var claims = new[]
            {
                new Claim("id", Convert.ToString(user.Ssn)),
                new Claim("email", user.Email),
                new Claim("role", user.Role)
            };

            var token = new JwtSecurityToken(_configuration["Jwt:Issuer"],
              _configuration["Jwt:Audience"],
              claims,
              expires: DateTime.Now.AddDays(10),
              signingCredentials: credentials);

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}
