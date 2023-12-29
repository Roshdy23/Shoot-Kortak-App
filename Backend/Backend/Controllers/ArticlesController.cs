using Back_End.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;

namespace Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ArticlesController : Controller
    {
        private readonly IConfiguration _configuration;
        SqlConnection _connection;
        AppDBmanager _dbmanager;

        public ArticlesController(IConfiguration configuration)
        {
            _configuration = configuration;
            _dbmanager = new AppDBmanager();
            _connection = new SqlConnection(_configuration.GetConnectionString("Conn"));
            _connection.Open();
        }

        [HttpGet]
        [Route("TopLikes")]
        public IEnumerable<Dictionary<Object,Object>> TopLikes()
        {
            return _dbmanager.TopLikes(_connection);
        }
        [HttpGet]
        [Route("Getbydate")]
        public IEnumerable<Article> ArtbyDate(string date)
        {
            return _dbmanager.getAllByDate(_connection, date);
        }
        [HttpGet]
        [Route("Get/{id}")]
        public Article GetArticle(string id) { 
            return _dbmanager.articlebyId(_connection, id);
        
        }

        [HttpGet]
        [Route("GetArtsBySSN/{ssn}")]
        public IEnumerable<Article> GetArticles(string ssn)
        {
            try
            {

            return _dbmanager.artsbyssn(_connection, Convert.ToInt32(ssn));
            }
            catch (Exception ex) {  return _dbmanager.artsbyssn(_connection, Convert.ToInt32(2)); }
        }

        [HttpPost]
        [Route("addArticle")]
        public  async Task<IActionResult> addArticle([FromBody] Article article)
        {
            int temp= _dbmanager.addArticle(_connection, article);   
            if(temp==0) { return BadRequest(); }
            else return Ok();
        }

        [HttpDelete]
        [Route("deleteArticle/{name}")]
        public async Task<IActionResult> deleteArticle(string name)
        {
            int temp = _dbmanager.deleteArticle(_connection, name);
            if (temp == 0) { return BadRequest(); }
            else return Ok();
        }
    }
}
