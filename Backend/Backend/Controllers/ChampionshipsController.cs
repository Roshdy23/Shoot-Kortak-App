using Back_End.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;

namespace Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ChampionshipsController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        SqlConnection _sqlconn;
        AppDBmanager _appDbManager;
        public ChampionshipsController(IConfiguration configuration)
        {
            _configuration = configuration;
            _sqlconn = new SqlConnection(_configuration.GetConnectionString("conn"));
            _appDbManager = new AppDBmanager();
            _sqlconn.Open();
        }
        [HttpGet]
        [Route("GetFinished")]
        public IEnumerable<Championship> getAllFinishedChampionships()
        {
            return _appDbManager.getAllFinishedChampionships(_sqlconn);
        }
        [HttpPost]
        [Route("AddChamp/{lorc}")]
        public async Task<IActionResult> addChamp([FromBody] Championship champ, string lorc)
        {
            return (Convert.ToBoolean(_appDbManager.addChamp(_sqlconn, champ, Convert.ToInt32(lorc)))) ? Ok() : BadRequest();
        }
        [HttpPost]
        [Route("update/{id}")]

        public async Task<IActionResult> updateChamp(Championship champ)
        {
            return (Convert.ToBoolean(_appDbManager.updateChamp(_sqlconn, champ))) ? Ok() : BadRequest();
        }
        [HttpGet]
        [Route("Getchamp/{id}")]
        public IEnumerable<Championship> getChampionship(string id)
        {
            return _appDbManager.getChamp(_sqlconn, Convert.ToInt32(id));
        }
        [HttpGet]
        [Route("GetCurrent")]
        public IEnumerable<Championship> getAllCurrentChampiopnship()
        {
            return _appDbManager.getAllCurrentChampiopnship(_sqlconn);
        }
        [HttpPost]
        [Route("AddClub/{champid}/{clubid}")]

        public async Task<IActionResult> addClubToChamp(string champid,string clubid)
        {
            return (Convert.ToBoolean(_appDbManager.addClubToChamp(_sqlconn, Convert.ToInt32(champid),Convert.ToInt32(clubid) ))) ? Ok() : BadRequest();
        }
        [HttpGet]
        [Route("GetChampId/{name}")]
        public int getChampId( string name)
        {
            return _appDbManager.getChampId(_sqlconn, name);
        }

    }
}