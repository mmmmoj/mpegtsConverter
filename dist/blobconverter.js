

/*- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
/* Merging js from "src/list/blobconverter.txt" begins */
/*- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */


/* Last merge : 2016年 10月 26日 星期三 16:40:14 CST  */

/* Merging order :

- src/converter/jdataview.js
- src/converter/jbinary.js
- src/converter/adts.js
- src/converter/async.js
- src/converter/h264.js
- src/converter/mp4.js
- src/converter/mpegts.js
- src/converter/pes.js
- src/converter/mojConv.js

*/


/*- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
/* Merging js: src/converter/jdataview.js begins */
/*- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */


/**
 * Created by mojahed on 16-10-16.
 */
!function (a) {
    var b = this;
    "object" == typeof exports ? module.exports = a(b) : "function" == typeof define && define.amd ? define([], function () {
        return a(b)
    }) : b.jDataView = a(b)
}(function (a) {
    "use strict";
    function b(a, b) {
        return "object" != typeof a || null === a ? !1 : a.constructor === b || Object.prototype.toString.call(a) === "[object " + b.name + "]"
    }

    function c(a, c) {
        return !c && b(a, Array) ? a : Array.prototype.slice.call(a)
    }

    function d(a, b) {
        return void 0 !== a ? a : b
    }

    function e(a, c, f, g) {
        if (e.is(a)) {
            var h = a.slice(c, c + f);
            return h._littleEndian = d(g, h._littleEndian), h
        }
        if (!e.is(this))return new e(a, c, f, g);
        if (this.buffer = a = e.wrapBuffer(a), this._isArrayBuffer = j.ArrayBuffer && b(a, ArrayBuffer), this._isPixelData = !0 && j.PixelData && b(a, CanvasPixelArray), this._isDataView = j.DataView && this._isArrayBuffer, this._isNodeBuffer = !1, !this._isArrayBuffer && !this._isPixelData && !b(a, Array))throw new TypeError("jDataView buffer has an incompatible type");
        this._littleEndian = !!g;
        var i = "byteLength" in a ? a.byteLength : a.length;
        this.byteOffset = c = d(c, 0), this.byteLength = f = d(f, i - c), this._offset = this._bitOffset = 0, this._isDataView ? this._view = new DataView(a, c, f) : this._checkBounds(c, f, i), this._engineAction = this._isDataView ? this._dataViewAction : this._isArrayBuffer ? this._arrayBufferAction : this._arrayAction
    }

    function f(a) {
        for (var b = j.ArrayBuffer ? Uint8Array : Array, c = new b(a.length), d = 0, e = a.length; e > d; d++)c[d] = 255 & a.charCodeAt(d);
        return c
    }

    function g(a) {
        return a >= 0 && 31 > a ? 1 << a : g[a] || (g[a] = Math.pow(2, a))
    }

    function h(a, b) {
        this.lo = a, this.hi = b
    }

    function i() {
        h.apply(this, arguments)
    }

    var j = {
        NodeBuffer: !1,
        DataView: "DataView" in a,
        ArrayBuffer: "ArrayBuffer" in a,
        PixelData: !0 && "CanvasPixelArray" in a && !("Uint8ClampedArray" in a) && "document" in a
    }, k = a.TextEncoder, l = a.TextDecoder;
    if (j.PixelData)var m = document.createElement("canvas").getContext("2d"), n = function (a, b) {
        var c = m.createImageData((a + 3) / 4, 1).data;
        if (c.byteLength = a, void 0 !== b)for (var d = 0; a > d; d++)c[d] = b[d];
        return c
    };
    var o = {Int8: 1, Int16: 2, Int32: 4, Uint8: 1, Uint16: 2, Uint32: 4, Float32: 4, Float64: 8};
    e.wrapBuffer = function (a) {
        switch (typeof a) {
            case"number":
                if (j.ArrayBuffer)a = new Uint8Array(a).buffer; else if (j.PixelData)a = n(a); else {
                    a = new Array(a);
                    for (var d = 0; d < a.length; d++)a[d] = 0
                }
                return a;
            case"string":
                a = f(a);
            default:
                return "length" in a && !(j.ArrayBuffer && b(a, ArrayBuffer) || j.PixelData && b(a, CanvasPixelArray)) && (j.ArrayBuffer ? b(a, ArrayBuffer) || (a = new Uint8Array(a).buffer, b(a, ArrayBuffer) || (a = new Uint8Array(c(a, !0)).buffer)) : a = j.PixelData ? n(a.length, a) : c(a)), a
        }
    }, e.is = function (a) {
        return a && a.jDataView
    }, e.from = function () {
        return new e(arguments)
    }, e.Uint64 = h, h.prototype = {
        valueOf: function () {
            return this.lo + g(32) * this.hi
        }, toString: function () {
            return Number.prototype.toString.apply(this.valueOf(), arguments)
        }
    }, h.fromNumber = function (a) {
        var b = Math.floor(a / g(32)), c = a - b * g(32);
        return new h(c, b)
    }, e.Int64 = i, i.prototype = "create" in Object ? Object.create(h.prototype) : new h, i.prototype.valueOf = function () {
        return this.hi < g(31) ? h.prototype.valueOf.apply(this, arguments) : -(g(32) - this.lo + g(32) * (g(32) - 1 - this.hi))
    }, i.fromNumber = function (a) {
        var b, c;
        if (a >= 0) {
            var d = h.fromNumber(a);
            b = d.lo, c = d.hi
        } else c = Math.floor(a / g(32)), b = a - c * g(32), c += g(32);
        return new i(b, c)
    };
    var p = e.prototype = {
        compatibility: j, jDataView: !0, _checkBounds: function (a, b, c) {
            if ("number" != typeof a)throw new TypeError("Offset is not a number.");
            if ("number" != typeof b)throw new TypeError("Size is not a number.");
            if (0 > b)throw new RangeError("Length is negative.");
            if (0 > a || a + b > d(c, this.byteLength))throw new RangeError("Offsets are out of bounds.")
        }, _action: function (a, b, c, e, f) {
            return this._engineAction(a, b, d(c, this._offset), d(e, this._littleEndian), f)
        }, _dataViewAction: function (a, b, c, d, e) {
            return this._offset = c + o[a], b ? this._view["get" + a](c, d) : this._view["set" + a](c, e, d)
        }, _arrayBufferAction: function (b, c, e, f, g) {
            var h, i = o[b], j = a[b + "Array"];
            if (f = d(f, this._littleEndian), 1 === i || (this.byteOffset + e) % i === 0 && f)return h = new j(this.buffer, this.byteOffset + e, 1), this._offset = e + i, c ? h[0] : h[0] = g;
            var k = new Uint8Array(c ? this.getBytes(i, e, f, !0) : i);
            return h = new j(k.buffer, 0, 1), c ? h[0] : (h[0] = g, void this._setBytes(e, k, f))
        }, _arrayAction: function (a, b, c, d, e) {
            return b ? this["_get" + a](c, d) : this["_set" + a](c, e, d)
        }, _getBytes: function (a, b, e) {
            e = d(e, this._littleEndian), b = d(b, this._offset), a = d(a, this.byteLength - b), this._checkBounds(b, a), b += this.byteOffset, this._offset = b - this.byteOffset + a;
            var f = this._isArrayBuffer ? new Uint8Array(this.buffer, b, a) : (this.buffer.slice || Array.prototype.slice).call(this.buffer, b, b + a);
            return e || 1 >= a ? f : c(f).reverse()
        }, getBytes: function (a, b, e, f) {
            var g = this._getBytes(a, b, d(e, !0));
            return f ? c(g) : g
        }, _setBytes: function (a, b, e) {
            var f = b.length;
            if (0 !== f) {
                if (e = d(e, this._littleEndian), a = d(a, this._offset), this._checkBounds(a, f), !e && f > 1 && (b = c(b, !0).reverse()), a += this.byteOffset, this._isArrayBuffer)new Uint8Array(this.buffer, a, f).set(b); else for (var g = 0; f > g; g++)this.buffer[a + g] = b[g];
                this._offset = a - this.byteOffset + f
            }
        }, setBytes: function (a, b, c) {
            this._setBytes(a, b, d(c, !0))
        }, getString: function (a, b, c) {
            var d = this._getBytes(a, b, !0);
            if (c = "utf8" === c ? "utf-8" : c || "binary", l && "binary" !== c)return new l(c).decode(this._isArrayBuffer ? d : new Uint8Array(d));
            var e = "";
            a = d.length;
            for (var f = 0; a > f; f++)e += String.fromCharCode(d[f]);
            return "utf-8" === c && (e = decodeURIComponent(escape(e))), e
        }, setString: function (a, b, c) {
            c = "utf8" === c ? "utf-8" : c || "binary";
            var d;
            k && "binary" !== c ? d = new k(c).encode(b) : ("utf-8" === c && (b = unescape(encodeURIComponent(b))), d = f(b)), this._setBytes(a, d, !0)
        }, getChar: function (a) {
            return this.getString(1, a)
        }, setChar: function (a, b) {
            this.setString(a, b)
        }, tell: function () {
            return this._offset
        }, seek: function (a) {
            return this._checkBounds(a, 0), this._offset = a
        }, skip: function (a) {
            return this.seek(this._offset + a)
        }, slice: function (a, b, c) {
            function f(a, b) {
                return 0 > a ? a + b : a
            }

            return a = f(a, this.byteLength), b = f(d(b, this.byteLength), this.byteLength), c ? new e(this.getBytes(b - a, a, !0, !0), void 0, void 0, this._littleEndian) : new e(this.buffer, this.byteOffset + a, b - a, this._littleEndian)
        }, alignBy: function (a) {
            return this._bitOffset = 0, 1 !== d(a, 1) ? this.skip(a - (this._offset % a || a)) : this._offset
        }, _getFloat64: function (a, b) {
            var c = this._getBytes(8, a, b), d = 1 - 2 * (c[7] >> 7), e = ((c[7] << 1 & 255) << 3 | c[6] >> 4) - 1023, f = (15 & c[6]) * g(48) + c[5] * g(40) + c[4] * g(32) + c[3] * g(24) + c[2] * g(16) + c[1] * g(8) + c[0];
            return 1024 === e ? 0 !== f ? 0 / 0 : 1 / 0 * d : -1023 === e ? d * f * g(-1074) : d * (1 + f * g(-52)) * g(e)
        }, _getFloat32: function (a, b) {
            var c = this._getBytes(4, a, b), d = 1 - 2 * (c[3] >> 7), e = (c[3] << 1 & 255 | c[2] >> 7) - 127, f = (127 & c[2]) << 16 | c[1] << 8 | c[0];
            return 128 === e ? 0 !== f ? 0 / 0 : 1 / 0 * d : -127 === e ? d * f * g(-149) : d * (1 + f * g(-23)) * g(e)
        }, _get64: function (a, b, c) {
            c = d(c, this._littleEndian), b = d(b, this._offset);
            for (var e = c ? [0, 4] : [4, 0], f = 0; 2 > f; f++)e[f] = this.getUint32(b + e[f], c);
            return this._offset = b + 8, new a(e[0], e[1])
        }, getInt64: function (a, b) {
            return this._get64(i, a, b)
        }, getUint64: function (a, b) {
            return this._get64(h, a, b)
        }, _getInt32: function (a, b) {
            var c = this._getBytes(4, a, b);
            return c[3] << 24 | c[2] << 16 | c[1] << 8 | c[0]
        }, _getUint32: function (a, b) {
            return this._getInt32(a, b) >>> 0
        }, _getInt16: function (a, b) {
            return this._getUint16(a, b) << 16 >> 16
        }, _getUint16: function (a, b) {
            var c = this._getBytes(2, a, b);
            return c[1] << 8 | c[0]
        }, _getInt8: function (a) {
            return this._getUint8(a) << 24 >> 24
        }, _getUint8: function (a) {
            return this._getBytes(1, a)[0]
        }, _getBitRangeData: function (a, b) {
            var c = (d(b, this._offset) << 3) + this._bitOffset, e = c + a, f = c >>> 3, g = e + 7 >>> 3, h = this._getBytes(g - f, f, !0), i = 0;
            (this._bitOffset = 7 & e) && (this._bitOffset -= 8);
            for (var j = 0, k = h.length; k > j; j++)i = i << 8 | h[j];
            return {start: f, bytes: h, wideValue: i}
        }, getSigned: function (a, b) {
            var c = 32 - a;
            return this.getUnsigned(a, b) << c >> c
        }, getUnsigned: function (a, b) {
            var c = this._getBitRangeData(a, b).wideValue >>> -this._bitOffset;
            return 32 > a ? c & ~(-1 << a) : c
        }, _setBinaryFloat: function (a, b, c, d, e) {
            var f, h, i = 0 > b ? 1 : 0, j = ~(-1 << d - 1), k = 1 - j;
            0 > b && (b = -b), 0 === b ? (f = 0, h = 0) : isNaN(b) ? (f = 2 * j + 1, h = 1) : 1 / 0 === b ? (f = 2 * j + 1, h = 0) : (f = Math.floor(Math.log(b) / Math.LN2), f >= k && j >= f ? (h = Math.floor((b * g(-f) - 1) * g(c)), f += j) : (h = Math.floor(b / g(k - c)), f = 0));
            for (var l = []; c >= 8;)l.push(h % 256), h = Math.floor(h / 256), c -= 8;
            for (f = f << c | h, d += c; d >= 8;)l.push(255 & f), f >>>= 8, d -= 8;
            l.push(i << d | f), this._setBytes(a, l, e)
        }, _setFloat32: function (a, b, c) {
            this._setBinaryFloat(a, b, 23, 8, c)
        }, _setFloat64: function (a, b, c) {
            this._setBinaryFloat(a, b, 52, 11, c)
        }, _set64: function (a, b, c, e) {
            "object" != typeof c && (c = a.fromNumber(c)), e = d(e, this._littleEndian), b = d(b, this._offset);
            var f = e ? {lo: 0, hi: 4} : {lo: 4, hi: 0};
            for (var g in f)this.setUint32(b + f[g], c[g], e);
            this._offset = b + 8
        }, setInt64: function (a, b, c) {
            this._set64(i, a, b, c)
        }, setUint64: function (a, b, c) {
            this._set64(h, a, b, c)
        }, _setUint32: function (a, b, c) {
            this._setBytes(a, [255 & b, b >>> 8 & 255, b >>> 16 & 255, b >>> 24], c)
        }, _setUint16: function (a, b, c) {
            this._setBytes(a, [255 & b, b >>> 8 & 255], c)
        }, _setUint8: function (a, b) {
            this._setBytes(a, [255 & b])
        }, setUnsigned: function (a, b, c) {
            var d = this._getBitRangeData(c, a), e = d.wideValue, f = d.bytes;
            e &= ~(~(-1 << c) << -this._bitOffset), e |= (32 > c ? b & ~(-1 << c) : b) << -this._bitOffset;
            for (var g = f.length - 1; g >= 0; g--)f[g] = 255 & e, e >>>= 8;
            this._setBytes(d.start, f, !0)
        }
    };
    for (var q in o)!function (a) {
        p["get" + a] = function (b, c) {
            return this._action(a, !0, b, c)
        }, p["set" + a] = function (b, c, d) {
            this._action(a, !1, b, d, c)
        }
    }(q);
    p._setInt32 = p._setUint32, p._setInt16 = p._setUint16, p._setInt8 = p._setUint8, p.setSigned = p.setUnsigned;
    for (var r in p)"set" === r.slice(0, 3) && !function (a) {
        p["write" + a] = function () {
            Array.prototype.unshift.call(arguments, void 0), this["set" + a].apply(this, arguments)
        }
    }(r.slice(3));
    return e
});
//# sourceMappingURL=jdataview.js.map

/*- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
/* Merging js: src/converter/jbinary.js begins */
/*- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */


/**
 * Created by mojahed on 16-10-16.
 */
!function (a) {
    var b = this;
    "object" == typeof exports ? module.exports = a(b, require("jdataview")) : "function" == typeof define && define.amd ? define(["jdataview"], function (c) {
        return a(b, c)
    }) : b.jBinary = a(b, b.jDataView)
}(function (a, b) {
    "use strict";
    function c(a, b) {
        return b && a instanceof b
    }

    function d(a) {
        for (var b = 1, c = arguments.length; c > b; ++b) {
            var d = arguments[b];
            for (var e in d)void 0 !== d[e] && (a[e] = d[e])
        }
        return a
    }

    function e(a) {
        return arguments[0] = m(a), d.apply(null, arguments)
    }

    function f(a, b, d) {
        return c(d, Function) ? d.call(a, b.contexts[0]) : d
    }

    function g(a) {
        return function () {
            var b = arguments, d = b.length - 1, e = a.length - 1, f = b[d];
            if (b.length = e + 1, !c(f, Function)) {
                var g = this;
                return new l(function (c, d) {
                    b[e] = function (a, b) {
                        return a ? d(a) : c(b)
                    }, a.apply(g, b)
                })
            }
            b[d] = void 0, b[e] = f, a.apply(this, b)
        }
    }

    function h(a, d) {
        return c(a, h) ? a.as(d) : (c(a, b) || (a = new b(a, void 0, void 0, d ? d["jBinary.littleEndian"] : void 0)), c(this, h) ? (this.view = a, this.view.seek(0), this.contexts = [], this.as(d, !0)) : new h(a, d))
    }

    function i(a) {
        return e(i.prototype, a)
    }

    function j(a) {
        return e(j.prototype, a, {
            createProperty: function () {
                var b = (a.createProperty || j.prototype.createProperty).apply(this, arguments);
                return b.getBaseType && (b.baseType = b.binary.getType(b.getBaseType(b.binary.contexts[0]))), b
            }
        })
    }

    var k = a.document;
    "atob" in a && "btoa" in a || !function () {
        function b(a) {
            var b, c, e, f, g, h;
            for (e = a.length, c = 0, b = ""; e > c;) {
                if (f = 255 & a.charCodeAt(c++), c == e) {
                    b += d.charAt(f >> 2), b += d.charAt((3 & f) << 4), b += "==";
                    break
                }
                if (g = a.charCodeAt(c++), c == e) {
                    b += d.charAt(f >> 2), b += d.charAt((3 & f) << 4 | (240 & g) >> 4), b += d.charAt((15 & g) << 2), b += "=";
                    break
                }
                h = a.charCodeAt(c++), b += d.charAt(f >> 2), b += d.charAt((3 & f) << 4 | (240 & g) >> 4), b += d.charAt((15 & g) << 2 | (192 & h) >> 6), b += d.charAt(63 & h)
            }
            return b
        }

        function c(a) {
            var b, c, d, f, g, h, i;
            for (h = a.length, g = 0, i = ""; h > g;) {
                do b = e[255 & a.charCodeAt(g++)]; while (h > g && -1 == b);
                if (-1 == b)break;
                do c = e[255 & a.charCodeAt(g++)]; while (h > g && -1 == c);
                if (-1 == c)break;
                i += String.fromCharCode(b << 2 | (48 & c) >> 4);
                do {
                    if (d = 255 & a.charCodeAt(g++), 61 == d)return i;
                    d = e[d]
                } while (h > g && -1 == d);
                if (-1 == d)break;
                i += String.fromCharCode((15 & c) << 4 | (60 & d) >> 2);
                do {
                    if (f = 255 & a.charCodeAt(g++), 61 == f)return i;
                    f = e[f]
                } while (h > g && -1 == f);
                if (-1 == f)break;
                i += String.fromCharCode((3 & d) << 6 | f)
            }
            return i
        }

        var d = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", e = [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 62, -1, -1, -1, 63, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, -1, -1, -1, -1, -1, -1, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, -1, -1, -1, -1, -1, -1, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, -1, -1, -1, -1, -1];
        a.btoa || (a.btoa = b), a.atob || (a.atob = c)
    }();
    var l = a.Promise || function (a) {
            this.then = a
        }, m = Object.create;
    m || (m = function (a) {
        var b = function () {
        };
        return b.prototype = a, new b
    });
    var n = h.prototype, o = n.typeSet = {};
    n.toValue = function (a) {
        return f(this, this, a)
    }, n._named = function (a, b, c) {
        return a.displayName = b + " @ " + (void 0 !== c ? c : this.view.tell()), a
    };
    var p = Object.defineProperty;
    if (p)try {
        p({}, "x", {})
    } catch (q) {
        p = void 0
    } else p = function (a, b, c, d) {
        d && (a[b] = c.value)
    };
    var r = "jBinary.Cache", s = 0;
    n._getCached = function (a, b, c) {
        if (a.hasOwnProperty(this.cacheKey))return a[this.cacheKey];
        var d = b.call(this, a);
        return p(a, this.cacheKey, {value: d}, c), d
    }, n.getContext = function (a) {
        switch (typeof a) {
            case"undefined":
                a = 0;
            case"number":
                return this.contexts[a];
            case"string":
                return this.getContext(function (b) {
                    return a in b
                });
            case"function":
                for (var b = 0, c = this.contexts.length; c > b; b++) {
                    var d = this.contexts[b];
                    if (a.call(this, d))return d
                }
        }
    }, n.inContext = function (a, b) {
        this.contexts.unshift(a);
        var c = b.call(this);
        return this.contexts.shift(), c
    }, i.prototype = {
        inherit: function (a, b) {
            function c(a, b) {
                var c = f[a];
                c && (d || (d = e(f)), b.call(d, c), d[a] = null)
            }

            var d, f = this;
            return c("params", function (b) {
                for (var c = 0, d = b.length; d > c; c++)this[b[c]] = a[c]
            }), c("setParams", function (b) {
                b.apply(this, a)
            }), c("typeParams", function (a) {
                for (var c = 0, d = a.length; d > c; c++) {
                    var e = a[c], f = this[e];
                    f && (this[e] = b(f))
                }
            }), c("resolve", function (a) {
                a.call(this, b)
            }), d || f
        }, createProperty: function (a) {
            return e(this, {binary: a, view: a.view})
        }, toValue: function (a, b) {
            return b !== !1 && "string" == typeof a ? this.binary.getContext(a)[a] : f(this, this.binary, a)
        }
    }, h.Type = i, j.prototype = e(i.prototype, {
        setParams: function () {
            this.baseType && (this.typeParams = ["baseType"].concat(this.typeParams || []))
        }, baseRead: function () {
            return this.binary.read(this.baseType)
        }, baseWrite: function (a) {
            return this.binary.write(this.baseType, a)
        }
    }), d(j.prototype, {
        read: j.prototype.baseRead,
        write: j.prototype.baseWrite
    }), h.Template = j, n.as = function (a, b) {
        var c = b ? this : e(this);
        return a = a || o, c.typeSet = a === o || o.isPrototypeOf(a) ? a : e(o, a), c.cacheKey = r, c.cacheKey = c._getCached(a, function () {
            return r + "." + ++s
        }, !0), c
    }, n.seek = function (a, b) {
        if (a = this.toValue(a), void 0 !== b) {
            var c = this.view.tell();
            this.view.seek(a);
            var d = b.call(this);
            return this.view.seek(c), d
        }
        return this.view.seek(a)
    }, n.tell = function () {
        return this.view.tell()
    }, n.skip = function (a, b) {
        return this.seek(this.tell() + this.toValue(a), b)
    }, n.slice = function (a, b, c) {
        return new h(this.view.slice(a, b, c), this.typeSet)
    }, n._getType = function (a, b) {
        switch (typeof a) {
            case"string":
                if (!(a in this.typeSet))throw new ReferenceError("Unknown type: " + a);
                return this._getType(this.typeSet[a], b);
            case"number":
                return this._getType(o.bitfield, [a]);
            case"object":
                if (c(a, i)) {
                    var d = this;
                    return a.inherit(b || [], function (a) {
                        return d.getType(a)
                    })
                }
                return c(a, Array) ? this._getCached(a, function (a) {
                    return this.getType(a[0], a.slice(1))
                }, !0) : this._getCached(a, function (a) {
                    return this.getType(o.object, [a])
                }, !1)
        }
    }, n.getType = function (a, b) {
        var d = this._getType(a, b);
        return d && !c(a, i) && (d.name = "object" == typeof a ? c(a, Array) ? a[0] + "(" + a.slice(1).join(", ") + ")" : "object" : String(a)), d
    }, n._action = function (a, b, c) {
        if (void 0 !== a) {
            a = this.getType(a);
            var d = this._named(function () {
                return c.call(this, a.createProperty(this), this.contexts[0])
            }, "[" + a.name + "]", b);
            return void 0 !== b ? this.seek(b, d) : d.call(this)
        }
    }, n.read = function (a, b) {
        return this._action(a, b, function (a, b) {
            return a.read(b)
        })
    }, n.readAll = function () {
        return this.read("jBinary.all", 0)
    }, n.write = function (a, b, c) {
        return this._action(a, c, function (a, c) {
            var d = this.tell();
            return a.write(b, c), this.tell() - d
        })
    }, n.writeAll = function (a) {
        return this.write("jBinary.all", a, 0)
    }, function (a, b) {
        for (var c = 0, d = b.length; d > c; c++) {
            var f = b[c];
            o[f.toLowerCase()] = e(a, {dataType: f})
        }
    }(i({
        params: ["littleEndian"], read: function () {
            return this.view["get" + this.dataType](void 0, this.littleEndian)
        }, write: function (a) {
            this.view["write" + this.dataType](a, this.littleEndian)
        }
    }), ["Uint8", "Uint16", "Uint32", "Uint64", "Int8", "Int16", "Int32", "Int64", "Float32", "Float64", "Char"]), d(o, {
        "byte": o.uint8,
        "float": o.float32,
        "double": o.float64
    }), o.array = j({
        params: ["baseType", "length"], read: function () {
            var a = this.toValue(this.length);
            if (this.baseType === o.uint8)return this.view.getBytes(a, void 0, !0, !0);
            var b;
            if (void 0 !== a) {
                b = new Array(a);
                for (var c = 0; a > c; c++)b[c] = this.baseRead()
            } else {
                var d = this.view.byteLength;
                for (b = []; this.binary.tell() < d;)b.push(this.baseRead())
            }
            return b
        }, write: function (a) {
            if (this.baseType === o.uint8)return this.view.writeBytes(a);
            for (var b = 0, c = a.length; c > b; b++)this.baseWrite(a[b])
        }
    }), o.binary = j({
        params: ["length", "typeSet"], read: function () {
            var a = this.binary.tell(), b = this.binary.skip(this.toValue(this.length)), c = this.view.slice(a, b);
            return new h(c, this.typeSet)
        }, write: function (a) {
            this.binary.write("blob", a.read("blob", 0))
        }
    }), o.bitfield = i({
        params: ["bitSize"], read: function () {
            return this.view.getUnsigned(this.bitSize)
        }, write: function (a) {
            this.view.writeUnsigned(a, this.bitSize)
        }
    }), o.blob = i({
        params: ["length"], read: function () {
            return this.view.getBytes(this.toValue(this.length))
        }, write: function (a) {
            this.view.writeBytes(a, !0)
        }
    }), o["const"] = j({
        params: ["baseType", "value", "strict"], read: function () {
            var a = this.baseRead();
            if (this.strict && a !== this.value) {
                if (c(this.strict, Function))return this.strict(a);
                throw new TypeError("Unexpected value (" + a + " !== " + this.value + ").")
            }
            return a
        }, write: function (a) {
            this.baseWrite(this.strict || void 0 === a ? this.value : a)
        }
    }), o["enum"] = j({
        params: ["baseType", "matches"], setParams: function (a, b) {
            this.backMatches = {};
            for (var c in b)this.backMatches[b[c]] = c
        }, read: function () {
            var a = this.baseRead();
            return a in this.matches ? this.matches[a] : a
        }, write: function (a) {
            this.baseWrite(a in this.backMatches ? this.backMatches[a] : a)
        }
    }), o.extend = i({
        setParams: function () {
            this.parts = arguments
        }, resolve: function (a) {
            for (var b = this.parts, c = b.length, d = new Array(c), e = 0; c > e; e++)d[e] = a(b[e]);
            this.parts = d
        }, read: function () {
            var a = this.parts, b = this.binary.read(a[0]);
            return this.binary.inContext(b, function () {
                for (var c = 1, e = a.length; e > c; c++)d(b, this.read(a[c]))
            }), b
        }, write: function (a) {
            var b = this.parts;
            this.binary.inContext(a, function () {
                for (var c = 0, d = b.length; d > c; c++)this.write(b[c], a)
            })
        }
    }), o["if"] = j({
        params: ["condition", "trueType", "falseType"],
        typeParams: ["trueType", "falseType"],
        getBaseType: function () {
            return this.toValue(this.condition) ? this.trueType : this.falseType
        }
    }), o.if_not = o.ifNot = j({
        setParams: function (a, b, c) {
            this.baseType = ["if", a, c, b]
        }
    }), o.lazy = j({
        marker: "jBinary.Lazy", params: ["innerType", "length"], getBaseType: function () {
            return ["binary", this.length, this.binary.typeSet]
        }, read: function () {
            var a = function (b) {
                return 0 === arguments.length ? "value" in a ? a.value : a.value = a.binary.read(a.innerType) : d(a, {
                    wasChanged: !0,
                    value: b
                }).value
            };
            return a[this.marker] = !0, d(a, {
                binary: d(this.baseRead(), {contexts: this.binary.contexts.slice()}),
                innerType: this.innerType
            })
        }, write: function (a) {
            a.wasChanged || !a[this.marker] ? this.binary.write(this.innerType, a()) : this.baseWrite(a.binary)
        }
    }), o.object = i({
        params: ["structure", "proto"], resolve: function (a) {
            var b = {};
            for (var d in this.structure)b[d] = c(this.structure[d], Function) ? this.structure[d] : a(this.structure[d]);
            this.structure = b
        }, read: function () {
            var a = this, b = this.structure, d = this.proto ? e(this.proto) : {};
            return this.binary.inContext(d, function () {
                for (var e in b)this._named(function () {
                    var f = c(b[e], Function) ? b[e].call(a, d) : this.read(b[e]);
                    void 0 !== f && (d[e] = f)
                }, e).call(this)
            }), d
        }, write: function (a) {
            var b = this, d = this.structure;
            this.binary.inContext(a, function () {
                for (var e in d)this._named(function () {
                    c(d[e], Function) ? a[e] = d[e].call(b, a) : this.write(d[e], a[e])
                }, e).call(this)
            })
        }
    }), o.skip = i({
        params: ["length"], read: function () {
            this.view.skip(this.toValue(this.length))
        }, write: function () {
            this.read()
        }
    }), o.string = j({
        params: ["length", "encoding"], read: function () {
            return this.view.getString(this.toValue(this.length), void 0, this.encoding)
        }, write: function (a) {
            this.view.writeString(a, this.encoding)
        }
    }), o.string0 = i({
        params: ["length", "encoding"], read: function () {
            var a = this.view, b = this.length;
            if (void 0 === b) {
                var c, d = a.tell(), e = 0;
                for (b = a.byteLength - d; b > e && (c = a.getUint8());)e++;
                var f = a.getString(e, d, this.encoding);
                return b > e && a.skip(1), f
            }
            return a.getString(b, void 0, this.encoding).replace(/\0.*$/, "")
        }, write: function (a) {
            var b = this.view, c = void 0 === this.length ? 1 : this.length - a.length;
            b.writeString(a, void 0, this.encoding), c > 0 && (b.writeUint8(0), b.skip(c - 1))
        }
    });
    h.loadData = g(function (b, d) {
        var e;
        if (c(b, a.Blob)) {
            var f;
            if ("FileReader" in a)f = new FileReader, f.onload = f.onerror = function () {
                d(this.error, this.result)
            }, f.readAsArrayBuffer(b); else {
                f = new FileReaderSync;
                var g, h;
                try {
                    h = f.readAsArrayBuffer(b)
                } catch (i) {
                    g = i
                } finally {
                    d(g, h)
                }
            }
        } else {
            if ("string" != typeof b)d(new TypeError("Unsupported source type.")); else if (e = b.match(/^data:(.+?)(;base64)?,(.*)$/))try {
                var j = e[2], k = e[3];
                d(null, (j ? atob : decodeURIComponent)(k))
            } catch (i) {
                d(i)
            } else if ("XMLHttpRequest" in a) {
                var l = new XMLHttpRequest;
                l.open("GET", b, !0), "responseType" in l ? l.responseType = "arraybuffer" : "overrideMimeType" in l ? l.overrideMimeType("text/plain; charset=x-user-defined") : l.setRequestHeader("Accept-Charset", "x-user-defined"), "onload" in l || (l.onreadystatechange = function () {
                    4 === this.readyState && this.onload()
                });
                var m = function (a) {
                    d(new Error(a))
                };
                l.onload = function () {
                    return 0 !== this.status && 200 !== this.status ? m("HTTP Error #" + this.status + ": " + this.statusText) : ("response" in this || (this.response = new VBArray(this.responseBody).toArray()), void d(null, this.response))
                }, l.onerror = function () {
                    m("Network error.")
                }, l.send(null)
            } else d(new TypeError("Unsupported source type."))
        }
    }), h.load = g(function (a, b, c) {
        var d = h.loadData(a);
        h.load.getTypeSet(a, b, function (a) {
            d.then(function (b) {
                c(null, new h(b, a))
            }, c)
        })
    }), h.load.getTypeSet = function (a, b, c) {
        c(b)
    }, n._toURI = "URL" in a && "createObjectURL" in URL ? function (a) {
        var b = this.seek(0, function () {
            return this.view.getBytes()
        });
        return URL.createObjectURL(new Blob([b], {type: a}))
    } : function (a) {
        var b = this.seek(0, function () {
            return this.view.getString(void 0, void 0, "binary")
        });
        return "data:" + a + ";base64," + btoa(b)
    }, n._mimeType = function (a) {
        return a || this.typeSet["jBinary.mimeType"] || "application/octet-stream"
    }, n.toURI = function (a) {
        return this._toURI(this._mimeType(a))
    };
    if (k) {
        var t = h.downloader = k.createElement("a");
        t.style.display = "none"
    }
    return n.saveAs = g(function (a, b, c) {
        if ("string" == typeof a) {
            "msSaveBlob" in navigator ? navigator.msSaveBlob(new Blob([this.read("blob", 0)], {type: this._mimeType(b)}), a) : k ? (t.parentNode || k.body.appendChild(t), t.href = this.toURI(b), t.download = a, t.click(), t.href = t.download = "") : c(new TypeError("Saving from Web Worker is not supported.")), c()
        } else c(new TypeError("Unsupported storage type."))
    }), h
});
//# sourceMappingURL=jbinary.js.map

/*- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
/* Merging js: src/converter/adts.js begins */
/*- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */



(function () {


this.ADTS = {
	ADTSPacket: {
		_start: function () { return this.binary.tell() },
		_syncWord: ['const', 12, 0xfff, true],
		version: ['enum', 1, ['mpeg-4', 'mpeg-2']],
		layer: ['const', 2, 0],
		isProtectionAbsent: 1,
		profileMinusOne: 2, // http://wiki.multimedia.cx/index.php?title=MPEG-4_Audio#Audio_Object_Types minus one
		samplingFreq: ['enum', 4, [96000, 88200, 64000, 48000, 44100, 32000, 24000, 22050, 16000, 12000, 11025, 8000, 7350]], // http://wiki.multimedia.cx/index.php?title=MPEG-4_Audio#Sampling_Frequencies
		_privateStream: 1,
		channelConfig: 3, // http://wiki.multimedia.cx/index.php?title=MPEG-4_Audio#Channel_Configurations
		_reserved: 4, // originality, home, copyrighted, copyright start bits
		frameLength: 13,
		bufferFullness: 11,
		aacFramesCountMinusOne: 2,
		data: ['blob', function (context) { return context.frameLength - (this.binary.tell() - context._start) }]
	}
};
}).call(this);

/*- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
/* Merging js: src/converter/async.js begins */
/*- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */



(function () {

    var async = {};

    // global on the server, window in the browser
    var root, previous_async;

    root = this;
    if (root != null) {
      previous_async = root.async;
    }

    async.noConflict = function () {
        root.async = previous_async;
        return async;
    };

    function only_once(fn) {
        var called = false;
        return function() {
            if (called) throw new Error("Callback was already called.");
            called = true;
            fn.apply(root, arguments);
        }
    }

    //// cross-browser compatiblity functions ////

    var _each = function (arr, iterator) {
        if (arr.forEach) {
            return arr.forEach(iterator);
        }
        for (var i = 0; i < arr.length; i += 1) {
            iterator(arr[i], i, arr);
        }
    };

    var _map = function (arr, iterator) {
        if (arr.map) {
            return arr.map(iterator);
        }
        var results = [];
        _each(arr, function (x, i, a) {
            results.push(iterator(x, i, a));
        });
        return results;
    };

    var _reduce = function (arr, iterator, memo) {
        if (arr.reduce) {
            return arr.reduce(iterator, memo);
        }
        _each(arr, function (x, i, a) {
            memo = iterator(memo, x, i, a);
        });
        return memo;
    };

    var _keys = function (obj) {
        if (Object.keys) {
            return Object.keys(obj);
        }
        var keys = [];
        for (var k in obj) {
            if (obj.hasOwnProperty(k)) {
                keys.push(k);
            }
        }
        return keys;
    };

    //// exported async module functions ////

    //// nextTick implementation with browser-compatible fallback ////
    if (typeof process === 'undefined' || !(process.nextTick)) {
        if (typeof setImmediate === 'function') {
            async.nextTick = function (fn) {
                // not a direct alias for IE10 compatibility
                setImmediate(fn);
            };
            async.setImmediate = async.nextTick;
        }
        else {
            async.nextTick = function (fn) {
                setTimeout(fn, 0);
            };
            async.setImmediate = async.nextTick;
        }
    }
    else {
        async.nextTick = process.nextTick;
        if (typeof setImmediate !== 'undefined') {
            async.setImmediate = setImmediate;
        }
        else {
            async.setImmediate = async.nextTick;
        }
    }

    async.each = function (arr, iterator, callback) {
        callback = callback || function () {};
        if (!arr.length) {
            return callback();
        }
        var completed = 0;
        _each(arr, function (x) {
            iterator(x, only_once(function (err) {
                if (err) {
                    callback(err);
                    callback = function () {};
                }
                else {
                    completed += 1;
                    if (completed >= arr.length) {
                        callback(null);
                    }
                }
            }));
        });
    };
    async.forEach = async.each;

    async.eachSeries = function (arr, iterator, callback) {
        callback = callback || function () {};
        if (!arr.length) {
            return callback();
        }
        var completed = 0;
        var iterate = function () {
            iterator(arr[completed], function (err) {
                if (err) {
                    callback(err);
                    callback = function () {};
                }
                else {
                    completed += 1;
                    if (completed >= arr.length) {
                        callback(null);
                    }
                    else {
                        iterate();
                    }
                }
            });
        };
        iterate();
    };
    async.forEachSeries = async.eachSeries;

    async.eachLimit = function (arr, limit, iterator, callback) {
        var fn = _eachLimit(limit);
        fn.apply(null, [arr, iterator, callback]);
    };
    async.forEachLimit = async.eachLimit;

    var _eachLimit = function (limit) {

        return function (arr, iterator, callback) {
            callback = callback || function () {};
            if (!arr.length || limit <= 0) {
                return callback();
            }
            var completed = 0;
            var started = 0;
            var running = 0;

            (function replenish () {
                if (completed >= arr.length) {
                    return callback();
                }

                while (running < limit && started < arr.length) {
                    started += 1;
                    running += 1;
                    iterator(arr[started - 1], function (err) {
                        if (err) {
                            callback(err);
                            callback = function () {};
                        }
                        else {
                            completed += 1;
                            running -= 1;
                            if (completed >= arr.length) {
                                callback();
                            }
                            else {
                                replenish();
                            }
                        }
                    });
                }
            })();
        };
    };


    var doParallel = function (fn) {
        return function () {
            var args = Array.prototype.slice.call(arguments);
            return fn.apply(null, [async.each].concat(args));
        };
    };
    var doParallelLimit = function(limit, fn) {
        return function () {
            var args = Array.prototype.slice.call(arguments);
            return fn.apply(null, [_eachLimit(limit)].concat(args));
        };
    };
    var doSeries = function (fn) {
        return function () {
            var args = Array.prototype.slice.call(arguments);
            return fn.apply(null, [async.eachSeries].concat(args));
        };
    };


    var _asyncMap = function (eachfn, arr, iterator, callback) {
        var results = [];
        arr = _map(arr, function (x, i) {
            return {index: i, value: x};
        });
        eachfn(arr, function (x, callback) {
            iterator(x.value, function (err, v) {
                results[x.index] = v;
                callback(err);
            });
        }, function (err) {
            callback(err, results);
        });
    };
    async.map = doParallel(_asyncMap);
    async.mapSeries = doSeries(_asyncMap);
    async.mapLimit = function (arr, limit, iterator, callback) {
        return _mapLimit(limit)(arr, iterator, callback);
    };

    var _mapLimit = function(limit) {
        return doParallelLimit(limit, _asyncMap);
    };

    // reduce only has a series version, as doing reduce in parallel won't
    // work in many situations.
    async.reduce = function (arr, memo, iterator, callback) {
        async.eachSeries(arr, function (x, callback) {
            iterator(memo, x, function (err, v) {
                memo = v;
                callback(err);
            });
        }, function (err) {
            callback(err, memo);
        });
    };
    // inject alias
    async.inject = async.reduce;
    // foldl alias
    async.foldl = async.reduce;

    async.reduceRight = function (arr, memo, iterator, callback) {
        var reversed = _map(arr, function (x) {
            return x;
        }).reverse();
        async.reduce(reversed, memo, iterator, callback);
    };
    // foldr alias
    async.foldr = async.reduceRight;

    var _filter = function (eachfn, arr, iterator, callback) {
        var results = [];
        arr = _map(arr, function (x, i) {
            return {index: i, value: x};
        });
        eachfn(arr, function (x, callback) {
            iterator(x.value, function (v) {
                if (v) {
                    results.push(x);
                }
                callback();
            });
        }, function (err) {
            callback(_map(results.sort(function (a, b) {
                return a.index - b.index;
            }), function (x) {
                return x.value;
            }));
        });
    };
    async.filter = doParallel(_filter);
    async.filterSeries = doSeries(_filter);
    // select alias
    async.select = async.filter;
    async.selectSeries = async.filterSeries;

    var _reject = function (eachfn, arr, iterator, callback) {
        var results = [];
        arr = _map(arr, function (x, i) {
            return {index: i, value: x};
        });
        eachfn(arr, function (x, callback) {
            iterator(x.value, function (v) {
                if (!v) {
                    results.push(x);
                }
                callback();
            });
        }, function (err) {
            callback(_map(results.sort(function (a, b) {
                return a.index - b.index;
            }), function (x) {
                return x.value;
            }));
        });
    };
    async.reject = doParallel(_reject);
    async.rejectSeries = doSeries(_reject);

    var _detect = function (eachfn, arr, iterator, main_callback) {
        eachfn(arr, function (x, callback) {
            iterator(x, function (result) {
                if (result) {
                    main_callback(x);
                    main_callback = function () {};
                }
                else {
                    callback();
                }
            });
        }, function (err) {
            main_callback();
        });
    };
    async.detect = doParallel(_detect);
    async.detectSeries = doSeries(_detect);

    async.some = function (arr, iterator, main_callback) {
        async.each(arr, function (x, callback) {
            iterator(x, function (v) {
                if (v) {
                    main_callback(true);
                    main_callback = function () {};
                }
                callback();
            });
        }, function (err) {
            main_callback(false);
        });
    };
    // any alias
    async.any = async.some;

    async.every = function (arr, iterator, main_callback) {
        async.each(arr, function (x, callback) {
            iterator(x, function (v) {
                if (!v) {
                    main_callback(false);
                    main_callback = function () {};
                }
                callback();
            });
        }, function (err) {
            main_callback(true);
        });
    };
    // all alias
    async.all = async.every;

    async.sortBy = function (arr, iterator, callback) {
        async.map(arr, function (x, callback) {
            iterator(x, function (err, criteria) {
                if (err) {
                    callback(err);
                }
                else {
                    callback(null, {value: x, criteria: criteria});
                }
            });
        }, function (err, results) {
            if (err) {
                return callback(err);
            }
            else {
                var fn = function (left, right) {
                    var a = left.criteria, b = right.criteria;
                    return a < b ? -1 : a > b ? 1 : 0;
                };
                callback(null, _map(results.sort(fn), function (x) {
                    return x.value;
                }));
            }
        });
    };

    async.auto = function (tasks, callback) {
        callback = callback || function () {};
        var keys = _keys(tasks);
        if (!keys.length) {
            return callback(null);
        }

        var results = {};

        var listeners = [];
        var addListener = function (fn) {
            listeners.unshift(fn);
        };
        var removeListener = function (fn) {
            for (var i = 0; i < listeners.length; i += 1) {
                if (listeners[i] === fn) {
                    listeners.splice(i, 1);
                    return;
                }
            }
        };
        var taskComplete = function () {
            _each(listeners.slice(0), function (fn) {
                fn();
            });
        };

        addListener(function () {
            if (_keys(results).length === keys.length) {
                callback(null, results);
                callback = function () {};
            }
        });

        _each(keys, function (k) {
            var task = (tasks[k] instanceof Function) ? [tasks[k]]: tasks[k];
            var taskCallback = function (err) {
                var args = Array.prototype.slice.call(arguments, 1);
                if (args.length <= 1) {
                    args = args[0];
                }
                if (err) {
                    var safeResults = {};
                    _each(_keys(results), function(rkey) {
                        safeResults[rkey] = results[rkey];
                    });
                    safeResults[k] = args;
                    callback(err, safeResults);
                    // stop subsequent errors hitting callback multiple times
                    callback = function () {};
                }
                else {
                    results[k] = args;
                    async.setImmediate(taskComplete);
                }
            };
            var requires = task.slice(0, Math.abs(task.length - 1)) || [];
            var ready = function () {
                return _reduce(requires, function (a, x) {
                    return (a && results.hasOwnProperty(x));
                }, true) && !results.hasOwnProperty(k);
            };
            if (ready()) {
                task[task.length - 1](taskCallback, results);
            }
            else {
                var listener = function () {
                    if (ready()) {
                        removeListener(listener);
                        task[task.length - 1](taskCallback, results);
                    }
                };
                addListener(listener);
            }
        });
    };

    async.waterfall = function (tasks, callback) {
        callback = callback || function () {};
        if (tasks.constructor !== Array) {
          var err = new Error('First argument to waterfall must be an array of functions');
          return callback(err);
        }
        if (!tasks.length) {
            return callback();
        }
        var wrapIterator = function (iterator) {
            return function (err) {
                if (err) {
                    callback.apply(null, arguments);
                    callback = function () {};
                }
                else {
                    var args = Array.prototype.slice.call(arguments, 1);
                    var next = iterator.next();
                    if (next) {
                        args.push(wrapIterator(next));
                    }
                    else {
                        args.push(callback);
                    }
                    async.setImmediate(function () {
                        iterator.apply(null, args);
                    });
                }
            };
        };
        wrapIterator(async.iterator(tasks))();
    };

    var _parallel = function(eachfn, tasks, callback) {
        callback = callback || function () {};
        if (tasks.constructor === Array) {
            eachfn.map(tasks, function (fn, callback) {
                if (fn) {
                    fn(function (err) {
                        var args = Array.prototype.slice.call(arguments, 1);
                        if (args.length <= 1) {
                            args = args[0];
                        }
                        callback.call(null, err, args);
                    });
                }
            }, callback);
        }
        else {
            var results = {};
            eachfn.each(_keys(tasks), function (k, callback) {
                tasks[k](function (err) {
                    var args = Array.prototype.slice.call(arguments, 1);
                    if (args.length <= 1) {
                        args = args[0];
                    }
                    results[k] = args;
                    callback(err);
                });
            }, function (err) {
                callback(err, results);
            });
        }
    };

    async.parallel = function (tasks, callback) {
        _parallel({ map: async.map, each: async.each }, tasks, callback);
    };

    async.parallelLimit = function(tasks, limit, callback) {
        _parallel({ map: _mapLimit(limit), each: _eachLimit(limit) }, tasks, callback);
    };

    async.series = function (tasks, callback) {
        callback = callback || function () {};
        if (tasks.constructor === Array) {
            async.mapSeries(tasks, function (fn, callback) {
                if (fn) {
                    fn(function (err) {
                        var args = Array.prototype.slice.call(arguments, 1);
                        if (args.length <= 1) {
                            args = args[0];
                        }
                        callback.call(null, err, args);
                    });
                }
            }, callback);
        }
        else {
            var results = {};
            async.eachSeries(_keys(tasks), function (k, callback) {
                tasks[k](function (err) {
                    var args = Array.prototype.slice.call(arguments, 1);
                    if (args.length <= 1) {
                        args = args[0];
                    }
                    results[k] = args;
                    callback(err);
                });
            }, function (err) {
                callback(err, results);
            });
        }
    };

    async.iterator = function (tasks) {
        var makeCallback = function (index) {
            var fn = function () {
                if (tasks.length) {
                    tasks[index].apply(null, arguments);
                }
                return fn.next();
            };
            fn.next = function () {
                return (index < tasks.length - 1) ? makeCallback(index + 1): null;
            };
            return fn;
        };
        return makeCallback(0);
    };

    async.apply = function (fn) {
        var args = Array.prototype.slice.call(arguments, 1);
        return function () {
            return fn.apply(
                null, args.concat(Array.prototype.slice.call(arguments))
            );
        };
    };

    var _concat = function (eachfn, arr, fn, callback) {
        var r = [];
        eachfn(arr, function (x, cb) {
            fn(x, function (err, y) {
                r = r.concat(y || []);
                cb(err);
            });
        }, function (err) {
            callback(err, r);
        });
    };
    async.concat = doParallel(_concat);
    async.concatSeries = doSeries(_concat);

    async.whilst = function (test, iterator, callback) {
        if (test()) {
            iterator(function (err) {
                if (err) {
                    return callback(err);
                }
                async.whilst(test, iterator, callback);
            });
        }
        else {
            callback();
        }
    };

    async.doWhilst = function (iterator, test, callback) {
        iterator(function (err) {
            if (err) {
                return callback(err);
            }
            if (test()) {
                async.doWhilst(iterator, test, callback);
            }
            else {
                callback();
            }
        });
    };

    async.until = function (test, iterator, callback) {
        if (!test()) {
            iterator(function (err) {
                if (err) {
                    return callback(err);
                }
                async.until(test, iterator, callback);
            });
        }
        else {
            callback();
        }
    };

    async.doUntil = function (iterator, test, callback) {
        iterator(function (err) {
            if (err) {
                return callback(err);
            }
            if (!test()) {
                async.doUntil(iterator, test, callback);
            }
            else {
                callback();
            }
        });
    };

    async.queue = function (worker, concurrency) {
        if (concurrency === undefined) {
            concurrency = 1;
        }
        function _insert(q, data, pos, callback) {
          if(data.constructor !== Array) {
              data = [data];
          }
          _each(data, function(task) {
              var item = {
                  data: task,
                  callback: typeof callback === 'function' ? callback : null
              };

              if (pos) {
                q.tasks.unshift(item);
              } else {
                q.tasks.push(item);
              }

              if (q.saturated && q.tasks.length === concurrency) {
                  q.saturated();
              }
              async.setImmediate(q.process);
          });
        }

        var workers = 0;
        var q = {
            tasks: [],
            concurrency: concurrency,
            saturated: null,
            empty: null,
            drain: null,
            push: function (data, callback) {
              _insert(q, data, false, callback);
            },
            unshift: function (data, callback) {
              _insert(q, data, true, callback);
            },
            process: function () {
                if (workers < q.concurrency && q.tasks.length) {
                    var task = q.tasks.shift();
                    if (q.empty && q.tasks.length === 0) {
                        q.empty();
                    }
                    workers += 1;
                    var next = function () {
                        workers -= 1;
                        if (task.callback) {
                            task.callback.apply(task, arguments);
                        }
                        if (q.drain && q.tasks.length + workers === 0) {
                            q.drain();
                        }
                        q.process();
                    };
                    var cb = only_once(next);
                    worker(task.data, cb);
                }
            },
            length: function () {
                return q.tasks.length;
            },
            running: function () {
                return workers;
            }
        };
        return q;
    };

    async.cargo = function (worker, payload) {
        var working     = false,
            tasks       = [];

        var cargo = {
            tasks: tasks,
            payload: payload,
            saturated: null,
            empty: null,
            drain: null,
            push: function (data, callback) {
                if(data.constructor !== Array) {
                    data = [data];
                }
                _each(data, function(task) {
                    tasks.push({
                        data: task,
                        callback: typeof callback === 'function' ? callback : null
                    });
                    if (cargo.saturated && tasks.length === payload) {
                        cargo.saturated();
                    }
                });
                async.setImmediate(cargo.process);
            },
            process: function process() {
                if (working) return;
                if (tasks.length === 0) {
                    if(cargo.drain) cargo.drain();
                    return;
                }

                var ts = typeof payload === 'number'
                            ? tasks.splice(0, payload)
                            : tasks.splice(0);

                var ds = _map(ts, function (task) {
                    return task.data;
                });

                if(cargo.empty) cargo.empty();
                working = true;
                worker(ds, function () {
                    working = false;

                    var args = arguments;
                    _each(ts, function (data) {
                        if (data.callback) {
                            data.callback.apply(null, args);
                        }
                    });

                    process();
                });
            },
            length: function () {
                return tasks.length;
            },
            running: function () {
                return working;
            }
        };
        return cargo;
    };

    var _console_fn = function (name) {
        return function (fn) {
            var args = Array.prototype.slice.call(arguments, 1);
            fn.apply(null, args.concat([function (err) {
                var args = Array.prototype.slice.call(arguments, 1);
                if (typeof console !== 'undefined') {
                    if (err) {
                        if (console.error) {
                            console.error(err);
                        }
                    }
                    else if (console[name]) {
                        _each(args, function (x) {
                            console[name](x);
                        });
                    }
                }
            }]));
        };
    };
    async.log = _console_fn('log');
    async.dir = _console_fn('dir');
    /*async.info = _console_fn('info');
    async.warn = _console_fn('warn');
    async.error = _console_fn('error');*/

    async.memoize = function (fn, hasher) {
        var memo = {};
        var queues = {};
        hasher = hasher || function (x) {
            return x;
        };
        var memoized = function () {
            var args = Array.prototype.slice.call(arguments);
            var callback = args.pop();
            var key = hasher.apply(null, args);
            if (key in memo) {
                callback.apply(null, memo[key]);
            }
            else if (key in queues) {
                queues[key].push(callback);
            }
            else {
                queues[key] = [callback];
                fn.apply(null, args.concat([function () {
                    memo[key] = arguments;
                    var q = queues[key];
                    delete queues[key];
                    for (var i = 0, l = q.length; i < l; i++) {
                      q[i].apply(null, arguments);
                    }
                }]));
            }
        };
        memoized.memo = memo;
        memoized.unmemoized = fn;
        return memoized;
    };

    async.unmemoize = function (fn) {
      return function () {
        return (fn.unmemoized || fn).apply(null, arguments);
      };
    };

    async.times = function (count, iterator, callback) {
        var counter = [];
        for (var i = 0; i < count; i++) {
            counter.push(i);
        }
        return async.map(counter, iterator, callback);
    };

    async.timesSeries = function (count, iterator, callback) {
        var counter = [];
        for (var i = 0; i < count; i++) {
            counter.push(i);
        }
        return async.mapSeries(counter, iterator, callback);
    };

    async.compose = function (/* functions... */) {
        var fns = Array.prototype.reverse.call(arguments);
        return function () {
            var that = this;
            var args = Array.prototype.slice.call(arguments);
            var callback = args.pop();
            async.reduce(fns, args, function (newargs, fn, cb) {
                fn.apply(that, newargs.concat([function () {
                    var err = arguments[0];
                    var nextargs = Array.prototype.slice.call(arguments, 1);
                    cb(err, nextargs);
                }]))
            },
            function (err, results) {
                callback.apply(that, [err].concat(results));
            });
        };
    };

    var _applyEach = function (eachfn, fns /*args...*/) {
        var go = function () {
            var that = this;
            var args = Array.prototype.slice.call(arguments);
            var callback = args.pop();
            return eachfn(fns, function (fn, cb) {
                fn.apply(that, args.concat([cb]));
            },
            callback);
        };
        if (arguments.length > 2) {
            var args = Array.prototype.slice.call(arguments, 2);
            return go.apply(this, args);
        }
        else {
            return go;
        }
    };
    async.applyEach = doParallel(_applyEach);
    async.applyEachSeries = doSeries(_applyEach);

    async.forever = function (fn, callback) {
        function next(err) {
            if (err) {
                if (callback) {
                    return callback(err);
                }
                throw err;
            }
            fn(next);
        }
        next();
    };

    // AMD / RequireJS
    if (typeof define !== 'undefined' && define.amd) {
        define([], function () {
            return async;
        });
    }
    // Node.js
    else if (typeof module !== 'undefined' && module.exports) {
        module.exports = async;
    }
    // included directly via <script> tag
    else {
        root.async = async;
    }

}());


/*- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
/* Merging js: src/converter/h264.js begins */
/*- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */



(function () {


this.H264 = {
	ExpGolomb: jBinary.Type({
		params: ['isSigned'],
		read: function () {
			var count = 0;
			while (!this.binary.read(1)) count++;
			var value = (1 << count) | this.binary.read(count);
			return this.isSigned ? (value & 1 ? -(value >> 1) : value >> 1) : value - 1;
		},
		write: function (value) {
			if (this.isSigned) {
				value <<= 1;
				if (value <= 0) {
					value = -value | 1;
				}
			} else {
				value++;
			}
			var length = value.toString(2).length;
			this.binary.write(length - 1, 0);
			this.binary.write(length, value);
		}
	}),

	Optional: jBinary.Template({
	    params: ['baseType'],
		read: function () {
			if (this.binary.read(1)) return this.baseRead();
		},
		write: function (value) {
			this.binary.write(value != null ? 1 : 0);
			if (value != null) {
				this.baseWrite(value);
			}
		}
	}),

	ScalingList: jBinary.Template({
		setParams: function (size) {
			this.baseType = ['array', { /* TODO: implement scaling list */ }, size];
		}
	}),

	SPS: [
		'extend',
		{
			profile_idc: 'uint8',
			constraint_set_flags: ['array', 1, 8],
			level_idc: 'uint8',
			seq_parameter_set_id: 'ExpGolomb'
		},
		['if', function (context) { return [100, 110, 122, 244, 44, 83, 86, 118].indexOf(context.profile_idc) >= 0 }, {
			chroma_format: ['enum', 'ExpGolomb', ['MONO', 'YUV420', 'YUV422', 'YUV444']],
			separate_color_plane_flag: ['if', function (context) { return context.chroma_format === 'YUV444' }, 1],
			bit_depth_luma_minus8: 'ExpGolomb',
			bit_depth_chroma_minus8: 'ExpGolomb',
			qpprime_y_zero_transform_bypass_flag: 1,
			scaling_matrix: ['Optional', {
				scalingList4x4: ['array', ['ScalingList', 16], 6],
				scalingList8x8: ['array', ['ScalingList', 64], function () { return this.binary.getContext(1).chroma_format !== 'YUV444' ? 2 : 6 }]
			}]
		}],
		{
			log2_max_frame_num_minus4: 'ExpGolomb',
			pic_order_cnt_type: 'ExpGolomb',
			pic_order: ['if_not', 'pic_order_cnt_type', {log2_max_pic_order_cnt_lsb_minus4: 'ExpGolomb'}, [
				'if',
				function (context) { return context.pic_order_cnt_type === 1 },
				{
					delta_pic_order_always_zero_flag: 1,
					offset_for_non_ref_pic: ['ExpGolomb', true],
					offset_for_top_to_bottom_field: ['ExpGolomb', true],
					_num_ref_frames_in_pic_order_cnt_cycle: jBinary.Template({
						baseType: 'ExpGolomb',
						write: function (value, context) { this.baseWrite(context.offset_for_ref_frame.length) }
					}),
					offset_for_ref_frame: ['array', ['ExpGolomb', true], function (context) { return context._num_ref_frames_in_pic_order_cnt_cycle }]
				}
			]],
			max_num_ref_frames: 'ExpGolomb',
			gaps_in_frame_num_value_allowed_flag: 1,
			pic_width_in_mbs_minus_1: 'ExpGolomb',
			pic_height_in_map_units_minus_1: 'ExpGolomb',
			frame_mbs_only_flag: 1,
			mb_adaptive_frame_field_flag: ['if_not', 'frame_mbs_only_flag', 1],
			direct_8x8_inference_flag: 1,
			frame_cropping: ['Optional', {
				left: 'ExpGolomb',
				right: 'ExpGolomb',
				top: 'ExpGolomb',
				bottom: 'ExpGolomb'
			}]
			// TODO: add VUI parameters
		}
	],

	NALUnit: jBinary.Type({
		read: function () {
			var sync = this.binary.read(['blob', 3]); // [0, 0, 1] or [0, 0, 0, 1]
			if (sync[2] === 0) this.binary.skip(1);
			var end = this.binary.view.byteLength, pos = this.binary.tell();
			var bytes = this.binary.skip(0, function () { return this.view.getBytes() });
			for (var i = 1, length = bytes.length - 3; i < length; i++) {
				if (bytes[i] === 0 && bytes[i + 1] === 0 && (bytes[i + 2] === 1 || (bytes[i + 2] === 0 && bytes[i + 3] === 1))) {
					end = pos + i;
					break;
				}
			}
			var data = this.binary.read(['blob', end - pos]);
			// TODO: ideally there should be Annex.B conversion from [0, 0, 3, X=0..3] to [0, 0, X]
			return data;
		}
	})
};
}).call(this);

/*- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
/* Merging js: src/converter/mp4.js begins */
/*- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */



(function () {

var timeBasis = new Date(1970, 0, 1) - new Date(1904, 0, 1);

function atomFilter(type) {
	return function (atom) {
		return atom.type === type;
	};
}

this.MP4 = {
	ShortName: ['string0', 4],

	Rate: ['FixedPoint', 'int32', 16],

	Dimensions: jBinary.Template({
		setParams: function (itemType) {
			this.baseType = {
				horz: itemType,
				vert: itemType
			};
		}
	}),

	BoxHeader: {
		_begin: function () {
			return this.binary.tell();
		},
		_size: jBinary.Template({
			baseType: 'uint32',
			write: function (value, context) {
				var size = context.size;
				this.baseWrite(size ? (size < Math.pow(2, 32) ? size : 1) : 0);
			}
		}),
		type: 'ShortName',
		size: jBinary.Type({
			read: function (context) {
				var _size = context._size;
				switch (_size) {
					case 0: return this.binary.view.byteLength - this.binary.tell() + 8;
					case 1: return this.binary.read('uint64');
					default: return _size;
				}
			},
			write: function (value) {
				if (value >= Math.pow(2, 32)) {
					this.binary.write('uint64', value);
				}
			}
		}),
		_end: function (context) {
			return context._begin + context.size;
		}
	},

	FullBox: ['extend', 'BoxHeader', {
		version: 'uint8',
		flags: 24
	}],

	Box: jBinary.Type({
		read: function () {
			var header = this.binary.skip(0, function () {
				return this.read('BoxHeader');
			});
			var box = this.binary.read(header.type) || header;
			if (box === header) console.log(header.type);
			this.binary.seek(header._end);
			return box;
		},
		write: function (box) {
			this.binary.write(box.type, box);
			var size = this.binary.tell() - box._begin;
			this.binary.seek(box._begin, function () {
				this.write('uint32', size);
			});
		}
	}),

	Time: jBinary.Template({
		params: ['baseType'],
		read: function () {
			var intTime = this.baseRead();
			if (intTime) {
				return new Date(intTime + timeBasis);
			}
		},
		write: function (time) {
			this.baseWrite(time - timeBasis);
		}
	}),

	FixedPoint: jBinary.Template({
		params: ['baseType'],
		setParams: function (baseType, shift) {
			this.coef = 1 << shift;
		},
		read: function () {
			return this.baseRead() / this.coef;
		},
		write: function (value) {
			this.baseWrite(value * this.coef);
		}
	}),

	Atoms: jBinary.Type({
		params: ['end'],
		read: function () {
			var atoms = {}, end = this.toValue(this.end) || this.binary.getContext('_end')._end;
			while (this.binary.tell() < end) {
				var item = this.binary.read('Box');
				(atoms[item.type] || (atoms[item.type] = [])).push(item);
			}
			return atoms;
		},
		write: function (parent) {
			for (var type in parent) {
				var atoms = parent[type];
				for (var i = 0, length = atoms.length; i < length; i++) {
					atoms[i].type = type;
					this.binary.write('Box', atoms[i]);
				}
			}
		}
	}),

	ChildAtoms: {
		atoms: 'Atoms'
	},

	MultiBox: ['extend', 'BoxHeader', 'ChildAtoms'],

	TransformationMatrix: {
		a: ['FixedPoint', 'uint32', 16],
		b: ['FixedPoint', 'uint32', 16],
		u: ['FixedPoint', 'uint32', 30],
		c: ['FixedPoint', 'uint32', 16],
		d: ['FixedPoint', 'uint32', 16],
		v: ['FixedPoint', 'uint32', 30],
		x: ['FixedPoint', 'uint32', 16],
		y: ['FixedPoint', 'uint32', 16],
		w: ['FixedPoint', 'uint32', 30]
	},

	Volume: ['FixedPoint', 'uint16', 8],

	FBVersionable: jBinary.Template({
		setParams: function (type0, type1) {
			this.baseType = ['if', 'version', type1, type0];
		}
	}),

	FBUint: ['FBVersionable', 'uint32', 'uint64'],

	FBTime: ['Time', 'FBUint'],

	TimestampBox: ['extend', 'FullBox', {
		creation_time: 'FBTime',
		modification_time: 'FBTime'
	}],

	DurationBox: ['extend', 'TimestampBox', {
		timescale: 'uint32',
		duration: 'FBUint'
	}],

	ftyp: ['extend', 'BoxHeader', {
		major_brand: 'ShortName',
		minor_version: 'uint32',
		compatible_brands: ['array', 'ShortName', function () { return (this.binary.getContext(1)._end - this.binary.tell()) / 4 }]
	}],

	free: 'BoxHeader',

	RawData: {
		_rawData: ['blob', function () { return this.binary.getContext('_end')._end - this.binary.tell() }]
	},

	mdat: ['extend', 'BoxHeader', 'RawData'],

	ParamSets: jBinary.Template({
		setParams: function (numType) {
			this.baseType = ['DynamicArray', numType, jBinary.Template({
				baseType: {
					length: 'uint16',
					paramSet: ['blob', 'length']
				},
				read: function () {
					return this.baseRead().paramSet;
				},
				write: function (paramSet) {
					this.baseWrite({
						length: paramSet.length,
						paramSet: paramSet
					});
				}
			})];
		}
	}),

	avcC: ['extend', 'BoxHeader', {
		version: ['const', 'uint8', 1],
		profileIndication: 'uint8',
		profileCompatibility: 'uint8',
		levelIndication: 'uint8',
		_reserved: ['const', 6, -1],
		lengthSizeMinusOne: 2,
		_reserved2: ['const', 3, -1],
		seqParamSets: ['ParamSets', 5],
		pictParamSets: ['ParamSets', 'uint8']
	}],

	moov: 'MultiBox',

	mvhd: ['extend', 'DurationBox', {
		rate: 'Rate',
		volume: 'Volume',
		_reserved: ['skip', 10],
		matrix: 'TransformationMatrix',
		_reserved2: ['skip', 24],
		next_track_ID: 'uint32'
	}],

	trak: 'MultiBox',

	tkhd: ['extend', 'TimestampBox', {
		track_ID: 'uint32',
		_reserved: ['skip', 4],
		duration: 'FBUint',
		_reserved2: ['skip', 8],
		layer: 'int16',
		alternate_group: 'uint16',
		volume: 'Volume',
		_reserved3: ['skip', 2],
		matrix: 'TransformationMatrix',
		dimensions: ['Dimensions', 'Rate']
	}],

	tref: 'MultiBox',

	TrackReferenceTypeBox: ['extend', 'BoxHeader', {
		track_IDs: ['array', 'uint32', function () { return (this.binary.getContext(1)._end - this.binary.tell()) / 4 }]
	}],

	hint: 'TrackReferenceTypeBox',

	cdsc: 'TrackReferenceTypeBox',

	hind: 'TrackReferenceTypeBox',

	mdia: 'MultiBox',

	mdhd: ['extend', 'DurationBox', {
		_padding: 1,
		lang: jBinary.Type({
			read: function () {
				return String.fromCharCode.apply(
					String,
					this.binary.read(['array', 5, 3]).map(function (code) { return code + 0x60 })
				);
			},
			write: function (value) {
				for (var i = 0; i < 3; i++) {
					this.binary.write(5, value.charCodeAt(i) - 0x60);
				}
			}
		}),
		_reserved: ['skip', 2]
	}],

	hdlr: ['extend', 'FullBox', {
		_reserved: ['skip', 4],
		handler_type: 'ShortName',
		_set_handler_type: function (context) {
			this.binary.getContext(atomFilter('trak'))._handler_type = context.handler_type;
		},
		_reserved2: ['skip', 12],
		name: 'string0'
	}],

	minf: 'MultiBox',

	vmhd: ['extend', 'FullBox', {
		graphicsmode: 'uint16',
		opcolor: {
			r: 'uint16',
			g: 'uint16',
			b: 'uint16'
		}
	}],

	smhd: ['extend', 'FullBox', {
		balance: ['FixedPoint', 'int16', 8],
		_reserved: ['skip', 2]
	}],

	hmhd: ['extend', 'FullBox', {
		maxPDUsize: 'uint16',
		avgPDUsize: 'uint16',
		maxbitrate: 'uint32',
		avgbitrate: 'uint32',
		_reserved: ['skip', 4]
	}],

	stbl: 'MultiBox',

	SampleEntry: ['extend', 'BoxHeader', {
		_reserved: ['skip', 6],
		data_reference_index: 'uint16'
	}],

	btrt: ['extend', 'BoxHeader', {
		bufferSizeDB: 'uint32',
		maxBitrate: 'uint32',
		avgBitrate: 'uint32'
	}],

	metx: ['extend', 'SampleEntry', {
		content_encoding: 'string0',
		namespace: 'string0',
		schema_location: 'string0',
		bitratebox: 'btrt'
	}],

	mett: ['extend', 'SampleEntry', {
		content_encoding: 'string0',
		mime_format: 'string0',
		bitratebox: 'btrt'
	}],

	pasp: ['extend', 'BoxHeader', {
		spacing: ['Dimensions', 'uint32']
	}],

	ClapInnerFormat: ['Dimensions', {
		N: 'uint32',
		D: 'uint32'
	}],

	clap: ['extend', 'BoxHeader', {
		cleanAperture: 'ClapInnerFormat',
		off: 'ClapInnerFormat'
	}],

	VisualSampleEntry: ['extend', 'SampleEntry', {
		_reserved: ['skip', 16],
		dimensions: ['Dimensions', 'uint16'],
		resolution: ['Dimensions', 'Rate'],
		_reserved2: ['skip', 4],
		frame_count: ['const', 'uint16', 1],
		compressorname: jBinary.Template({
			baseType: {
				length: 'uint8',
				string: ['string', 'length'],
				_skip: ['skip', function (context) { return 32 - 1 - context.length }]
			},
			read: function () {
				return this.baseRead().string;
			},
			write: function (value) {
				this.baseWrite({
					length: value.length,
					string: value
				});
			}
		}),
		depth: 'uint16',
		_reserved3: ['const', 'uint16', -1]
	}, jBinary.Type({
		setParams: function () {
			this.optional = {
				cleanaperture: 'clap',
				pixelaspectratio: 'pasp'
			};
		},
		read: function () {
			var extension = {};

			for (var propName in this.optional) {
				var type = this.optional[propName];
				var atom = this.binary.skip(0, function () { return this.read('BoxHeader') });
				if (atom.type === type) {
					extension[propName] = this.binary.read(type);
				}
			}

			return extension;
		},
		write: function (box) {
			for (var propName in this.optional) {
				var value = box[propName];
				if (value) {
					this.binary.write(this.optional[propName], value);
				}
			}
		}
	}), 'ChildAtoms'],

	AudioSampleEntry: ['extend', 'SampleEntry', {
		_reserved: ['skip', 8],
		channelcount: 'uint16',
		samplesize: 'uint16',
		_reserved2: ['skip', 4],
		samplerate: 'Rate'
	}, 'ChildAtoms'],

	DynamicArray: jBinary.Template({
		setParams: function (lengthType, itemType) {
			this.baseType = {
				length: lengthType,
				array: ['array', itemType, 'length']
			};
		},
		read: function () {
			return this.baseRead().array;
		},
		write: function (array) {
			this.baseWrite({
				length: array.length,
				array: array
			});
		}
	}),

	ArrayBox: jBinary.Template({
		setParams: function (entryType) {
			this.baseType = ['extend', 'FullBox', {
				entries: ['DynamicArray', 'uint32', entryType]
			}];
		}
	}),

	stsd: ['ArrayBox', jBinary.Template({
		getBaseType: function () {
			return {soun: 'AudioSampleEntry', vide: 'VisualSampleEntry', meta: 'Box'}[this.binary.getContext(atomFilter('trak'))._handler_type] || 'SampleEntry';
		},
		write: function (value) {
			var pos = this.binary.tell();
			this.baseWrite(value);
			var size = this.binary.tell() - pos;
			this.binary.seek(pos, function () { this.write('uint32', size) });
		}
	})],

	stdp: ['extend', 'FullBox', {
		priorities: ['array', 'uint16', function () { return this.binary.getContext(atomFilter('stbl'))._sample_count }]
	}],

	stsl: ['extend', 'FullBox', {
		_reserved: 7,
		constraint_flag: 'bool',
		scale_method: ['enum', 'uint8', [false, 'fill', 'hidden', 'meet', 'slice-x', 'slice-y']],
		display_center: ['Dimensions', 'int16']
	}],

	stts: ['ArrayBox', {
		sample_count: 'uint32',
		sample_delta: 'uint32'
	}],

	ctts: ['ArrayBox', {
		sample_count: 'uint32',
		sample_offset: 'uint32'
	}],

	stss: ['ArrayBox', 'uint32'],

	stsh: ['ArrayBox', {
		shadowed_sample_number: 'uint32',
		sync_sample_number: 'uint32'
	}],

	ExtendedBoolean: ['enum', 2, [undefined, true, false]],

	sdtp: ['extend', 'FullBox', {
		dependencies: ['array', {
			_reserved: 2,
			sample_depends_on: 'ExtendedBoolean',
			sample_is_depended_on: 'ExtendedBoolean',
			sample_has_redundancy: 'ExtendedBoolean'
		}, function () { return this.binary.getContext(atomFilter('stbl'))._sample_count }]
	}],

	edts: 'MultiBox',

	elst: ['ArrayBox', {
		segment_duration: 'FBUint',
		media_time: ['FBVersionable', 'int32', 'int64'],
		media_rate: 'Rate'
	}],

	dinf: 'MultiBox',

	'url ': ['extend', 'FullBox', {
		location: 'string0'
	}],

	'urn ': ['extend', 'FullBox', {
		name: 'string0',
		location: 'string0'
	}],

	dref: ['ArrayBox', 'Box'],

	stsz: ['extend', 'FullBox', {
		sample_size: 'uint32',
		sample_count: 'uint32',
		_sample_count_to_stbl: function (context) {
			this.binary.getContext(atomFilter('stbl'))._sample_count = context.sample_count;
		},
		sample_sizes: ['if_not', 'sample_size',
			['array', 'uint32', 'sample_count']
		]
	}],

	stz2: ['extend', 'FullBox', {
		_reserved: ['skip', 3],
		field_size: 'uint8',
		sample_count: 'uint32',
		_sample_count_to_stbl: function (context) {
			this.binary.getContext(atomFilter('stbl'))._sample_count = context.sample_count;
		},
		sample_sizes: [
			'array',
			jBinary.Template({
				getBaseType: function (context) { return context.field_size }
			}),
			'sample_count'
		]
	}],

	stsc: ['ArrayBox', {
		first_chunk: 'uint32',
		samples_per_chunk: 'uint32',
		sample_description_index: 'uint32'
	}],

	stco: ['ArrayBox', 'uint32'],

	co64: ['ArrayBox', 'uint64'],

	padb: ['extend', 'FullBox', {
		pads: ['DynamicArray', 'uint32', jBinary.Template({
			baseType: {
				_skip: ['const', 1, 0],
				pad: 3
			},
			read: function () {
				return this.baseRead().pad;
			},
			write: function (pad) {
				this.baseWrite({pad: pad});
			}
		})]
	}],

	subs: ['ArrayBox', {
		sample_delta: 'uint32',
		subsamples: ['DynamicArray', 'uint16', {
			subsample_size: ['FBVersionable', 'uint16', 'uint32'],
			subsample_priority: 'uint8',
			discardable: 'uint8',
			_reserved: ['skip', 4]
		}]
	}],

	mvex: 'MultiBox',

	mehd: ['extend', 'FullBox', {
		fragment_duration: 'FBUint'
	}],

	esds_section: ['extend', {
		descriptor_type: 'uint8',
		ext_type: jBinary.Type({
			read: function () {
				var next_byte = this.binary.read('uint8');
				if (next_byte === 0x80 || next_byte === 0x81 || next_byte === 0xFE) {
					this.binary.skip(2);
					return next_byte;
				} else {
					this.binary.skip(-1);
				}
			},
			write: function (filler) {
				if (filler !== undefined) this.binary.write('blob', [filler, filler, filler]);
			}
		}),
		length: 'uint8'
	}, jBinary.Template({
		getBaseType: function (context) {
			switch (context.descriptor_type) {
				case 3: return {
					es_id: 'uint16',
					stream_priority: 'uint8'
				};

				case 4: return {
					type: ['enum', 'uint8', {
						1: 'v1',
						2: 'v2',
						32: 'mpeg4_video',
						33: 'mpeg4_avc_sps',
						34: 'mpeg4_avc_pps',
						64: 'mpeg4_audio',
						96: 'mpeg2_simple_video',
						97: 'mpeg2_main_video',
						98: 'mpeg2_snr_video',
						99: 'mpeg2_spatial_video',
						100: 'mpeg2_high_video',
						101: 'mpeg2_422_video',
						102: 'mpeg4_adts_main',
						103: 'mpeg4_adts_low_complexity',
						104: 'mpeg4_adts_scaleable_sampling',
						105: 'mpeg2_adts_main',
						106: 'mpeg1_video',
						107: 'mpeg1_adts',
						108: 'jpeg_video',
						192: 'private_audio',
						208: 'private_video',
						224: 'pcm_little_endian_audio',
						225: 'vorbis_audio',
						226: 'dolby_v3_audio',
						227: 'alaw_audio',
						228: 'mulaw_audio',
						229: 'adpcm_audio',
						230: 'pcm_big_endian_audio',
						240: 'yv12_video',
						241: 'h264_video',
						242: 'h263_video',
						243: 'h261_video'
					}],
					stream_type: ['enum', 6, [
						null,
						'object',
						'clock',
						'scene',
						'visual',
						'audio',
						'mpeg-7',
						'ipmp',
						'oci',
						'mpeg-java'
					]],
					upstream_flag: 1,
					_reserved: ['const', 1, 1],
					buffer_size: 24,
					maxBitrate: 'uint32',
					avgBitrate: 'uint32'
				};

				case 5: return {
					audio_profile: ['enum', 5, [
						null,
						'aac-main',
						'aac-lc',
						'aac-ssr',
						'aac-ltp',
						'sbr',
						'aac-scalable',
						'twinvq',
						'celp',
						'hxvc',
						null,
						null,
						'ttsi',
						'main-synthesis',
						'wavetable-synthesis',
						'general-midi',
						'algorithmic-synthesis-and-audio-effects',
						'er-aac-lc',
						'reserved',
						'er-aac-ltp',
						'er-aac-scalable',
						'er-twinvq',
						'er-bsac',
						'er-aac-ld',
						'er-celp',
						'er-hvxc',
						'er-hiln',
						'er-parametric',
						'ssc',
						'ps',
						'mpeg-surround'
					]],
					sampling_freq: jBinary.Type({
						setParams: function () {
							this.freqList = [96000, 88200, 64000, 48000, 44100, 32000, 24000, 22050, 16000, 12000, 11025, 8000, 7350];
						},
						read: function () {
							var freqIndex = this.binary.read(4);
							return freqIndex !== 15 ? this.freqList[freqIndex] : this.binary.read(24);
						},
						write: function (value) {
							var freqIndex = this.freqList.indexOf(value);
							if (freqIndex !== -1) {
								this.binary.write(4, freqIndex);
							} else {
								this.binary.write(4, 15);
								this.binary.write(24, value);
							}
						}
					}),
					channelConfig: 4,
					frameLength: ['enum', 1, [1024, 960]],
					dependsOnCoreCoder: 1,
					extensionFlag: 1
				};

				case 6: return {
					sl: ['const', 'uint8', 2]
				};
			}
		}
	})],

	esds: ['extend', 'FullBox', {
		sections: jBinary.Template({
			baseType: 'esds_section',
			read: function () {
				var end = this.binary.getContext('_end')._end, sections = [];
				while (this.binary.tell() < end) {
					sections.push(this.baseRead());
				}
				return sections;
			},
			write: function (sections) {
				for (var i = 0, length = sections.length; i < length; i++) {
					this.baseWrite(sections[i]);
				}
			}
		})
	}],

	File: ['Atoms', function () { return this.binary.view.byteLength }]
};

}).call(this);


/*- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
/* Merging js: src/converter/mpegts.js begins */
/*- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */



this.MPEGTS = {
	PCR: {
		pts: 33,
		_reserved: 6,
		extension: 9
	},

	DynamicArray: jBinary.Template({
		setParams: function (lengthType, itemType) {
			this.baseType = {
				length: lengthType,
				array: ['array', itemType, 'length']
			};
		},
		read: function () {
			return this.baseRead().array;
		},
		write: function (array) {
			this.baseWrite({
				length: array.length,
				array: array
			});
		}
	}),

	Field: ['DynamicArray', 'uint8', 'uint8'],

	Flag: jBinary.Template({
		baseType: 1,
		params: ['dependentField'],
		write: function (value, context) {
			this.baseWrite(this.dependentField in context ? 1 : 0);
		}
	}),

	FlagDependent: jBinary.Template({
		params: ['flagField', 'baseType'],
		read: function () {
			return this.binary.read(['if', this.flagField, this.baseType]);
		}
	}),

	AdaptationField: {
		length: 'uint8',
		_endOf: function (context) { return this.binary.tell() + context.length },
		discontinuity: 1,
		randomAccess: 1,
		priority: 1,
		_hasPCR: ['Flag', 'pcr'],
		_hasOPCR: ['Flag', 'opcr'],
		_hasSplicingPoint: ['Flag', 'spliceCountdown'],
		_hasTransportPrivateData: ['Flag', 'privateData'],
		_hasExtension: ['Flag', 'extension'],
		pcr: ['FlagDependent', '_hasPCR', 'PCR'],
		opcr: ['FlagDependent', '_hasOPCR', 'PCR'],
		spliceCountdown: ['FlagDependent', '_hasSplicingPoint', 'uint8'],
		privateData: ['FlagDependent', '_hasTransportPrivateData', 'Field'],
		extension: ['FlagDependent', '_hasExtension', 'Field'],
		_toEnd: function (context) { this.binary.seek(context._endOf) }
	},

	ES: {
		_rawStream: ['blob', function () { return this.binary.getContext(1)._endof - this.binary.tell() }]
	},

	PATItem: ['array', {
		programNumber: 'uint16',
		_reserved: 3,
		pid: 13
	}, function (context) { return context._dataLength / 4 }],

	PMTHeader: {
		_reserved: 3,
		pcrPID: 13,
		_reserved2: 4,
		programDescriptors: ['DynamicArray', 12, 'uint8']
	},

	PMTItem: {
		streamType: 'uint8',
		_reserved: 3,
		elementaryPID: 13,
		_reserved2: 4,
		esInfo: ['DynamicArray', 12, 'uint8']
	},

	PrivateSection: ['extend', {
		pointerField: ['if', 'payloadStart', 'uint8'],
		tableId: ['enum', 'uint8', ['PAT', 'CAT', 'PMT']],
		isLongSection: 1,
		isPrivate: 1,
		_reserved: 2,
		_sectionLength: 12
	}, ['if', 'isLongSection', {
			tableIdExt: 'uint16',
			_reserved: 2,
			versionNumber: 5,
			currentNextIndicator: 1,
			sectionNumber: 'uint8',
			lastSectionNumber: 'uint8',

			_dataLength: function () { return this.binary.getContext(1)._sectionLength - 9 },

			data: jBinary.Type({
				read: function (header) {
					var data, file = this.binary.getContext(3), dataLength = header._dataLength;

					switch (this.binary.getContext(1).tableId) {
						case 'PAT':
							data = this.binary.read('PATItem');

							if (header.sectionNumber == 0) {
								file.pat = {};
							}

							for (var i = 0; i < data.length; i++) {
								file.pat[data[i].pid] = data[i];
							}

							break;

						case 'PMT':
							data = this.binary.read('PMTHeader');

							data.mappings = [];

							dataLength -= 4 + data.programDescriptors.length;

							while (dataLength > 0) {
								var mapping = this.binary.read('PMTItem');
								data.mappings.push(mapping);
								dataLength -= 5 + mapping.esInfo.length;
							}

							if (header.sectionNumber == 0) {
								file.pmt = {};
							}

							for (var i = 0; i < data.mappings.length; i++) {
								var mapping = data.mappings[i];
								file.pmt[mapping.elementaryPID] = mapping;
							}

							break;
					}

					return data;
				}
			}),

			crc32: 'uint32'
		},
		['blob', '_sectionLength']
	]],

	Packet: {
		_startof: function () { return this.binary.tell() },
		_endof: function (context) { return context._startof + 188 },

		_syncByte: ['const', 'uint8', 0x47, true],

		transportError: 1,
		payloadStart: 1,
		transportPriority: 1,
		pid: 13,

		scramblingControl: 2,
		_hasAdaptationField: ['Flag', 'adaptationField'],
		_hasPayload: ['Flag', 'payload'],
		contCounter: 4,

		adaptationField: ['FlagDependent', '_hasAdaptationField', 'AdaptationField'],

		payload: ['FlagDependent', '_hasPayload', jBinary.Template({
			getBaseType: function (context) {
				var pid = context.pid, file = this.binary.getContext(1);
				if (pid < 2 || pid in file.pat) {
					return 'PrivateSection';
				}
				if (pid in file.pmt) {
					return 'ES';
				}
			}
		})],

		_toEnd: function (context) { this.binary.seek(context._endof) }
	},

	File: jBinary.Template({
		baseType: ['array', 'Packet'],
		read: function () {
			this.pat = {};
			this.pmt = {};
			var self = this;
			return this.binary.inContext(this, function () {
				return self.baseRead();
			});
		},
		write: function (packets) {
			var self = this;
			this.binary.inContext(this, function () {
				self.baseWrite(packets);
			});
		}
	})
};

/*- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
/* Merging js: src/converter/pes.js begins */
/*- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */



(function () {



this.PES = {
	Flag: jBinary.Template({
		baseType: 1,
		params: ['dependentField'],
		write: function (value, context) {
			this.baseWrite(this.dependentField in context ? 1 : 0);
		}
	}),

	FlagDependent: jBinary.Template({
		params: ['flagField', 'baseType'],
		read: function () {
			return this.binary.read(['if', this.flagField, this.baseType]);
		}
	}),

	PESTimeStamp: jBinary.Template({
		setParams: function (prefix) {
			var skipBit = ['const', 1, 1, true];
			this.baseType = {
				_prefix: ['const', 4, prefix, true],
				hiPart: 3,
				_skip1: skipBit,
				midPart: 15,
				_skip2: skipBit,
				loPart: 15,
				_skip3: skipBit
			};
		},
		read: function () {
			var parts = this.baseRead();
			return parts.loPart | (parts.midPart << 15) | (parts.hiPart << 30);
		},
		write: function (value) {
			this.baseWrite({
				hiPart: value >>> 30,
				midPart: (value >>> 15) & ~(-1 << 15),
				loPart: value & ~(-1 << 15)
			});
		}
	}),

	PESPacket: ['extend', {
		_startCode0: ['const', 'uint8', 0, true],
		_startCode1: ['const', 'uint8', 0, true],
		_startCode2: ['const', 'uint8', 1, true],
		streamId: 'uint8',
		length: 'uint16',
		_end: function (context) {
			var pos = this.binary.tell(), length = context.length;

			if (length) {
				return pos + length;
			}

			/*
			not sure if it correctly covers cases where `length`==0
			(according to specification, it may be written as zero for video streams of undefined length)
			but should work for H.264 streams since NAL unit types always have clear highest bit (`forbidden_zero_bit`)
			*/
			var fileEnd = this.binary.view.byteLength, bytes = this.binary.seek(pos, function () { return this.view.getBytes() });
			for (var i = 0; i < bytes.length - 4; i++) {
				if (bytes[i] === 0 && bytes[i + 1] === 0 && bytes[i + 2] === 1 && (bytes[i + 3] & 0x80)) {
					return pos + i;
				}
			}
			return fileEnd;
		}
	}, jBinary.Template({
		baseType: {
			_marker: ['const', 2, 2, true],
			scramblingControl: ['enum', 2, ['not_scrambled']],
			priority: 1,
			dataAlignmentIndicator: 1,
			hasCopyright: 1,
			isOriginal: 1,
			_hasPTS: ['Flag', 'pts'],
			_hasDTS: ['Flag', 'dts'],
			_hasESCR: ['Flag', 'escr'],
			_hasESRate: ['Flag', 'esRate'],
			dsmTrickMode: 1,
			_hasAdditionalCopyInfo: ['Flag', 'additionalCopyInfo'],
			_hasPESCRC: ['Flag', 'pesCRC'],
			_hasExtension: ['Flag', 'extension'],
			dataLength: 'uint8',
			_headerEnd: function (context) { return this.binary.tell() + context.dataLength },
			pts: ['FlagDependent', '_hasPTS', ['if', '_hasDTS', ['PESTimeStamp', 3], ['PESTimeStamp', 2]]],
			dts: ['FlagDependent', '_hasDTS', ['PESTimeStamp', 1]],
			_toHeaderEnd: function (context) { this.binary.seek(context._headerEnd) }
		},
		read: function () {
			var pos = this.binary.tell();
			try {
				return this.baseRead();
			} catch (e) {
				this.binary.seek(pos);
				this.binary.view.alignBy();
			}
		}
	}), {
		data: ['blob', function () { return this.binary.getContext('_end')._end - this.binary.tell() }]
	}]
};
}).call(this);

/*- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
/* Merging js: src/converter/mojConv.js begins */
/*- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */



var blobConverter = function (url, cb, errCallback) {
    jBinary.loadData(url, function (err, data) {
        try{
            if (errCallback && err) {
                errCallback(err);
            }

            var mpegts = new jBinary(data, MPEGTS);

            console.time('convert');

            var packets = mpegts.read('File');

            // extracting and concatenating raw stream parts
            var stream = new jDataView(mpegts.view.byteLength);
            for (var i = 0, length = packets.length; i < length; i++) {
                var packet = packets[i], adaptation = packet.adaptationField, payload = packet.payload;
                if (payload && payload._rawStream) {
                    stream.writeBytes(payload._rawStream);
                }
            }

            var pesStream = new jBinary(stream.slice(0, stream.tell()), PES),
                audioStream = new jBinary(stream.byteLength, ADTS),
                samples = [],
                audioSamples = [];

            stream = new jDataView(stream.byteLength);

            while (pesStream.tell() < pesStream.view.byteLength) {
                var packet = pesStream.read('PESPacket');

                if (packet.streamId === 0xC0) {
                    // 0xC0 means we have got first audio stream
                    audioStream.write('blob', packet.data);
                } else if (packet.streamId === 0xE0) {
                    var nalStream = new jBinary(packet.data, H264),
                        curSample = {offset: stream.tell(), pts: packet.pts, dts: packet.dts || packet.pts};

                    samples.push(curSample);

                    // collecting info from H.264 NAL units
                    while (nalStream.tell() < nalStream.view.byteLength) {
                        var nalUnit = nalStream.read('NALUnit');
                        switch (nalUnit[0] & 0x1F) {
                            case 7:
                                if (!sps) {
                                    var sps = nalUnit;
                                    var spsInfo = new jBinary(sps, H264).read('SPS');
                                    var width = (spsInfo.pic_width_in_mbs_minus_1 + 1) * 16;
                                    var height = (2 - spsInfo.frame_mbs_only_flag) * (spsInfo.pic_height_in_map_units_minus_1 + 1) * 16;
                                    var cropping = spsInfo.frame_cropping;
                                    if (cropping) {
                                        width -= 2 * (cropping.left + cropping.right);
                                        height -= 2 * (cropping.top + cropping.bottom);
                                    }
                                }
                                break;

                            case 8:
                                if (!pps) {
                                    var pps = nalUnit;
                                }
                                break;

                            case 5:
                                curSample.isIDR = true;
                            /* falls through */
                            default:
                                stream.writeUint32(nalUnit.length);
                                stream.writeBytes(nalUnit);
                        }
                    }
                }
            }

            samples.push({offset: stream.tell()});

            var sizes = [],
                dtsDiffs = [],
                accessIndexes = [],
                pts_dts_Diffs = [],
                current = samples[0],
                frameRate = {sum: 0, count: 0},
                duration = 0;

            // calculating PTS/DTS differences and collecting keyframes

            for (var i = 0, length = samples.length - 1; i < length; i++) {
                var next = samples[i + 1];
                sizes.push(next.offset - current.offset);
                var dtsDiff = next.dts - current.dts;
                if (dtsDiff) {
                    dtsDiffs.push({sample_count: 1, sample_delta: dtsDiff});
                    duration += dtsDiff;
                    frameRate.sum += dtsDiff;
                    frameRate.count++;
                } else {
                    dtsDiffs.length++;
                }
                if (current.isIDR) {
                    accessIndexes.push(i + 1);
                }
                pts_dts_Diffs.push({
                    first_chunk: pts_dts_Diffs.length + 1,
                    sample_count: 1,
                    sample_offset: current.dtsFix = current.pts - current.dts
                });
                current = next;
            }

            frameRate = frameRate.sum / frameRate.count;

            for (var i = 0, length = dtsDiffs.length; i < length; i++) {
                if (dtsDiffs[i] === undefined) {
                    dtsDiffs[i] = {first_chunk: i + 1, sample_count: 1, sample_delta: frameRate};
                    duration += frameRate;
                    //samples[i + 1].dts = samples[i].dts + frameRate;
                }
            }

            // checking if DTS differences are same everywhere to pack them into one item

            var dtsDiffsSame = true;

            for (var i = 1, length = dtsDiffs.length; i < length; i++) {
                if (dtsDiffs[i].sample_delta !== dtsDiffs[0].sample_delta) {
                    dtsDiffsSame = false;
                    break;
                }
            }

            if (dtsDiffsSame) {
                dtsDiffs = [{first_chunk: 1, sample_count: sizes.length, sample_delta: dtsDiffs[0].sample_delta}];
            }

            // building audio metadata

            var audioStart = stream.tell(),
                audioSize = audioStream.tell(),
                audioSizes = [],
                audioHeader,
                maxAudioSize = 0;

            audioStream.seek(0);

            while (audioStream.tell() < audioSize) {
                audioHeader = audioStream.read('ADTSPacket');
                audioSizes.push(audioHeader.data.length);
                if (audioHeader.data.length > maxAudioSize) {
                    maxAudioSize = audioHeader.data.length;
                }
                stream.writeBytes(audioHeader.data);
            }

            // generating resulting MP4

            var file = new jBinary(stream.byteLength, MP4);

            var trak = [{
                atoms: {
                    tkhd: [{
                        version: 0,
                        flags: 15,
                        track_ID: 1,
                        duration: duration,
                        layer: 0,
                        alternate_group: 0,
                        volume: 1,
                        matrix: {
                            a: 1, b: 0, x: 0,
                            c: 0, d: 1, y: 0,
                            u: 0, v: 0, w: 1
                        },
                        dimensions: {
                            horz: width,
                            vert: height
                        }
                    }],
                    mdia: [{
                        atoms: {
                            mdhd: [{
                                version: 0,
                                flags: 0,
                                timescale: 90000,
                                duration: duration,
                                lang: 'und'
                            }],
                            hdlr: [{
                                version: 0,
                                flags: 0,
                                handler_type: 'vide',
                                name: 'VideoHandler'
                            }],
                            minf: [{
                                atoms: {
                                    vmhd: [{
                                        version: 0,
                                        flags: 1,
                                        graphicsmode: 0,
                                        opcolor: {r: 0, g: 0, b: 0}
                                    }],
                                    dinf: [{
                                        atoms: {
                                            dref: [{
                                                version: 0,
                                                flags: 0,
                                                entries: [{
                                                    type: 'url ',
                                                    version: 0,
                                                    flags: 1,
                                                    location: ''
                                                }]
                                            }]
                                        }
                                    }],
                                    stbl: [{
                                        atoms: {
                                            stsd: [{
                                                version: 0,
                                                flags: 0,
                                                entries: [{
                                                    type: 'avc1',
                                                    data_reference_index: 1,
                                                    dimensions: {
                                                        horz: width,
                                                        vert: height
                                                    },
                                                    resolution: {
                                                        horz: 72,
                                                        vert: 72
                                                    },
                                                    frame_count: 1,
                                                    compressorname: '',
                                                    depth: 24,
                                                    atoms: {
                                                        avcC: [{
                                                            version: 1,
                                                            profileIndication: spsInfo.profile_idc,
                                                            profileCompatibility: parseInt(spsInfo.constraint_set_flags.join(''), 2),
                                                            levelIndication: spsInfo.level_idc,
                                                            lengthSizeMinusOne: 3,
                                                            seqParamSets: [sps],
                                                            pictParamSets: [pps]
                                                        }]
                                                    }
                                                }]
                                            }],
                                            stts: [{
                                                version: 0,
                                                flags: 0,
                                                entries: dtsDiffs
                                            }],
                                            stss: [{
                                                version: 0,
                                                flags: 0,
                                                entries: accessIndexes
                                            }],
                                            ctts: [{
                                                version: 0,
                                                flags: 0,
                                                entries: pts_dts_Diffs
                                            }],
                                            stsc: [{
                                                version: 0,
                                                flags: 0,
                                                entries: [{
                                                    first_chunk: 1,
                                                    samples_per_chunk: sizes.length,
                                                    sample_description_index: 1
                                                }]
                                            }],
                                            stsz: [{
                                                version: 0,
                                                flags: 0,
                                                sample_size: 0,
                                                sample_count: sizes.length,
                                                sample_sizes: sizes
                                            }],
                                            stco: [{
                                                version: 0,
                                                flags: 0,
                                                entries: [0x28]
                                            }]
                                        }
                                    }]
                                }
                            }]
                        }
                    }]
                }
            }];

            if (audioSize > 0) {
                trak.push({
                    atoms: {
                        tkhd: [{
                            version: 0,
                            flags: 15,
                            track_ID: 2,
                            duration: duration,
                            layer: 0,
                            alternate_group: 1,
                            volume: 1,
                            matrix: {
                                a: 1, b: 0, x: 0,
                                c: 0, d: 1, y: 0,
                                u: 0, v: 0, w: 1
                            },
                            dimensions: {
                                horz: 0,
                                vert: 0
                            }
                        }],
                        mdia: [{
                            atoms: {
                                mdhd: [{
                                    version: 0,
                                    flags: 0,
                                    timescale: 90000,
                                    duration: duration,
                                    lang: 'eng'
                                }],
                                hdlr: [{
                                    version: 0,
                                    flags: 0,
                                    handler_type: 'soun',
                                    name: 'SoundHandler'
                                }],
                                minf: [{
                                    atoms: {
                                        smhd: [{
                                            version: 0,
                                            flags: 0,
                                            balance: 0
                                        }],
                                        dinf: [{
                                            atoms: {
                                                dref: [{
                                                    version: 0,
                                                    flags: 0,
                                                    entries: [{
                                                        type: 'url ',
                                                        version: 0,
                                                        flags: 1,
                                                        location: ''
                                                    }]
                                                }]
                                            }
                                        }],
                                        stbl: [{
                                            atoms: {
                                                stsd: [{
                                                    version: 0,
                                                    flags: 0,
                                                    entries: [{
                                                        type: 'mp4a',
                                                        data_reference_index: 1,
                                                        channelcount: 2,
                                                        samplesize: 16,
                                                        samplerate: 22050,
                                                        atoms: {
                                                            esds: [{
                                                                version: 0,
                                                                flags: 0,
                                                                sections: [
                                                                    {
                                                                        descriptor_type: 3,
                                                                        ext_type: 128,
                                                                        length: 34,
                                                                        es_id: 2,
                                                                        stream_priority: 0
                                                                    },
                                                                    {
                                                                        descriptor_type: 4,
                                                                        ext_type: 128,
                                                                        length: 20,
                                                                        type: 'mpeg4_audio',
                                                                        stream_type: 'audio',
                                                                        upstream_flag: 0,
                                                                        buffer_size: 0,
                                                                        maxBitrate: maxAudioSize / (duration / 90000 / audioSizes.length),
                                                                        avgBitrate: (stream.tell() - audioStart) / (duration / 90000)
                                                                    },
                                                                    {
                                                                        descriptor_type: 5,
                                                                        ext_type: 128,
                                                                        length: 2,
                                                                        audio_profile: audioHeader.profileMinusOne + 1,
                                                                        sampling_freq: audioHeader.samplingFreq,
                                                                        channelConfig: audioHeader.channelConfig
                                                                    },
                                                                    {
                                                                        descriptor_type: 6,
                                                                        ext_type: 128,
                                                                        length: 1,
                                                                        sl: 2
                                                                    }
                                                                ]
                                                            }]
                                                        }
                                                    }]
                                                }],
                                                stts: [{
                                                    version: 0,
                                                    flags: 0,
                                                    entries: [{
                                                        sample_count: audioSizes.length,
                                                        sample_delta: duration / audioSizes.length
                                                    }]
                                                }],
                                                stsc: [{
                                                    version: 0,
                                                    flags: 0,
                                                    entries: [{
                                                        first_chunk: 1,
                                                        samples_per_chunk: audioSizes.length,
                                                        sample_description_index: 1
                                                    }]
                                                }],
                                                stsz: [{
                                                    version: 0,
                                                    flags: 0,
                                                    sample_size: 0,
                                                    sample_count: audioSizes.length,
                                                    sample_sizes: audioSizes
                                                }],
                                                stco: [{
                                                    version: 0,
                                                    flags: 0,
                                                    entries: [0x28 + audioStart]
                                                }]
                                            }
                                        }]
                                    }
                                }]
                            }
                        }]
                    }
                });
            }
            ;

            var creationTime = new Date();

            file.write('File', {
                ftyp: [{
                    major_brand: 'isom',
                    minor_version: 512,
                    compatible_brands: ['isom', 'iso2', 'avc1', 'mp41']
                }],
                mdat: [{
                    _rawData: stream.getBytes(stream.tell(), 0)
                }],
                moov: [{
                    atoms: {
                        mvhd: [{
                            version: 0,
                            flags: 0,
                            creation_time: creationTime,
                            modification_time: creationTime,
                            timescale: 90000,
                            duration: duration,
                            rate: 1,
                            volume: 1,
                            matrix: {
                                a: 1, b: 0, x: 0,
                                c: 0, d: 1, y: 0,
                                u: 0, v: 0, w: 1
                            },
                            next_track_ID: 2
                        }],
                        trak: trak
                    }
                }]
            });

            var url = file.slice(0, file.tell()).toURI('video/mp4');
            if (cb) {
                cb(url);
            }
        }
        catch(error){
            if (errCallback && error) {
                errCallback(error);
            }
        }
    });
};

var mojConvArray = function (arr, cb, errCallback) {
    var total = arr.length;
    var outputArrayBuffer = [];
    async.eachSeries(arr, function (ab, callback) {
        var blob = new Blob([ab]);
        var url = URL.createObjectURL(blob);
        mojConvArray(url, function (link) {
            mojFetch(link, function (nab) {
                outputArrayBuffer.push(nab);
                console.log('finished convert #' + outputArrayBuffer.length)
                if (outputArrayBuffer.length === total) {
                    console.log('finish converting....')
                    if (cb) cb(outputArrayBuffer);
                }
            });
        }, callback);
    });
};
var toArrayBuffer = function (buffer) {
    var ab = new ArrayBuffer(buffer.length);
    var view = new Uint8Array(ab);
    for (var i = 0; i < buffer.length; ++i) {
        view[i] = buffer[i];
    }
    return ab;
};

var mojFetch = function (url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", url);
    xhr.responseType = "blob";
    xhr.onload = function () {
        var file = xhr.response;
        var reader = new window.FileReader();
        reader.onload = (function () {
            return function (e) {
                if (callback)
                    callback(e.target.result);
            };
        })(file);
        reader.readAsArrayBuffer(file);
    }
    xhr.send();
};