
namespace Back_End.Models;

public partial class Coach:MatchStaff
{
    public int? ClubId { get; set; }

    public int? TeamManagedNo { get; set; }

}
