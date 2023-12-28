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
        public IEnumerable<Dictionary<object,object>> getAllClubsInChamp(string id)
        {
            return _appDbManager.getAllClubsInChampionship(_sqlconn, Convert.ToInt32(id));
        }

        [HttpPost]
        [Route("Add")]
        public  async Task<IActionResult> addClub(Club club)
        {
            return (Convert.ToBoolean(_appDbManager.addClub(_sqlconn, club))) ? Ok(200) : BadRequest();
        }

        [HttpPost]
        [Route("update/{id}")]
        public  async Task<IActionResult> updateClub(Club club)
        {
            return (Convert.ToBoolean(_appDbManager.updateClub(_sqlconn, club))) ? Ok() : BadRequest();
        }
 
        [HttpGet]
        [Route("AllClubs")]
        public IEnumerable<Dictionary<object,object>> getClubs()
        {
            return _appDbManager.getAllClubs(_sqlconn);
        }

        [HttpPut]
        [Route("UpdateClubCoach/{clubId}")]
        public IActionResult updateClubCoach(int clubId,string newCoach)
        {
            return Convert.ToBoolean(_appDbManager.updateClubCoach(_sqlconn,clubId, newCoach))?Ok():BadRequest();
        }
        [HttpGet]
        [Route("getClubPlayers")]
        public IEnumerable<Dictionary<object, object>> getClubPlayers(int clubId) 
        {
           return     _appDbManager.getClubPlayers(_sqlconn, clubId);
        }

        [HttpGet]
        [Route("getOneClub")]
        public IEnumerable<Dictionary<object, object>> getOneClub(int clubId)
        { 
            return _appDbManager.getOneClub(_sqlconn, clubId);
        }
        [HttpPost]
        [Route("AddClubToChamp")]

        public async Task<IActionResult> addClubToChampionship(string clubid,string champid)
        {
            return Convert.ToBoolean(_appDbManager.addClubToChampionship(_sqlconn, Convert.ToInt32(clubid), Convert.ToInt32(champid))) ? Ok() : BadRequest();
        }
        [HttpGet]
        [Route("getClubsNotInChamp")]

        public IEnumerable<Dictionary<object,object>> getAllClubsNotInChamp(string id)
        {
            return _appDbManager.getAllClubsNotInChamp(_sqlconn, Convert.ToInt32(id));
        }

           
    }
}
