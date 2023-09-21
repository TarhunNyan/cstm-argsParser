# cstm-argsparser

Модуль для парсинга аргументов коммандной строки. После парсинга возвращает js object

# Как использовать

Установка в проект:

```bash
npm install --no-dev
```

Парсинг аргументов пришедших из коммандной строки:

```javascript
import argsParser from 'cstm-argsparser';
args = argsParser();
```

Парсинг аргументов из строки:

```javascript
import { argsString } from 'cstm-argsparser';
args = argsString('--help --example "It is example"');
```

Парсинг аргументов из массива:

```javascript
import { argsParser } from 'cstm-argsparser';
args = argsParser(['--help', '--example', '"It', 'is', 'example"']);
```

# Примеры

Парсинг коротких параметров:

```js
args = argsString('-hal -s10 -k Okey -te50.25z');
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
args = argsString('--long-param=100 --second-param Okey');
// => args = {
//      _: [],
//      long-param: "100",
//      second-param: "Okey",
// }
```

Параметры без ключа

```js
args = argsString('--long-param 1 2 3 4 5 6 7');
// => args = {
//      _: ["2", "3", "4", "5", "6", "7"],
//      long-param: "1",
// }
```

Парсинг строки:

```js
args = argsString('--string-example="It\'s value of --string-example key"');
// => args = {
//      _: [],
//      string-example: "It's value of --string-example key",
// }
```
