namespace Backend.Models
{
    public class Stadium
    {
        /*
         * [id]
      ,[Name]
      ,[width]
      ,[Capacity]
      ,[length]
      ,[image]
      ,[location]
      ,[Created_At]
         */
        public int id { get; set; }
        public string Name { get; set; }
        public int width { get; set; }
        public int Capacity { get; set; }
        public int length { get; set; }
        public string image { get; set; }
        public string location { get; set; }
        public int Created_At { get; set; }
    }
}
