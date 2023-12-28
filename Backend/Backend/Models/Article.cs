
namespace Back_End.Models;

public partial class Article
{
    public string Name { get; set; } = null!;

    public int JournalistSsn { get; set; }

    public string articleDate { get; set; } = null!; 

    public string img { get; set; }
    
    public string description { get; set; }
}
