﻿using Back_End.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;

namespace Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ChampionshipsController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        SqlConnection _sqlconn;
        AppDBmanager _appDbManager;
        public ChampionshipsController(IConfiguration configuration)
        {
            _configuration = configuration;
            _sqlconn = new SqlConnection(_configuration.GetConnectionString("conn").ToString());
            _appDbManager = new AppDBmanager();
        }
        [HttpGet]
        [Route("Get")]
        public IEnumerable<Championship> getAllChampionships()
        {
            return _appDbManager.getAllChampionships(_sqlconn);
        } 
        [HttpPost]
        [Route("Add")]
        public async Task<IActionResult> add_champ([FromBody ]Championship champ)
        {
            return (Convert.ToBoolean(_appDbManager.add_champ(_sqlconn, champ))) ? Ok() : BadRequest();
        }
        [HttpPost]
        [Route("update/{id}")]
        public async Task<IActionResult> update_champ(Championship champ)
        {
            return (Convert.ToBoolean(_appDbManager.update_champ(_sqlconn, champ))) ? Ok() : BadRequest();
        }
        [HttpGet]
        [Route("Getchamp")]
        public IEnumerable<Championship> getChampionship(string id)
        {
            return _appDbManager.getChamp(_sqlconn,Convert.ToInt32(id)); 
        }

        
    }
}
