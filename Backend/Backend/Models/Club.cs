namespace Backend.Models
{
    public class Club
    {
        /*[id]
      ,[name]
      ,[logo]
      ,[stadium_home]
      ,[Created_At]
         */
        public int id { get; set; }
        public string name { get; set; }
        public string logo { get; set; }
        public int stadium_home { get; set; }
        public int Created_At { get; set; }
    }
}
