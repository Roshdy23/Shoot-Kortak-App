
namespace Back_End.Models;

public partial class Club
{
    public int Id { get; set; }

    public string Name { get; set; } = null!;

    public string Logo { get; set; } = null!;

    public int StadiumHome { get; set; }

    public int CreatedAt { get; set; }

}

public partial class StatClub
{
    public int Id { get; set; }

    public string? Name { get; set; } = null!;

    public int? goals {get; set;}


    public int? Saves { get; set; }
    public int? assists { get; set; }

    public int? tackles { get; set; }

    public int? Cleansheets { get; set; }

    public StatClub() { }
}
