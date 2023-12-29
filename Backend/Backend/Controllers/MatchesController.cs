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
            return _appDbManager.getAllMatchesInChampionship(_sqlconn, Convert.ToInt32(id));
        }
        [HttpPost]
        [Route("Add")]
        public async Task<IActionResult> addMatch([FromBody] Match m)
        {
            return (Convert.ToBoolean(_appDbManager.addMatch(_sqlconn, m))) ? Ok() : BadRequest();
        }

        [HttpGet]
        [Route("GetMatch/{id}/{usrid}")]
        public BigMatch getmatch(string id,string usrid)
        {
            return _appDbManager.getMatchData(_sqlconn, Convert.ToInt32(id), Convert.ToInt32(usrid));
        }

        [HttpPost]
        [Route("update/{id}")]

        public async Task<IActionResult> updateMatch([FromBody] Match match, string id)
        {
            return (Convert.ToBoolean(_appDbManager.updateMatch(_sqlconn, match, Convert.ToInt32(id)))) ? Ok() : BadRequest();
        }

        [HttpGet]
        [Route("GetMatchesDate")]
        public IEnumerable<MiniMatch> getMatchesByDate(string date)
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
        [Route("addResultTofinishedMatch/{id}/{res}")]

        public async Task<IActionResult> addResultToFinishedMatch(string id, string res)
        {
            int state = _appDbManager.addResultToFinishedMatch(_sqlconn, Convert.ToInt32(id), res);
            if (state != 0)
            {
                return Ok(Convert.ToInt32(id));
            }
            else
                return BadRequest();
        }
        [HttpGet]
        [Route("getMatchesToday")]

       public IEnumerable<MiniMatch> getMatchesToday()
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
        [HttpGet]

        [Route("GetClubPlayersFromMatId/{matid}/{y}")]
        public IEnumerable<Dictionary<object, object>> getClubsIds(string matid,string y)
        {
            return _appDbManager.getClubsIds(_sqlconn, Convert.ToInt32(matid), Convert.ToInt32(y));
        }
        [HttpGet]
        [Route("GetSecondClubId/{matid}")]
        public IEnumerable<Dictionary<object, object>> getSecondClubId(string matid)
        {
            return _appDbManager.getSecondClubId(_sqlconn, Convert.ToInt32(matid));
        }
        [HttpGet]
        [Route("GetCurrentMatches")]

        public IEnumerable<Dictionary<object, object>> getAllCurrentMatches()
        {
            return _appDbManager.getAllCurrentMatches(_sqlconn);
        }


        [Route("getCountMatches")]
        public int getCountMatch()
        {
            return _appDbManager.getCountMatches(_sqlconn);
        }

    }
}