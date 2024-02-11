const grammar = {
    "extensions": [
      "gem"
    ],
    "names": [
        "gem"
    ],
    "patterns": [
      {
        "include": "#types"
      },
      {
        "include": "#main"
      }
    ],
    "scopeName": "source.gem",
    "uuid": "51fd0fba-7996-11ee-b962-0242ac120002",
    "repository": {
      "types": {
        "patterns": [
          {
            "match": "\\b(unit|bool|int|float|str)\\b",
            "name": "entity.name.type.gem"
          }
        ]
      },
      "main": {
        "patterns": [
          {
            "match": "(//.*)",
            "name": "comment.gem"
          },
          {
            "match": "\\b(proc|var|type)\\b",
            "name": "keyword.control.gem"
          },
          {
            "match": "(\\-\\>|\\:\\:|\\||\\=)",
            "name": "keyword.operator.gera"
          },
          {
            "match": "([a-zA-Z][a-zA-Z0-9]*)",
            "name": "other.gem"
          }
        ]
      }
    }
};

export default grammar;