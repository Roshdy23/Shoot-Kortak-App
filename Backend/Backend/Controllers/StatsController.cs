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
        [Route("TopSaves")]
        public IEnumerable<Dictionary<Object,Object>> TopSaves()
        {
            return _appDbManager.TopSaves(_sqlconn);
        }
        [HttpGet]
        [Route("TopAssists")]
        public IEnumerable<Dictionary<Object, Object>> TopAssists()
        {
            return _appDbManager.TopAssists(_sqlconn);
        }
        [HttpGet]
        [Route("TopGoals")]
        public IEnumerable<Dictionary<Object, Object>> TopGoals()
        {
            return _appDbManager.TopGoals(_sqlconn);
        }
        [HttpGet]
        [Route("TopTackles")]
        public IEnumerable<Dictionary<Object, Object>> TopTackles()
        {
            return _appDbManager.TopTackles(_sqlconn);
        }
        [HttpGet]
        [Route("TopCleanSheets")]
        public IEnumerable<Dictionary<Object, Object>> TopCleanSheets()
        {
            return _appDbManager.TopCleanSheets(_sqlconn);
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
    }
}
