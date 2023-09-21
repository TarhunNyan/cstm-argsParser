# cstm-argsparser

Модуль для парсинга аргументов коммандной строки. После парсинга возвращает js object

# Как использовать

Установка в проект:

```bash
npm install --no-dev git+https://github.com/TarhunNyan/cstm-argsParser.git
```

Парсинг аргументов пришедших из коммандной строки:

```javascript
const argsParser = require('cstm-argsparser');
args = argsParser.argsCurrent();
```

Парсинг аргументов из строки:

```javascript
const argsParser = require('cstm-argsparser');
args = argsParser.argsString('--help --example "It is example"');
```

Парсинг аргументов из массива:

```javascript
const argsParser = require('cstm-argsparser');
args = argsParser.argsParser(['--help', '--example', '"It', 'is', 'example"']);
```

# Примеры

Парсинг коротких параметров:

```js
args = argsParser.argsString('-hal -s10 -k Okey -te50.25z');
// => args = {
//      _: [],
//
//      h: true,
//      a: true,
//      l: true,
//
//      s: "10",
//
//      k: "Okey",
//
//      t: true,
//      e: "50.25",
//      z: true,
// }
```

Парсинг длинных параметров:

```js
args = argsParser.argsString('--long-param=100 --second-param --third-param Okey');
// => args = {
//      _: [],
//      long-param: "100",
//      second-param: true,
//      third-param: "Okey",
// }
```

Параметры без ключа

```js
args = argsParser.argsString('--long-param 1 2 3 4 5 6 7');
// => args = {
//      _: ["2", "3", "4", "5", "6", "7"],
//      long-param: "1",
// }
```

Парсинг строки:

```js
args = argsParser.argsString('--string-example="It\'s value of --string-example key"');
// => args = {
//      _: [],
//      string-example: "It's value of --string-example key",
// }
```
