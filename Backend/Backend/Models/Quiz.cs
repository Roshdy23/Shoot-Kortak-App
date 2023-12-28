
namespace Back_End.Models;

public partial class Quiz
{
    public int Id { get; set; }

    public int? JournalistSsn { get; set; }

    public string Name { get; set; }    

    public bool? state { get; set; }  
}
