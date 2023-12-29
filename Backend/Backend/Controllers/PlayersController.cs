using Back_End.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;

namespace Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PlayersController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        SqlConnection _sqlConnection;
        AppDBmanager _appDbManager;
        public PlayersController(IConfiguration configuration)
        {
            _configuration = configuration;
            _sqlConnection = new SqlConnection(_configuration.GetConnectionString("conn"));
            _appDbManager = new AppDBmanager();
            _sqlConnection.Open();
        }

        [HttpGet]
        [Route("GetPlayer/{playerId}")]
        public Player GetPlayer(string playerId)
        {
            return _appDbManager.getPlayer(_sqlConnection, Convert.ToInt32(playerId));
        }

        [HttpPost]
        [Route("RatePlayer/{matchId}/{playerId}/{userId}")]
        public async Task<IActionResult> RatePlayer(string matchId,string playerId,string userId,[FromBody] string rate)
        {
            try
            {
            _appDbManager.RatePlayer(_sqlConnection, Convert.ToInt32(matchId), Convert.ToInt32(userId), Convert.ToInt32(playerId), Convert.ToDouble(rate));
                return Ok("success");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost]
        [Route("AddPlayerh/{clubID}")]

        public IActionResult addPlayer(int clubID, [FromBody] Player player)
       {
            IEnumerable<Player> result = new List<Player>();
            result = _appDbManager.addPlayer(_sqlConnection, clubID, player);
            if (result.Count() == 0)
                return BadRequest();
            else
                return Ok(result);
        }

        [HttpDelete]
        [Route("DeletePlayer/{playerID}")]
        public IActionResult deletePlayer(int playerID)
        {
            return Convert.ToBoolean(_appDbManager.deletePlayer(_sqlConnection, playerID)) ? Ok() : BadRequest();
        }

        [HttpGet]
        [Route("getCountPlayers")]
        public int getCountPlayers()
        {
            return _appDbManager.getCountPlayers(_sqlConnection);
        }
    }
}