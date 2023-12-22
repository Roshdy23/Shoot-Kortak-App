
namespace Back_End.Models;

public partial class Coach
{
    public int Id { get; set; }

    public int? ClubId { get; set; }

    public int? TeamManagedNo { get; set; }

}
