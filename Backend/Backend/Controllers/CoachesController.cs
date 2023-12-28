using Back_End.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
namespace Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CoachesController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        SqlConnection _sqlconn;
        AppDBmanager _appDbManager;
        public CoachesController(IConfiguration configuration)
        {
            _configuration = configuration;
            _sqlconn = new SqlConnection(_configuration.GetConnectionString("conn"));
            _appDbManager = new AppDBmanager();
            _sqlconn.Open();
        }


        [HttpPost]
        [Route("AddCoach/{clubID}")]
        public IEnumerable<Coach> addCoach(int clubID, [FromBody] Coach coach)
        {
            return _appDbManager.addCoach(_sqlconn, clubID, coach);
        }

        [HttpDelete]
        [Route("DeleteCoach/{coachID}")]
        public IActionResult deleteCoach(int coachID)
        {
            return Convert.ToBoolean(_appDbManager.deletePlayer(_sqlconn, coachID)) ? Ok() : BadRequest();

        }
    }
}