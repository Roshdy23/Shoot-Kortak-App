using Back_End.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;

namespace Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class QuestionsController : Controller
    {
        private readonly IConfiguration _configuration;
        SqlConnection _sqlconn;
        AppDBmanager _appDbManager;
        public QuestionsController(IConfiguration configuration)
        {
            _configuration = configuration;
            _sqlconn = new SqlConnection(_configuration.GetConnectionString("conn"));
            _appDbManager = new AppDBmanager();
            _sqlconn.Open();
        }

        [HttpGet]
        [Route("Qiuz'sQuestions/{quizID}")]
        public IEnumerable<Question> getQuizQuestions(int quizID)
        {

            return _appDbManager.getQuizQuestions(_sqlconn,quizID);
        }
    }
}
