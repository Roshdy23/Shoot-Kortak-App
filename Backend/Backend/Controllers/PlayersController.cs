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
            return Convert.ToBoolean(_appDbManager.deletePlayer(_sqlConnection, playerID))?Ok():BadRequest();
        }
    }
}
