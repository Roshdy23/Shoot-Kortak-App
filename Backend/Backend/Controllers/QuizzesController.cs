using Back_End.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;

namespace Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]

    public class QuizzesController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        SqlConnection _connection;
        AppDBmanager _dbmanager;

        public QuizzesController(IConfiguration configuration)
        {
            _configuration = configuration;
            _dbmanager = new AppDBmanager();
            _connection = new SqlConnection(_configuration.GetConnectionString("conn"));
            _connection.Open();
        }

        [HttpGet]
        [Route("AllQuizzes")]
        public IEnumerable<Quiz> quizzes()
        {
            return _dbmanager.AllQuizzes(_connection);
        }

        [HttpGet]
        [Route("GetJournalist/{ssn}")]

        public IEnumerable<Quiz> getAllQuizzesOfJour(string ssn)
        {
            return _dbmanager.getAllQuizzesOfJour(_connection, Convert.ToInt32(ssn));
        }
    }
}
