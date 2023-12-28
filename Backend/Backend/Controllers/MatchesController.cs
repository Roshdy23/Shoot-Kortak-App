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
        public IEnumerable<Match> getAllMatches()
        {
            return _appDbManager.getAllMatches(_sqlconn);
        }
        [HttpGet]
        [Route("inChampionship/{id}")]
        public IEnumerable<Match> getAllMatchesInChampionship(string id)
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
        [Route("GetMatch/{id}")]
        public IEnumerable<Match> getmatch(string id)
        {
            return _appDbManager.getMatchData(_sqlconn, Convert.ToInt32(id));
        }

        [HttpPost]
        [Route("update/{id}")]

        public async Task<IActionResult> updateMatch([FromBody] Match match, string id)
        {
            return (Convert.ToBoolean(_appDbManager.updateMatch(_sqlconn, match, Convert.ToInt32(id)))) ? Ok() : BadRequest();
        }

        [HttpGet]
        [Route("GetMatchesDate")]
        public IEnumerable<Match> getMatchesByDate(string date)
        {
            return _appDbManager.getMatchesByDate(_sqlconn, date);
        }

        [HttpGet]
        [Route("GetFinishedMatches")]

        public IEnumerable<Match> getAllFinishedMatches()
        {
            return _appDbManager.getAllFinishedMatches(_sqlconn);
        }

        [HttpPost]
        [Route("addResultTofinishedMatch/{id}")]

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

    }
}