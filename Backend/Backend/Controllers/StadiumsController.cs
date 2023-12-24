﻿using Back_End.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;

namespace Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StadiumsController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        SqlConnection _sqlconn;
        AppDBmanager _appDbManager;
        public StadiumsController(IConfiguration configuration)
        {
            _configuration = configuration;
            _sqlconn = new SqlConnection(_configuration.GetConnectionString("conn").ToString());
            _appDbManager = new AppDBmanager();
        }
        [HttpGet]
        [Route("Get")]
        public IEnumerable<Stadium> getAllStadiums()
        {
            return _appDbManager.getAllStadiums(_sqlconn);
        }

        [HttpGet]
        [Route("Get/{location}")]
        public IEnumerable<Stadium> getAllStadiumsInLocation(string loc)
        {
            return _appDbManager.getAllStadiumsInLocation(_sqlconn,loc);
        }
        [HttpGet]
        [Route("GetStadium")]
        public IEnumerable<Stadium> getStadium(int  id)
        {
            return _appDbManager.getStadium(_sqlconn, Convert.ToInt32(id));
        }
    }
}
