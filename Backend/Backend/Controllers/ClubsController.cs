using Back_End.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using static System.Reflection.Metadata.BlobBuilder;

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
            _sqlconn = new SqlConnection(_configuration.GetConnectionString("conn"));
            _sqlconn.Open();
            _appDbManager = new AppDBmanager();
        }
        [HttpGet]
        [Route("GetInChamp/{id}")]
        public IEnumerable<Club> getAllClubsInChamp(string id)
        {
            return _appDbManager.getAllClubsInChampionship(_sqlconn, Convert.ToInt32(id));
        }

        [HttpPost]
        [Route("Add")]
        public  async Task<IActionResult> addClub(Club club)
        {
            return (Convert.ToBoolean(_appDbManager.addClub(_sqlconn, club))) ? Ok() : BadRequest();
        }

        [HttpPost]
        [Route("update/{id}")]
        public  async Task<IActionResult> updateClub(Club club)
        {
            return (Convert.ToBoolean(_appDbManager.updateClub(_sqlconn, club))) ? Ok() : BadRequest();
        }
 
        [HttpGet]
        [Route("AllClubs")]
        public IEnumerable<Club> getClubs()
        {
            return _appDbManager.getAllClubs(_sqlconn);
        }

        [HttpPut]
        [Route("UpdateClub'sCoach/{clubId}")]
        public IActionResult updateCoach(int clubId,string newCoach)
        {
            return Convert.ToBoolean(_appDbManager.updateCoach(_sqlconn,clubId, newCoach))?Ok():BadRequest();
        }
    }
}
