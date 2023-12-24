using Back_End.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.Data;
using static System.Reflection.Metadata.BlobBuilder;

namespace Backend
{
    public class AppDBmanager
    {
        private bool checkClub(string club,SqlConnection conn)
        {
            string query = @$"select * from clubs where name ='{club}'";
            conn.Open();
            SqlDataAdapter sqlDataAdapter = new SqlDataAdapter(query, conn);
            DataTable dt = new DataTable();
            sqlDataAdapter.Fill(dt);
            conn.Close();
            if (dt.Rows.Count > 0) return true;
            return false;
            
        }
        private bool checkItem(SqlConnection conn, int itemid)
        {
            string query = $@"select * from items where id ={itemid}";
            conn.Open();
            SqlDataAdapter sqlDataAdapter = new SqlDataAdapter(query, conn);
            DataTable dt = new DataTable();
            sqlDataAdapter.Fill(dt);
            conn.Close();
            if (dt.Rows.Count > 0) return true;
            return false;
        }
        private bool checkChamp(SqlConnection conn, int champid)
        {
            string query = @$"select * from championship where id ={champid}";
            conn.Open();
            SqlDataAdapter sqlDataAdapter = new SqlDataAdapter(query, conn);
            DataTable dt = new DataTable();
            sqlDataAdapter.Fill(dt);
            conn.Close();
            if (dt.Rows.Count > 0) return true;
            return false;
        }

        private bool checkStad(SqlConnection conn, int stadid)
        {
            string query = @$"select * from Stadium where id ={stadid}";
            conn.Open();
            SqlDataAdapter sqlDataAdapter = new SqlDataAdapter(query, conn);
            DataTable dt = new DataTable();
            sqlDataAdapter.Fill(dt);
            conn.Close();
            if (dt.Rows.Count > 0) return true;
            return false;
        }

        public IEnumerable<Match> getAllMatches(SqlConnection conn)
        {
            string query = @"select * from matches";
            conn.Open();
            SqlDataAdapter sqlDataAdapter = new SqlDataAdapter(query, conn);
            DataTable dt = new DataTable();
            sqlDataAdapter.Fill(dt);
            conn.Close();
            List<Match> list = new List<Match>();
            for (int i = 0; i < dt.Rows.Count; i++)
            {
                Match match = new Match();
                match.Id = Convert.ToInt32(dt.Rows[i]["id"]);
                match.MatchDate = Convert.ToString(dt.Rows[i]["matchDate"]);
                if (dt.Rows[i]["weekno"].ToString() != "")
                    match.Weekno = Convert.ToInt16(dt.Rows[i]["weekno"]);
                else
                    match.Weekno = null;
                match.Club1 = Convert.ToString(dt.Rows[i]["club1"]);
                match.Club2 = Convert.ToString(dt.Rows[i]["club2"]);
                match.Championshipid = Convert.ToInt32(dt.Rows[i]["championshipid"]);
                match.StadiumId = Convert.ToInt32(dt.Rows[i]["stadium_id"]);
                list.Add(match);
            }

            return list;
        }
        public IEnumerable<Match> getAllMatchesInChampionship(SqlConnection conn, int Id)
        {
            string query = @"select * from matches where Championshipid=" + Id;
            conn.Open();
            SqlDataAdapter sqlDataAdapter = new SqlDataAdapter(query, conn);
            DataTable dt = new DataTable();
            sqlDataAdapter.Fill(dt);
            conn.Close();
            List<Match> list = new List<Match>();
            for (int i = 0; i < dt.Rows.Count; i++)
            {
                Match match = new Match();
                match.Id = Convert.ToInt32(dt.Rows[i]["id"]);
                match.MatchDate = Convert.ToString(dt.Rows[i]["matchDate"]);
                if (dt.Rows[i]["weekno"].ToString() != "")
                    match.Weekno = Convert.ToInt16(dt.Rows[i]["weekno"]);
                else
                    match.Weekno = null;
                match.Club1 = Convert.ToString(dt.Rows[i]["club1"]);
                match.Club2 = Convert.ToString(dt.Rows[i]["club2"]);
                match.Championshipid = Convert.ToInt32(dt.Rows[i]["championshipid"]);
                match.StadiumId = Convert.ToInt32(dt.Rows[i]["stadium_id"]);
                list.Add(match);
            }

            return list;
        }
        public IEnumerable<Championship> getAllChampionships(SqlConnection conn)
        {
            string query = @"select * from championship";
            conn.Open();
            SqlDataAdapter sqlDataAdapter = new SqlDataAdapter(query, conn);
            DataTable dt = new DataTable();
            sqlDataAdapter.Fill(dt);
            conn.Close();
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
            int res = -1;
            if (!checkClub(m.Club1.ToString(), conn) || !checkClub(m.Club2.ToString(), conn) ||
                !checkChamp(conn, Convert.ToInt32(m.Championshipid)) || !checkStad(conn, Convert.ToInt32(m.StadiumId)))
            {
                res = 0;

                return res;
            }


            string date = m.MatchDate.Substring(6) + '-' + m.MatchDate.Substring(0,2) + '-' + m.MatchDate.Substring(3,2);
            string query = $@"insert into matches(matchDate,weekno,club1,club2,championshipid,stadium_id)
                              values ('{date}',{m.Weekno},'{m.Club1}','{m.Club2}',{m.Championshipid},{m.StadiumId})";
          

            conn.Open();
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
            conn.Close();
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
            conn.Open();
            SqlDataAdapter sqlDataAdapter = new SqlDataAdapter(query, conn);
            DataTable dt = new DataTable();
            sqlDataAdapter.Fill(dt);
            conn.Close();
            List<Club> list = new List<Club>();
            for (int i = 0; i < dt.Rows.Count; i++)
            {
                Club club = new Club();
                club.Id = Convert.ToInt32(dt.Rows[i]["id"]);
                club.CreatedAt = Convert.ToInt32(dt.Rows[i]["Created_At"]);
                club.Name = Convert.ToString(dt.Rows[i]["name"]);
                club.Logo = Convert.ToString(dt.Rows[i]["logo"]);
                club.StadiumHome = Convert.ToInt32(dt.Rows[i]["stadium_home"]);
                list.Add(club);
            }
            return list;
        }
        public IEnumerable<Stadium> getAllStadiums(SqlConnection conn)
        {
            string query = $@"select * from Stadium";
            conn.Open();
            SqlDataAdapter sqlDataAdapter = new SqlDataAdapter(query, conn);
            DataTable dt = new DataTable();
            sqlDataAdapter.Fill(dt);
            conn.Close();
            List<Stadium> list = new List<Stadium>();
            for (int i = 0; i < dt.Rows.Count; i++)
            {
                Stadium stad = new Stadium();
                stad.Id = Convert.ToInt32(dt.Rows[i]["id"]);
                stad.CreatedAt = Convert.ToInt32(dt.Rows[i]["Created_At"]);
                stad.Name = Convert.ToString(dt.Rows[i]["Name"]);
                stad.Image = Convert.ToString(dt.Rows[i]["image"]);
                if (dt.Rows[i]["width"].ToString()!="")
                    stad.Width = Convert.ToInt32(dt.Rows[i]["width"]);
                else
                    stad.Width = null;

                if (dt.Rows[i]["length"].ToString() != "")
                    stad.Length = Convert.ToInt32(dt.Rows[i]["length"]);
                else
                    stad.Length= null;


                stad.Location = Convert.ToString(dt.Rows[i]["location"]);
                stad.Capacity = Convert.ToInt32(dt.Rows[i]["Capacity"]);
                list.Add(stad);
            }
            return list;
        }

        public int  add_club(SqlConnection conn, Club club)
        {
            string name = club.Name.ToString();
            string logo = club.Logo.ToString();
            
            int shome = -1;
            int createdat = -1;
            bool ok = true;
           ok= int.TryParse(club.StadiumHome.ToString(), out shome);
            bool ok2 = true;
            ok2 = int.TryParse(club.CreatedAt.ToString(), out createdat);
            if (!ok || !ok2 || name == "" || logo == "") { return 0; }  
            string query = "insert into clubs (Created_At,name,logo,stadium_home) values(" + club.CreatedAt + ",'" + club.Name + "','" + club.Logo + "',"+ club.StadiumHome + ")";
            conn.Open();
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
            conn.Close();
            return res;

        }

        public IEnumerable<Match> get_match_data(SqlConnection conn, int id)
        {
            List<Match> list = new List<Match>();
            string query = "select * from matches where id = " + id + "";
            conn.Open();
            SqlDataAdapter sqlDataAdapter = new SqlDataAdapter(query, conn);
            DataTable dt = new DataTable();
            sqlDataAdapter.Fill(dt);
            conn.Close();
            for (int i = 0; i < dt.Rows.Count; i++)
            {
                Match match = new Match();
                match.Id = Convert.ToInt16(dt.Rows[i]["id"]);
                match.Club1 = Convert.ToString(dt.Rows[i]["club1"]);
                match.Club2 = Convert.ToString(dt.Rows[i]["club2"]);
                match.Weekno = Convert.ToInt32(dt.Rows[i]["weekno"]);
                match.StadiumId = Convert.ToInt32(dt.Rows[i]["stadium_id"]);
                match.Championshipid = Convert.ToInt16(dt.Rows[i]["championshipid"]);
                match.MatchDate = Convert.ToString(dt.Rows[i]["matchDate"]);
                list.Add(match);
            }
            return list;

        }

        public int  update_match(SqlConnection conn, Match match,int id)
        {
            int res = -1;
            if (!checkClub(match.Club1.ToString(), conn) || !checkClub(match.Club2.ToString(), conn) ||
                !checkChamp(conn, Convert.ToInt32(match.Championshipid)) || !checkStad(conn, Convert.ToInt32(match.StadiumId)))
            {
                res = 0;

                return res;
            }
            string query = "update matches set matchDate='"+ match.MatchDate+"', weekno=" + match.Weekno+ ",club1='" + match.Club1 + "',club2='" + match.Club2 + "',championshipid=" + match.Championshipid + " ,stadium_id = "+match.StadiumId+" where id =" + id + "";
           

            conn.Open();
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
            conn.Close();
            return res;
        }


        public int  update_club(SqlConnection conn, Club clubs)
        {
            string name = clubs.Name.ToString();
            string logo = clubs.Logo.ToString();

            int shome = -1;
            int createdat = -1;
            bool ok = true;
            ok = int.TryParse(clubs.StadiumHome.ToString(), out shome);
            bool ok2 = true;
            ok2 = int.TryParse(clubs.CreatedAt.ToString(), out createdat);
            if (!ok || !ok2 || name == "" || logo == "") { return 0; }


            string query = $@"update clubs set Created_At='" + clubs.CreatedAt + "', logo='" + clubs.Logo + "',name='" +
                clubs.Name + "', stadium_home= "+clubs.StadiumHome+" where id =" + clubs.Id + "";
            int res = -1;
            conn.Open();
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
            conn.Close();
            return res;
        }

        public int  add_champ(SqlConnection conn, Championship champ)
        {

            string name = champ.Name.ToString();
            string logo = champ.Logo.ToString();
            int no = -1;
            bool ok = int.TryParse(champ.NoMatches.ToString(), out no);

            if (name == "" || logo == "" || ok == false) return 0;


            string query = $@"insert into championship (name,logo,startingAt,endingAt,no_matches) values
('" + champ.Name + "','" + champ.Logo + "','" + champ.StartingAt + "','" + champ.EndingAt + "'," + champ.NoMatches+ ")";
            int res = -1;
            conn.Open();
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
            conn.Close();
            return res;
        }

        public int update_champ(SqlConnection conn, Championship champ)
        {

            string name = champ.Name.ToString();
            string logo = champ.Logo.ToString();
            int no = -1;
            bool ok = int.TryParse(champ.NoMatches.ToString(), out no);

            if (name == "" || logo == "" || ok == false) return 0;


            string query = @$"update championship set  name =  '{champ.Name}' , logo ='{champ.Logo}', startingAt = '{champ.StartingAt}' ,
                      endingAt = '{champ.EndingAt}', no_matches = {champ.NoMatches} where id = {champ.Id};";

            int res = -1;
            conn.Open();
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
            conn.Close();
            return res;
        }

        public int addPlayer(SqlConnection conn, Player player)
        {

            string query = $@"insert into Players (club_id,Height,Market_value,main_position,T_shirt_Number,foot) 
      values({player.ClubId} , {player.Height},{player.MarketValue} ,'{player.MainPosition}',{player.TShirtNumber},'{player.Foot}' ";
            int res = -1;
            conn.Open();
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
            conn.Close();
            return res;
        }

        public IEnumerable<Quiz> getAllQuizzes(SqlConnection conn)
        {
            string query = @"select * from quizzes";
            conn.Open();
            SqlDataAdapter sqlDataAdapter = new SqlDataAdapter(query, conn);
            DataTable dt = new DataTable();
            sqlDataAdapter.Fill(dt);
            conn.Close();
            List<Quiz> list = new List<Quiz>();
            for (int i = 0; i < dt.Rows.Count; i++)
            {
                Quiz q = new Quiz();
                q.Id = Convert.ToInt32(dt.Rows[i]["id"]);
                q.JournalistSsn = Convert.ToInt32(dt.Rows[i]["journalist_ssn"]);
                list.Add(q);
            }

            return list;
        }

        public IEnumerable<Journalist>  getAllJournalists(SqlConnection conn)
        {
            string query = @"select * from journalists";
            conn.Open();
            SqlDataAdapter sqlDataAdapter = new SqlDataAdapter(query, conn);
            DataTable dt = new DataTable();
            sqlDataAdapter.Fill(dt);
            conn.Close();
            List<Journalist> list = new List<Journalist>();
            for (int i = 0; i < dt.Rows.Count; i++)
            {
                Journalist j = new Journalist();
                j.Ssn = Convert.ToInt32(dt.Rows[i]["ssn"]);
                j.Agency = Convert.ToString(dt.Rows[i]["Agency"]);
                list.Add(j);
            }

            return list;
        }

        public int addCoach(SqlConnection conn, Coach coach)
        {

            string query = $@"insert into Coaches (club_id,team_managed_no) 
             values({coach.ClubId} ,{coach.TeamManagedNo}) ";
            int res = -1;
            conn.Open();
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
            conn.Close();
            return res;
        }

        public int addPlayerStatInChamp(SqlConnection conn,Stat s)
        {
            string query = @$"insert into Stats(championship_id,player_id,saves,assists,goals,tackles,clean_sheets)
             values({s.ChampionshipId},{s.PlayerId},{s.Saves},{s.Assists},{s.Goals},{s.Tackles},{s.CleanSheets})";
            int res = -1;
            conn.Open();
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
            conn.Close();
            return res;
        }

        public IEnumerable<Stadium> getAllStadiumsInLocation(SqlConnection conn,string location)
        {
            string query = $@"select * from Stadium where location ='{location}' ";

            conn.Open();
            SqlDataAdapter sqlDataAdapter = new SqlDataAdapter(query, conn);
            DataTable dt = new DataTable();
            sqlDataAdapter.Fill(dt);
            conn.Close();
            List<Stadium> list = new List<Stadium>();
            for (int i = 0; i < dt.Rows.Count; i++)
            {
                Stadium s = new Stadium();
                s.Id = Convert.ToInt32(dt.Rows[i]["id"]);
                s.CreatedAt= Convert.ToInt32(dt.Rows[i]["Created_At"]);
                s.Name = Convert.ToString(dt.Rows[i]["Name"]);
                s.Image = Convert.ToString(dt.Rows[i]["image"]);
                s.Location = Convert.ToString(dt.Rows[i]["location"]);
       
                s.Capacity = Convert.ToInt32(dt.Rows[i]["Capacity"]);
           

                if (dt.Rows[i]["width"].ToString() != "")
                    s.Width = Convert.ToInt32(dt.Rows[i]["width"]);
                else
                    s.Width = null;

                if (dt.Rows[i]["length"].ToString() != "")
                    s.Length = Convert.ToInt32(dt.Rows[i]["length"]);
                else
                    s.Length = null;    
                list.Add(s);
            }
           
            return list;

        }

        public IEnumerable<Quiz> getAllQuizzesOfJour(SqlConnection conn,int ssn)
        {
            string query = $@"select * from quizzes where journalist_ssn ={ssn}";
            conn.Open();
            SqlDataAdapter sqlDataAdapter = new SqlDataAdapter(query, conn);
            DataTable dt = new DataTable();
            sqlDataAdapter.Fill(dt);
            conn.Close();
            List<Quiz> list = new List<Quiz>();
            for (int i = 0; i < dt.Rows.Count; i++)
            {
                Quiz q = new Quiz();
                q.Id = Convert.ToInt32(dt.Rows[i]["id"]);
                q.JournalistSsn = Convert.ToInt32(dt.Rows[i]["journalist_ssn"]);
                list.Add(q);
            }

            return list;
        }

        public IEnumerable<Store> getOneStore(SqlConnection conn, int stad_id)
        {
            string query = $"select * from store where stadium_id ={stad_id}";
                 conn.Open();
            SqlDataAdapter sqlDataAdapter = new SqlDataAdapter(query, conn);
            DataTable dt = new DataTable();
            sqlDataAdapter.Fill(dt);
            conn.Close();
            List<Store> list = new List<Store>();
            for (int i = 0; i < dt.Rows.Count; i++)
            {
                Store  st = new Store();
                st.Profit = Convert.ToInt32(dt.Rows[i]["profit"]);
                st.StadiumId = Convert.ToInt32(dt.Rows[i]["stadium_id"]);
                list.Add(st);
            }

            return list;
        }

        public IEnumerable<Store> getAllStores(SqlConnection conn)
        {
            string query = $"select * from store ";
            conn.Open();
            SqlDataAdapter sqlDataAdapter = new SqlDataAdapter(query, conn);
            DataTable dt = new DataTable();
            sqlDataAdapter.Fill(dt);
            conn.Close();
            List<Store> list = new List<Store>();
            for (int i = 0; i < dt.Rows.Count; i++)
            {
                Store st = new Store();
                st.Profit = Convert.ToInt32(dt.Rows[i]["profit"]);
                st.StadiumId = Convert.ToInt32(dt.Rows[i]["stadium_id"]);
                list.Add(st);
            }

            return list;
        }

        public int updateQuiz(SqlConnection conn, AcceptingQuiz aq)
        {

            string query = $@"update Accepting_quizzes set State ='{aq.State}' where quiz_id ={aq.QuizId} and admin_ssn ={aq.AdminSsn} ;";

            int res = -1;
            conn.Open();
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
            conn.Close();
            return res;
        }
        public IEnumerable<Stadium> getStadium(SqlConnection conn, int id)
        {
            string query = $@"select * from Stadium where id = {id} ;";
            conn.Open();
            SqlDataAdapter sqlDataAdapter = new SqlDataAdapter(query, conn);
            DataTable dt = new DataTable();
            sqlDataAdapter.Fill(dt);
            conn.Close();
            List<Stadium> list = new List<Stadium>();
            for (int i = 0; i < dt.Rows.Count; i++)
            {
                Stadium stad = new Stadium();
                stad.Id = Convert.ToInt32(dt.Rows[i]["id"]);
                stad.CreatedAt = Convert.ToInt32(dt.Rows[i]["Created_At"]);
                stad.Name = Convert.ToString(dt.Rows[i]["Name"]);
                stad.Image = Convert.ToString(dt.Rows[i]["image"]);
                if (dt.Rows[i]["width"].ToString() != "")
                    stad.Width = Convert.ToInt32(dt.Rows[i]["width"]);
                else
                    stad.Width = null;

                if (dt.Rows[i]["length"].ToString() != "")
                    stad.Length = Convert.ToInt32(dt.Rows[i]["length"]);
                else
                    stad.Length = null;


                stad.Location = Convert.ToString(dt.Rows[i]["location"]);
                stad.Capacity = Convert.ToInt32(dt.Rows[i]["Capacity"]);
                list.Add(stad);
            }
            return list;
        }

        public int addItemToStore(SqlConnection conn, StoreItem si)
        {
            // validation

            int itemid = si.ItemId;
            int stadiumid=si.StadiumId;
            bool ok1 = checkStad(conn,stadiumid);
            bool ok2 = checkItem(conn, itemid);
            if (!ok1 || !ok2) return 0;

            string query = @$"insert into store_items values ({si.ItemId},{si.StadiumId},{si.Qty})";


            int res = -1;
            conn.Open();
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
            conn.Close();
            return res;
        }
        public IEnumerable<Dictionary<object, object>> getItemInStore(SqlConnection conn,int itemid, int stadid)
        {
            string query = @$"select i.item_image ,i.item_name,i.item_price,si.qty  from items as i  , store_items as si where i.id={itemid} 
          and si.stadium_id = {stadid} and si.item_id ={itemid}";

            conn.Open();
            SqlDataAdapter sqlDataAdapter = new SqlDataAdapter(query, conn);
            DataTable dt = new DataTable();
            sqlDataAdapter.Fill(dt);
            conn.Close();
            List<Dictionary<object,object>> d= new List< Dictionary<object, object>>();
            for (int i = 0; i < dt.Rows.Count; i++)
            {
                Dictionary<object, object> dob = new();
                dob.Add("Name", dt.Rows[i]["item_name"]);

                dob.Add("qty", dt.Rows[i]["qty"]);

                dob.Add("price", dt.Rows[i]["item_price"]);

                dob.Add("image", dt.Rows[i]["item_image"]);
                d.Add(dob);
            }
            return d;
        }

        public int updateItem(SqlConnection conn ,Item item , int id)
        {
            bool ok = checkItem(conn, id);
            if (!ok) return 0;
            string query = @$"update items set item_price ={item.ItemPrice} , item_name ='{item.ItemName}'
                     , item_image = '{item.ItemImage}' where id = {item.Id}";

            int res = -1;
            conn.Open();
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
            conn.Close();
            return res;

        }

        public IEnumerable<Championship> getChamp(SqlConnection conn,int id)
        {
            string query = @$"select * from championship where id ={id}";

            conn.Open();
            SqlDataAdapter sqlDataAdapter = new SqlDataAdapter(query, conn);
            DataTable dt = new DataTable();
            sqlDataAdapter.Fill(dt);
            conn.Close();
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

        public IEnumerable<Match> getMatchesByDate(SqlConnection conn,string date)
        {
            string query = $@"select * from matches where matchDate = '{date}'";

            conn.Open();
            SqlDataAdapter sqlDataAdapter = new SqlDataAdapter(query, conn);
            DataTable dt = new DataTable();
            sqlDataAdapter.Fill(dt);
            List<Match> list = new List<Match>();
            conn.Close();
            for (int i = 0; i < dt.Rows.Count; i++)
            {
                Match match = new Match();
                match.Id = Convert.ToInt16(dt.Rows[i]["id"]);
                match.Club1 = Convert.ToString(dt.Rows[i]["club1"]);
                match.Club2 = Convert.ToString(dt.Rows[i]["club2"]);
                match.Weekno = Convert.ToInt32(dt.Rows[i]["weekno"]);
                match.StadiumId = Convert.ToInt32(dt.Rows[i]["stadium_id"]);
                match.Championshipid = Convert.ToInt16(dt.Rows[i]["championshipid"]);
                match.MatchDate = Convert.ToString(dt.Rows[i]["matchDate"]);
                list.Add(match);
            }
            return list;
        }

        public IEnumerable<Dictionary<object,object>> getPlayersStat(SqlConnection conn, int clubid,int champid)
        {
            string query = @$"select m.Fname , m.Lname , s.saves,s.assists,s.goals,s.tackles,s.clean_sheets
from match_staff as m,Players as p,Stats as s where s.championship_id ={champid} and
                  p.id= s.player_id and p.club_id ={clubid} and m.id=p.id";

            conn.Open();
            SqlDataAdapter sqlDataAdapter = new SqlDataAdapter(query, conn);
            DataTable dt = new DataTable();
            sqlDataAdapter.Fill(dt);
            conn.Close();
            List<Dictionary<object, object>> d = new List<Dictionary<object, object>>();
            for (int i = 0; i < dt.Rows.Count; i++)
            {
                Dictionary<object, object> dob = new();
                dob.Add("Fname", dt.Rows[i]["Fname"]);

                dob.Add("Lname", dt.Rows[i]["Lname"]);

                dob.Add("saves", dt.Rows[i]["saves"]);

                dob.Add("assists", dt.Rows[i]["assists"]);

                dob.Add("goals", dt.Rows[i]["goals"]);

                dob.Add("tackles", dt.Rows[i]["tackles"]);

                dob.Add("clean_sheets", dt.Rows[i]["clean_sheets"]);

             
                d.Add(dob);
            }
            return d;

        }
      
    }

}
