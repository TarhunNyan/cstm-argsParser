const argsParser = require('./argsParser');

// console.log(argsParser.argsParser(["-abc", "--no-longer=10", "-c10", "-kjs3op5s120", "--okes", "10", "20", "valera", "--string=\"It's", "a", "string", "-a"]));

describe(
    "Тесты на парсинг аргументов",
    () => {
        const testCase = [
            {
                cli: "--test-param",
                result: {
                    "test-param": true,
                    params: []
                }
            },
            {
                cli: "--test-param 10",
                result: {
                    "test-param": "10",
                    params: []
                }
            },
            {
                cli: "--test-param=10",
                result: {
                    "test-param": "10",
                    params: []
                }
            },
            {
                cli: "--test-param --help",
                result: {
                    "test-param": true,
                    "help": true,
                    params: []
                }
            },
            {
                cli: "-t",
                result: {
                    "t": true,
                    params: []
                }
            },
            {
                cli: "-tnk",
                result: {
                    "t": true,
                    "n": true,
                    "k": true,
                    params: []
                }
            },
            {
                cli: "-t 10",
                result: {
                    "t": "10",
                    params: []
                }
            },
            {
                cli: "-t=10",
                result: {
                    "t": "10",
                    params: []
                }
            },
            {
                cli: "-t10",
                result: {
                    "t": "10",
                    params: []
                }
            },
            {
                cli: "-tn10k",
                result: {
                    "t": true,
                    "n": "10",
                    "k": true,
                    params: []
                }
            },
            {
                cli: "-kjs3op5s120",
                result: {
                    "k": true,
                    "j": true,
                    "s": "3",
                    "o": true,
                    "p": "5",
                    "s": "120",
                    params: []
                }
            },
            {
                cli: "--text=\"String param in args\"",
                result: {
                    params: [],
                    text: "String param in args"
                }
            },
            {
                cli: "--text=\'String param in args\'",
                result: {
                    params: [],
                    text: "String param in args"
                }
            },
            {
                cli: "--text \"String param in args\"",
                result: {
                    params: [],
                    text: "String param in args"
                }
            },
            {
                cli: "-t \"String param in args\" --val 10",
                result: {
                    params: [],
                    val: "10",
                    t: "String param in args"
                }
            },
            {
                cli: "\'String param in args\'",
                result: {
                    params: ["String param in args"],
                }
            },
            {
                cli: "10 20 \"30 40\" 50",
                result: {
                    params: ["10", "20", "30 40", "50"],
                }
            },
        ];

        testCase.forEach((el) => {
            const args = el.cli.split(' ');
            const result = el.result;

            if (el.isOnly) { test.only(el.cli, () => { expect(argsParser.argsParser(args)).toEqual(result) }) }
            if (el.isOnly == false || el.isOnly == undefined) {
                test(el.cli, () => { expect(argsParser.argsParser(args)).toEqual(result) })
            }
        })
    }
)
