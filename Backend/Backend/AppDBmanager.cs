using Back_End.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using System;
using System.Data;
using static System.Reflection.Metadata.BlobBuilder;

namespace Backend
{
    public class AppDBmanager
    {
        public IEnumerable<Match> getAllMatches(SqlConnection conn)
        {
            string query = @"select * from matches";
            SqlDataAdapter sqlDataAdapter = new SqlDataAdapter(query, conn);
            DataTable dt = new DataTable();
            sqlDataAdapter.Fill(dt);           
            List<Match> list = new List<Match>();
            for (int i = 0; i < dt.Rows.Count; i++)
            {
                Match match = new Match();
                match.Id = Convert.ToInt32(dt.Rows[i]["Id"]);
                match.MatchDate = Convert.ToString(dt.Rows[i]["MatchDate"]);
                match.Weekno = Convert.ToInt16(dt.Rows[i]["Weekno"]);
                match.Club1 = Convert.ToString(dt.Rows[i]["Club1"]);
                match.Club2 = Convert.ToString(dt.Rows[i]["Club2"]);
                match.Championshipid = Convert.ToInt32(dt.Rows[i]["Championshipid"]);
                match.StadiumId = Convert.ToInt32(dt.Rows[i]["Stadium_Id"]);
                list.Add(match);
            }

            return list;
        }
        public IEnumerable<Match> getAllMatchesInChampionship(SqlConnection conn, int Id)
        {
            string query = @"select * from matches where Championshipid=" + Id;          
            SqlDataAdapter sqlDataAdapter = new SqlDataAdapter(query, conn);
            DataTable dt = new DataTable();
            sqlDataAdapter.Fill(dt);            
            List<Match> list = new List<Match>();
            for (int i = 0; i < dt.Rows.Count; i++)
            {
                Match match = new Match();
                match.Id = Convert.ToInt32(dt.Rows[i]["Id"]);
                match.MatchDate = Convert.ToString(dt.Rows[i]["MatchDate"]);
                match.Weekno = Convert.ToInt16(dt.Rows[i]["Weekno"]);
                match.Club1 = Convert.ToString(dt.Rows[i]["Club1"]);
                match.Club2 = Convert.ToString(dt.Rows[i]["Club2"]);
                match.Championshipid = Convert.ToInt32(dt.Rows[i]["Championshipid"]);
                match.StadiumId = Convert.ToInt32(dt.Rows[i]["StadiumId"]);
                list.Add(match);
            }
            return list;
        }
        public IEnumerable<Championship> getAllChampionships(SqlConnection conn)
        {
            string query = @"select * from championship";
            SqlDataAdapter sqlDataAdapter = new SqlDataAdapter(query, conn);
            DataTable dt = new DataTable();
            sqlDataAdapter.Fill(dt);
            List<Championship> list = new List<Championship>();
            for (int i = 0; i < dt.Rows.Count; i++)
            {
                Championship champ = new Championship();
                champ.Id = Convert.ToInt32(dt.Rows[i]["Id"]);
                champ.StartingAt = Convert.ToDateTime(dt.Rows[i]["StartingAt"]);
                champ.EndingAt = Convert.ToDateTime(dt.Rows[i]["EndingAt"]);
                champ.Name = Convert.ToString(dt.Rows[i]["Name"]);
                champ.NoMatches = Convert.ToInt32(dt.Rows[i]["no_matches"]);
                list.Add(champ);
            }
            return list;
        }
        public int addMatch(SqlConnection conn, Match m)
        {

            string date = m.MatchDate.Substring(6) + '-' + m.MatchDate.Substring(0,2) + '-' + m.MatchDate.Substring(3,2);
            string query = $@"insert into matches(MatchDate,Weekno,Club1,Club2,Championshipid,StadiumId)
                              values ('{date}',{m.Weekno},'{m.Club1}','{m.Club2}',{m.Championshipid},{m.StadiumId})";
            int res=-1;
            
            SqlCommand sqlCommand = new SqlCommand(query, conn);
            try
            {
                sqlCommand.ExecuteNonQuery();
                res = 200;
            }
            catch (Exception ex)
            {
                res = 0;
            }           
            return res;
        }
        public IEnumerable<Club> getAllClubsInChampionship(SqlConnection conn, int champ_id)
        {
            string query = $@"select * from clubs
                                where clubs.Id in(
                                select c.Id from clubs c,Club_cup cl
                                where cl.championship_id={champ_id} and cl.club_id=c.Id

                                union 

                                select c.Id from clubs c,Club_league cl
                                where cl.championship_id={champ_id} and cl.club_id=c.Id
                                )";           
            SqlDataAdapter sqlDataAdapter = new SqlDataAdapter(query, conn);
            DataTable dt = new DataTable();
            sqlDataAdapter.Fill(dt);           
            List<Club> list = new List<Club>();
            for (int i = 0; i < dt.Rows.Count; i++)
            {
                Club club = new Club();
                club.Id = Convert.ToInt32(dt.Rows[i]["Id"]);
                club.CreatedAt = Convert.ToInt32(dt.Rows[i]["Created_At"]);
                club.Name = Convert.ToString(dt.Rows[i]["Name"]);
                club.Logo = Convert.ToString(dt.Rows[i]["Logo"]);
                club.StadiumHome = Convert.ToInt32(dt.Rows[i]["Stadium_Home"]);
                list.Add(club);
            }
            return list;
        }
        public IEnumerable<Stadium> getAllStadiums(SqlConnection conn)
        {
            string query = $@"select * from Stadium";            
            SqlDataAdapter sqlDataAdapter = new SqlDataAdapter(query, conn);
            DataTable dt = new DataTable();
            sqlDataAdapter.Fill(dt);            
            List<Stadium> list = new List<Stadium>();
            for (int i = 0; i < dt.Rows.Count; i++)
            {
                Stadium stad = new Stadium();
                stad.Id = Convert.ToInt32(dt.Rows[i]["Id"]);
                stad.CreatedAt = Convert.ToInt32(dt.Rows[i]["CreatedAt"]);
                stad.Name = Convert.ToString(dt.Rows[i]["Name"]);
                stad.Image = Convert.ToString(dt.Rows[i]["Image"]);
                stad.Width = Convert.ToInt32(dt.Rows[i]["Width"]);
                stad.Length = Convert.ToInt32(dt.Rows[i]["Length"]);
                stad.Location = Convert.ToString(dt.Rows[i]["Location"]);
                stad.Capacity = Convert.ToInt32(dt.Rows[i]["Capacity"]);
                list.Add(stad);
            }
            return list;
        }

        public IEnumerable<Club> addClub(SqlConnection conn, Club club)
        {
            string query = "insert into clubs (Created_At,name,logo,stadium_home) values(" + club.CreatedAt + ",'" + club.Name + "','" + club.Logo + "',"+ club.StadiumHome + ")";            
            SqlCommand cmd = new SqlCommand(query, conn);
            cmd.ExecuteNonQuery();            
            List<Club> list = new List<Club>();
            list.Add(club);
            return list;
        }

        public IEnumerable<Match> getMatchData(SqlConnection conn, int id)
        {
            List<Match> list = new List<Match>();
            string query = "select * from matches where id = " + id + "";           
            SqlDataAdapter sqlDataAdapter = new SqlDataAdapter(query, conn);
            DataTable dt = new DataTable();
            sqlDataAdapter.Fill(dt);            
            for (int i = 0; i < dt.Rows.Count; i++)
            {
                Match match = new Match();
                match.Id = Convert.ToInt16(dt.Rows[i]["id"]);
                match.Club1 = Convert.ToString(dt.Rows[i]["club1"]);
                match.Club2 = Convert.ToString(dt.Rows[i]["club2"]);
                match.Championshipid = Convert.ToInt16(dt.Rows[i]["championshipid"]);
                list.Add(match);
            }
            return list;
        }

        public int  updateMatch(SqlConnection conn, Match match)
        {
            string query = "update matches set matchDate='" + match.MatchDate + "', weekno=" + match.Weekno+ ",club1='" + match.Club1 + "',club2='" + match.Club2 + "',championshipid=" + match.Championshipid + " stadium_id = "+match.StadiumId+" where id =" + match.Id + "";
            int res = -1;
         
            SqlCommand sqlCommand = new SqlCommand(query, conn);
            try
            {
                sqlCommand.ExecuteNonQuery();
                res = 200;
            }
            catch (Exception ex)
            {
                res = 0;
            }           
            return res;
        }


        public int  updateClub(SqlConnection conn, Club clubs)
        {
            string query = $@"update clubs set Created_At='" + clubs.CreatedAt + "', logo='" + clubs.Logo + "',name='" +
                clubs.Name + "' stadium_home= "+clubs.StadiumHome+" where id =" + clubs.Id + "";
            int res = -1;            
            SqlCommand sqlCommand = new SqlCommand(query, conn);
            try
            {
                sqlCommand.ExecuteNonQuery();
                res = 200;
            }
            catch (Exception ex)
            {
                res = 0;
            }            
            return res;
        }

        public int  addChamp(SqlConnection conn, Championship champ)
        {
            string query = $@"insert into championship (name,logo,startingAt,endingAt,no_matches) values
                ('" + champ.Name + "','" + champ.Logo + "','" + champ.StartingAt + "','" + champ.EndingAt + "'," + champ.NoMatches+ ")";
            int res = -1;            
            SqlCommand sqlCommand = new SqlCommand(query, conn);
            try
            {
                sqlCommand.ExecuteNonQuery();
                res = 200;
            }
            catch (Exception ex)
            {
                res = 0;
            }           
            return res;
        }

        public int updateChamp(SqlConnection conn, Championship champ)
        {
            string query = @$"update championship set  name =  '{champ.Name}' , logo ='{champ.Logo}', startingAt = '{champ.StartingAt}' ,
                      endingAt = '{champ.EndingAt}', no_matches = {champ.NoMatches} where id = {champ.Id};";

            int res = -1;            
            SqlCommand sqlCommand = new SqlCommand(query, conn);
            try
            {
                sqlCommand.ExecuteNonQuery();
                res = 200;
            }
            catch (Exception ex)
            {
                res = 0;
            }            
            return res;
        }

        public int updateStadium(SqlConnection conn,int StadiumId ,Stadium stadium)
        {
            string query = $"update Stadium  " +
                $"set Name = ' {stadium.Name}',width = {stadium.Width},length = {stadium.Length},Capacity = {stadium.Capacity},image = '{stadium.Image}' ," +
                $"Location = '{stadium.Location}',Created_at = {stadium.CreatedAt}" +
                $"Where id  = {StadiumId} ";
            
            try
            {
                SqlCommand sqlCommand = new SqlCommand(query,conn);
                sqlCommand.ExecuteNonQuery();
                return 1;
            }
            catch (Exception ex)
            {
                return 0;
            }
            
        }

        public IEnumerable<Club> getAllClubs(SqlConnection connection)
        {
            string query = $@"Select * from clubs";
            DataTable dt = new DataTable();
            SqlCommand command = new SqlCommand(query, connection);
            List<Club> clubs = new ();
            SqlDataAdapter sqlDataAdapter = new SqlDataAdapter(query, connection);
            sqlDataAdapter.Fill(dt);
            for (int i = 0; i < dt.Rows.Count; i++)
            {
                Club club = new Club();
                club.Id = Convert.ToInt32(dt.Rows[i]["ID"]);
                club.Name = dt.Rows[i]["Name"].ToString()!;
                club.Logo = dt.Rows[i]["Logo"].ToString();
                club.StadiumHome = Convert.ToInt32(dt.Rows[i]["Stadium_home"]);
                club.CreatedAt = Convert.ToInt32(dt.Rows[i]["Created_At"]);
                clubs.Add(club);
            }
            return clubs;
        }

        public int addStadium(SqlConnection sqlConnection,Stadium stadium)
        {
            string query = $@"INSERT INTO STADIUM (NAME";
            string values = $"'{stadium.Name}'";
            if(stadium.Width != null)
            {
                query += ",WIDTH";
                values += $",{stadium.Width}";
            }
            if (stadium.Length != null)
            {
                query += ",LENGTH";
                values += $",{stadium.Length}";
            }
            if (stadium.Capacity != null)
            {
                query += ",CAPACITY";
                values += $",{stadium.Capacity}";
            }
            if (stadium.Image != null)
            {
                query += ",IMAGE";
                values += $",'{stadium.Image}'";
            }
            if (stadium.Location != null)
            {
                query += ",LOCATION";
                values += $",'{stadium.Location}'";
            }
            if (stadium.CreatedAt != null)
            {
                query += ",CREATED_AT";
                values += $",{stadium.CreatedAt}";
            }
            query += ") VALUES (" + values + ");";
            SqlCommand sqlCommand = new SqlCommand(query, sqlConnection);
            try
            {
                sqlCommand.ExecuteNonQuery();
                return 1;
            }
            catch(Exception ex) 
            {
                return 0;
            }
        }

        public int updateCoach(SqlConnection sqlConnection,int clubID,string name)
        {
            string fName = "",lName="";
            bool first = true;
            for(int i=0;i<name.Length;i++)
            {
                if (name[i] != ' ')
                {
                    if (first)
                        fName += name[i];
                    else
                        lName += name[i];
                }
                else
                {
                    if (!first)
                    {
                        break;
                    }
                    first = false;
                }
            }
            string query = $@"SELECT ID FROM MATCH_STAFF WHERE FNAME = '{fName}' AND LNAME='{lName}'";
            SqlCommand sqlCommand = new SqlCommand(query, sqlConnection);
            int? found = Convert.ToInt16(sqlCommand.ExecuteScalar());
            if(found !=null) 
            {
                query = @$"Update Coaches set club_id = {clubID} where id = {found}";
                sqlCommand.CommandText= query;
                try
                {
                    sqlCommand.ExecuteNonQuery();
                    return 1;
                }
                catch(Exception ex)
                {
                    return 0;
                }
               
            }
            return 0;
        }

        public int updatePlayer(SqlConnection sqlConnection,int playerID, Player player)
        {
            string query = $@"UPDATE MATCH_STAFF
                            SET FNAME = '{player.Fname}',LNAME = '{player.Lname}',Photo = '{player.Photo}',Nationality = '{player.Nationality}'
                            where id = {playerID};";
            
            SqlCommand sqlCommand = new SqlCommand(query, sqlConnection);
           
            try
            {
                sqlCommand.ExecuteNonQuery();
            }
            catch(Exception ex)
            {
                return 0;
            }
            query = $@"UPDATE PLAYERS 
                        SET Height = {player.Height},foot = '{player.Foot}',MARKET_VALUE = {player.MarketValue}
                        WHERE ID = {playerID}";
            sqlCommand.CommandText = query;
            try
            {
                sqlCommand.ExecuteNonQuery();
                return 1;
            }
            catch (Exception ex)
            {
                return 0;
            }
        }

        public IEnumerable<Item> getAllItems(SqlConnection sqlConnection)
        {
            string query = $@"SELECT * FROM ITEMS ; ";
            SqlDataAdapter adapter = new SqlDataAdapter(query,sqlConnection);
            DataTable dt = new();
            adapter.Fill(dt);
            List<Item> items = new();
            for(int i=0;i<dt.Rows.Count;i++) 
            {
                Item item = new();
                item.Id = Convert.ToInt32(dt.Rows[i]["ID"]);
                item.ItemName = dt.Rows[i]["Item_Name"].ToString();
                item.ItemPrice = Convert.ToInt32(dt.Rows[i]["item_price"]);
                item.ItemImage = dt.Rows[i]["item_image"].ToString();
                items.Add(item);
            }
            return items;
        }

       /* public int updateItem(SqlConnection sqlConnection , int storeID,int quantity, Item item)
        {
            string query = $@"update ITEMS SET 
                set  ";

        }*/

        public int addStoreItem(SqlConnection sqlConnection,StoreItem storeItem)
        {
            string query = $@"Insert into Store_items Values({storeItem.StadiumId},{storeItem.ItemId},{storeItem.Qty})";
            SqlCommand sqlCommand = new SqlCommand(query, sqlConnection);
            try
            {
                sqlCommand.ExecuteNonQuery();
                return 1;
            }
            catch (Exception ex)
            {
                return 0;
            }
        }

        public IEnumerable<Question> getQuizQuestions(SqlConnection sqlConnection,int quizID)
        {
            string query = $@"SELECT * FROM QUESTIONS WHERE QUIZ_ID = {quizID}";
            SqlDataAdapter adapter = new SqlDataAdapter(query,sqlConnection);
            DataTable dt = new();
            adapter.Fill(dt);
            List<Question> questions = new List<Question>();
            Question question = new Question();
            question.Id = Convert.ToInt32(dt.Rows[0]["ID"]);
            question.QuestionContent =dt.Rows[0]["Question_content"].ToString();
            question.Answer1 = dt.Rows[0]["answer1"].ToString();
            question.Answer2 = dt.Rows[0]["answer2"].ToString();
            question.Answer3 = dt.Rows[0]["answer3"].ToString();
            question.Answer4 = dt.Rows[0]["answer4"].ToString();
            question.TheCorrectAnswer = dt.Rows[0]["the_correct_answer"].ToString();
            question.QuizId = Convert.ToInt32(dt.Rows[0]["quiz_id"]);
            questions.Add(question);
            return questions;
        }

        public IEnumerable<Dictionary<Object,Object>> TopGoals(SqlConnection sqlConnection)
        {
            string query = $@"SELECT * FROM STATS ORDER BY GOALS DESC ";
            SqlDataAdapter adapter = new SqlDataAdapter(query,sqlConnection);
            DataTable dt = new();
            adapter.Fill(dt);
            List<Dictionary<Object,Object>> stats = new List<Dictionary<Object, Object>>();
            for(int i = 0;i<10&&i<dt.Rows.Count;i++)
            {
                query = $@"SELECT FNAME + ' ' + LNAME FROM MATCH_STAFF WHERE ID = {Convert.ToInt32(dt.Rows[i]["Player_id"])}";
                SqlCommand sqlCommand = new SqlCommand(query, sqlConnection);
                string playerName = sqlCommand.ExecuteScalar().ToString()!;
                Dictionary<Object, Object> row = new();
                row["ChampionshipId"]= dt.Rows[i]["Championship_ID"];
                row["PlayerName"] = playerName;
                row["Saves"] = dt.Rows[i]["saves"];
                row["Assists"] = dt.Rows[i]["Assists"];
                row["Goals"] = dt.Rows[i]["Goals"];
                row["Tackles"] = dt.Rows[i]["Tackles"];
                row["CleanSheets"] = dt.Rows[i]["clean_Sheets"];

                stats.Add(row);

            }
            return stats;
        }

        public IEnumerable<Dictionary<Object, Object>> TopAssists(SqlConnection sqlConnection)
        {
            string query = $@"SELECT * FROM STATS ORDER BY ASSISTS DESC ";
            SqlDataAdapter adapter = new SqlDataAdapter(query, sqlConnection);
            DataTable dt = new();
            adapter.Fill(dt);
            List<Dictionary<Object, Object>> stats = new List<Dictionary<Object, Object>>();
            for (int i = 0; i < 10 && i < dt.Rows.Count; i++)
            {
                query = $@"SELECT FNAME + ' ' + LNAME FROM MATCH_STAFF WHERE ID = {Convert.ToInt32(dt.Rows[i]["Player_id"])}";
                SqlCommand sqlCommand = new SqlCommand(query, sqlConnection);
                string playerName = sqlCommand.ExecuteScalar().ToString()!;
                Dictionary<Object, Object> row = new();
                row["ChampionshipId"] =dt.Rows[i]["Championship_ID"];
                row["PlayerName"] = playerName;
                row["Saves"] = dt.Rows[i]["saves"];
                row["Assists"] = dt.Rows[i]["Assists"];
                row["Goals"] = dt.Rows[i]["Goals"];
                row["Tackles"] = dt.Rows[i]["Tackles"];
                row["CleanSheets"] = dt.Rows[i]["clean_Sheets"];

                stats.Add(row);

            }
            return stats;
        }

        public IEnumerable<Dictionary<Object, Object>> TopSaves(SqlConnection sqlConnection)
        {
            string query = $@"SELECT * FROM STATS ORDER BY SAVES DESC ";
            SqlDataAdapter adapter = new SqlDataAdapter(query, sqlConnection);
            DataTable dt = new();
            adapter.Fill(dt);
            List<Dictionary<Object, Object>> stats = new List<Dictionary<Object, Object>>();
            for (int i = 0; i < 10 && i < dt.Rows.Count; i++)
            {
                query = $@"SELECT FNAME + ' ' + LNAME FROM MATCH_STAFF WHERE ID = {Convert.ToInt32(dt.Rows[i]["Player_id"])}";
                SqlCommand sqlCommand = new SqlCommand(query, sqlConnection);
                string playerName = sqlCommand.ExecuteScalar().ToString()!;
                Dictionary<Object, Object> row = new();
                row["ChampionshipId"] = dt.Rows[i]["Championship_ID"];
                row["PlayerName"] = playerName;
                row["Saves"] = dt.Rows[i]["saves"];
                row["Assists"] = dt.Rows[i]["Assists"];
                row["Goals"] = dt.Rows[i]["Goals"];
                row["Tackles"] = dt.Rows[i]["Tackles"];
                row["CleanSheets"] = dt.Rows[i]["clean_Sheets"];

                stats.Add(row);

            }
            return stats;
        }

        public IEnumerable<Dictionary<Object, Object>> TopTackles(SqlConnection sqlConnection)
        {
            string query = $@"SELECT * FROM STATS ORDER BY TACKLES DESC ";
            SqlDataAdapter adapter = new SqlDataAdapter(query, sqlConnection);
            DataTable dt = new();
            adapter.Fill(dt);
            List<Dictionary<Object, Object>> stats = new List<Dictionary<Object, Object>>();
            for (int i = 0; i < 10 && i < dt.Rows.Count; i++)
            {
                query = $@"SELECT FNAME + ' ' + LNAME FROM MATCH_STAFF WHERE ID = {Convert.ToInt32(dt.Rows[i]["Player_id"])}";
                SqlCommand sqlCommand = new SqlCommand(query, sqlConnection);
                string playerName = sqlCommand.ExecuteScalar().ToString()!;
                Dictionary<Object, Object> row = new();
                row["ChampionshipId"] = dt.Rows[i]["Championship_ID"];
                row["PlayerName"] = playerName;
                row["Saves"] =dt.Rows[i]["saves"];
                row["Assists"] = dt.Rows[i]["Assists"];
                row["Goals"] = dt.Rows[i]["Goals"];
                row["Tackles"] = dt.Rows[i]["Tackles"];
                row["CleanSheets"] = dt.Rows[i]["clean_Sheets"];

                stats.Add(row);

            }
            return stats;
        }

        public IEnumerable<Dictionary<Object, Object>> TopCleanSheets(SqlConnection sqlConnection)
        {
            string query = $@"SELECT * FROM STATS ORDER BY CLEAN_SHEETS DESC ";
            SqlDataAdapter adapter = new SqlDataAdapter(query, sqlConnection);
            DataTable dt = new();
            adapter.Fill(dt);
            List<Dictionary<Object, Object>> stats = new List<Dictionary<Object, Object>>();
            for (int i = 0; i < 10 && i < dt.Rows.Count; i++)
            {
                query = $@"SELECT FNAME + ' ' + LNAME FROM MATCH_STAFF WHERE ID = {Convert.ToInt32(dt.Rows[i]["Player_id"])}";
                SqlCommand sqlCommand = new SqlCommand(query, sqlConnection);
                string playerName = sqlCommand.ExecuteScalar().ToString()!;
                Dictionary<Object, Object> row = new();
                row["ChampionshipId"] = dt.Rows[i]["Championship_ID"];
                row["PlayerName"] = playerName;
                row["Saves"] = dt.Rows[i]["saves"];
                row["Assists"] = dt.Rows[i]["Assists"];
                row["Goals"] = dt.Rows[i]["Goals"];
                row["Tackles"] = dt.Rows[i]["Tackles"];
                row["CleanSheets"] = dt.Rows[i]["clean_Sheets"];

                stats.Add(row);

            }
            return stats;
        }

        public IEnumerable<Dictionary<Object,Object>> TopLikes(SqlConnection sqlConnection)
        {
            string query = $@"Select article_name,Count(article_name) as total from likes group by article_name order by total desc";
            DataTable dt = new DataTable();
            SqlDataAdapter adapter = new SqlDataAdapter(query,sqlConnection);
            adapter.Fill(dt);
            List<Dictionary<Object, Object>> likes= new List<Dictionary<Object, Object>>(); 
            for(int i=0;i<5&&i<dt.Rows.Count;i++)
            {
                Dictionary<Object,Object> row = new Dictionary<Object,Object>();
                row["ArticleName"] = dt.Rows[i]["article_name"];
                row["Likes"] = dt.Rows[i]["total"];
                likes.Add(row);
            }
            return likes;
        }

        public IEnumerable<Quiz> AllQuizzes(SqlConnection sqlConnection)
        {
            string query = $@"Select * from Quizzes";
            SqlDataAdapter sqlDataAdapter = new SqlDataAdapter(query,sqlConnection);
            DataTable dt = new DataTable();
            sqlDataAdapter.Fill(dt);
            List<Quiz> list = new List<Quiz>();
            for(int i=0;i<dt.Rows.Count;i++)
            {
                Quiz quiz = new();
                quiz.Id = Convert.ToInt32(dt.Rows[i]["ID"]);
                quiz.JournalistSsn = Convert.ToInt32(dt.Rows[i]["journalist_ssn"]);
                list.Add(quiz);
            }
            return list;
        }

        public IEnumerable<Dictionary<string,Object>> AllStoreItems(SqlConnection sqlConnection , int storeID)
        {
            string query = $@"SELECT * FROM STORE_ITEMS,ITEMS WHERE STADIUM_ID = {storeID} AND items.id = store_items.item_id; ";
            SqlDataAdapter adapter = new SqlDataAdapter(query, sqlConnection);
            DataTable dt = new();
            adapter.Fill(dt);
            List<Dictionary<string, Object>> items = new();
            for (int i = 0; i < dt.Rows.Count; i++)
            {
                Dictionary<string, Object> row = new Dictionary<string, Object>();
                row["Id"] = dt.Rows[i]["ID"];
                row["ItemName"] = dt.Rows[i]["Item_Name"];
                row["ItemPrice"] = dt.Rows[i]["item_price"];
                row["ItemImage"] = dt.Rows[i]["item_image"];
                row["Quantity"] = dt.Rows[i]["qty"];
                items.Add(row);
            }
            return items;
        }
    }

    
}
