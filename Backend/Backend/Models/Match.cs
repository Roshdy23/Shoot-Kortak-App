namespace Backend.Models
{
    public class Match
    {
        /*[id]
      ,[matchDate]
      ,[weekno]
      ,[club1]
      ,[club2]
      ,[championshipid]
      ,[stadium_id]
         */
        public int id { get; set; }
        public string matchDate { get; set; }
        public int weekno { get; set; }
        public string club1 { get; set; }
        public string club2 { get; set;}
        public int championshipid { get; set; }
        public int stadium_id { get; set; }
    }
}
