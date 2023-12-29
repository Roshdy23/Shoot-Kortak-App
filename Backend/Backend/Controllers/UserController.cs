using Back_End.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using Microsoft.IdentityModel.Tokens;

namespace Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        SqlConnection _connection;
        AppDBmanager _dbmanager;

        public UserController(IConfiguration configuration)
        {
            _configuration = configuration;
            _connection = new SqlConnection(_configuration.GetConnectionString("conn"));
            _dbmanager = new AppDBmanager();
            _connection.Open();
        }

        [HttpGet]
        [Route("get/{id}")]
        public IEnumerable<User> GetUsr(string id) {
            IEnumerable<User> list = new List<User>();
            list = _dbmanager.getCurrentUser(_connection, Convert.ToInt32(id));
            if (!list.IsNullOrEmpty())
                return list;
            list = _dbmanager.getCurrentJournalist(_connection, Convert.ToInt32(id));
            if (!list.IsNullOrEmpty())
                return list;
            list = _dbmanager.getCurrentAdmin(_connection, Convert.ToInt32(id));
                return list;
        }

        [HttpGet]
        [Route("getCountUsers")]

        public int getCountUsers()
        {
            return _dbmanager.getCountUsers(_connection);
        }
    }
}
