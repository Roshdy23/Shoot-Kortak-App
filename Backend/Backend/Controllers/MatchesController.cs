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
            _sqlconn = new SqlConnection(_configuration.GetConnectionString("conn").ToString());
            _appDbManager = new AppDBmanager();
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
        public IEnumerable<Match> getmatch(string id)
        {
            return _appDbManager.get_match_data(_sqlconn, Convert.ToInt32(id));
        }

        [HttpPost]
        [Route("update/{id}")]
        public async Task<IActionResult> update_match([FromBody]Match match)
        {
            return (Convert.ToBoolean(_appDbManager.update_match(_sqlconn, match)))?Ok():BadRequest();

        }

    }
}
