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