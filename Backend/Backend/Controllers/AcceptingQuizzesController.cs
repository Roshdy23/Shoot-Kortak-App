using Back_End.Models;
using Back_End.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using System.Text.RegularExpressions;

namespace Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AcceptingQuizzesController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        SqlConnection _sqlconn;
        AppDBmanager _appDbManager;
        public AcceptingQuizzesController(IConfiguration configuration)
        {
            _configuration = configuration;
            _sqlconn = new SqlConnection(_configuration.GetConnectionString("conn"));
            _appDbManager = new AppDBmanager();
            _sqlconn.Open();
        }
        [HttpPost]
        [Route("update")]
        public async Task<IActionResult> updateQuiz([FromBody] AcceptingQuiz aq)
        {
            return (Convert.ToBoolean(_appDbManager.updateQuiz(_sqlconn, aq))) ? Ok() : BadRequest();
        }

    }
}
