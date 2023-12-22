using System;
using System.Collections.Generic;

namespace Back_End.Models;

public partial class Question
{
    public int Id { get; set; }

    public string? QuestionContent { get; set; }

    public string? Answer1 { get; set; }

    public string? Answer2 { get; set; }

    public string? Answer3 { get; set; }

    public string? Answer4 { get; set; }

    public string? TheCorrectAnswer { get; set; }

    public int? QuizId { get; set; }

