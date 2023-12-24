using Back_End.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;

namespace Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StoreItemsController : Controller
    {
        private readonly IConfiguration _configuration;
        SqlConnection _sqlconn;
        AppDBmanager _appDbManager;

        public StoreItemsController(IConfiguration configuration)
        {
            _configuration = configuration;
            _sqlconn = new SqlConnection(_configuration.GetConnectionString("conn"));
            _sqlconn.Open();
            _appDbManager = new AppDBmanager();
        }

        
        [HttpPost]
        [Route("AddStoreItem")]
        public IActionResult addStoreItem([FromBody] StoreItem storeItem)
        {
            return Convert.ToBoolean(_appDbManager.addStoreItem(_sqlconn, storeItem)) ? Ok() : BadRequest();
        }

        [HttpGet]
        [Route("AllItemsinStore/{storeID}")]
        public IEnumerable<Dictionary<String, object>> StoreItems(int storeID)
        {
            return _appDbManager.AllStoreItems(_sqlconn, storeID);
        }

        [HttpGet]
        [Route("Getiteminstore")]
        public IEnumerable<Dictionary<object, object>> getItemInStore(string itemid, string stadid)
        {
            return _appDbManager.getItemInStore(_sqlconn, Convert.ToInt32(itemid), Convert.ToInt32(stadid));
        }
    }
}
