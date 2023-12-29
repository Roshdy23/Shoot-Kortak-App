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
    }
}