
namespace Back_End.Models;

public partial class Club
{
    public int Id { get; set; }

    public string Name { get; set; } = null!;

    public string? Logo { get; set; }

    public int? StadiumHome { get; set; }

    public int? CreatedAt { get; set; }

}
