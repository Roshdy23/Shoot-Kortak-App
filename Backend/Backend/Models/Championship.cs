namespace Backend.Models
{
    public class Championship
    {
        /*[id]
      ,[name]
      ,[logo]
      ,[startingAt]
      ,[endingAt]
      ,[no_matches]
         */

        public int id { get; set; }
        public string name { get; set; }
        public string logo { get; set; }
        public DateTime startingAt { get; set; }
        public DateTime endingAt { get; set; }
        public int no_matches { get; set; }
    }
}
