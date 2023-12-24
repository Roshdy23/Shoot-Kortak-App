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
        [HttpPut]
        [Route("UpdatePlayer/{playerID}")]
        public IActionResult updatePlayer(int playerID, [FromBody] Player player)
        {
            return Convert.ToBoolean(_appDbManager.updatePlayer(_sqlConnection, playerID, player)) ? Ok() : BadRequest(); 
        }

        [HttpPost]
        [Route("Add")]
        public async Task<IActionResult> addPlayer([FromBody] Player p)
        {
            return (Convert.ToBoolean(_appDbManager.addPlayer(_sqlConnection, p))) ? Ok() : BadRequest();
        }
    }
}
