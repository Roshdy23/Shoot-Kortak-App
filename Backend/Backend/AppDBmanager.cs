using Back_End.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using System;
using System.Data;

namespace Backend
{
    public class AppDBmanager
    {
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
        public  int addMatch(SqlConnection conn,Match m)
        {
            string date = m.MatchDate.Substring(6) + '-' + m.MatchDate.Substring(0,2) + '-' + m.MatchDate.Substring(3,2);
            string query = $@"insert into matches(MatchDate,Weekno,Club1,Club2,Championshipid,StadiumId)
                              values ('{date}',{m.Weekno},'{m.Club1}','{m.Club2}',{m.Championshipid},{m.StadiumId})";
            int res=-1;
            conn.Open();
            SqlCommand sqlCommand = new SqlCommand(query, conn);
            try
            {
            sqlCommand.ExecuteNonQuery();
                res= 200;
            }
            catch (Exception ex)
            {
                res= 0;
            }
            conn.Close();
            return res;
        }
        public IEnumerable<Club> getAllClubsInChampionship(SqlConnection conn,int champ_id)
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
                club.Id = Convert.ToInt32(dt.Rows[i]["Id"]);
                club.CreatedAt = Convert.ToInt32(dt.Rows[i]["CreatedAt"]);
                club.Name = Convert.ToString(dt.Rows[i]["Name"]);
                club.Logo = Convert.ToString(dt.Rows[i]["Logo"]);
                club.StadiumHome = Convert.ToInt32(dt.Rows[i]["StadiumHome"]);
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
    }
}
