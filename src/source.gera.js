const grammar = {
  "extensions": [
    "gera"
  ],
  "names": [
    "gera"
  ],
  "patterns": [
    {
      "include": "#main"
    }
  ],
  "scopeName": "source.gera",
  "uuid": "8f285c78-2801-11ee-be56-0242ac120002",
  "repository": {
    "main": {
      "patterns": [
        {
          "match": "(//.*)",
          "name": "comment.gera"
        },
        {
          "match": "(\\?|\\#)\\s*([a-zA-Z_][a-zA-Z0-9_]*)\\b",
          "captures": {
            "1": {
              "name": "keyword.operator.gera"
            },
            "2": {
              "name": "entity.name.label.gera"
            }
          }
        },
        {
          "match": "\\b(proc|case|val|mut|return|mod|pub|use|else|static|target)\\b",
          "name": "keyword.control.gera"
        },
        {
          "match": "\\b(true|false|unit)\\b",
          "name": "constant.language.gera"
        },
        {
          "begin": "(proc)\\s+([a-zA-Z_][a-zA-Z0-9_]*)(\\()",
          "beginCaptures": {
            "1": {
              "name": "keyword.control.gera"
            },
            "2": {
              "name": "entity.name.function.gera"
            },
            "3": {
              "name": "punctuation.brackets.gera"
            }
          },
          "patterns": [
            {
              "match": "([a-zA-Z_][a-zA-Z0-9_]*)",
              "captures": {
                "1": {
                  "name": "variable.parameter.gera"
                }
              }
            }
          ],
          "end": "(\\))",
          "endCaptures": {
            "1": {
              "name": "punctuation.brackets.gera"
            }
          }
        },
        {
          "match": "\\b([a-zA-Z_][a-zA-Z0-9_]*)\\s*(\\()",
          "captures": {
            "1": {
              "name": "entity.name.function.gera"
            },
            "2": {
              "name": "punctuation.brackets.gera"
            }
          }
        },
        {
          "match": "\\b(val|mut)\\s+([a-zA-Z_][a-zA-Z0-9_]*)\\s*(=)",
          "captures": {
            "1": {
              "name": "keyword.control.gera"
            },
            "2": {
              "name": "variable.local.gera"
            },
            "3": {
              "name": "keyword.operator.gera"
            }
          }
        },
        {
          "match": "(\\.\\.|\\.\\.\\=)",
          "name": "keyword.operator.gera"
        },
        {
          "match": "(([0-9]*\\.)?[0-9]+)",
          "name": "constant.numeric.gera"
        },
        {
          "match": "(\\=|\\+|\\-|\\*|\\/|\\%|\\<|\\>|\\!|\\&\\&|\\||\\.|\\:)",
          "name": "keyword.operator.gera"
        },
        {
          "begin": "(\\()",
          "beginCaptures": {
            "1": {
              "name": "punctuation.brackets.gera"
            }
          },
          "patterns": [
            {
              "include": "#main__1"
            }
          ],
          "end": "(\\))",
          "endCaptures": {
            "1": {
              "name": "punctuation.brackets.gera"
            }
          }
        },
        {
          "begin": "(\\\")",
          "beginCaptures": {
            "1": {
              "name": "string.punctuation.gera"
            }
          },
          "patterns": [
            {
              "match": "(\\\\x[a-fA-F0-9]{2})",
              "name": "constant.character.escape.gera"
            },
            {
              "match": "(\\\\.)",
              "name": "constant.character.escape.gera"
            },
            {
              "match": "(?<!\\\\)([^\\\\\"]+)",
              "name": "string.text.gera"
            }
          ],
          "end": "(?<!(?<!\\\\)\\\\)(\\\")",
          "endCaptures": {
            "1": {
              "name": "string.punctuation.gera"
            }
          }
        },
        {
          "match": "([a-zA-Z_][a-zA-Z0-9_]*)(?![a-zA-Z0-9_]*?\\:\\:)",
          "name": "variable.other.gera"
        }
      ]
    },
    "main__1": {
      "patterns": [
        {
          "include": "#main"
        }
      ]
    }
  }
};

export default grammar;