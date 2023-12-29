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
        [Route("Getiteminstore/{itemid}/{stadid}")]
        public IEnumerable<Dictionary<object, object>> getItemInStore(string itemid, string stadid)
        {
            return _appDbManager.getItemInStore(_sqlconn, Convert.ToInt32(itemid), Convert.ToInt32(stadid));
        }
        [HttpGet]
        [Route("GetItemsNotInStore/{stadid}")]
        public IEnumerable<Dictionary<object, object>> getItemsNotInStore(string stadid)
        {
            return _appDbManager.getItemsNotInStore(_sqlconn, Convert.ToInt32(stadid));
        }
        [HttpPut]
        [Route("UpdateItemQty/{stadid}/{itemid}/{qty}")]
        public IActionResult updateItemQty(string itemid, string stadid, string qty)
        {
            return _appDbManager.updateItemQty(_sqlconn, Convert.ToInt32(itemid), Convert.ToInt32(stadid), Convert.ToInt32(qty)) !=0?Ok():BadRequest();
        }
    }
}
