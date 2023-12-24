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
        private bool checkClub(string club, SqlConnection conn)
        {
            string query = @$"select * from clubs where name ='{club}'";
            SqlDataAdapter sqlDataAdapter = new SqlDataAdapter(query, conn);
            DataTable dt = new DataTable();
            sqlDataAdapter.Fill(dt);
            if (dt.Rows.Count > 0) return true;
            return false;

        }
        private bool checkItem(SqlConnection conn, int itemid)
        {
            string query = $@"select * from items where id ={itemid}";
            SqlDataAdapter sqlDataAdapter = new SqlDataAdapter(query, conn);
            DataTable dt = new DataTable();
            sqlDataAdapter.Fill(dt);
            if (dt.Rows.Count > 0) return true;
            return false;
        }
        private bool checkChamp(SqlConnection conn, int champid)
        {
            string query = @$"select * from championship where id ={champid}";
            SqlDataAdapter sqlDataAdapter = new SqlDataAdapter(query, conn);
            DataTable dt = new DataTable();
            sqlDataAdapter.Fill(dt);
            if (dt.Rows.Count > 0) return true;
            return false;
        }

        private bool checkStad(SqlConnection conn, int stadid)
        {
            string query = @$"select * from Stadium where id ={stadid}";
            SqlDataAdapter sqlDataAdapter = new SqlDataAdapter(query, conn);
            DataTable dt = new DataTable();
            sqlDataAdapter.Fill(dt);
            if (dt.Rows.Count > 0) return true;
            return false;
        }

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
            SqlDataAdapter sqlDataAdapter = new SqlDataAdapter(query, conn);
            DataTable dt = new DataTable();
            sqlDataAdapter.Fill(dt);
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
            int res = -1;
            if (!checkClub(m.Club1.ToString(), conn) || !checkClub(m.Club2.ToString(), conn) ||
                !checkChamp(conn, Convert.ToInt32(m.Championshipid)) || !checkStad(conn, Convert.ToInt32(m.StadiumId)))
            {
                res = 0;

                return res;
            }


            string date = m.MatchDate.Substring(6) + '-' + m.MatchDate.Substring(0, 2) + '-' + m.MatchDate.Substring(3, 2);
            string query = $@"insert into matches(matchDate,weekno,club1,club2,championshipid,stadium_id)
                              values ('{date}',{m.Weekno},'{m.Club1}','{m.Club2}',{m.Championshipid},{m.StadiumId})";
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
            SqlDataAdapter sqlDataAdapter = new SqlDataAdapter(query, conn);
            DataTable dt = new DataTable();
            sqlDataAdapter.Fill(dt);
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

        public int addClub(SqlConnection conn, Club club)
        {
            string name = club.Name.ToString();
            string logo = club.Logo.ToString();

            int shome = -1;
            int createdat = -1;
            bool ok = true;
            ok = int.TryParse(club.StadiumHome.ToString(), out shome);
            bool ok2 = true;
            ok2 = int.TryParse(club.CreatedAt.ToString(), out createdat);
            if (!ok || !ok2 || name == "" || logo == "") { return 0; }
            string query = "insert into clubs (Created_At,name,logo,stadium_home) values(" + club.CreatedAt + ",'" + club.Name + "','" + club.Logo + "'," + club.StadiumHome + ")";
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
                match.Weekno = Convert.ToInt32(dt.Rows[i]["weekno"]);
                match.StadiumId = Convert.ToInt32(dt.Rows[i]["stadium_id"]);
                match.Championshipid = Convert.ToInt16(dt.Rows[i]["championshipid"]);
                match.MatchDate = Convert.ToString(dt.Rows[i]["matchDate"]);
                list.Add(match);
            }
            return list;
        }


        public int updateMatch(SqlConnection conn, Match match, int id)
        {
            int res = -1;
            if (!checkClub(match.Club1.ToString(), conn) || !checkClub(match.Club2.ToString(), conn) ||
                !checkChamp(conn, Convert.ToInt32(match.Championshipid)) || !checkStad(conn, Convert.ToInt32(match.StadiumId)))
            {
                res = 0;
                return res;
            }
            string query = "update matches set matchDate='" + match.MatchDate + "', weekno=" + match.Weekno + ",club1='" + match.Club1 + "',club2='" + match.Club2 + "',championshipid=" + match.Championshipid + " ,stadium_id = " + match.StadiumId + " where id =" + id + "";

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


        public int updateClub(SqlConnection conn, Club clubs)
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

                clubs.Name + "', stadium_home= " + clubs.StadiumHome + " where id =" + clubs.Id + "";
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

        public int addChamp(SqlConnection conn, Championship champ)
        {

            string name = champ.Name.ToString();
            string logo = champ.Logo.ToString();
            int no = -1;
            bool ok = int.TryParse(champ.NoMatches.ToString(), out no);

            if (name == "" || logo == "" || ok == false) return 0;


            string query = $@"insert into championship (name,logo,startingAt,endingAt,no_matches) values
                ('" + champ.Name + "','" + champ.Logo + "','" + champ.StartingAt + "','" + champ.EndingAt + "'," + champ.NoMatches + ")";
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

            string name = champ.Name.ToString();
            string logo = champ.Logo.ToString();
            int no = -1;
            bool ok = int.TryParse(champ.NoMatches.ToString(), out no);

            if (name == "" || logo == "" || ok == false) return 0;


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


        public int addPlayer(SqlConnection conn, Player player)
        {

            string query = $@"insert into Players (club_id,Height,Market_value,main_position,T_shirt_Number,foot) 
      values({player.ClubId} , {player.Height},{player.MarketValue} ,'{player.MainPosition}',{player.TShirtNumber},'{player.Foot}' ";
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


        public IEnumerable<Journalist> getAllJournalists(SqlConnection conn)
        {
            string query = @"select * from journalists";
            SqlDataAdapter sqlDataAdapter = new SqlDataAdapter(query, conn);
            DataTable dt = new DataTable();
            sqlDataAdapter.Fill(dt);
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

        public int addPlayerStatInChamp(SqlConnection conn, Stat s)
        {
            string query = @$"insert into Stats(championship_id,player_id,saves,assists,goals,tackles,clean_sheets)
             values({s.ChampionshipId},{s.PlayerId},{s.Saves},{s.Assists},{s.Goals},{s.Tackles},{s.CleanSheets})";
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

        public IEnumerable<Stadium> getAllStadiumsInLocation(SqlConnection conn, string location)
        {
            string query = $@"select * from Stadium where location ='{location}' ";

            SqlDataAdapter sqlDataAdapter = new SqlDataAdapter(query, conn);
            DataTable dt = new DataTable();
            sqlDataAdapter.Fill(dt);
            List<Stadium> list = new List<Stadium>();
            for (int i = 0; i < dt.Rows.Count; i++)
            {
                Stadium s = new Stadium();
                s.Id = Convert.ToInt32(dt.Rows[i]["id"]);
                s.CreatedAt = Convert.ToInt32(dt.Rows[i]["Created_At"]);
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

        public IEnumerable<Quiz> getAllQuizzesOfJour(SqlConnection conn, int ssn)
        {
            string query = $@"select * from quizzes where journalist_ssn ={ssn}";
            SqlDataAdapter sqlDataAdapter = new SqlDataAdapter(query, conn);
            DataTable dt = new DataTable();
            sqlDataAdapter.Fill(dt);
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
            SqlDataAdapter sqlDataAdapter = new SqlDataAdapter(query, conn);
            DataTable dt = new DataTable();
            sqlDataAdapter.Fill(dt);
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

        public IEnumerable<Store> getAllStores(SqlConnection conn)
        {
            string query = $"select * from store ";
            SqlDataAdapter sqlDataAdapter = new SqlDataAdapter(query, conn);
            DataTable dt = new DataTable();
            sqlDataAdapter.Fill(dt);
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


        public IEnumerable<Stadium> getStadium(SqlConnection conn, int id)
        {
            string query = $@"select * from Stadium where id = {id} ;";
            SqlDataAdapter sqlDataAdapter = new SqlDataAdapter(query, conn);
            DataTable dt = new DataTable();
            sqlDataAdapter.Fill(dt);
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


        public int updateItem(SqlConnection conn, Item item, int id)
        {
            bool ok = checkItem(conn, id);
            if (!ok) return 0;
            string query = @$"update items set item_price ={item.ItemPrice} , item_name ='{item.ItemName}'
                     , item_image = '{item.ItemImage}' where id = {item.Id}";

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

        public IEnumerable<Championship> getChamp(SqlConnection conn, int id)
        {
            string query = @$"select * from championship where id ={id}";

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

        public IEnumerable<Match> getMatchesByDate(SqlConnection conn, string date)
        {
            string query = $@"select * from matches where matchDate = '{date}'";

            SqlDataAdapter sqlDataAdapter = new SqlDataAdapter(query, conn);
            DataTable dt = new DataTable();
            sqlDataAdapter.Fill(dt);
            List<Match> list = new List<Match>();
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

        public int updateStadium(SqlConnection conn, int StadiumId, Stadium stadium)
        {
            string query = $"update Stadium  " +
                $"set Name = ' {stadium.Name}',width = {stadium.Width},length = {stadium.Length},Capacity = {stadium.Capacity},image = '{stadium.Image}' ," +
                $"Location = '{stadium.Location}',Created_at = {stadium.CreatedAt}" +
                $"Where id  = {StadiumId} ";

            try
            {
                SqlCommand sqlCommand = new SqlCommand(query, conn);
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
            List<Club> clubs = new();
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

        public int addStadium(SqlConnection sqlConnection, Stadium stadium)
        {
            string query = $@"INSERT INTO STADIUM (NAME";
            string values = $"'{stadium.Name}'";
            if (stadium.Width != null)
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
            catch (Exception ex)
            {
                return 0;
            }
        }

        public int updateClubCoach(SqlConnection sqlConnection, int clubID, string name)
        {
            string fName = "", lName = "";
            bool first = true;
            for (int i = 0; i < name.Length; i++)
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
            if (found != null)
            {
                query = @$"Update Coaches set club_id = {clubID} where id = {found}";
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
            return 0;
        }

        public int updatePlayer(SqlConnection sqlConnection, int playerID, Player player)
        {
            string query = $@"UPDATE MATCH_STAFF
                            SET FNAME = '{player.Fname}',LNAME = '{player.Lname}',Photo = '{player.Photo}',Nationality = '{player.Nationality}'
                            where id = {playerID};";

            SqlCommand sqlCommand = new SqlCommand(query, sqlConnection);

            try
            {
                sqlCommand.ExecuteNonQuery();
            }
            catch (Exception ex)
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
            SqlDataAdapter adapter = new SqlDataAdapter(query, sqlConnection);
            DataTable dt = new();
            adapter.Fill(dt);
            List<Item> items = new();
            for (int i = 0; i < dt.Rows.Count; i++)
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

        public int addStoreItem(SqlConnection sqlConnection, StoreItem storeItem)
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

        public IEnumerable<Question> getQuizQuestions(SqlConnection sqlConnection, int quizID)
        {
            string query = $@"SELECT * FROM QUESTIONS WHERE QUIZ_ID = {quizID}";
            SqlDataAdapter adapter = new SqlDataAdapter(query, sqlConnection);
            DataTable dt = new();
            adapter.Fill(dt);
            List<Question> questions = new List<Question>();
            Question question = new Question();
            question.Id = Convert.ToInt32(dt.Rows[0]["ID"]);
            question.QuestionContent = dt.Rows[0]["Question_content"].ToString();
            question.Answer1 = dt.Rows[0]["answer1"].ToString();
            question.Answer2 = dt.Rows[0]["answer2"].ToString();
            question.Answer3 = dt.Rows[0]["answer3"].ToString();
            question.Answer4 = dt.Rows[0]["answer4"].ToString();
            question.TheCorrectAnswer = dt.Rows[0]["the_correct_answer"].ToString();
            question.QuizId = Convert.ToInt32(dt.Rows[0]["quiz_id"]);
            questions.Add(question);
            return questions;
        }

        public IEnumerable<Dictionary<Object, Object>> TopGoals(SqlConnection sqlConnection)
        {
            string query = $@"SELECT * FROM STATS ORDER BY GOALS DESC ";
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
                row["Saves"] = dt.Rows[i]["saves"];
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

        public IEnumerable<Dictionary<Object, Object>> TopLikes(SqlConnection sqlConnection)
        {
            string query = $@"Select article_name,Count(article_name) as total from likes group by article_name order by total desc";
            DataTable dt = new DataTable();
            SqlDataAdapter adapter = new SqlDataAdapter(query, sqlConnection);
            adapter.Fill(dt);
            List<Dictionary<Object, Object>> likes = new List<Dictionary<Object, Object>>();
            for (int i = 0; i < 5 && i < dt.Rows.Count; i++)
            {
                Dictionary<Object, Object> row = new Dictionary<Object, Object>();
                row["ArticleName"] = dt.Rows[i]["article_name"];
                row["Likes"] = dt.Rows[i]["total"];
                likes.Add(row);
            }
            return likes;
        }

        public IEnumerable<Quiz> AllQuizzes(SqlConnection sqlConnection)
        {
            string query = $@"Select * from Quizzes";
            SqlDataAdapter sqlDataAdapter = new SqlDataAdapter(query, sqlConnection);
            DataTable dt = new DataTable();
            sqlDataAdapter.Fill(dt);
            List<Quiz> list = new List<Quiz>();
            for (int i = 0; i < dt.Rows.Count; i++)
            {
                Quiz quiz = new();
                quiz.Id = Convert.ToInt32(dt.Rows[i]["ID"]);
                quiz.JournalistSsn = Convert.ToInt32(dt.Rows[i]["journalist_ssn"]);
                list.Add(quiz);

            }
            return list;
        }


        public IEnumerable<Dictionary<object, object>> getPlayersStat(SqlConnection conn, int clubid, int champid)
        {
            string query = @$"select m.Fname , m.Lname , s.saves,s.assists,s.goals,s.tackles,s.clean_sheets
                  from match_staff as m,Players as p,Stats as s where s.championship_id ={champid} and
                  p.id= s.player_id and p.club_id ={clubid} and m.id=p.id";

            SqlDataAdapter sqlDataAdapter = new SqlDataAdapter(query, conn);
            DataTable dt = new DataTable();
            sqlDataAdapter.Fill(dt);
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

        public IEnumerable<Dictionary<string, Object>> AllStoreItems(SqlConnection sqlConnection, int storeID)
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

        public IEnumerable<Dictionary<object, object>> getItemInStore(SqlConnection conn, int itemid, int stadid)
        {
            string query = @$"select i.item_image ,i.item_name,i.item_price,si.qty  from items as i  , store_items as si where i.id={itemid} 
          and si.stadium_id = {stadid} and si.item_id ={itemid}";

            SqlDataAdapter sqlDataAdapter = new SqlDataAdapter(query, conn);
            DataTable dt = new DataTable();
            sqlDataAdapter.Fill(dt);
            List<Dictionary<object, object>> d = new List<Dictionary<object, object>>();
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
    }
}

