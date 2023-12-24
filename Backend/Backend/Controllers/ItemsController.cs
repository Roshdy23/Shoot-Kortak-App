using Back_End.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;

namespace Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ItemsController : Controller
    {
        private readonly IConfiguration _configuration;
        SqlConnection _sqlconn;
        AppDBmanager _appDbManager;

       public ItemsController(IConfiguration configuration)
        {
            _configuration = configuration;
            _sqlconn = new SqlConnection(_configuration.GetConnectionString("conn"));
            _sqlconn.Open();
            _appDbManager = new AppDBmanager();
        }

        [HttpGet]
        [Route("Store'sItems")]
        public IEnumerable<Item> getAllItems()
        {
            return _appDbManager.getAllItems(_sqlconn);
        }

        [HttpPost]
        [Route("AddStore'sItem")]
        public IActionResult addStoreItem([FromBody] StoreItem storeItem) 
        {
            return Convert.ToBoolean(_appDbManager.addStoreItem(_sqlconn,storeItem))?Ok():BadRequest();
        }
    }
}
