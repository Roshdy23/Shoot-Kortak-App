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
        SqlConnection _sqlconn;
        AppDBmanager _appDbManager;
        public StoresController(IConfiguration configuration)
        {

            _configuration = configuration;
            _sqlconn = new SqlConnection(_configuration.GetConnectionString("conn"));
            _appDbManager = new AppDBmanager();
            _sqlconn.Open();
         }

        [HttpGet]
        [Route("Get")]
        public IEnumerable<Dictionary<object,object>> getAllStores()
        {
            return _appDbManager.getAllStores(_sqlconn);
        }

        [HttpGet]
        [Route("Get/{stad_id}")]
        public IEnumerable<Dictionary<object, object>> getOneStore(string stad_id)
        {
            return _appDbManager.getOneStore(_sqlconn,Convert.ToInt32(stad_id));
        }
        
        [HttpPost]
        [Route("AddItem/{stad_id}/{itemId}/{qty}")]
        public async Task<IActionResult> addItemToStore(string stad_id,string itemId,string qty)
        {
            return _appDbManager.addItemToStore(_sqlconn, Convert.ToInt32(stad_id), Convert.ToInt32(itemId), Convert.ToInt32(qty)) !=0? Ok() : BadRequest();
        }

    }
}
