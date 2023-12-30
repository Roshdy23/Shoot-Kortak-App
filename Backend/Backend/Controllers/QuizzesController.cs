using Back_End.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;

namespace Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]

    public class QuizzesController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        SqlConnection _connection;
        AppDBmanager _dbmanager;

        public QuizzesController(IConfiguration configuration)
        {
            _configuration = configuration;
            _dbmanager = new AppDBmanager();
            _connection = new SqlConnection(_configuration.GetConnectionString("conn"));
            _connection.Open();
        }

        [HttpGet]
        [Route("AllQuizzes")]
        public IEnumerable<OutQuiz> quizzes()
        {
            return _dbmanager.AllQuizzes(_connection);
        }

        [HttpGet]
        [Route("GetJournalist/{ssn}")]

        public IEnumerable<Quiz> getAllQuizzesOfJour(string ssn)
        {
            return _dbmanager.getAllQuizzesOfJour(_connection, Convert.ToInt32(ssn));
        }
        [HttpGet]
        [Route("GetQuiz/{id}")]
        public AnsweringQuiz getQuizById(string id)
        {
            return _dbmanager.getQuizById(_connection, Convert.ToInt32(id));
        }


        [HttpGet]
        [Route("AcceptOrRefuse/{quizid}/{state}")]
        public async Task<IActionResult> setQuizState(string quizid, string state)
        {
            int temp = _dbmanager.setQuizState(_connection, Convert.ToInt32(quizid), Convert.ToInt32(state));
            if (temp != 0)
                return Ok();
            return BadRequest();
        }

        [HttpPost]
        [Route("AnswerQuiz/{FanSSN} /{questionId}")]
        public IActionResult AnswerQuestion(int FanSSN, int questionId, [FromBody] string answer)
        {
            return _dbmanager.AnswerQuiz(_connection, FanSSN, questionId, answer) ? Ok() : BadRequest();
        }

        [HttpGet]
        [Route("getPendingQuizzes")]
        public IEnumerable<Dictionary<object, object>> getAllPendingQuizzes()
        {
            return _dbmanager.getAllPendingQuizzes(_connection);    
        }

        [HttpGet]
        [Route("getPendingQuizzesOfJour/{id}")]

        public IEnumerable<Dictionary<object, object>> getAllPendingQuizzesOfJour(string id)
        {
            return _dbmanager.getAllPendingQuizzesOfJour(_connection,Convert.ToInt32(id));
        }
        [HttpPost]
        [Route("CreateQuiz")]
        public async Task<IActionResult> createQuiz([FromBody] Quiz q)
        {
            int temp=_dbmanager.createQuiz(_connection, q);
            if(temp!=0)return Ok(); 
            else return BadRequest();   
        }

        [HttpDelete]
        [Route("deleteQuiz/{id}")]
        public async Task<IActionResult> deleteQuiz(string id)
        {
            int temp= (_dbmanager.deleteQuiz(_connection,Convert.ToInt32(id)));
            if (temp == 0) return BadRequest();
            else return Ok();
        }

        [HttpPost]
        [Route("addAnswers")]
        public async Task<IActionResult> addAnswers(string quizid,  List<string> answers,string ssn)
        {
            int temp = (_dbmanager.addAnswers(_connection, answers, Convert.ToInt32(quizid), Convert.ToInt32(ssn)));

            if(temp==-1)return BadRequest(); 
            else return Ok(temp);
        }
        [HttpGet]
        [Route("getCountQuizzes")]
        public int getCountQuizzes()
        {
            return _dbmanager.getCountQuizzes(_connection);
        }
    }
}