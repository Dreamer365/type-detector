<br>
<h1 align="center">TypeDetector</h1>
<p align="center"><b>获取和判断数据类型的 JavaScript 工具库</b></p>
<blockquote align="center">
  无任何第三方依赖，完全使用原生 JavaScript 开发<br>
体积轻巧，多端兼容，可完美应用于浏览器环境和 Node 环境
</blockquote>
<p align="center">
  <img src="https://img.shields.io/badge/Version-v1.0.1-blue.svg">
  <img src="https://img.shields.io/badge/License-MIT-green.svg">
</p>

<hr>

## 安装使用

**CDN 引入**

```html
<!-- unpkg CDN -->
<script src="https://unpkg.com/type-detector-js"></script>

<!-- jsdelivr CDN -->
<script src="https://cdn.jsdelivr.net/npm/type-detector-js"></script>
```

**NPM 安装**

```js
/** 安装 */
npm i type-detector-js -S

/** 通过 require 引入 */
const TD = require( "type-detector-js" );

/** 
 * 通过 import 引入 
 * 注：需要在 package.json 中添加 "type": "module"
 */
import TD from "type-detector-js/dist/type-detector.esm.mjs";
```

<hr>

## 基本用法

```js
const isString = TD( "abc" ).isString();
const isNumber = TD( "abc" ).isNumber();
const type = TD( "abc" ).type();

/** true */
console.log( isString );

/** false */
console.log( isNumber );

/** string */
console.log( type );
```

<hr>

## 方法列表

- [isFunction](#isFunction)
- [isString](#isString)
- [isArray](#isArray)
- [isBoolean](#isBoolean)
- [isSymbol](#isSymbol)
- [isBigInt](#isBigInt)
- [isUndefined](#isUndefined)
- [isNull](#isNull)
- [isNil](#isNil)
- [isNumber](#isNumber)
- [isInt](#isInt)
- [isFloat](#isFloat)
- [isNaN](#isNaN)
- [isFinite](#isFinite)
- [isSet](#isSet)
- [isWeakSet](#isWeakSet)
- [isMap](#isMap)
- [isWeakMap](#isWeakMap)
- [isPlainObject](#isPlainObject)
- [isObject](#isObject)
- [isElement](#isElement)
- [isWindow](#isWindow)
- [isPromise](#isPromise)
- [isClass](#isClass)
- [isBlob](#isBlob)
- [isArrayBuffer](#isArrayBuffer)
- [isBuffer](#isBuffer)
- [isEmptyPlainObject](#isEmptyPlainObject)
- [isEmptyArray](#isEmptyArray)
- [isEmptyString](#isEmptyString)
- [isArrayOnlyIncludePlainObject](#isArrayOnlyIncludePlainObject)
- [type](#type)

<hr>

## 方法详述

<h3 id="isFunction">isFunction</h3>

#### 功能：判断是否为函数。

```js
/** true */
TD( function test () {} ).isFunction();
TD( function * test () {} ).isFunction();
TD( () => {} ).isFunction();
```

默认情况下，不会将 `class` 类判定为函数。

```js
/** false */
TD( class Test {} ).isFunction();
```

如果希望 `isFunction` 能包含 `class` 类，可传入一个 `true` 参数:

```js
/** true */
TD( class Test {} ).isFunction( true );
```

<h3 id="isString">isString</h3>

#### 功能：判断是否为字符串。

```js
/** true */
TD( "abc" ).isString();
TD( String( "abc" ) ).isString();
```

<h3 id="isArray">isArray</h3>

#### 功能：判断是否为数组。

```js
/** true */
TD( [ 1, 2 ] ).isArray();
TD( Array( 1, 2 ) ).isArray();
```

<h3 id="isBoolean">isBoolean</h3>

#### 功能：判断是否为布尔值。

```js
/** true */
TD( true ).isBoolean();
TD( Boolean( true ) ).isBoolean();
```

<h3 id="isSymbol">isSymbol</h3>

#### 功能：判断是否为 `Symbol`。

```js
/** true */
TD( Symbol() ).isSymbol();
TD( Symbol.for( "abc" ) ).isSymbol();
```

<h3 id="isBigInt">isBigInt</h3>

#### 功能：判断是否为 `BigInt`。

```js
/** true */
TD( 10n ).isBigInt();
TD( BigInt( 10 ) ).isBigInt();
```

<h3 id="isUndefined">isUndefined</h3>

#### 功能：判断是否为 `undefined`。

```js
/** true */
TD( undefined ).isUndefined();
```

<h3 id="isNull">isNull</h3>

#### 功能：判断是否为 `null`。

```js
/** true */
TD( null ).isNull();
```

<h3 id="isNil">isNil</h3>

#### 功能：判断是否为 `null` 或 `undefined`。

```js
/** true */
TD( null ).isNil();
TD( undefined ).isNil();
```

<h3 id="isNumber">isNumber</h3>

#### 功能：判断是否为数字。

```js
/** true */
TD( 10 ).isNumber();
TD( Number( 20 ) ).isNumber();
```

<h3 id="isInt">isInt</h3>

#### 功能：判断是否为整数（ 必须是安全整数，即在 -2^53 到 2^53 之间的整数 ）。

```js
/** true */
TD( 10 ).isInt();
TD( 10.00 ).isInt();
TD( Number( 20 ) ).isInt();
```

<h3 id="isFloat">isFloat</h3>

#### 功能：判断是否为浮点数（ 必须在安全整数范围内，即在 -2^53 到 2^53 之间的数值 ）。

```js
/** true */
TD( 10.01 ).isFloat();
TD( Number( -20.2 ) ).isFloat();
```

<h3 id="isNaN">isNaN</h3>

#### 功能：判断是否为 `NaN`。

```js
/** true */
TD( NaN ).isNaN();
```

<h3 id="isFinite">isFinite</h3>

#### 功能：判断是否为一个有限数。

```js
/** true */
TD( 20 ).isFinite();

/** false */
TD( Infinity ).isFinite();
TD( -Infinity ).isFinite();
TD( NaN ).isFinite();
```

<h3 id="isSet">isSet</h3>

#### 功能：判断是否为 `Set`。

```js
/** true */
TD( new Set() ).isSet();
```

<h3 id="isWeakSet">isWeakSet</h3>

#### 功能：判断是否为 `WeakSet`。

```js
/** true */
TD( new WeakSet() ).isWeakSet();
```

<h3 id="isMap">isMap</h3>

#### 功能：判断是否为 `Map`。

```js
/** true */
TD( new Map() ).isMap();
```

<h3 id="isWeakMap">isWeakMap</h3>

#### 功能：判断是否为 `WeakMap`。

```js
/** true */
TD( new WeakMap() ).isWeakMap();
```

<h3 id="isPlainObject">isPlainObject</h3>

#### 功能：判断是否为纯对象。

注：只有通过 "字面量形式或 Object 构造函数" 创建的对象才会判定为纯对象。

```js
/** true */
TD( {} ).isPlainObject();
TD( Object() ).isPlainObject();
```

<h3 id="isObject">isObject</h3>

#### 功能：判断是否为对象。

注：只要 `typeof` 返回 `object` 的都判定为对象。

```js
/** true */
TD( {} ).isObject();
TD( [] ).isObject();
TD( null ).isObject();
```

<h3 id="isElement">isElement</h3>

#### 功能：判断是否为 `DOM` 元素。

注：必须是单个且页面中真实存在的元素。

```js
/** true */
TD( document.querySelector( "html" ) ).isElement();
TD( document.getElementById( "target" ) ).isElement();
TD( document.getElementsByTagName( "div" )[ 0 ] ).isElement();

/** false */
TD( document.querySelectorAll( "div" ) ).isElement();
TD( document.getElementsByTagName( "div" ) ).isElement();
```

<h3 id="isWindow">isWindow</h3>

#### 功能：判断是否为 `window` 对象。

注：只能用于浏览器环境，在 `node` 环境中将直接返回 `false`。

```js
/** true */
TD( window ).isWindow();
```

<h3 id="isWindow">isPromise</h3>

#### 功能：判断是否为 `Promise`。

```js
/** true */
TD( new Promise( () => {} ) ).isPromise();
```

<h3 id="isClass">isClass</h3>

#### 功能：判断是否为 `class` 类。

```js
/** true */
TD( class Test {} ).isClass();
```

<h3 id="isBlob">isBlob</h3>

#### 功能：判断是否为 `Blob`。

注：只能用于浏览器环境，在 `node` 环境中将直接返回 `false`。

```js
/** true */
TD( new Blob( [ "123" ], { type: "text/html" } ) ).isBlob();
```

<h3 id="isArrayBuffer">isArrayBuffer</h3>

#### 功能：判断是否为 `ArrayBuffer`。

```js
/** true */
TD( new ArrayBuffer( 8 ) ).isArrayBuffer();
```

<h3 id="isBuffer">isBuffer</h3>

#### 功能：判断是否为 `Buffer`。

注：只能用于 `node` 环境，在浏览器环境中将直接返回 `false`。

```js
/** true */
TD( Buffer.from( "test" ) ).isBuffer();
```

<h3 id="isEmptyPlainObject">isEmptyPlainObject</h3>

#### 功能：判断是否为空的纯对象。

```js
/** true */
TD( {} ).isEmptyPlainObject();

/** false */
TD( { a: 1 } ).isEmptyPlainObject();
```

<h3 id="isEmptyArray">isEmptyArray</h3>

#### 功能：判断是否为空数组。

```js
/** true */
TD( [] ).isEmptyArray();

/** false */
TD( [ 1, 2 ] ).isEmptyArray();
```

<h3 id="isEmptyString">isEmptyString</h3>

#### 功能：判断是否为空字符串。

```js
/** true */
TD( "" ).isEmptyString();

/** false */
TD( " " ).isEmptyString();
TD( "test" ).isEmptyString();
```

<h3 id="isArrayOnlyIncludePlainObject">isArrayOnlyIncludePlainObject</h3>

#### 功能：判断是否为只包含纯对象的数组。

```js
/** true */
TD( [ {}, {}, {} ] ).isArrayOnlyIncludePlainObject();

/** false */
TD( [ {}, 1, true ] ).isArrayOnlyIncludePlainObject();
```

<h3 id="type">type</h3>

#### 功能：获取数据类型。

```js
/** array */
TD( [] ).type();

/** object */
TD( {} ).type();

/** string */
TD( "" ).type();

/** number */
TD( 10 ).type();
```

<hr>

## 浏览器兼容

| Chrome | Firefox | Edge | Safari | IE    |
| ---    | ---     | ---  | ---    | ---   |
| 110+   | 110+    | 110+ | 15+    | 不支持 |
