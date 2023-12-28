﻿using Back_End.Models;
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
        [Route("AddPlayerh/{clubID}")]
        public Player addPlayer(int clubID, Player player)
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
