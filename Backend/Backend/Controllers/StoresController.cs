using Back_End.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;

namespace Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StoresController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        SqlConnection _sqlconn;
        AppDBmanager _appDbManager;
        public StoresController(IConfiguration configuration)
        {

            _configuration = configuration;
            _sqlconn = new SqlConnection(_configuration.GetConnectionString("conn").ToString());
            _appDbManager = new AppDBmanager();
        }

        [HttpGet]
        [Route("Get")]
        public IEnumerable<Store> getAllStores()
        {
            return _appDbManager.getAllStores(_sqlconn);
        }

        [HttpGet]
        [Route("Get/{stadiumid}")]
        public IEnumerable<Store> getOneStore(string stad_id)
        {
            return _appDbManager.getOneStore(_sqlconn,Convert.ToInt32(stad_id));
        }

       
    }
}
