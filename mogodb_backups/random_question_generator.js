[
  '{{repeat(10)}}',
  {
    QuestionText: '{{lorem(1, "sentences")}}',
    DifficultyLevel: '{{integer(1, 5)}}',
    DateCreated: '{{date(new Date(2015, 8, 8), new Date(), "YYYY-MM-ddThh:mm:ss Z")}}',
    IsActive: function(tags) {
      return tags.random(0, 100) ? true : false;
    },
    Tags: [
      '{{repeat(1,5)}}',
      '{{random("physics", "chemistry", "computer", "math", "literature", "music", "movies", "sports", "cricket", "history", "geography", "politics")}}'
    ],
    Choices: [
      '{{repeat(4)}}',
      '{{lorem(1, "words")}}'
    ],
    AnswerIndices: function(tags) {
      return tags.random(0, 50) ? [tags.integer(0,1), tags.integer(2,3)] : [tags.integer(0,3)];
    },
    QuestionMediaUrl: function(tags) {
      return tags.random(0, 1) ? '/media/ques/'+tags.index() : null;
    },
    QuestionHintText: function(tags) {
      return tags.random(0, 1) ? tags.lorem(1, "sentences") : null;
    },
    AnswerMediaUrl: function(tags) {
      return tags.random(0, 1) ? '/media/ans/'+tags.index() : null;
    },
    AnswerHintText: function(tags) {
      return tags.random(0, 1) ? tags.lorem(1, "sentences") : null;
    }
  }
]