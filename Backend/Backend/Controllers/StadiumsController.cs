using Back_End.Models;
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
            _sqlconn = new SqlConnection(_configuration.GetConnectionString("conn"));
            _sqlconn.Open();
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
            return _appDbManager.getAllStadiumsInLocation(_sqlconn, loc);
        }
        [HttpGet]
        [Route("GetStad/{id}")]
        public IEnumerable<Stadium> getStadium(string id)
        {
            return _appDbManager.getStadium(_sqlconn, Convert.ToInt32(id));
        }

        [HttpPut()]
        [Route("UpdateStadium/{StadiumId}")]
        public IActionResult updateStadiums(int StadiumId, [FromBody] Stadium stadium)
        {
            return Convert.ToBoolean(_appDbManager.updateStadium(_sqlconn, StadiumId, stadium)) ? Ok() : BadRequest();
        }

        [HttpPost]
        [Route("AddStadium")]
        public IActionResult addStadium([FromBody] Stadium stadium)
        {
            return Convert.ToBoolean(_appDbManager.addStadium(_sqlconn, stadium)) ? Ok() : BadRequest();
        }
    }
}