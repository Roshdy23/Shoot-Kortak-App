using Backend.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;

namespace Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ClubsController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        SqlConnection _sqlconn;
        AppDBmanager _appDbManager;
        public ClubsController(IConfiguration configuration)
        {
            _configuration = configuration;
            _sqlconn = new SqlConnection(_configuration.GetConnectionString("conn").ToString());
            _appDbManager = new AppDBmanager();
        }
        [HttpGet]
        [Route("GetInChamp/{id}")]
        public IEnumerable<Club> getAllClubsInChamp(string id)
        {
            return _appDbManager.getAllClubsInChampionship(_sqlconn, Convert.ToInt32(id));
        }
    }
}
