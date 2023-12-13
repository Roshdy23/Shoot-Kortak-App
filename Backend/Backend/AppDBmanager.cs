using Backend.Models;
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
                match.id = Convert.ToInt32(dt.Rows[i]["id"]);
                match.matchDate = Convert.ToString(dt.Rows[i]["matchDate"]);
                match.weekno = Convert.ToInt16(dt.Rows[i]["weekno"]);
                match.club1 = Convert.ToString(dt.Rows[i]["club1"]);
                match.club2 = Convert.ToString(dt.Rows[i]["club2"]);
                match.championshipid = Convert.ToInt32(dt.Rows[i]["championshipid"]);
                match.stadium_id = Convert.ToInt32(dt.Rows[i]["stadium_id"]);
                list.Add(match);
            }

            return list;
        }
        public IEnumerable<Match> getAllMatchesInChampionship(SqlConnection conn, int id)
        {
            string query = @"select * from matches where championshipid=" + id;
            conn.Open();
            SqlDataAdapter sqlDataAdapter = new SqlDataAdapter(query, conn);
            DataTable dt = new DataTable();
            sqlDataAdapter.Fill(dt);
            conn.Close();
            List<Match> list = new List<Match>();
            for (int i = 0; i < dt.Rows.Count; i++)
            {
                Match match = new Match();
                match.id = Convert.ToInt32(dt.Rows[i]["id"]);
                match.matchDate = Convert.ToString(dt.Rows[i]["matchDate"]);
                match.weekno = Convert.ToInt16(dt.Rows[i]["weekno"]);
                match.club1 = Convert.ToString(dt.Rows[i]["club1"]);
                match.club2 = Convert.ToString(dt.Rows[i]["club2"]);
                match.championshipid = Convert.ToInt32(dt.Rows[i]["championshipid"]);
                match.stadium_id = Convert.ToInt32(dt.Rows[i]["stadium_id"]);
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
                champ.id = Convert.ToInt32(dt.Rows[i]["id"]);
                champ.startingAt = Convert.ToDateTime(dt.Rows[i]["startingAt"]);
                champ.endingAt = Convert.ToDateTime(dt.Rows[i]["endingAt"]);
                champ.name = Convert.ToString(dt.Rows[i]["name"]);
                champ.no_matches = Convert.ToInt32(dt.Rows[i]["no_matches"]);
                list.Add(champ);
            }
            return list;
        }
        public  int addMatch(SqlConnection conn,Match m)
        {
            string date = m.matchDate.Substring(6) + '-' + m.matchDate.Substring(0,2) + '-' + m.matchDate.Substring(3,2);
            string query = $@"insert into matches(matchDate,weekno,club1,club2,championshipid,stadium_id)
                              values ('{date}',{m.weekno},'{m.club1}','{m.club2}',{m.championshipid},{m.stadium_id})";
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
                                where clubs.id in(
                                select c.id from clubs c,Club_cup cl
                                where cl.championship_id={champ_id} and cl.club_id=c.id

                                union 

                                select c.id from clubs c,Club_league cl
                                where cl.championship_id={champ_id} and cl.club_id=c.id
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
                club.id = Convert.ToInt32(dt.Rows[i]["id"]);
                club.Created_At = Convert.ToInt32(dt.Rows[i]["Created_At"]);
                club.name = Convert.ToString(dt.Rows[i]["name"]);
                club.logo = Convert.ToString(dt.Rows[i]["logo"]);
                club.stadium_home = Convert.ToInt32(dt.Rows[i]["stadium_home"]);
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
                stad.id = Convert.ToInt32(dt.Rows[i]["id"]);
                stad.Created_At = Convert.ToInt32(dt.Rows[i]["Created_At"]);
                stad.Name = Convert.ToString(dt.Rows[i]["Name"]);
                stad.image = Convert.ToString(dt.Rows[i]["image"]);
                stad.width = Convert.ToInt32(dt.Rows[i]["width"]);
                stad.length = Convert.ToInt32(dt.Rows[i]["length"]);
                stad.location = Convert.ToString(dt.Rows[i]["location"]);
                stad.Capacity = Convert.ToInt32(dt.Rows[i]["Capacity"]);
                list.Add(stad);
            }
            return list;
        }
    }
}
