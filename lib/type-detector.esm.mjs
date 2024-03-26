/* !
 * TypeDetector v1.0.0
 * Copyright (C) 2024-present, ZG
 * Released under the MIT license.
 */
export default ( () => {

    "use strict";

    /** 判断当前运行环境 */
    const isBrowser = typeof window === "object";
    const isNode = !isBrowser && typeof process === "object";

    /**
     * 缓存 Object.prototype.toString 方法
     * 后续程序主要根据此方法获取数据类型
     */
    const toType = ( () => {
        let result = Object.prototype.toString;

        /** 在浏览器端防止 Object.prototype.toString 被改写 */
        if ( isBrowser ) {
            const bodyElem = document.body;
            bodyElem.insertAdjacentHTML( "afterbegin", "<iframe style=\"display:none !important;\"></iframe>" );
            const iframe = document.querySelector( "body > iframe:first-child" );
            result = iframe.contentWindow.Object.prototype.toString; 
            bodyElem.removeChild( iframe );
        }
        return result;
    } )();

    /**
     * 获取数据类型 ( 内部方法 )
     * @param {*} data 
     * @returns {string}
     */
    function typeIs ( data ) {
        return toType.call( data ).slice( 8, -1 ).toLowerCase();
    }

    /**
     * 判断是否为函数 ( 内部方法 )
     * @param {*} data - 待检测的数据
     * @param {boolean} [includeClass=false] - 是否将 class 判定为函数
     * @returns {boolean}
     */
    function isFunction ( data, includeClass = false ) {
        if ( typeof data !== "function" ) {
            return false;
        }
        if ( !/^(function|generatorfunction|asyncfunction)+$/.test( typeIs( data ) ) ) {
            return false;
        }
        if ( !includeClass && data.toString().startsWith( "class" ) ) {
            return false;
        }
        return true;
    }

    /**
     * 判断是否为非 null 的对象 ( 内部方法 )
     * @param {*} data
     * @returns {boolean}
     */
    function isObjectWithoutNull ( data ) {
        return !!( data && typeof data === "object" );
    }

    /**
     * 判断是否为纯对象 ( 内部方法 )
     * 即: 通过 "字面量形式或 Object 构造函数" 创建的对象
     * @param {*} data
     * @returns {boolean}
     */
    function isPlainObject ( data ) {
        if ( !isObjectWithoutNull( data ) ) {
            return false;
        }
        if ( typeIs( data ) !== "object" ) {
            return false;
        }

        /** 通过 Object.create( null ) 创建的对象 */
        const proto = Object.getPrototypeOf( data );
        if ( proto === null ) {
            return true;
        }

        /** 判断构造方法 */
        const constructor = proto.constructor;
        return isFunction( constructor ) && ( Object.hasOwn.toString.call( constructor ) === Object.hasOwn.toString.call( Object ) );
    }

    /**
     * 检测是否为字符串 ( 内部方法 )
     * @param {*} data 
     * @returns {boolean}
     */
    function isString ( data ) {
        return (
            typeof data === "string" && 
            typeIs( data ) === "string" &&
            new String( data ).valueOf() === data &&
            Number.isSafeInteger( data.length ) &&
            data.length >= 0
        );
    }

    /** 
     * TypeDetector 类
     * @class
     */
    class TypeDetector {

        /**
         * 记录原始数据以及通过 `typeIs` 内部方法获取的结果
         * @param {*} data 
         */
        constructor ( data ) {
            this.data = data;
            this.typeIs = typeIs( data );
        }

        /**
         * 是否为 function ( 直接调用内部同名方法 )
         * @since 1.0.0
         * @param {boolean} includeClass - 是否将 class 判定为函数
         * @returns {boolean}
         */
        isFunction ( includeClass ) {
            return isFunction( this.data, includeClass );
        }

        /**
         * 是否为 string ( 直接调用内部同名方法 )
         * @since 1.0.0
         * @returns {boolean}
         */
        isString () {
            return isString( this.data );
        }

        /**
         * 是否为数组
         * @since 1.0.0
         * @returns {boolean}
         */
        isArray () {
            return Array.isArray( this.data );
        }

        /**
         * 是否为 boolean
         * @since 1.0.0
         * @returns {boolean}
         */
        isBoolean () {
            return (
                typeof this.data === "boolean" && 
                this.typeIs === "boolean" && 
                new Boolean( this.data ).valueOf() === this.data
            );
        }

        /**
         * 是否为 Symbol
         * @since 1.0.0
         * @returns {boolean}
         */
        isSymbol () {
            if ( typeof this.data !== "symbol" || this.typeIs !== "symbol" ) {
                return false;
            }
            const obj = Object.create( null );
            obj[ this.data ] = 1;
            if ( Object.getOwnPropertySymbols( obj ).length !== 1 ) {
                return false;
            }
            return true;
        }

        /**
         * 是否为 BigInt
         * @since 1.0.0
         * @returns {boolean}
         */
        isBigInt () {
            return typeof this.data === "bigint" && this.typeIs === "bigint";
        }

        /**
         * 是否为 undefined
         * @since 1.0.0
         * @returns {boolean}
         */
        isUndefined () {
            return (
                typeof this.data === "undefined" &&
                this.typeIs === "undefined" && 
                this.data === undefined
            );
        }

        /**
         * 是否为 null
         * @since 1.0.0
         * @returns {boolean}
         */
        isNull () {
            return (
                typeof this.data === "object" &&
                this.typeIs === "null" && 
                this.data === null
            );
        }

        /**
         * 是否为 null 或 undefined
         * @since 1.0.0
         * @returns {boolean}
         */
        isNil () {
            return this.isNull() || this.isUndefined();
        }

        /**
         * 是否为 number
         * @since 1.0.0
         * @returns {boolean}
         */
        isNumber () {
            return (
                typeof this.data === "number" && 
                this.typeIs === "number" &&
                new Number( this.data ).valueOf() === this.data
            ); 
        }

        /**
         * 是否为整数
         * 注: 必须满足是安全范围内 ( -2^53 到 2^53 之间 ) 的数字
         * @since 1.0.0
         * @returns {boolean}
         */
        isInt () {
            return this.isNumber() && Number.isSafeInteger( this.data );
        }

        /**
         * 是否为浮点数
         * 注: 必须满足是安全范围内 ( -2^53 到 2^53 之间 ) 的数字
         * @since 1.0.0
         * @returns {boolean}
         */
        isFloat () {
            return (
                this.isNumber() &&
                ( this.data < Number.MAX_SAFE_INTEGER || this.data > Number.MIN_SAFE_INTEGER ) && 
                !Number.isInteger( this.data ) && 
                this.data.toString().includes( "." )
            );
        }

        /**
         * 是否为 NaN
         * @since 1.0.0
         * @returns {boolean}
         */
        isNaN () {
            return Number.isNaN( this.data );
        }

        /**
         * 是否为有限的数值
         * @since 1.0.0
         * @returns {boolean}
         */
        isFinite () {
            return Number.isFinite( this.data );
        }

        /**
         * 是否为 Set
         * @since 1.0.0
         * @returns {boolean}
         */
        isSet () {
            return (
                isObjectWithoutNull( this.data ) &&
                this.typeIs === "set" && 
                this.data instanceof Set &&
                Number.isSafeInteger( this.data.size ) && 
                this.data.size >= 0 &&
                this.data.constructor.toString().startsWith( "function Set()" )
            );
        }

        /**
         * 是否为 WeakSet
         * @since 1.0.0
         * @returns {boolean}
         */
        isWeakSet () {
            return !!( isObjectWithoutNull( this.data ) && this.typeIs === "weakset" );
        }

        /**
         * 是否为 Map
         * @since 1.0.0
         * @returns {boolean}
         */
        isMap () {
            return (
                isObjectWithoutNull( this.data ) &&
                this.typeIs === "map" && 
                this.data instanceof Map &&
                Number.isSafeInteger( this.data.size ) && 
                this.data.size >= 0 &&
                this.data.constructor.toString().startsWith( "function Map()" )
            );
        }

        /**
         * 是否为 WeakMap
         * @since 1.0.0
         * @returns {boolean}
         */
        isWeakMap () {
            return !!( isObjectWithoutNull( this.data ) && this.typeIs === "weakmap" );
        }

        /**
         * 是否为纯对象 ( 直接调用内部同名方法 )
         * @since 1.0.0
         * @returns {boolean}
         */
        isPlainObject () {
            return isPlainObject( this.data );
        }

        /**
         * 是否为对象
         * 注: 只要求 typeof 返回 object
         * @since 1.0.0
         * @returns {boolean}
         */
        isObject () {
            return typeof this.data === "object";
        }

        /**
         * 是否为 DOM 元素
         * 注: 
         *   - 仅适用于浏览器环境
         *   - 必须是单个且存在的 DOM 元素
         *   - 支持标准 HTML 元素和自定义元素
         * @since 1.0.0
         * @returns {boolean}
         */
        isElement () {
            if ( !isBrowser ) {
                return false;
            }
            if ( !this.data || typeof this.data !== "object" ) {
                return false;
            }
            if ( this.data.nodeType !== 1 || !/^[a-z]+[-]?[a-z]+$/.test( this.data.nodeName?.toLowerCase() ) ) {
                return false;
            }
            if ( !this.typeIs.startsWith( "html" ) ) {
                return false;
            }
            if ( !( this.data instanceof HTMLElement ) ) {
                return false;
            }
            return true;
        }

        /**
         * 是否为 window 对象
         * 注: 仅适用于浏览器环境
         * @since 1.0.0
         * @returns {boolean}
         */
        isWindow () {
            if ( !isBrowser ) {
                return false;
            }
            if ( this.typeIs !== "window" ) {
                return false;
            }
            if ( 
                this.data !== window ||
                this.data.self !== window || 
                this.data.window !== window || 
                this.data.frames !== window || 
                this.data.document !== document 
            ) {
                return false;
            }
            const [ windowKeys, dataKeys ] = [ 
                new Set( Reflect.ownKeys( window ) ), 
                new Set( Reflect.ownKeys( this.data ) )
            ];
            if ( windowKeys.size !== dataKeys.size ) {
                return false;
            }
            const propDiff = ( a, b ) => {
                if ( Set.prototype.difference ) {
                    return a.difference( b );
                }
                return new Set( [ ...a ].filter( item => !b.has( item ) ) )
            }
            if ( propDiff( windowKeys, dataKeys ).size ) {
                return false;
            }
            return true;
        }

        /**
         * 是否为 Promise
         * @since 1.0.0
         * @returns {boolean}
         */
        isPromise () {
            if ( this.typeIs !== "promise" ) {
                return false;
            }
            if ( !( this.data instanceof Promise ) ) {
                return false;
            }
            if ( ( [ "then", "catch", "finally" ].filter( item => !isFunction( ( this.data )[ item ] ) ) ).length ) {
                return false;
            }
            return true;
        }

        /**
         * 是否为 class
         * @since 1.0.0
         * @returns {boolean}
         */
        isClass () {
            if ( !isFunction( this.data, true ) ) {
                return false;
            }
            return this.data.toString().startsWith( "class" );
        }

        /**
         * 是否为 Blob
         * 注: 仅适用于浏览器环境
         * @since 1.0.0
         * @returns {boolean}
         */
        isBlob () {
            if ( !isBrowser ) {
                return false;
            }
            if ( this.typeIs !== "blob" ) {
                return false;
            }
            if ( !( this.data instanceof Blob ) ) {
                return false;
            }
            if ( 
                !Number.isSafeInteger( this.data.size ) ||
                this.data.size < 0 ||
                typeof this.data.type !== "string"
            ) {
                return false;
            }
            if ( this.data.constructor !== Blob ) {
                return false;
            }
            return true;
        }

        /**
         * 是否为 ArrayBuffer
         * @since 1.0.0
         * @returns {boolean}
         */
        isArrayBuffer () {
            if ( this.typeIs !== "arraybuffer" ) {
                return false;
            }
            if ( !( this.data instanceof ArrayBuffer ) ) {
                return false;
            }
            if ( !Number.isSafeInteger( this.data.byteLength ) || this.data.byteLength < 0 ) {
                return false;
            }
            if ( this.data.constructor !== ArrayBuffer ) {
                return false;
            }
            return true;
        }

        /**
         * 是否为 Buffer
         * 注: 仅适用于 Node 环境
         * @since 1.0.0
         * @returns {boolean}
         */
        isBuffer () {
            if ( !isNode ) {
                return false;
            }
            if ( !isFunction( this.data ) ) {
                return false;
            }
            if ( !( this.data instanceof Buffer ) ) {
                return false;
            }
            if ( !Number.isSafeInteger( this.data.length ) || this.data.length < 0 ) {
                return false;
            }
            if ( this.data.constructor !== Buffer ) {
                return false;
            }
            return true;
        }

        /**
         * 是否为空的纯对象
         * @since 1.0.0
         * @returns {boolean}
         */
        isEmptyPlainObject () {
            if ( !isPlainObject( this.data ) || Reflect.ownKeys( this.data ).length ) {
                return false;
            }
            return true;
        }

        /**
         * 是否为空数组
         * @since 1.0.0
         * @returns {boolean}
         */
        isEmptyArray () {
            if ( !Array.isArray( this.data ) || this.data.length ) {
                return false;
            }
            return true;
        }

        /**
         * 是否为空字符串
         * @since 1.0.0
         * @returns {boolean}
         */
        isEmptyString () {
            if ( !isString( this.data ) || this.data ) {
                return false;
            }
            return true;
        }

        /**
         * 是否为只包含纯对象的数组
         * @since 1.0.0
         * @returns {boolean}
         */
        isArrayOnlyIncludePlainObject () {
            if ( !Array.isArray( this.data ) || !this.data.length ) {
                return false;
            }
            let result = true;
            for ( const item of this.data ) {
                if ( !isPlainObject( item ) ) {
                    result = false;
                    break;
                }
            }
            return result;
        }

        /**
         * 获取数据类型
         * @since 1.0.0
         * @returns {string}
         */
        type () {
            const innerType = [
                [ this.isFunction(), "function" ],
                [ this.isString(), "string" ],
                [ this.isArray(), "array" ],
                [ this.isBoolean(), "boolean" ],
                [ this.isSymbol(), "symbol" ],
                [ this.isBigInt(), "bigint" ],
                [ this.isUndefined(), "undefined" ],
                [ this.isNull(), "null" ],
                [ this.isNumber(), "number" ],
                [ this.isNaN(), "nan" ],
                [ this.isSet(), "set" ],
                [ this.isWeakSet(), "weakset" ],
                [ this.isMap(), "map" ],
                [ this.isWeakMap(), "weakmap" ],

                /** 
                 * 只有纯对象会被判定为是 object
                 * 其它数据即使通过 typeof 得到 object 也不会判定为 object
                 */
                [ this.isPlainObject(), "object" ],
                
                [ this.isWindow(), "window" ],
                [ this.isPromise(), "promise" ],
                [ this.isClass(), "class" ],
                [ this.isBlob(), "blob" ],
                [ this.isArrayBuffer(), "arraybuffer" ]
                
            ];
            let type = "";
            for ( const [ result, typeStr ] of innerType ) {
                if ( result ) {
                    type = typeStr;
                    break;
                }
            }
            return type || this.typeIs;
        }
    }

    return data => new TypeDetector( data );

} )();