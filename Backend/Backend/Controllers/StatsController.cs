using Back_End.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;

namespace Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StatsController : Controller
    {
        private readonly IConfiguration _configuration;
        SqlConnection _sqlconn;
        AppDBmanager _appDbManager;
        public StatsController(IConfiguration configuration)
        {
            _configuration = configuration;
            _sqlconn = new SqlConnection(_configuration.GetConnectionString("conn"));
            _appDbManager = new AppDBmanager();
            _sqlconn.Open();
        }


        [HttpGet]
        [Route("TopSaves")]
        public IEnumerable<Dictionary<Object,Object>> TopSaves()
        {
            return _appDbManager.TopSaves(_sqlconn);
        }
        [HttpGet]
        [Route("TopAssists")]
        public IEnumerable<Dictionary<Object, Object>> TopAssists()
        {
            return _appDbManager.TopAssists(_sqlconn);
        }
        [HttpGet]
        [Route("TopGoals")]
        public IEnumerable<Dictionary<Object, Object>> TopGoals()
        {
            return _appDbManager.TopGoals(_sqlconn);
        }
        [HttpGet]
        [Route("TopTackles")]
        public IEnumerable<Dictionary<Object, Object>> TopTackles()
        {
            return _appDbManager.TopTackles(_sqlconn);
        }
        [HttpGet]
        [Route("TopCleanSheets")]
        public IEnumerable<Dictionary<Object, Object>> TopCleanSheets()
        {
            return _appDbManager.TopCleanSheets(_sqlconn);
        }
    }
}
