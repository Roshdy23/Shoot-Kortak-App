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

        public IEnumerable<Player> addPlayer(int clubID, [FromBody] Player player)
        {
            return _appDbManager.addPlayer(_sqlConnection, clubID, player);
        }

        [HttpDelete]
        [Route("DeletePlayer/{playerID}")]
        public IActionResult deletePlayer(int playerID)
        {
            return Convert.ToBoolean(_appDbManager.deletePlayer(_sqlConnection, playerID)) ? Ok() : BadRequest();
        }
    }
}