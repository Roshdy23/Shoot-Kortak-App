using System;
using System.Collections.Generic;

namespace Back_End.Models;

public partial class Answer
{
    public int FanSsn { get; set; }

    public int QuestionId { get; set; }

    public string? FanAnswer { get; set; }

}
