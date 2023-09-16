const argsParser = require('./argsParser');

console.log(argsParser.argsParser(["-abc", "--no-longer=10", "-c10", "-kjs3op5s120", "--okes", "10", "20", "valera", "--string=\"It's", "a", "string", "-a"]));

argsParser.argsParser([])