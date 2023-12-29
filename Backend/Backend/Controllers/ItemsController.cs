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
        [Route("updateItem/{id}")]
        public async Task<IActionResult> updateItem([FromBody] Item item, string id)
        {
            return (Convert.ToBoolean(_appDbManager.updateItem(_sqlconn, item, Convert.ToInt32(id)))) ? Ok() : BadRequest();
        }
        [HttpPost]
        [Route("AddItem")]
        public IActionResult AddAddSysItemItem( Item item)
        {
            return (Convert.ToBoolean(_appDbManager.AddSysItem(_sqlconn, item))) ? Ok() : BadRequest();
        }
    }
}
