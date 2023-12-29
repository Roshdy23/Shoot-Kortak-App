using Back_End.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;

namespace Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StatsController : Controller
    {
        private readonly IConfiguration _configuration;
        SqlConnection _sqlconn;
        AppDBmanager _appDbManager;
        public StatsController(IConfiguration configuration)
        {
            _configuration = configuration;
            _sqlconn = new SqlConnection(_configuration.GetConnectionString("conn"));
            _appDbManager = new AppDBmanager();
            _sqlconn.Open();
        }


        [HttpGet]
        [Route("TopSaves/{champId}")]
        public IEnumerable<Dictionary<Object,Object>> TopSaves(string champId)
        {
            return _appDbManager.TopSaves(_sqlconn,Convert.ToInt32(champId));
        }
        [HttpGet]
        [Route("TopAssists/{champId}")]
        public IEnumerable<Dictionary<Object, Object>> TopAssists(string champId)
        {
            return _appDbManager.TopAssists(_sqlconn, Convert.ToInt32(champId));
        }
        [HttpGet]
        [Route("TopGoals/{champId}")]
        public IEnumerable<Dictionary<Object, Object>> TopGoals(string champId)
        {
            return _appDbManager.TopGoals(_sqlconn, Convert.ToInt32(champId));
        }
        [HttpGet]
        [Route("TopTackles/{champId}")]
        public IEnumerable<Dictionary<Object, Object>> TopTackles(string champId)
        {
            return _appDbManager.TopTackles(_sqlconn, Convert.ToInt32(champId));
        }
        [HttpGet]
        [Route("TopCleanSheets/{champId}")]
        public IEnumerable<Dictionary<Object, Object>> TopCleanSheets(string champId)
        {
            return _appDbManager.TopCleanSheets(_sqlconn, Convert.ToInt32(champId));
        }

        [HttpPost]
        [Route("Add")]

        public async Task<IActionResult> addPlayerStatInChamp([FromBody] Stat s)
        {
            return (Convert.ToBoolean(_appDbManager.addPlayerStatInChamp(_sqlconn, s)) ? Ok() : BadRequest());
        }

        [HttpGet]
        [Route("GetPlayersStat")]
        public IEnumerable<Dictionary<object, object>> getPlayersStats(string clubid, string champid)
        {
            return _appDbManager.getPlayersStat(_sqlconn, Convert.ToInt32(clubid), Convert.ToInt32(champid));
        }
        [HttpGet]
        [Route("GetStatClubs")]
        public IEnumerable<StatClub> statClubs() {
            return _appDbManager.getstatclubs(_sqlconn);
        }
        [HttpGet]
        [Route("GetStatPlayers/{clubId}")]
        public IEnumerable<StatPlayer> statPlayers(string clubId)
        {
            return _appDbManager.getstatplayers(_sqlconn, Convert.ToInt32(clubId));
        }
    }
}
