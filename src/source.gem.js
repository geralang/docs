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
                "name": "storage.type.primitive.gem"
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
                    "match": "\\b([a-zA-Z_][a-zA-Z0-9_]*)\\s*(\\()",
                    "captures": {
                        "1": {
                            "name": "entity.name.function.gem"
                        },
                        "2": {
                            "name": "punctuation.brackets.gem"
                        }
                    }
                },
                {
                    "match": "(type)\\s+([a-zA-Z_][a-zA-Z0-9_]*)",
                    "captures": {
                        "1": {
                            "name": "storage.modifier.gem"
                        },
                        "2": {
                            "name": "entity.name.type.gem"
                        }
                    }
                },
                {
                    "match": "\\b(proc|val|type)\\b",
                    "name": "storage.modifier.gem"
                },
                {
                    "match": "(\\-\\>|\\:\\:|\\||\\=)",
                    "name": "keyword.operator.gem"
                },
                {
                    "match": "([a-zA-Z_][a-zA-Z0-9_]*)",
                    "name": "other.gem"
                },
                {
                    "match": "(\\(|\\)|\\[|\\]|\\{|\\})",
                    "name": "punctuation.brackets.gem"
                },
                {
                    "match": "(,)",
                    "name": "punctuation.separator.gem"
                }
            ]
        }
    }
};

export default grammar;