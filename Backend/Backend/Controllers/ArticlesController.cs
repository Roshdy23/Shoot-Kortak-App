﻿using Back_End.Models;
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
        [Route("GetArticles/{journalistID}")]
        public IActionResult getArticles(int journalistID)
        {
            IEnumerable<Article> list = new List<Article>();
            list = _dbmanager.getArticles(_connection, journalistID);
            if(list.Count() > 0) 
            {
                return Ok(list);
            }
            else
                return BadRequest();
        }

        [HttpPost]
        [Route("AddLikeDislike/{fanSSN}/{ArticleID}")]
        public bool addLike(int fanSSN , int ArticleID)
        {
            return _dbmanager.addLike(_connection, fanSSN , ArticleID);
        }
    }
}
