using Back_End.Models;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Data;
using System.Numerics;

using static System.Reflection.Metadata.BlobBuilder;

namespace Backend
{
    public class AppDBmanager
    {



       private int checkDate(string datenow, string date2)
        {

           string month = "";
            int i = 0;
            while (datenow[i] != '/')
            {
                month += datenow[i++];
            }

            i++;
            string day1 = "";
            while (datenow[i] != '/')
            {

                day1+= datenow[i++];      
            }
            i++;
            int n = 4;
            string year1 = "";
            for(int j=0;j<4;j++)
            {

                year1 += datenow[i++];
            }
            i = 0;

            string month2 = "";
            while (date2[i] != '/')
            {
                month2 += date2[i++];

            }
            i++;

            string day2 = "";

            while (date2[i] != '/')
            {
                day2 += date2[i++];
            }
            i++;
            string year2 = "";
            for (int j = 0; j < 4; j++)
            {
                year2 += date2[i++];

            }
           
           
       
           
            /*


            string year1 = datenow.Substring(6, 4);
            string month = datenow.Substring(0, 2);
            string day1 = datenow.Substring(3, 2);

            string year2 = date2.Substring(6, 4);//6->4
            string month2 = date2.Substring(0, 2);//0 2
            string day2 = date2.Substring(3, 2);//3 2
            */
            int ynow = Convert.ToInt32(year1);
            int mnow= Convert.ToInt32(month);   
            int dnow= Convert.ToInt32(day1);

            int ycheck = Convert.ToInt32(year2);
            int mcheck = Convert.ToInt32(month2);
            int dcheck = Convert.ToInt32(day2);

            if (ynow > ycheck) return 1;
            if (ynow < ycheck) return 0;
            if (ynow == ycheck)
            {

                if (mnow > mcheck) return 1;
                if (mnow < mcheck) return 0;


                if (dnow > dcheck) return 1;

                if (dnow < dcheck) return 0;

                return -1;

            }
            return 0;
           
            
        }

        public List<Fan> getCurrentUser(SqlConnection conn, int id)
        {
            string query = $@"select points,U.ssn,gender,birthdate,Username,password,Email,Fname,Lname from Fans F ,users U where F.ssn = {id} and F.ssn=U.ssn"; ;
            SqlDataAdapter sqlDataAdapter = new SqlDataAdapter(query, conn);
            DataTable dt = new DataTable();
            sqlDataAdapter.Fill(dt);
            List<Fan> list = new List<Fan>();
            for (int i = 0; i < dt.Rows.Count; i++)
            {
                Fan user = new Fan();
                user.Ssn = Convert.ToInt16(dt.Rows[i]["ssn"]);
                user.Gender = Convert.ToString(dt.Rows[i]["gender"]);
                user.Birthdate = Convert.ToString(dt.Rows[i]["birthdate"]);
                user.UserName = Convert.ToString(dt.Rows[i]["UserName"]);
                user.Password = Convert.ToString(dt.Rows[i]["password"]);
                user.Email = Convert.ToString(dt.Rows[i]["Email"]);
                user.Fname = Convert.ToString(dt.Rows[i]["Fname"]);
                user.Lname = Convert.ToString(dt.Rows[i]["Lname"]);
                user.Points = Convert.ToInt32(dt.Rows[i]["points"]);
                user.Role = "Fan";
                list.Add(user);
            }
            return list;
        }

        public Player getPlayer(SqlConnection conn, int id)
        {
            string query = $@"select Fname,Lname,Photo from match_staff where id ={id}";
            SqlDataAdapter sqlDataAdapter = new SqlDataAdapter(query,conn);
            DataTable dt = new DataTable();
            sqlDataAdapter.Fill(dt);
            Player player = new Player();
            player.Fname = Convert.ToString(dt.Rows[0]["Fname"]);
            player.Lname = Convert.ToString(dt.Rows[0]["Lname"]);
            player.Photo = Convert.ToString(dt.Rows[0]["Photo"]);
            return player;
        }

        public int RatePlayer(SqlConnection conn, int matchId, int userId,int playerId,double rate)
        {
            try
            {

            string query = $@"Insert Into Rating (fan_ssn,match_id,match_staff_ssn,rate)
values ({userId},{matchId},{playerId},{rate})";
             SqlCommand sqlCommand= new SqlCommand(query,conn);
            sqlCommand.ExecuteNonQuery();
                return 1;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
                return 0;
            }
            
        }

        public IEnumerable<Article> getAllByDate(SqlConnection conn,string date)
        {
            string query = $@"select * from Articles where posted = '{date}'";
            SqlDataAdapter sqlDataAdapter = new SqlDataAdapter(query,conn);
            DataTable dt = new DataTable();
            sqlDataAdapter.Fill(dt);
            List<Article> list = new List<Article>();
            for(int i = 0; i < dt.Rows.Count; i++)
            {
                Article article = new Article();
                article.img = Convert.ToString(dt.Rows[i]["picture"]);
                article.title = Convert.ToString(dt.Rows[i]["title"]);
                article.description = Convert.ToString(dt.Rows[i]["description"]);
                article.Name = Convert.ToString(dt.Rows[i]["Name"]);
                list.Add(article);
            }
            return list;

        }
        public Article articlebyId(SqlConnection conn , string id)
        {
            string query = $@"Select * from Articles,likes where name = '{id}'";
            SqlDataAdapter sqlDataAdapter = new SqlDataAdapter(query,conn);
            DataTable dt = new DataTable();
            sqlDataAdapter.Fill(dt);
            Article article = new Article();
            article.img = Convert.ToString(dt.Rows[0]["picture"]);
            article.title = Convert.ToString(dt.Rows[0]["title"]);
            article.description = Convert.ToString(dt.Rows[0]["description"]);
            article.Name = Convert.ToString(dt.Rows[0]["Name"]);
            query = $@"select Count(fan_ssn) from likes where article_name = '{id}'";
            SqlCommand sqlCommand = new SqlCommand(query, conn);
            article.likes = Convert.ToInt32(sqlCommand.ExecuteScalar());
            return article;
        }
        public IEnumerable<User> getCurrentJournalist(SqlConnection conn, int id)
        {
            string query = $@"select agency,U.ssn,gender,birthdate,Username,password,Email,Fname,Lname from journalists j ,users U where j.ssn = {id} and j.ssn=U.ssn";
            SqlDataAdapter sqlDataAdapter = new SqlDataAdapter(query, conn);
            DataTable dt = new DataTable();
            sqlDataAdapter.Fill(dt);
            List<Journalist> list = new List<Journalist>();
            for (int i = 0; i < dt.Rows.Count; i++)
            {
                Journalist user = new Journalist();
                user.Ssn = Convert.ToInt16(dt.Rows[i]["ssn"]);
                user.Gender = Convert.ToString(dt.Rows[i]["gender"]);
                user.Birthdate = Convert.ToString(dt.Rows[i]["birthdate"]);
                user.UserName = Convert.ToString(dt.Rows[i]["UserName"]);
                user.Password = Convert.ToString(dt.Rows[i]["password"]);
                user.Email = Convert.ToString(dt.Rows[i]["Email"]);
                user.Fname = Convert.ToString(dt.Rows[i]["Fname"]);
                user.Lname = Convert.ToString(dt.Rows[i]["Lname"]);
                user.Agency = Convert.ToString(dt.Rows[i]["Agency"]);
                user.Role = "Journalist";
                list.Add(user);
            }
            return list;
        }

        public IEnumerable<Admin> getCurrentAdmin(SqlConnection conn, int id)
        {
            string query = $@"select U.ssn,gender,birthdate,Username,password,Email,Fname,Lname from admin a ,users U where a.ssn = {id} and a.ssn=U.ssn";
            SqlDataAdapter sqlDataAdapter = new SqlDataAdapter(query, conn);
            DataTable dt = new DataTable();
            sqlDataAdapter.Fill(dt);
            List<Admin> list = new List<Admin>();
            for (int i = 0; i < dt.Rows.Count; i++)
            {
                Admin user = new Admin();
                user.Ssn = Convert.ToInt16(dt.Rows[i]["ssn"]);
                user.Gender = Convert.ToString(dt.Rows[i]["gender"]);
                user.Birthdate = Convert.ToString(dt.Rows[i]["birthdate"]);
                user.UserName = Convert.ToString(dt.Rows[i]["UserName"]);
                user.Password = Convert.ToString(dt.Rows[i]["password"]);
                user.Email = Convert.ToString(dt.Rows[i]["Email"]);
                user.Fname = Convert.ToString(dt.Rows[i]["Fname"]);
                user.Lname = Convert.ToString(dt.Rows[i]["Lname"]);
                user.Role = "Admin";
                list.Add(user);
            }
            return list;
        }

        public User CheckEmail(SqlConnection conn, string Email, string Pass)
        {
            string query = $@"Select * from Users where email = '{Email}'";
            SqlDataAdapter sqlDataAdapter = new SqlDataAdapter(query, conn);
            DataTable dt = new DataTable();
            sqlDataAdapter.Fill(dt);
            if (dt.Rows.Count > 0)
            {
                dt.Clear();
                query = $@"Select * from Users where email = '{Email}' and password = '{Pass}'";
                sqlDataAdapter = new SqlDataAdapter(query, conn);
                sqlDataAdapter.Fill(dt);
                if (dt.Rows.Count > 0)
                {
                    User user = new User();
                    user.Ssn = Convert.ToInt16(dt.Rows[0]["ssn"]);
                    user.Gender = Convert.ToString(dt.Rows[0]["gender"]);
                    user.Birthdate = Convert.ToString(dt.Rows[0]["birthdate"]);
                    user.UserName = Convert.ToString(dt.Rows[0]["UserName"]);
                    user.Password = Convert.ToString(dt.Rows[0]["password"]);
                    user.Email = Convert.ToString(dt.Rows[0]["Email"]);
                    user.Fname = Convert.ToString(dt.Rows[0]["Fname"]);
                    user.Lname = Convert.ToString(dt.Rows[0]["Lname"]);
                    return user;
                }
                else
                    throw new Exception("Password Incorrect");
            }
            else
                throw new Exception("Email not found");

        }

        private int checkDate2(string datenow, string datematch)
        {

            string month = "";
            int i = 0;
            while (datenow[i] != '/')
            {
                month += datenow[i++];
            }

            i++;
            string day1 = "";
            while (datenow[i] != '/')
            {

                day1 += datenow[i++];
            }
            i++;
            int n = 4;
            string year1 = "";
            for (int j = 0; j < 4; j++)
            {

                year1 += datenow[i++];
            }
            i = 0;
            //year month day
            string year2 = "";
            for (int j = 0; j < 4; j++)
            {
                year2 += datematch[i++];
            }

            i++;
            string month2 = "";
            while (datematch[i] != '/')
            {
                month2 += datematch[i++];
            }
            i++;
            string day2 = "";
            while (datematch[i] != ' ')
            {
                day2 += datematch[i++];
            }


            int ynow = Convert.ToInt32(year1);
            int mnow = Convert.ToInt32(month);
            int dnow = Convert.ToInt32(day1);

            int ycheck = Convert.ToInt32(year2);
            int mcheck = Convert.ToInt32(month2);
            int dcheck = Convert.ToInt32(day2);

            if (ynow > ycheck) return 1;
            if (ynow < ycheck) return 0;
            if (ynow == ycheck)
            {

                if (mnow > mcheck) return 1;
                if (mnow < mcheck) return 0;


                if (dnow > dcheck) return 1;

                if (dnow < dcheck) return 0;

                return -1;

            }
            return 0;



        }

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
        private bool checkWord(string word)
        {
            for (int i = 0; i < word.Length; i++)
            {
                if (!char.IsLetter(word[i]))
                {
                    return false;
                }
            }
            return true;
        }

        public IEnumerable<Dictionary<object,object>> getAllMatches(SqlConnection conn)
        {
            string query = @"Exec GetAllMatches";   
            SqlDataAdapter sqlDataAdapter = new SqlDataAdapter(query, conn);
            DataTable dt = new DataTable();
            sqlDataAdapter.Fill(dt);
            List<Dictionary<object, object>> list = new List<Dictionary<object, object>>();
            for (int i = 0; i < dt.Rows.Count; i++)
            {
                Dictionary<object, object> match = new Dictionary<object, object>();
                match.Add( "id", Convert.ToInt32(dt.Rows[i]["id"]));


                match.Add( "matchDate", Convert.ToString(dt.Rows[i]["matchDate"]));

                match.Add( "club1", Convert.ToString(dt.Rows[i]["club1"]));


                match.Add( "club2", Convert.ToString(dt.Rows[i]["club2"]));
                if (dt.Rows[i]["weekno"].ToString() != "")
                    match.Add( "weekno", Convert.ToInt32(dt.Rows[i]["weekno"]));
                else
                    match.Add( "weekno", "NULL");

                match.Add( "stadium_id", Convert.ToInt32(dt.Rows[i]["stadium_id"]));

                match.Add( "championshipid", Convert.ToInt32(dt.Rows[i]["championshipid"]));

                match.Add("result", Convert.ToString(dt.Rows[i]["result"]));

                int stid = Convert.ToInt32(dt.Rows[i]["stadium_id"]);

                int chmpid = Convert.ToInt32(dt.Rows[i]["championshipid"]);

                string query1 = @$"select Name from Stadium where id ={stid}";

                string query2 = $@"select name from championship where id ={chmpid}";

                SqlDataAdapter sqlDataAdapter2 = new SqlDataAdapter(query1, conn);
                DataTable dt2 = new DataTable();
                sqlDataAdapter2.Fill(dt2);

                match.Add( "stadiumName", dt2.Rows[0]["Name"].ToString());


                SqlDataAdapter sqlDataAdapter3 = new SqlDataAdapter(query2, conn);
                DataTable dt3 = new DataTable();
                sqlDataAdapter3.Fill(dt3);


                match.Add("championshipName", dt3.Rows[0]["name"].ToString());

                list.Add(match);
            }
            return list;
        }
        public IEnumerable<Dictionary<object,object>> getAllMatchesInChampionship(SqlConnection conn, int Id)
        {
            string query = $@"Exec getAllMatchesInChampionship {Id}";
            SqlDataAdapter sqlDataAdapter = new SqlDataAdapter(query, conn);
            DataTable dt = new DataTable();
            sqlDataAdapter.Fill(dt);
            List<Dictionary<object, object>> list = new List<Dictionary<object, object>>();
            for (int i = 0; i < dt.Rows.Count; i++)
            {
                if (checkDate(DateTime.Now.ToString(), Convert.ToString(dt.Rows[i]["matchDate"]))==0)
                {
                    Dictionary<object, object> match = new Dictionary<object, object>();
                    match.Add("id", Convert.ToInt32(dt.Rows[i]["id"]));


                    match.Add("matchDate", Convert.ToString(dt.Rows[i]["matchDate"]));

                    match.Add("club1", Convert.ToString(dt.Rows[i]["club1"]));


                    match.Add("club2", Convert.ToString(dt.Rows[i]["club2"]));
                    if (dt.Rows[i]["weekno"].ToString() != "")
                        match.Add("weekno", Convert.ToInt32(dt.Rows[i]["weekno"]));
                    else
                        match.Add("weekno", "NULL");

                    match.Add("stadium_id", Convert.ToInt32(dt.Rows[i]["stadium_id"]));

                    match.Add("championshipid", Convert.ToInt32(dt.Rows[i]["championshipid"]));

                    match.Add("result", Convert.ToString(dt.Rows[i]["result"]));

                    int stid = Convert.ToInt32(dt.Rows[i]["stadium_id"]);

                    int chmpid = Convert.ToInt32(dt.Rows[i]["championshipid"]);

                    string query1 = @$"select Name from Stadium where id ={stid}";

                    string query2 = $@"select name from championship where id ={chmpid}";

                    SqlDataAdapter sqlDataAdapter2 = new SqlDataAdapter(query1, conn);
                    DataTable dt2 = new DataTable();
                    sqlDataAdapter2.Fill(dt2);

                    match.Add("stadiumName", dt2.Rows[0]["Name"].ToString());


                    SqlDataAdapter sqlDataAdapter3 = new SqlDataAdapter(query2, conn);
                    DataTable dt3 = new DataTable();
                    sqlDataAdapter3.Fill(dt3);


                    match.Add("championshipName", dt3.Rows[0]["name"].ToString());

                    list.Add(match);
                }
            }
            return list;
        }
        public IEnumerable<Championship> getAllFinishedChampionships(SqlConnection conn)
        {
            DateTime d=DateTime.Now;
             string date= d.ToString();




             string query = @"select * from championship";
            SqlDataAdapter sqlDataAdapter = new SqlDataAdapter(query, conn);
            DataTable dt = new DataTable();
            sqlDataAdapter.Fill(dt);
            List<Championship> list = new List<Championship>();
            for (int i = 0; i < dt.Rows.Count; i++)
            {
                Championship champ = new Championship();
                champ.Id = Convert.ToInt32(dt.Rows[i]["Id"]);

                champ.StartingAt = dt.Rows[i]["StartingAt"].ToString()!;
                string checkdate = Convert.ToString(dt.Rows[i]["EndingAt"]);
                if (checkDate(date, checkdate)==0||checkDate(date,checkdate)==-1)continue;
                champ.EndingAt = dt.Rows[i]["EndingAt"].ToString()!;
                champ.Name = Convert.ToString(dt.Rows[i]["Name"]);
                champ.NoMatches = Convert.ToInt32(dt.Rows[i]["no_matches"]);
                list.Add(champ);
            }
            return list;
        }
        public int addMatch(SqlConnection conn,Match m)
        {
            int res = -1;
            if (!checkClub(m.Club1.ToString(), conn) || !checkClub(m.Club2.ToString(), conn) ||
                !checkChamp(conn, Convert.ToInt32(m.Championshipid)) || !checkStad(conn, Convert.ToInt32(m.StadiumId)))
            {
                res = 0;

                return res;
            }


            string date = m.MatchDate.Substring(6) + '-' + m.MatchDate.Substring(0, 2) + '-' + m.MatchDate.Substring(3, 2);
            string query = $@"insert into matches(matchDate,weekno,club1,club2,championshipid,stadium_id,result)
                              values ('{date}',{m.Weekno},'{m.Club1}','{m.Club2}',{m.Championshipid},{m.StadiumId},'{m.result}')";
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
        public IEnumerable<Dictionary<object,object>> getAllClubsInChampionship(SqlConnection conn, int champ_id)
        {
            string query = $@"Exec getAllClubsInChamp {champ_id}";
            SqlDataAdapter sqlDataAdapter = new SqlDataAdapter(query, conn);
            DataTable dt = new DataTable();
            sqlDataAdapter.Fill(dt);

            List<Dictionary<object, object>> d = new List<Dictionary<object, object>>();
            for (int i = 0; i < dt.Rows.Count; i++)
            {
                Dictionary<object, object> dob = new();
                dob.Add("Name", dt.Rows[i]["name"]);

                dob.Add("Logo", dt.Rows[i]["logo"]);

                dob.Add("CreatedAt", dt.Rows[i]["Created_At"]);

                dob.Add("ID", dt.Rows[i]["id"]);


                string query2 = @$"Exec TotalClubValue {Convert.ToInt32(dt.Rows[i]["id"])}";

                SqlDataAdapter sqlDataAdapter2 = new SqlDataAdapter(query2, conn);
                DataTable dt2 = new DataTable();
                sqlDataAdapter2.Fill(dt2);

                string mval = dt2.Rows[0]["marketValue"].ToString();

                dob.Add("marketValue", mval);


                query2 = @$"Exec StadiumNameID {dt.Rows[i]["stadium_home"]}";
                SqlDataAdapter sqlDataAdapter22 = new SqlDataAdapter(query2, conn);
                DataTable dt22 = new DataTable();
                sqlDataAdapter22.Fill(dt22);

                string sname = dt22.Rows[0]["Name"].ToString();
                dob.Add("stadiumHome", sname);


                d.Add(dob);
            }
            return d;
        }
        public IEnumerable<Stadium> getAllStadiums(SqlConnection conn)
        {
            string query = $@"Exec AllStadiums";
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

        public BigMatch getMatchData(SqlConnection conn, int id,int usrid)
        {
            string query = $@"select m.id,c1.id as id1,c2.id as id2,c1.name as Home,c2.name as Away,c1.logo as homepic,c2.logo as awaypic ,result,c.name
from matches m, clubs c1,clubs c2,Stadium  s,championship c
where m.id={id} and c1.name=club1 and c2.name = club2 and s.id = stadium_id and c.id = championshipid";
            SqlDataAdapter sqlDataAdapter = new SqlDataAdapter(query, conn);
            DataTable dt = new DataTable();
            sqlDataAdapter.Fill(dt);
            if(dt.Rows.Count==0)
            return null;
            BigMatch bigMatch = new BigMatch();
            bigMatch.Id = id;
            bigMatch.awaypic = Convert.ToString(dt.Rows[0]["awaypic"]);
            bigMatch.homepic = Convert.ToString(dt.Rows[0]["homepic"]);
            bigMatch.Away= Convert.ToString(dt.Rows[0]["Away"]);
            bigMatch.Home = Convert.ToString(dt.Rows[0]["Home"]);
            bigMatch.result = Convert.ToString(dt.Rows[0]["result"]);
            bigMatch.championship = Convert.ToString(dt.Rows[0]["name"]);
            int id1 = Convert.ToInt32(dt.Rows[0]["id1"]);
                int id2 = Convert.ToInt32(dt.Rows[0]["id2"]);
            List<RatedPlayer> Players1 = new List<RatedPlayer>();
            List < RatedPlayer > Players2 = new List<RatedPlayer>(); 
            query = $@"select m.Fname,m.Lname,m.Photo,P.main_position,r.rate,m.id
from match_staff m, Players P,Rating r 
where p.club_id = {id1} and m.id = p.id and r.fan_ssn={usrid} and match_id={id} and r.match_staff_ssn = m.id";
            sqlDataAdapter = new SqlDataAdapter(query, conn);
            dt = new DataTable();
            sqlDataAdapter.Fill(dt);
            for (int i = 0; i < dt.Rows.Count; i++)
            {    RatedPlayer ratedPlayer = new RatedPlayer();
                ratedPlayer.playerpic = Convert.ToString(dt.Rows[i]["Photo"]);
                ratedPlayer.Fname = Convert.ToString(dt.Rows[i]["Fname"]);
                ratedPlayer.Id = Convert.ToInt32(dt.Rows[i]["id"]);
                ratedPlayer.Lname = Convert.ToString(dt.Rows[i]["Lname"]);
                string pos = Convert.ToString(dt.Rows[i]["main_position"]);
                ratedPlayer.Position = ((pos[0] == 'G') ? "GoalKeeper" : (pos[pos.Length - 1] == 'k') ? "Defender" : ((pos[pos.Length-1]=='d')?"midfielder":"attacker"));
                ratedPlayer.rated = true;
                ratedPlayer.rating = Convert.ToDouble(dt.Rows[i]["rate"]);
                Players1.Add(ratedPlayer);
            }
            query = $@"select m.Fname,m.Lname,m.Photo,P.main_position,r.rate,m.id
from match_staff m, Players P,Rating r 
where p.club_id = {id2} and m.id = p.id and r.fan_ssn={usrid} and match_id={id} and r.match_staff_ssn = m.id";
            sqlDataAdapter = new SqlDataAdapter(query, conn);
            dt = new DataTable();
            sqlDataAdapter.Fill(dt);
            for (int i = 0; i < dt.Rows.Count; i++)
            {
                RatedPlayer ratedPlayer = new RatedPlayer();
                ratedPlayer.playerpic = Convert.ToString(dt.Rows[i]["Photo"]);
                ratedPlayer.Fname = Convert.ToString(dt.Rows[i]["Fname"]);
                ratedPlayer.Id = Convert.ToInt32(dt.Rows[i]["id"]);
                ratedPlayer.Lname = Convert.ToString(dt.Rows[i]["Lname"]);
                string pos = Convert.ToString(dt.Rows[i]["main_position"]);
                ratedPlayer.Position = ((pos[0] == 'G') ? "GoalKeeper" : (pos[pos.Length - 1] == 'k') ? "Defender" : ((pos[pos.Length - 1] == 'd') ? "midfielder" : "attacker"));
                ratedPlayer.rated = true;
                ratedPlayer.rating = Convert.ToDouble(dt.Rows[i]["rate"]);
                Players2.Add(ratedPlayer);
            }
            query = $@"select m.Fname,m.Lname,m.Photo,P.main_position ,m.id
from match_staff m, Players P
where p.club_id = {id1} and m.id = p.id and m.id 
not in
(select m.id
from match_staff m, Players P,Rating r 
where p.club_id = {id1} and m.id = p.id and r.fan_ssn={usrid} and match_id={id} and r.match_staff_ssn = m.id);";
            sqlDataAdapter = new SqlDataAdapter(query, conn);
            dt = new DataTable();
            sqlDataAdapter.Fill(dt);
            for (int i = 0; i < dt.Rows.Count; i++)
            {
                RatedPlayer ratedPlayer = new RatedPlayer();
                ratedPlayer.playerpic = Convert.ToString(dt.Rows[i]["Photo"]);
                ratedPlayer.Fname = Convert.ToString(dt.Rows[i]["Fname"]);
                ratedPlayer.Id = Convert.ToInt32(dt.Rows[i]["id"]);
                ratedPlayer.Lname = Convert.ToString(dt.Rows[i]["Lname"]);
                string pos = Convert.ToString(dt.Rows[i]["main_position"]);
                ratedPlayer.Position = ((pos[0]== 'G') ? "GoalKeeper" : (pos[pos.Length - 1] == 'k') ? "Defender" : ((pos[pos.Length - 1] == 'd') ? "midfielder" : "attacker"));
                ratedPlayer.rated = false;
                ratedPlayer.rating = 0;
                Players1.Add(ratedPlayer);
            }
            query = $@"select m.Fname,m.Lname,m.Photo,P.main_position ,m.id
from match_staff m, Players P
where p.club_id = {id2} and m.id = p.id and m.id 
not in
(select m.id
from match_staff m, Players P,Rating r 
where p.club_id = {id2} and m.id = p.id and r.fan_ssn={usrid} and match_id={id} and r.match_staff_ssn = m.id);";
            sqlDataAdapter = new SqlDataAdapter(query, conn);
            dt = new DataTable();
            sqlDataAdapter.Fill(dt);
            for (int i = 0; i < dt.Rows.Count; i++)
            {
                RatedPlayer ratedPlayer = new RatedPlayer();
                ratedPlayer.playerpic = Convert.ToString(dt.Rows[i]["Photo"]);
                ratedPlayer.Fname = Convert.ToString(dt.Rows[i]["Fname"]);
                ratedPlayer.Id = Convert.ToInt32(dt.Rows[i]["id"]);
                ratedPlayer.Lname = Convert.ToString(dt.Rows[i]["Lname"]);
                string pos = Convert.ToString(dt.Rows[i]["main_position"]);
                ratedPlayer.Position = ((pos[0] == 'G') ? "GoalKeeper" : (pos[pos.Length - 1] == 'k') ? "Defender" : ((pos[pos.Length - 1] == 'd') ? "midfielder" : "attacker"));
                ratedPlayer.rated = false;
                ratedPlayer.rating = 0;
                Players2.Add(ratedPlayer);
            }
            bigMatch.homeplayers = Players1;
            bigMatch.awayplayers = Players2;
            
            return bigMatch;
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

        public int addChamp(SqlConnection conn, Championship champ, int lorc)
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
                string ggt = $@"select id from championship where name='{champ.Name}'";
                SqlDataAdapter sqlDataAdapter3 = new SqlDataAdapter(ggt, conn);
                DataTable dt3 = new DataTable();
                sqlDataAdapter3.Fill(dt3);
                int chid = Convert.ToInt32(dt3.Rows[0]["id"]);
                string ss;
                if(lorc==1)
                {
                    ss = $@"insert into league values ({chid}) ";
                    SqlCommand sqlCommand2 = new SqlCommand(ss, conn);
                    sqlCommand2.ExecuteNonQuery();
                }
                else
                {
                    ss = $@"insert into cup values ({chid}) ";
                    SqlCommand sqlCommand2 = new SqlCommand(ss, conn);
                    sqlCommand2.ExecuteNonQuery();
                }
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

        public IEnumerable<Player> addPlayer(SqlConnection conn,int clubID, Player player)
        {
            bool nationalityValid = checkWord(player.Nationality);
            bool FnameValid = checkWord(player.Fname);
            bool LnameValid = checkWord(player.Lname);
            bool positionValid = checkWord(player.MainPosition);
            bool footValid = checkWord(player.Foot);
            List<Player> list = new List<Player>();

            if (nationalityValid && FnameValid && LnameValid && positionValid && footValid)
            {
                string query = @$"Exec AddPlayer '{player.Birthdate}','{player.Nationality}','{player.Photo}','{player.Fname}','{player.Lname}',{clubID},{Convert.ToDecimal(player.Height)},{player.MarketValue},'{player.MainPosition}',{player.TShirtNumber},'{player.Foot}'";
                SqlDataAdapter sqlDataAdapter = new SqlDataAdapter(query, conn);
                DataTable dataTable = new();
                sqlDataAdapter.Fill(dataTable);
                player.Id = Convert.ToInt32(dataTable.Rows[0]["id"]);
                player.ClubId = Convert.ToInt32(dataTable.Rows[0]["club_id"]);
                list.Add(player);
                return list;
            }
            else
                return list;
        }
        public int deletePlayer(SqlConnection conn,int playerId)
        {
            string query = @$"Delete from Match_staff where id = {playerId}; ";
            SqlCommand sqlCommand = new SqlCommand(query, conn);
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



        public IEnumerable<Dictionary<object, object>> getAllJournalists(SqlConnection conn)

        {
            string query = $@"select Fname, Lname, journalists.ssn,journalists.Agency 
from journalists, Users
where journalists.ssn=Users.ssn";
            SqlDataAdapter sqlDataAdapter = new SqlDataAdapter(query, conn);
            DataTable dt = new DataTable();
            sqlDataAdapter.Fill(dt);
            List<Dictionary<object, object>> list = new List<Dictionary<object, object>>();
            for (int i = 0; i < dt.Rows.Count; i++)
            {
                Dictionary<object, object> j = new Dictionary<object, object>();
                j.Add("id", Convert.ToInt32(dt.Rows[i]["ssn"]));
                j.Add("fname", Convert.ToString(dt.Rows[i]["Fname"]));
                j.Add("lname", Convert.ToString(dt.Rows[i]["Lname"]));
                j.Add("agency", Convert.ToString(dt.Rows[i]["Agency"]));
                list.Add(j);
            }

            return list;
        }

        public IEnumerable<Coach> addCoach(SqlConnection conn, int clubID , Coach coach)
        {
            bool nationalityValid = checkWord(coach.Nationality);
            bool FnameValid = checkWord(coach.Fname);
            bool LnameValid = checkWord(coach.Lname);
            List<Coach> list = new List<Coach>();
            if (nationalityValid && FnameValid && LnameValid)
            {
                string query = $@"Select * from Match_staff m,Coaches c where c.id = m.id and m.Fname='{coach.Fname}'and m.Lname ='{coach.Lname}' and m.Birthdate = '{coach.Birthdate}'";
                SqlDataAdapter sqlDataAdapter = new SqlDataAdapter(query, conn);
                DataTable dataTable = new();
                sqlDataAdapter.Fill(dataTable);
                if (dataTable.Rows.Count == 0)
                {
                    coach.ClubId = clubID;
                    query = $@"insert into Match_Staff(Birthdate,Nationality,Fname,Lname";

                    string values = $@" values('{coach.Birthdate}' ,'{coach.Nationality}','{coach.Fname}','{coach.Lname}' ";
                    if (coach.Photo != null)
                    {
                        query += ",Photo";
                        values += @$",'{coach.Photo}'";
                    }
                    query += ") " + values + ");";
                    SqlCommand sqlCommand = new SqlCommand(query, conn);
                    sqlCommand.ExecuteNonQuery();
                    query = "Select max(id) from Match_staff";
                    sqlCommand.CommandText = query;
                    int id = Convert.ToInt32(sqlCommand.ExecuteScalar());

                    coach.Id = id;

                    query = $@"insert into Coaches (id,club_id";
                    values = $@" values({id},{clubID} ";
                    if (coach.TeamManagedNo != null)
                    {
                        query += ",Team_managed_no";
                        values += @$",{coach.TeamManagedNo}";
                    }
                    query += ")" + values + ")";

                    sqlCommand.CommandText = query;

                    sqlCommand.ExecuteNonQuery();
                    list.Add(coach);
                }
                else
                {
                    coach.Id = Convert.ToInt32(dataTable.Rows[0]["id"]);
                    list.Add(coach);
                }
            }
            return list;
           
        }

        public int deleteCoach(SqlConnection conn, int coachId)
        {
            string query = @$"Delete from Match_staff where id = {coachId}; ";
            SqlCommand sqlCommand = new SqlCommand(query, conn);
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

        public IEnumerable<Dictionary<object, object>> getOneStore(SqlConnection conn, int stad_id)
        {
            string query = $"select * from store where stadium_id ={stad_id}";
            SqlDataAdapter sqlDataAdapter = new SqlDataAdapter(query, conn);
            DataTable dt = new DataTable();
            sqlDataAdapter.Fill(dt);
            List<Dictionary<object, object>> list = new List<Dictionary<object, object>>();
            for (int i = 0; i < dt.Rows.Count; i++)
            {
                Dictionary<object, object> st = new Dictionary<object, object>();

                st.Add("profit", Convert.ToInt32(dt.Rows[i]["profit"]));
                st.Add("stadium_id", Convert.ToInt32(dt.Rows[i]["stadium_id"]));
                string query2 = @$"select Name from Stadium where id ={Convert.ToInt32(dt.Rows[i]["stadium_id"])}";

                SqlDataAdapter sqlDataAdapter2 = new SqlDataAdapter(query2, conn);
                DataTable dt2 = new DataTable();
                sqlDataAdapter2.Fill(dt2);

                st.Add("Name", dt2.Rows[0]["Name"]);

                list.Add(st);
            }

            return list;
        }

        public IEnumerable<Dictionary<object,object>>getAllStores(SqlConnection conn)
        {
            string query = $"select * from store ";
            SqlDataAdapter sqlDataAdapter = new SqlDataAdapter(query, conn);
            DataTable dt = new DataTable();
            sqlDataAdapter.Fill(dt);
            List< Dictionary<object, object> > list = new ();
            for (int i = 0; i < dt.Rows.Count; i++)
            {
             Dictionary<object,object> st= new Dictionary<object,object>();

                st.Add("profit", Convert.ToInt32(dt.Rows[i]["profit"]));
                st.Add("stadium_id", Convert.ToInt32(dt.Rows[i]["stadium_id"]));
                string query2 = @$"select Name from Stadium where id ={Convert.ToInt32(dt.Rows[i]["stadium_id"])}";

                SqlDataAdapter sqlDataAdapter2 = new SqlDataAdapter(query2, conn);
                DataTable dt2 = new DataTable();
                sqlDataAdapter2.Fill(dt2);

                st.Add("Name", dt2.Rows[0]["Name"]);

                list.Add(st);
            }

            return list;
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
                     , item_image = '{item.ItemImage}' where id = {id}";

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

                champ.StartingAt = dt.Rows[i]["StartingAt"].ToString()!;
                champ.EndingAt = dt.Rows[i]["EndingAt"].ToString()!;
                champ.Name = Convert.ToString(dt.Rows[i]["Name"]);
                champ.NoMatches = Convert.ToInt32(dt.Rows[i]["no_matches"]);
                list.Add(champ);
            }
            return list;
        }

        public IEnumerable<MiniMatch> getMatchesByDate(SqlConnection conn, string date)
        {
            string query = @$"select m.id,c1.name as Home,c2.name as Away,c1.logo as homepic,c2.logo as awaypic ,result,c.name
from matches m, clubs c1,clubs c2,Stadium  s,championship c
where matchDate = '{date}' and c1.name=club1 and c2.name = club2 and s.id = stadium_id and c.id = championshipid";

            SqlDataAdapter sqlDataAdapter = new SqlDataAdapter(query, conn);
            DataTable dt = new DataTable();
            sqlDataAdapter.Fill(dt);
            List<MiniMatch> list = new List<MiniMatch>();
            for (int i = 0; i < dt.Rows.Count; i++)
            {
                MiniMatch match = new MiniMatch();
                match.Id = Convert.ToInt32(dt.Rows[i]["id"]);


                match.Home = Convert.ToString(dt.Rows[i]["Home"]);
                match.Away = Convert.ToString(dt.Rows[i]["Away"]);

                match.homepic = Convert.ToString(dt.Rows[i]["homepic"]);
                match.awaypic = Convert.ToString(dt.Rows[i]["awaypic"]);


                match.Championship = Convert.ToString(dt.Rows[i]["name"]);

                if (dt.Rows[i]["result"].ToString() != "")
                    match.result = dt.Rows[i]["result"].ToString();
                else
                    match.result = " - ";

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

        public IEnumerable<Dictionary<object,object>> getAllClubs(SqlConnection conn)
        {
            string query = $@"Select * from clubs";
            SqlDataAdapter sqlDataAdapter = new SqlDataAdapter(query, conn);
            DataTable dt = new DataTable();
            sqlDataAdapter.Fill(dt);
            
            
            List<Dictionary<object, object>> d = new List<Dictionary<object, object>>();
            for (int i = 0; i < dt.Rows.Count; i++)
            {
                Dictionary<object, object> dob = new();
                dob.Add("Name", dt.Rows[i]["name"]);

                dob.Add("Logo", dt.Rows[i]["logo"]);

                dob.Add("CreatedAt", dt.Rows[i]["Created_At"]);

                dob.Add("ID", dt.Rows[i]["id"]);

                string query2 = @$"select sum(Market_value) as marketValue from Players where club_id = {Convert.ToInt64(dt.Rows[i]["id"])}";

                SqlDataAdapter sqlDataAdapter2 = new SqlDataAdapter(query2, conn);
                DataTable dt2 = new DataTable();
                sqlDataAdapter2.Fill(dt2);

                string mval = dt2.Rows[0]["marketValue"].ToString();

                dob.Add("marketValue", mval);


                query2 = @$"select Name from Stadium  where id = {dt.Rows[i]["stadium_home"]}";
                SqlDataAdapter sqlDataAdapter22 = new SqlDataAdapter(query2, conn);
                DataTable dt22 = new DataTable();
                sqlDataAdapter22.Fill(dt22);

                string sname = dt22.Rows[0]["Name"].ToString();
                dob.Add("stadiumHome", sname);


                d.Add(dob);
            }
            return d;
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

            sqlCommand.ExecuteNonQuery();
            query = "Select max(id) from STADIUM";
            sqlCommand.CommandText = query;
            stadium.Id = Convert.ToInt32(sqlCommand.ExecuteScalar());
            return stadium.Id!=0? 1 : 0;
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

        public StoreItem addStoreItem(SqlConnection sqlConnection, StoreItem storeItem)
        {
            string query = $@"Insert into Store_items Values({storeItem.StadiumId},{storeItem.ItemId},{storeItem.Qty})";
            SqlCommand sqlCommand = new SqlCommand(query, sqlConnection);
            sqlCommand.ExecuteNonQuery();

            return storeItem;
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
            question.title = dt.Rows[0]["Question_content"].ToString();
            question.choices[0] = dt.Rows[0]["answer1"].ToString();
            question.choices[1] = dt.Rows[0]["answer2"].ToString();
            question.choices[2] = dt.Rows[0]["answer3"].ToString();
            question.choices[3] = dt.Rows[0]["answer4"].ToString();
            question.TheCorrectAnswer = dt.Rows[0]["the_correct_answer"].ToString();
            question.QuizId = Convert.ToInt32(dt.Rows[0]["quiz_id"]);
            questions.Add(question);
            return questions;
        }

        public IEnumerable<Dictionary<Object, Object>> TopGoals(SqlConnection sqlConnection,int champId)
        {
            string query = $@"SELECT * FROM STATS where championship_id={champId} ORDER BY GOALS DESC";
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
                row["PlayerId"] = dt.Rows[i]["Player_id"];
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

        public IEnumerable<Dictionary<Object, Object>> TopAssists(SqlConnection sqlConnection,int champId)
        {
            string query = $@"SELECT * FROM STATS where championship_id={champId} ORDER BY ASSISTS DESC ";
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
                row["PlayerId"] = dt.Rows[i]["Player_id"];
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

        public IEnumerable<StatPlayer> getstatplayers(SqlConnection conn,int clubId)
        {
            string query = $@"(
SELECT  c.name,p.id,m.Fname,m.Lname,sum(goals) as goals,sum(assists) as assists,sum(tackles) as tackles,sum(clean_sheets) as cleansheets,sum(saves) as saves , avg(r.rate) as rating
FROM players p,STATS,clubs c,match_staff m ,Rating r
where  club_id={clubId} and club_id=c.id and r.match_staff_ssn=p.id and m.id = p.id and championship_id=1 and player_id = p.id group by c.name,p.id,m.Fname,m.Lname 
 
 )
 UNION
 (
SELECT  c.name,p.id,m.Fname,m.Lname,sum(goals) as goals,sum(assists) as assists,sum(tackles) as tackles,sum(clean_sheets) as cleansheets,sum(saves) as saves , 0 as rating
FROM players p,STATS,clubs c,match_staff m ,Rating r
where  club_id={clubId} and club_id=c.id and  m.id = p.id and championship_id=1 and player_id = p.id  and p.id not in(SELECT  p.id FROM players p,STATS,clubs c,match_staff m ,Rating r
where  club_id={clubId} and club_id=c.id and r.match_staff_ssn=p.id and m.id = p.id and championship_id=1 and player_id = p.id 
 ) group by c.name,p.id,m.Fname,m.Lname
)
ORDER BY rating DESC";
            SqlDataAdapter sqlDataAdapter = new SqlDataAdapter(query,conn);
            DataTable dt = new DataTable();
            sqlDataAdapter.Fill(dt);
            List<StatPlayer> list = new List<StatPlayer>();
            for(int i=0;i<dt.Rows.Count;i++)
            {
                StatPlayer statPlayer = new StatPlayer();
                statPlayer.Name = Convert.ToString(dt.Rows[i]["name"]);
                statPlayer.Fname = Convert.ToString(dt.Rows[i]["Fname"]);
                statPlayer.Lname = Convert.ToString(dt.Rows[i]["Lname"]);
                statPlayer.Id = Convert.ToInt32(dt.Rows[i]["id"]);
                statPlayer.goals = Convert.ToInt32(dt.Rows[i]["goals"]);
                statPlayer.assists = Convert.ToInt32(dt.Rows[i]["assists"]);
                statPlayer.tackles = Convert.ToInt32(dt.Rows[i]["tackles"]);
                statPlayer.cleansheets = Convert.ToInt32(dt.Rows[i]["cleansheets"]);
                statPlayer.saves = Convert.ToInt32(dt.Rows[i]["saves"]);
                statPlayer.rating = Convert.ToDouble(dt.Rows[i]["rating"]);
                list.Add(statPlayer);
            }
            return list;
        }

        public IEnumerable<StatClub> getstatclubs(SqlConnection conn)
        {

           string query = $@"SELECT  c.name,c.id,sum(goals) as goals,sum(assists) as assists,sum(tackles) as tackles,sum(clean_sheets) as cleansheets,sum(saves) as saves 
FROM players p,STATS,clubs c 
where club_id=c.id and championship_id=1 and player_id = p.id group by c.id,c.name ORDER BY sum(GOALS) DESC";
            SqlDataAdapter sqlDataAdapter = new SqlDataAdapter(query,conn);
            DataTable dt = new DataTable();
            sqlDataAdapter.Fill(dt);
            List<StatClub> list = new List<StatClub>();
            for(int i=0;i<dt.Rows.Count;i++)
            {
                StatClub statClub = new StatClub();
                statClub.Name = Convert.ToString(dt.Rows[i]["Name"]);
                statClub.Id = Convert.ToInt32(dt.Rows[i]["id"]);
                statClub.goals = Convert.ToInt32(dt.Rows[i]["goals"]);
                statClub.assists = Convert.ToInt32(dt.Rows[i]["assists"]);
                statClub.tackles = Convert.ToInt32(dt.Rows[i]["tackles"]);
                statClub.Cleansheets = Convert.ToInt32(dt.Rows[i]["cleansheets"]);
                statClub.Saves = Convert.ToInt32(dt.Rows[i]["saves"]);
                list.Add(statClub);
            }
            return list;
        }

        public IEnumerable<Dictionary<Object, Object>> TopSaves(SqlConnection sqlConnection,int champId)
        {
             string query = $@"Exec TopSaves";
           SqlDataAdapter adapter = new SqlDataAdapter(query, sqlConnection);
            DataTable dt = new();
            adapter.Fill(dt);
            List<Dictionary<Object, Object>> stats = new List<Dictionary<Object, Object>>();
            for (int i = 0; i < 10 && i < dt.Rows.Count; i++)
            {
                query = $@"Exec FullName {Convert.ToInt32(dt.Rows[i]["Player_id"])}";
                SqlCommand sqlCommand = new SqlCommand(query, sqlConnection);
                string playerName = sqlCommand.ExecuteScalar().ToString()!;
                Dictionary<Object, Object> row = new();
                row["ChampionshipId"] = dt.Rows[i]["Championship_ID"];
                row["PlayerId"] = dt.Rows[i]["Player_id"];
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

        public IEnumerable<Dictionary<Object, Object>> TopTackles(SqlConnection sqlConnection,int champId)
        {
            string query = $@"Exec TopTackles";
            SqlDataAdapter adapter = new SqlDataAdapter(query, sqlConnection);
            DataTable dt = new();
            adapter.Fill(dt);
            List<Dictionary<Object, Object>> stats = new List<Dictionary<Object, Object>>();
            for (int i = 0; i < 10 && i < dt.Rows.Count; i++)
            {
                query = $@"Exec FullName {Convert.ToInt32(dt.Rows[i]["Player_id"])}";
                SqlCommand sqlCommand = new SqlCommand(query, sqlConnection);
                string playerName = sqlCommand.ExecuteScalar().ToString()!;
                Dictionary<Object, Object> row = new();
                row["ChampionshipId"] = dt.Rows[i]["Championship_ID"];
                row["PlayerId"] = dt.Rows[i]["Player_id"];
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

        public IEnumerable<Dictionary<Object, Object>> TopCleanSheets(SqlConnection sqlConnection,int champId)
        {
            string query = $@"SELECT * FROM STATS where championship_id={champId} ORDER BY CLEAN_SHEETS DESC ";
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
                row["PlayerId"] = dt.Rows[i]["Player_id"];
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
            string query = $@"Select article_id,Count(article_id) as total,Name  from likes,Articles where article_id = id group by article_id,Name order by total desc";
            DataTable dt = new DataTable();
            SqlDataAdapter adapter = new SqlDataAdapter(query, sqlConnection);
            adapter.Fill(dt);
            List<Dictionary<Object, Object>> likes = new List<Dictionary<Object, Object>>();
            for (int i = 0; i < 5 && i < dt.Rows.Count; i++)
            {
                Dictionary<Object, Object> row = new Dictionary<Object, Object>();
                row["ArticleName"] = dt.Rows[i]["Name"];
                row["Likes"] = dt.Rows[i]["total"];
                likes.Add(row);
            }
            return likes;
        }

        public IEnumerable<OutQuiz> AllQuizzes(SqlConnection sqlConnection)
        {
            string query = $@"select qu.id,u.Fname+' '+u.Lname as journalist, qu.name,count(quests.id) as qno
from journalists j ,quizzes qu,Users u,Questions quests
where j.ssn = qu.journalist_ssn and u.ssn = j.ssn group by qu.id,u.Fname,u.lname,qu.name";
            SqlDataAdapter sqlDataAdapter = new SqlDataAdapter(query, sqlConnection);
            DataTable dt = new DataTable();
            sqlDataAdapter.Fill(dt);
            List<OutQuiz> list = new List<OutQuiz>();
            for (int i = 0; i < dt.Rows.Count; i++)
            {
                OutQuiz quiz = new OutQuiz();
                quiz.Id = Convert.ToInt32(dt.Rows[i]["id"]);
                quiz.Name = Convert.ToString(dt.Rows[i]["name"]);
                quiz.qno = Convert.ToInt32(dt.Rows[i]["qno"]);
                quiz.maxp = quiz.qno * 10;
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

        public IEnumerable<Dictionary<object, object>> getClubPlayers(SqlConnection conn, int clubid)
        {

            string query1 = $@"select * from Players p where p.club_id = {clubid}";

            SqlDataAdapter sqlDataAdapter = new SqlDataAdapter(query1, conn);
            DataTable dt = new DataTable();
            sqlDataAdapter.Fill(dt);


         
            List<Dictionary<object, object>> d = new List<Dictionary<object, object>>();
            for (int i = 0; i < dt.Rows.Count; i++)
            {
                Dictionary<object, object> dob = new();

                int id = Convert.ToInt32(dt.Rows[i]["id"]);

                dob.Add("id", id);

                dob.Add("club_id", Convert.ToInt32(dt.Rows[i]["club_id"]));

                dob.Add("Height", Convert.ToInt32(dt.Rows[i]["Height"]));

                dob.Add("marketValue", Convert.ToInt32(dt.Rows[i]["Market_value"]));

                dob.Add("mainPosition", dt.Rows[i]["main_position"].ToString());

                dob.Add("T-Shirt-Number", Convert.ToInt32(dt.Rows[i]["T_shirt_Number"]));

                dob.Add("foot", Convert.ToString(dt.Rows[i]["foot"]));

                string query = @$"select concat (Fname,' ',Lname) as Name from match_staff as m where id={id}";
                SqlDataAdapter sqlDataAdapter2 = new SqlDataAdapter(query, conn);
                DataTable dt2 = new DataTable();
                sqlDataAdapter2.Fill(dt2);

                dob.Add("Name", dt2.Rows[0]["Name"].ToString());
                d.Add(dob);
            }
            return d;
        }

        public IEnumerable<Dictionary<object, object>> getOneClub(SqlConnection conn, int id)
        {
            string query = @$"select * from clubs where id = {id}";
            SqlDataAdapter sqlDataAdapter = new SqlDataAdapter(query, conn);
            DataTable dt = new DataTable();
            sqlDataAdapter.Fill(dt);


            List<Dictionary<object, object>> d = new List<Dictionary<object, object>>();
            for (int i = 0; i < dt.Rows.Count; i++)
            {
                Dictionary<object, object> dob = new();
                dob.Add("Name", dt.Rows[i]["name"]);

                dob.Add("Logo", dt.Rows[i]["logo"]);

                dob.Add("CreatedAt", dt.Rows[i]["Created_At"]);

                dob.Add("ID", dt.Rows[i]["id"]);


                string query2 = @$"select sum(Market_value) as marketValue from Players where club_id = {Convert.ToInt64(dt.Rows[i]["id"])}";

                SqlDataAdapter sqlDataAdapter2 = new SqlDataAdapter(query2, conn);
                DataTable dt2 = new DataTable();
                sqlDataAdapter2.Fill(dt2);

                string mval = dt2.Rows[0]["marketValue"].ToString();

                dob.Add("marketValue", mval);


                query2 = @$"select Name from Stadium  where id = {dt.Rows[i]["stadium_home"]}";
                SqlDataAdapter sqlDataAdapter22 = new SqlDataAdapter(query2, conn);
                DataTable dt22 = new DataTable();
                sqlDataAdapter22.Fill(dt22);

                string sname = dt22.Rows[0]["Name"].ToString();
                dob.Add("stadiumHome", sname);


                d.Add(dob);
            }
            return d;

        }

        public IEnumerable<Championship> getAllCurrentChampiopnship(SqlConnection conn)
        {
            DateTime d = DateTime.Now;
            string date = d.ToString();




            string query = @"select * from championship";
            SqlDataAdapter sqlDataAdapter = new SqlDataAdapter(query, conn);
            DataTable dt = new DataTable();
            sqlDataAdapter.Fill(dt);
            List<Championship> list = new List<Championship>();
            for (int i = 0; i < dt.Rows.Count; i++)
            {
                Championship champ = new Championship();
                champ.Id = Convert.ToInt32(dt.Rows[i]["Id"]);

                champ.StartingAt = dt.Rows[i]["StartingAt"].ToString()!;
                string checkdate = Convert.ToString(dt.Rows[i]["EndingAt"]);
                if (checkDate(checkdate,date)==0) continue;
                champ.EndingAt = dt.Rows[i]["EndingAt"].ToString()!;
                champ.Name = Convert.ToString(dt.Rows[i]["Name"]);
                champ.NoMatches = Convert.ToInt32(dt.Rows[i]["no_matches"]);

                champ.Logo = dt.Rows[i]["logo"].ToString();
                list.Add(champ);
            }
            return list;
        }

        public IEnumerable<Dictionary<object,object>> getAllFinishedMatches(SqlConnection conn)
        {
            DateTime d = DateTime.Now;
            string date = d.ToString();




            string query = @"select * from matches";
            SqlDataAdapter sqlDataAdapter = new SqlDataAdapter(query, conn);
            DataTable dt = new DataTable();
            sqlDataAdapter.Fill(dt);

            List<Dictionary<object, object>> list = new List<Dictionary<object, object>>();
            for (int i = 0; i < dt.Rows.Count; i++)
            {
                if (checkDate(date, Convert.ToString(dt.Rows[i]["matchDate"]))==1)
                {
                    Dictionary<object, object> match = new Dictionary<object, object>();
                    match.Add("id", Convert.ToInt32(dt.Rows[i]["id"]));


                    match.Add("matchDate", Convert.ToString(dt.Rows[i]["matchDate"]));

                    match.Add("club1", Convert.ToString(dt.Rows[i]["club1"]));


                    match.Add("club2", Convert.ToString(dt.Rows[i]["club2"]));
                    if (dt.Rows[i]["weekno"].ToString() != "")
                        match.Add("weekno", Convert.ToInt32(dt.Rows[i]["weekno"]));
                    else
                        match.Add("weekno", "NULL");

                    match.Add("stadium_id", Convert.ToInt32(dt.Rows[i]["stadium_id"]));

                    match.Add("championshipid", Convert.ToInt32(dt.Rows[i]["championshipid"]));

                    match.Add("result", Convert.ToString(dt.Rows[i]["result"]));

                    int stid = Convert.ToInt32(dt.Rows[i]["stadium_id"]);

                    int chmpid = Convert.ToInt32(dt.Rows[i]["championshipid"]);

                    string query1 = @$"select Name from Stadium where id ={stid}";

                    string query2 = $@"select name from championship where id ={chmpid}";

                    SqlDataAdapter sqlDataAdapter2 = new SqlDataAdapter(query1, conn);
                    DataTable dt2 = new DataTable();
                    sqlDataAdapter2.Fill(dt2);

                    match.Add("stadiumName", dt2.Rows[0]["Name"].ToString());


                    SqlDataAdapter sqlDataAdapter3 = new SqlDataAdapter(query2, conn);
                    DataTable dt3 = new DataTable();
                    sqlDataAdapter3.Fill(dt3);


                    match.Add("championshipName", dt3.Rows[0]["name"].ToString());

                    list.Add(match);

                }
            }
            return list;
        }
        public IEnumerable<Dictionary<object, object>> getAllCurrentMatches(SqlConnection conn)
        {
            DateTime d = DateTime.Now;
            string date = d.ToString();




            string query = @"select * from matches";
            SqlDataAdapter sqlDataAdapter = new SqlDataAdapter(query, conn);
            DataTable dt = new DataTable();
            sqlDataAdapter.Fill(dt);
            List<Dictionary<object, object>> list = new List<Dictionary<object, object>>();
            for (int i = 0; i < dt.Rows.Count; i++)
            {
                if (checkDate(date, Convert.ToString(dt.Rows[i]["matchDate"])) == 0)
                {
                    Dictionary<object, object> match = new Dictionary<object, object>();
                    match.Add("id", Convert.ToInt32(dt.Rows[i]["id"]));


                    match.Add("matchDate", Convert.ToString(dt.Rows[i]["matchDate"]));

                    match.Add("club1", Convert.ToString(dt.Rows[i]["club1"]));


                    match.Add("club2", Convert.ToString(dt.Rows[i]["club2"]));
                    if (dt.Rows[i]["weekno"].ToString() != "")
                        match.Add("weekno", Convert.ToInt32(dt.Rows[i]["weekno"]));
                    else
                        match.Add("weekno", "NULL");

                    match.Add("stadium_id", Convert.ToInt32(dt.Rows[i]["stadium_id"]));

                    match.Add("championshipid", Convert.ToInt32(dt.Rows[i]["championshipid"]));

                    match.Add("result", Convert.ToString(dt.Rows[i]["result"]));

                    int stid = Convert.ToInt32(dt.Rows[i]["stadium_id"]);

                    int chmpid = Convert.ToInt32(dt.Rows[i]["championshipid"]);

                    string query1 = @$"select Name from Stadium where id ={stid}";

                    string query2 = $@"select name from championship where id ={chmpid}";

                    SqlDataAdapter sqlDataAdapter2 = new SqlDataAdapter(query1, conn);
                    DataTable dt2 = new DataTable();
                    sqlDataAdapter2.Fill(dt2);

                    match.Add("stadiumName", dt2.Rows[0]["Name"].ToString());


                    SqlDataAdapter sqlDataAdapter3 = new SqlDataAdapter(query2, conn);
                    DataTable dt3 = new DataTable();
                    sqlDataAdapter3.Fill(dt3);


                    match.Add("championshipName", dt3.Rows[0]["name"].ToString());

                    list.Add(match);

                }
            }
            return list;
        }


        public AnsweringQuiz getQuizById(SqlConnection conn, int id)
        {
            string query = @$"select name
from quizzes
where id = {id}";
            SqlDataAdapter sqlDataAdapter = new SqlDataAdapter(query, conn);
            DataTable dt = new DataTable();
            sqlDataAdapter.Fill(dt);
            List<AnsweringQuiz> list = new List<AnsweringQuiz>();
            
                AnsweringQuiz quiz = new AnsweringQuiz();
                quiz.Id = id;
                quiz.Name = Convert.ToString(dt.Rows[0]["name"]);
            query = $@"select q.question_content,q.answer1,q.answer2,q.answer3,q.answer4
from Questions q, quizzes qui
where qui.id=q.quiz_id and qui.id = {id}";
            dt = new DataTable();
            sqlDataAdapter = new SqlDataAdapter(query, conn);
            sqlDataAdapter.Fill(dt);
                List<ExamQuestion> examQuestions = new List<ExamQuestion>();
            for(int i=0;i<dt.Rows.Count; i++)
            {
                ExamQuestion examQuestion = new ExamQuestion();
                examQuestion.title = Convert.ToString(dt.Rows[i]["question_content"]);
                examQuestion.choices.Add(Convert.ToString(dt.Rows[i]["answer1"]));
                examQuestion.choices.Add(Convert.ToString(dt.Rows[i]["answer2"]));
                examQuestion.choices.Add(Convert.ToString(dt.Rows[i]["answer3"]));
                examQuestion.choices.Add(Convert.ToString(dt.Rows[i]["answer4"]));
                examQuestions.Add(examQuestion);

            }
            quiz.questions = examQuestions;
            return quiz;
        }

        public int addResultToFinishedMatch(SqlConnection conn, int id, string result)
        {
            string query = @$"update matches set result='{result}' where id ={id}";

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

        public IEnumerable<Article> artsbyssn(SqlConnection conn,int ssn)
        {
            string query = $@"select Name as id,title,picture as img from Articles where Journalist_ssn = {ssn}";
            SqlDataAdapter sqlDataAdapter = new SqlDataAdapter(query,conn);
            DataTable dt = new DataTable();
            sqlDataAdapter.Fill(dt);
            List<Article> list = new List<Article>();
            for(int i=0;i<dt.Rows.Count;i++)
            {
                Article article = new Article();
                article.Name = Convert.ToString(dt.Rows[i]["id"]);
                article.title = Convert.ToString(dt.Rows[i]["title"]);
                article.img = Convert.ToString(dt.Rows[i]["img"]);
                list.Add(article);
            }
            return list;

        }

        public int setQuizState(SqlConnection conn, int id, int state)
        {

            int s = state == 1 ? 1 : 0;
            string query = @$"update quizzes set state = {s} where id ={id}";


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

        public IEnumerable<Article> getArticles(SqlConnection conn, int jourID)
        {
            string query = $@"Select count(ssn) from journalists where ssn ={jourID}";
            SqlCommand sqlCommand = new SqlCommand(query, conn);
            int x = Convert.ToInt32(sqlCommand.ExecuteScalar());
            List<Article> list = new List<Article>();
            if (x == 1)
            {
                query = $@"Select * from Articles where journalist_ssn = {jourID}";
                sqlCommand.CommandText = query;
                SqlDataAdapter sqlDataAdapter = new SqlDataAdapter(query, conn);
                DataTable dt = new();
                sqlDataAdapter.Fill(dt);

                for (int i = 0; i < dt.Rows.Count; i++)
                {
                    Article article = new Article();
                    article.Name = dt.Rows[i]["Name"].ToString()!;
                    article.JournalistSsn = jourID;
                    article.articleDate = dt.Rows[i]["ArticlesDate"].ToString()!;
                    list.Add(article);
                }
            }
            return list;
        }

       public IEnumerable<MiniMatch> getMatchesToday(SqlConnection conn)
       {
            DateTime date = DateTime.Now;
            string d=Convert.ToString(date);

            string query = @$"select m.id,c1.name as Home,c2.name as Away,c1.logo as homepic,c2.logo as awaypic ,result,c.name
from matches m, clubs c1,clubs c2,Stadium  s,championship c
where matchDate = '{d}' and c1.name=club1 and c2.name = club2 and s.id = stadium_id and c.id = championshipid";

            SqlDataAdapter sqlDataAdapter = new SqlDataAdapter(query, conn);
            DataTable dt = new DataTable();
            sqlDataAdapter.Fill(dt);
            List<MiniMatch> list = new List<MiniMatch>();
            for (int i = 0; i < dt.Rows.Count; i++)
            {
                MiniMatch match = new MiniMatch();
                match.Id=  Convert.ToInt32(dt.Rows[i]["id"]);


                match.Home =  Convert.ToString(dt.Rows[i]["Home"]);
                match.Away = Convert.ToString(dt.Rows[i]["Away"]);

                match.homepic = Convert.ToString(dt.Rows[i]["homepic"]);
                match.awaypic = Convert.ToString(dt.Rows[i]["awaypic"]);


                match.Championship = Convert.ToString(dt.Rows[i]["name"]);

                if (dt.Rows[i]["result"].ToString() != "")
                    match.result = dt.Rows[i]["result"].ToString();
                else
                    match.result = " - ";

                list.Add(match);
            }
            return list;

       }


        public bool addLike(SqlConnection conn , int fanSSN,int ArticleID)
        {
            string query = $@"select Count(*) from likes where fan_ssn={fanSSN} and article_Id = {ArticleID} ";
            SqlCommand sqlCommand= new SqlCommand(query,conn);
            int x = Convert.ToInt32( sqlCommand.ExecuteScalar());
            if(x==1)
            {
                query = @$"Delete from likes where fan_ssn={fanSSN} and article_Id = {ArticleID} ";
                sqlCommand.CommandText = query;
                sqlCommand.ExecuteNonQuery();
                return false;
            }
            else
            {
                query = @$"Insert into likes values ({fanSSN},{ArticleID}); ";
                sqlCommand.CommandText = query;
                sqlCommand.ExecuteNonQuery();
                return true;
            }
        }

        public ReservingMatch reserveMatch(SqlConnection conn,int FanSSN,int MatchId)
        {
            string query = $@"insert into Reserving_Matches values({FanSSN},{MatchId});";
            SqlCommand sqlCommand = new SqlCommand(query, conn);
            sqlCommand.ExecuteNonQuery();
            ReservingMatch reserve = new();
            reserve.FanSsn = FanSSN;
            reserve.MatchId = MatchId;
            return reserve;
        }

        public bool AnswerQuiz(SqlConnection conn, int FanSSN, int QuestionID,string answer)
        {
            string query = @$"insert into Answers Values({FanSSN},{QuestionID},'{answer}')";
            string CorrectAnswer;
            SqlCommand sqlCommand = new(query, conn);
          
            try
            {
                sqlCommand.ExecuteNonQuery();
            }
            catch(Exception ex)
            {
                return false;
            }

            try
            {
                query = $@"Select the_correct_answer from questions where id ={QuestionID}";
                sqlCommand.CommandText = query;
                CorrectAnswer = sqlCommand.ExecuteScalar().ToString()!;
            }
            catch(Exception ex)
            {
                return false;
            }

            try
            {
                if (CorrectAnswer == answer)
                {
                    query = $@"Update Fans set points = points+1 where ssn ={FanSSN} ";
                    sqlCommand.CommandText = query;
                    sqlCommand.ExecuteNonQuery();
                }
                return true;
            }
            catch(Exception ex)
            {
                return false;
            }
        }

        
        public IEnumerable<Dictionary<object,object>> getMatchesInDate(SqlConnection conn, string date)
        {
       
         
            string query = @$"select * from matches where matchDate='{date}'";

            SqlDataAdapter sqlDataAdapter = new SqlDataAdapter(query, conn);
            DataTable dt = new DataTable();
            sqlDataAdapter.Fill(dt);
            List<Dictionary<object, object>> list = new List<Dictionary<object, object>>();
            for (int i = 0; i < dt.Rows.Count; i++)
            {
                Dictionary<object, object> match = new Dictionary<object, object>();
                match.Add("id", Convert.ToInt32(dt.Rows[i]["id"]));


                match.Add("matchDate", Convert.ToString(dt.Rows[i]["matchDate"]));

                match.Add("club1", Convert.ToString(dt.Rows[i]["club1"]));


                match.Add("club2", Convert.ToString(dt.Rows[i]["club2"]));
                if (dt.Rows[i]["weekno"].ToString() != "")
                    match.Add("weekno", Convert.ToInt32(dt.Rows[i]["weekno"]));
                else
                    match.Add("weekno", "NULL");

                match.Add("stadium_id", Convert.ToInt32(dt.Rows[i]["stadium_id"]));

                match.Add("championshipid", Convert.ToInt32(dt.Rows[i]["championshipid"]));

                match.Add("result", Convert.ToString(dt.Rows[i]["result"]));

                int stid = Convert.ToInt32(dt.Rows[i]["stadium_id"]);

                int chmpid = Convert.ToInt32(dt.Rows[i]["championshipid"]);

                string query1 = @$"select Name from Stadium where id ={stid}";

                string query2 = $@"select name from championship where id ={chmpid}";

                SqlDataAdapter sqlDataAdapter2 = new SqlDataAdapter(query1, conn);
                DataTable dt2 = new DataTable();
                sqlDataAdapter2.Fill(dt2);

                match.Add("stadiumName", dt2.Rows[0]["Name"].ToString());


                SqlDataAdapter sqlDataAdapter3 = new SqlDataAdapter(query2, conn);
                DataTable dt3 = new DataTable();
                sqlDataAdapter3.Fill(dt3);


                match.Add("championshipName", dt3.Rows[0]["name"].ToString());

                list.Add(match);
            }
            return list;

        }
        
        public IEnumerable<Dictionary<object,object>> getFinishedMatchesInChamp(SqlConnection conn ,int id)
        {
            string query = @$"select * from matches where championshipid ={id}";
            SqlDataAdapter sqlDataAdapter = new SqlDataAdapter(query, conn);
            DataTable dt = new DataTable();
            sqlDataAdapter.Fill(dt);
            List<Dictionary<object, object>> list = new List<Dictionary<object, object>>();
            for (int i = 0; i < dt.Rows.Count; i++)
            {
                Dictionary<object, object> match = new Dictionary<object, object>();
                match.Add("id", Convert.ToInt32(dt.Rows[i]["id"]));


                match.Add("matchDate", Convert.ToString(dt.Rows[i]["matchDate"]));

                match.Add("club1", Convert.ToString(dt.Rows[i]["club1"]));


                match.Add("club2", Convert.ToString(dt.Rows[i]["club2"]));
                if (dt.Rows[i]["weekno"].ToString() != "")
                    match.Add("weekno", Convert.ToInt32(dt.Rows[i]["weekno"]));
                else
                    match.Add("weekno", "NULL");

                match.Add("stadium_id", Convert.ToInt32(dt.Rows[i]["stadium_id"]));

                match.Add("championshipid", Convert.ToInt32(dt.Rows[i]["championshipid"]));

                match.Add("result", Convert.ToString(dt.Rows[i]["result"]));

                int stid = Convert.ToInt32(dt.Rows[i]["stadium_id"]);

                int chmpid = Convert.ToInt32(dt.Rows[i]["championshipid"]);

                string query1 = @$"select Name from Stadium where id ={stid}";

                string query2 = $@"select name from championship where id ={chmpid}";

                SqlDataAdapter sqlDataAdapter2 = new SqlDataAdapter(query1, conn);
                DataTable dt2 = new DataTable();
                sqlDataAdapter2.Fill(dt2);

                match.Add("stadiumName", dt2.Rows[0]["Name"].ToString());


                SqlDataAdapter sqlDataAdapter3 = new SqlDataAdapter(query2, conn);
                DataTable dt3 = new DataTable();
                sqlDataAdapter3.Fill(dt3);


                match.Add("championshipName", dt3.Rows[0]["name"].ToString());

                list.Add(match);
            }
            return list;
        }

        public IEnumerable<Dictionary<object, object>> getAllPendingQuizzes(SqlConnection conn)
        {
            string query = @$"select * from quizzes where state = 0";
            

            SqlDataAdapter sqlDataAdapter = new SqlDataAdapter(query, conn);
            DataTable dt = new DataTable();
            sqlDataAdapter.Fill(dt);
            List<Dictionary<object, object>> list = new List<Dictionary<object, object>>();
            for (int i = 0; i < dt.Rows.Count; i++)
            {
                Dictionary<object, object> q = new Dictionary<object, object>();
                q.Add("id", Convert.ToInt32(dt.Rows[i]["id"]));

                q.Add("journalistssn", Convert.ToInt32(dt.Rows[i]["journalist_ssn"]));

                q.Add("name" , Convert.ToString(dt.Rows[i]["Name"]));

                q.Add("state" , "Pending");
                string qr = $@"select count(*) as NO from Questions where quiz_id = {Convert.ToInt32(dt.Rows[i]["id"])}";
                SqlDataAdapter sqlDataAdapter2 = new SqlDataAdapter(qr, conn);
                DataTable dt2 = new DataTable();
                sqlDataAdapter2.Fill(dt2);
                q.Add("noQuestions", Convert.ToInt32(dt2.Rows[0]["NO"]));


                string qr1 = $@"select concat(Fname, ' ' , Lname) as jname from Users where Users.ssn={Convert.ToInt32(dt.Rows[i]["journalist_ssn"])} ";
                SqlDataAdapter sqlDataAdapter3 = new SqlDataAdapter(qr1, conn);
                DataTable dt3 = new DataTable();
                sqlDataAdapter3.Fill(dt3);
                q.Add("jname", Convert.ToString(dt3.Rows[0]["jname"]));


                list.Add(q);
            }
            return list;

        }

        public IEnumerable<Dictionary<object, object>> getAllPendingQuizzesOfJour(SqlConnection conn,int id)
        {

            string query = @$"select * from quizzes where state=0 and journalist_ssn={id}";


            SqlDataAdapter sqlDataAdapter = new SqlDataAdapter(query, conn);
            DataTable dt = new DataTable();
            sqlDataAdapter.Fill(dt);
            List<Dictionary<object, object>> list = new List<Dictionary<object, object>>();
            for (int i = 0; i < dt.Rows.Count; i++)
            {
                Dictionary<object, object> q = new Dictionary<object, object>();
                q.Add("id", Convert.ToInt32(dt.Rows[i]["id"]));

                q.Add("journalistssn", Convert.ToInt32(dt.Rows[i]["journalist_ssn"]));

                q.Add("name", Convert.ToString(dt.Rows[i]["Name"]));

                q.Add("state", "Pending");
                string qr = $@"select count(*) as NO from Questions where quiz_id = {Convert.ToInt32(dt.Rows[i]["id"])}";
                SqlDataAdapter sqlDataAdapter2 = new SqlDataAdapter(qr, conn);
                DataTable dt2 = new DataTable();
                sqlDataAdapter2.Fill(dt2);
                q.Add("noQuestions", Convert.ToInt32(dt2.Rows[0]["NO"]));


                string qr1 = $@"select concat(Fname, ' ' , Lname) as jname from Users where Users.ssn={Convert.ToInt32(dt.Rows[i]["journalist_ssn"])} ";
                SqlDataAdapter sqlDataAdapter3 = new SqlDataAdapter(qr1, conn);
                DataTable dt3 = new DataTable();
                sqlDataAdapter3.Fill(dt3);
                q.Add("jname", Convert.ToString(dt3.Rows[0]["jname"]));

                list.Add(q);
            }
            return list;

        }

        public int addClubToChampionship(SqlConnection conn, int clubid, int champid)
        {
            // no need for validation combo box
            string queryCheck = @$"select * from cup where championship_id ={champid}";

            SqlDataAdapter sqlDataAdapter = new SqlDataAdapter(queryCheck, conn);
            DataTable dt = new DataTable();
            sqlDataAdapter.Fill(dt);

            if (dt.Rows.Count > 0)
            {

                string query = @$"insert into Club_cup (club_id,championship_id) values( {clubid},{champid}) ";

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
            else
            {

                string query = @$"insert into Club_league (club_id,championship_id) values( {clubid},{champid}) ";

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

        }

        public IEnumerable<Dictionary<object, object>> getAllClubsNotInChamp(SqlConnection conn, int id)
        {
            string query = @$"  select distinct c.id,  c.name,c.logo,c.stadium_home,c.Created_At   from clubs as c , championship as cc where (c.id not in (select club_id from Club_league as cl where cl.championship_id ={id}))  
and (c.id not in (select club_id from Club_cup as cp where cp.championship_id ={id}))";


            SqlDataAdapter sqlDataAdapter = new SqlDataAdapter(query, conn);
            DataTable dt = new DataTable();
            sqlDataAdapter.Fill(dt);

            List <Dictionary<object, object>> list = new();

            for (int i = 0; i < dt.Rows.Count; i++)
            {
              Dictionary<object,object> d= new Dictionary<object, object>();

                d.Add("Name", dt.Rows[i]["name"].ToString());
                d.Add("id", Convert.ToInt32(dt.Rows[i]["id"]));
                d.Add("logo", dt.Rows[i]["name"].ToString());
                d.Add("stadiumID", Convert.ToInt32(dt.Rows[i]["stadium_home"]));

                string query2 = @$"select Name from Stadium where id ={Convert.ToInt32(dt.Rows[i]["stadium_home"])}";
                SqlDataAdapter sqlDataAdapter2= new SqlDataAdapter(query2, conn);
                DataTable dt2 = new DataTable();
                sqlDataAdapter2.Fill(dt2);

                d.Add("stadiumName", dt2.Rows[0]["Name"]);
               
                list.Add(d);

            }
            return list;
        }

        public int createQuiz(SqlConnection conn,Quiz q)
        {
            string query1 = @$"insert into quizzes (journalist_ssn,Name) values({q.JournalistSsn},'{q.Name}')";
            SqlCommand sqlCommand = new SqlCommand(query1, conn);
            int res = -1;

         
            try
            {
                sqlCommand.ExecuteNonQuery();
                res = 200;
            }
            catch (Exception ex)
            {
                res = 0;
                return res;
            }
           
            string query2 = "select max(id) as quizID from quizzes ";

            SqlDataAdapter sqlDataAdapter2 = new SqlDataAdapter(query2, conn);
            DataTable dt2 = new DataTable();
            sqlDataAdapter2.Fill(dt2);

            int quizid = Convert.ToInt32(dt2.Rows[0]["quizID"]);
           foreach(Question ques in q.questions)
           {
                string query3 = @$"  insert into Questions (question_content,answer1,answer2,answer3,answer4,the_correct_answer,quiz_id)
                    values ('{ques.title}','{ques.choices[0]}','{ques.choices[1]}','{ques.choices[2]}','{ques.choices[3]}','{ques.TheCorrectAnswer}',{quizid})";

                SqlCommand sqlCommand2 = new SqlCommand(query3, conn);

                try
                {
                    sqlCommand2.ExecuteNonQuery();
                    res = 200;
                }
                catch (Exception ex)
                {
                    res = 0;
                    return res;
                }


           }

            return 200;
                  
        }


        public int addArticle(SqlConnection conn, Article article)
        {
            DateTime date = DateTime.Now;
            string d = Convert.ToString(date);
            string query = @$"insert into Articles (Name,title, Journalist_ssn,description,picture,posted)
                         values ('{article.Name}','{article.title}',{article.JournalistSsn},'{article.description}','{article.img}','{d}')";


            int res = -1;

            SqlCommand sqlCommand2 = new SqlCommand(query, conn);

            try
            {
                sqlCommand2.ExecuteNonQuery();
                res = 200;
            }
            catch (Exception ex)
            {
                res = 0;
                return res;
            }
            return res;
        }

        public int deleteQuiz(SqlConnection conn, int id)
        {
            string query = @$"delete from Questions where quiz_id = {id}";

            SqlCommand sqlCommand = new SqlCommand(query, conn);
            try
            {
                sqlCommand.ExecuteNonQuery();
                
            }
            catch (Exception ex)
            {
                return 0;
            }

            string query2 = @$"delete from quizzes where id ={id}";


            SqlCommand sqlCommand2 = new SqlCommand(query2, conn);
            try
            {
                sqlCommand2.ExecuteNonQuery();
                return 1;
            }
            catch (Exception ex)
            {
                return 0;
            }
        }

        public int deleteArticle(SqlConnection conn, int id)
        {
            string query = @$"delete from Articles where id = {id}";
            SqlCommand sqlCommand = new SqlCommand(query, conn);
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
        public IEnumerable<Dictionary<object, object>> getClubsIds(SqlConnection conn,int matid,int y)
        {
            string query = $@"select club1,club2 from matches where matches.id={matid}";
            SqlDataAdapter sqlDataAdapter = new SqlDataAdapter(query, conn);
            DataTable dt = new DataTable();
            sqlDataAdapter.Fill(dt); 
            string club11 = Convert.ToString(dt.Rows[0]["club1"]);
            string club22 = Convert.ToString(dt.Rows[0]["club2"]);
            string query2 = $@"select clubs.id,clubs.name from matches,clubs
where matches.id = {matid}  and clubs.name in ('{club11}','{club22}')";
            SqlDataAdapter sqlDataAdapter2 = new SqlDataAdapter(query2, conn);
            DataTable dt2 = new DataTable();
            sqlDataAdapter2.Fill(dt2);

            if(y==1) return getClubPlayers(conn, Convert.ToInt32(dt2.Rows[0]["id"]));
            return getClubPlayers(conn, Convert.ToInt32(dt2.Rows[1]["id"]));
            
        }
        public IEnumerable<Dictionary<object, object>> getSecondClubId(SqlConnection conn, int matid)
        {
            string query = $@"select club2 from matches where matches.id={matid}";
            SqlDataAdapter sqlDataAdapter = new SqlDataAdapter(query, conn);
            DataTable dt = new DataTable();
            sqlDataAdapter.Fill(dt);
            string club22 = Convert.ToString(dt.Rows[0]["club2"]);
            string query2 = $@"select clubs.id from clubs
where clubs.name ='{club22}'";
            SqlDataAdapter sqlDataAdapter2 = new SqlDataAdapter(query2, conn);
            DataTable dt2 = new DataTable();
            sqlDataAdapter2.Fill(dt2);
            Dictionary<object, object> d = new Dictionary<object, object>();
            d.Add("id", dt2.Rows[0]["id"].ToString());
            List<Dictionary<object, object>> list = new();
            list.Add(d);
            return list;

        }
        public IEnumerable<Dictionary<object, object>> getClubCoach(SqlConnection conn, int clubid)
        {
            string query = $@"select Coaches.id,match_staff.Fname,match_staff.Lname  from Coaches, Clubs, match_staff
where Coaches.club_id=clubs.id and clubs.id={clubid} and match_staff.id=Coaches.id";
            SqlDataAdapter sqlDataAdapter = new SqlDataAdapter(query, conn);
            DataTable dt = new DataTable();
            sqlDataAdapter.Fill(dt);
            Dictionary<object, object> d = new Dictionary<object, object>();
            d.Add("id", dt.Rows[0]["id"]);
            d.Add("Fname", dt.Rows[0]["Fname"]);
            d.Add("Lname", dt.Rows[0]["Lname"]);
            List<Dictionary<object, object>> list = new();
            list.Add(d);
            return list;
        }
        public IEnumerable<Dictionary<object, object>> getItemsNotInStore(SqlConnection conn, int stadid)
        {
            string query = @$"select * from items 
where items.id not in (select store_items.item_id from store_items where stadium_id={stadid} )";


            SqlDataAdapter sqlDataAdapter = new SqlDataAdapter(query, conn);
            DataTable dt = new DataTable();
            sqlDataAdapter.Fill(dt);

            List<Dictionary<object, object>> list = new List<Dictionary<object, object>>();

            for (int i = 0; i < dt.Rows.Count; i++)
            {
                Dictionary<object, object> d = new Dictionary<object, object>();

                d.Add("name", dt.Rows[i]["item_name"].ToString());
                d.Add("id", Convert.ToInt32(dt.Rows[i]["id"])); 
                d.Add("price", dt.Rows[i]["item_price"].ToString());
                d.Add("image", Convert.ToString(dt.Rows[i]["item_image"]));

                
                list.Add(d);

            }
            return list;
        }
        public int addItemToStore(SqlConnection conn, int stadid,int item_id, int qty)
        {
            string query = $@"insert into store_items values ({stadid},{item_id},{qty})";
            SqlCommand sqlCommand = new SqlCommand(query, conn);
            int check = sqlCommand.ExecuteNonQuery();
            return check!=0? 1 : 0;

        }
        public int updateItemQty(SqlConnection conn, int item_id, int stadid, int qty)
        {
            string query = $@"update store_items
set qty={qty}
where stadium_id={stadid} and item_id={item_id}";
            SqlCommand sqlCommand = new SqlCommand(query, conn);
            int check = sqlCommand.ExecuteNonQuery();
            return check != 0 ? 1 : 0;
        }
        public int AddSysItem(SqlConnection conn,Item item)
        { 
            string query = $@"insert into items(item_price,item_name,item_image)
values ({item.ItemPrice},'{item.ItemName}','{item.ItemImage}')";
            SqlCommand sqlCommand = new SqlCommand(query, conn);
            int check = sqlCommand.ExecuteNonQuery();
            return check != 0 ? 1 : 0;
        }
        public int addClubToChamp(SqlConnection conn, int champid, int clubid)
        {
            string query = $@"select * from league
where league.championship_id = {champid}";
            SqlDataAdapter sqlDataAdapter = new SqlDataAdapter(query, conn);
            DataTable dt = new DataTable();
            sqlDataAdapter.Fill(dt);
            if(dt.Rows.Count!=0)
            {
                string qr = $@"insert into Club_league(club_id,championship_id)
                            values({clubid} , {champid})";
                SqlCommand sqlCommand = new SqlCommand(query, conn);
                int check = sqlCommand.ExecuteNonQuery();
                return check != 0 ? 1 : 0;
            }
            string query2 = $@"insert into Club_cup(club_id,championship_id)
                            values({clubid} , {champid})";
            SqlCommand sqlCommand2 = new SqlCommand(query2, conn);
            int check2 = sqlCommand2.ExecuteNonQuery();
            return check2 != 0 ? 1 : 0;
        }
        public int getChampId(SqlConnection conn, string name)
        {
            string q = $@"select * from championship
where name = '{name}'";
            SqlDataAdapter sqlDataAdapter = new SqlDataAdapter(q, conn);
            DataTable dt = new DataTable();
            sqlDataAdapter.Fill(dt);
            return Convert.ToInt32(dt.Rows[0]["id"]);

        }

        public int addAnswers(SqlConnection conn, List<string> answer,int quizid,int ssn)
        {
            string query = @$"select * from Questions where quiz_id ={quizid}";

            SqlDataAdapter sqlDataAdapter = new SqlDataAdapter(query, conn);
            DataTable dt = new DataTable();
            sqlDataAdapter.Fill(dt);

            int points = 0;
         
            for (int i = 0; i < dt.Rows.Count; i++)
            {

                points += 10 * Convert.ToInt32((dt.Rows[i]["the_correct_answer"].ToString() == answer[i]));
            }


            string query2 = $@"update Fans set points = points +{points} where ssn ={ssn}";

            int cnt = answer.Count * 10;
            SqlCommand sqlCommand = new SqlCommand(query2, conn);
            try
            {
                sqlCommand.ExecuteNonQuery();
                return points / cnt * 100;
            }
            catch (Exception ex)
            {
                return -1;
            }

        }

        public int getCountChamp(SqlConnection conn)
        {
            string query = "select count(*) as num   from championship";

            SqlDataAdapter sqlDataAdapter = new SqlDataAdapter(query, conn);
            DataTable dt = new DataTable();
            sqlDataAdapter.Fill(dt);
            return Convert.ToInt32(dt.Rows[0]["num"]);
        }

        public int getCountPlayers(SqlConnection conn)
        {
            string query = "select count(*)  as num from players";

            SqlDataAdapter sqlDataAdapter = new SqlDataAdapter(query, conn);
            DataTable dt = new DataTable();
            sqlDataAdapter.Fill(dt);
            return Convert.ToInt32(dt.Rows[0]["num"]);
        }

        public int getCountUsers(SqlConnection conn)
        {
            string query = "select count(*) as num from Users";
            SqlDataAdapter sqlDataAdapter = new SqlDataAdapter(query, conn);
            DataTable dt = new DataTable();
            sqlDataAdapter.Fill(dt);
            return Convert.ToInt32(dt.Rows[0]["num"]);
        }

        public int getCountMatches(SqlConnection conn)
        {
            string query = "select count(*) as num from matches";
            SqlDataAdapter sqlDataAdapter = new SqlDataAdapter(query, conn);
            DataTable dt = new DataTable();
            sqlDataAdapter.Fill(dt);
            return Convert.ToInt32(dt.Rows[0]["num"]);
        }

        public int getCountClubs(SqlConnection conn)
        {
            string query = "select count(*) as num from clubs";
            SqlDataAdapter sqlDataAdapter = new SqlDataAdapter(query, conn);
            DataTable dt = new DataTable();
            sqlDataAdapter.Fill(dt);
            return Convert.ToInt32(dt.Rows[0]["num"]);
        }

        public int getCountArticles(SqlConnection conn)
        {
            string query = "select count(*) as num from Articles";
            SqlDataAdapter sqlDataAdapter = new SqlDataAdapter(query, conn);
            DataTable dt = new DataTable();
            sqlDataAdapter.Fill(dt);
            return Convert.ToInt32(dt.Rows[0]["num"]);
        }

        public int getCountStadiums(SqlConnection conn)
        {
            string query = "select count(*) as num from Stadium";
            SqlDataAdapter sqlDataAdapter = new SqlDataAdapter(query, conn);
            DataTable dt = new DataTable();
            sqlDataAdapter.Fill(dt);
            return Convert.ToInt32(dt.Rows[0]["num"]);
        }
        public int getCountQuizzes(SqlConnection conn)
        {
            string query = "select count(*) as num from quizzes";
            SqlDataAdapter sqlDataAdapter = new SqlDataAdapter(query, conn);
            DataTable dt = new DataTable();
            sqlDataAdapter.Fill(dt);
            return Convert.ToInt32(dt.Rows[0]["num"]);
        }

    }


}

    