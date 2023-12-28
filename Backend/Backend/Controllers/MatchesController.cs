using Back_End.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;

namespace Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MatchesController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        SqlConnection _sqlconn;
        AppDBmanager _appDbManager;
        public MatchesController(IConfiguration configuration)
        {
            _configuration = configuration;
            _sqlconn = new SqlConnection(_configuration.GetConnectionString("conn"));
            _appDbManager = new AppDBmanager();
            _sqlconn.Open();
        }
        [HttpGet]
        [Route("Get")]
        public IEnumerable<Dictionary<object,object>> getAllMatches()
        {
            return _appDbManager.getAllMatches(_sqlconn);
        }
        [HttpGet]
        [Route("inChampionship/{id}")]
        public IEnumerable<Dictionary<object,object>> getAllMatchesInChampionship(string id)
        {
            return _appDbManager.getAllMatchesInChampionship(_sqlconn,Convert.ToInt32( id));
        }
        [HttpPost]
        [Route("Add")]
        public async Task<IActionResult> addMatch([FromBody] Match m)
        {
            return (Convert.ToBoolean(_appDbManager.addMatch(_sqlconn,m)))?  Ok():BadRequest();
        }

        [HttpGet]
        [Route("GetMatch/{id}")]
        public IEnumerable<Dictionary<object,object>> getmatch(string id)
        {
            return _appDbManager.getMatchData(_sqlconn, Convert.ToInt32(id));
        }

        [HttpPost]
        [Route("update/{id}")]

        public async Task<IActionResult> updateMatch([FromBody]Match match,string id)
        {
            return (Convert.ToBoolean(_appDbManager.updateMatch(_sqlconn, match, Convert.ToInt32(id))))?Ok():BadRequest();
        }

        [HttpGet]
        [Route("GetMatchesDate")]
        public IEnumerable<Dictionary<object,object>> getMatchesByDate(string date)
        {
            return _appDbManager.getMatchesByDate(_sqlconn, date);
        }

        [HttpGet]
        [Route("GetFinishedMatches")]

        public IEnumerable<Dictionary<object,object>> getAllFinishedMatches()
        {
            return _appDbManager.getAllFinishedMatches(_sqlconn);
        }

        [HttpPost]
        [Route("addResultTofinishedMatch/{id}")]

        public async Task<IActionResult> addResultToFinishedMatch(string id,string res)
        {
            int state = _appDbManager.addResultToFinishedMatch(_sqlconn, Convert.ToInt32(id), res);
            if (state !=0)
            {
                return Ok(Convert.ToInt32(id));
            }
            else
                return BadRequest();
        }
        [HttpGet]
        [Route("getMatchesToday")]

       public IEnumerable<Dictionary<object,object>> getMatchesToday()
        {
            return _appDbManager.getMatchesToday(_sqlconn);
        }

        [HttpGet]
        [Route("getMatchesinDate/{date1}")]

        public IEnumerable<Dictionary<object, object>> getMatchesInDate(string date)
        {
            return _appDbManager.getMatchesInDate(_sqlconn,Convert.ToString(date));
        }

        [HttpGet]
        [Route("getFinishedMatchinChmap/{id}")]
        public IEnumerable<Dictionary<object,object>> getFinishedMatchInChamp(string id)
        {
            return _appDbManager.getFinishedMatchesInChamp(_sqlconn, Convert.ToInt32(id));
        }
        
    }
}
