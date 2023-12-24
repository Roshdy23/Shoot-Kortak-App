using Back_End.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using System.Data;

namespace Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StoresController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        SqlConnection _sqlConnection;
        AppDBmanager _dbmanager;

        public StoresController(IConfiguration configuration)
        {
            _configuration = configuration;
            _sqlConnection = new SqlConnection(_configuration.GetConnectionString("conn"));
            _dbmanager = new AppDBmanager();
            _sqlConnection.Open();
        }

        [HttpGet]
        [Route("Store'sItems/{storeID}")]
        public IEnumerable<Dictionary<String, object>> StoreItems( int storeID) 
        {
            return _dbmanager.AllStoreItems(_sqlConnection, storeID);
        }
    }
}
