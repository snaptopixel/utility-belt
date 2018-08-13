"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var HtmlTags;
(function (HtmlTags) {
    HtmlTags[HtmlTags["html"] = 0] = "html";
    HtmlTags[HtmlTags["head"] = 1] = "head";
    HtmlTags[HtmlTags["meta"] = 2] = "meta";
    HtmlTags[HtmlTags["link"] = 3] = "link";
    HtmlTags[HtmlTags["title"] = 4] = "title";
    HtmlTags[HtmlTags["base"] = 5] = "base";
    HtmlTags[HtmlTags["body"] = 6] = "body";
    HtmlTags[HtmlTags["nav"] = 7] = "nav";
    HtmlTags[HtmlTags["header"] = 8] = "header";
    HtmlTags[HtmlTags["footer"] = 9] = "footer";
    HtmlTags[HtmlTags["main"] = 10] = "main";
    HtmlTags[HtmlTags["aside"] = 11] = "aside";
    HtmlTags[HtmlTags["article"] = 12] = "article";
    HtmlTags[HtmlTags["section"] = 13] = "section";
    HtmlTags[HtmlTags["h1"] = 14] = "h1";
    HtmlTags[HtmlTags["h2"] = 15] = "h2";
    HtmlTags[HtmlTags["h3"] = 16] = "h3";
    HtmlTags[HtmlTags["h4"] = 17] = "h4";
    HtmlTags[HtmlTags["h5"] = 18] = "h5";
    HtmlTags[HtmlTags["h6"] = 19] = "h6";
    HtmlTags[HtmlTags["hr"] = 20] = "hr";
    HtmlTags[HtmlTags["ul"] = 21] = "ul";
    HtmlTags[HtmlTags["ol"] = 22] = "ol";
    HtmlTags[HtmlTags["li"] = 23] = "li";
    HtmlTags[HtmlTags["dl"] = 24] = "dl";
    HtmlTags[HtmlTags["dt"] = 25] = "dt";
    HtmlTags[HtmlTags["dd"] = 26] = "dd";
    HtmlTags[HtmlTags["div"] = 27] = "div";
    HtmlTags[HtmlTags["p"] = 28] = "p";
    HtmlTags[HtmlTags["pre"] = 29] = "pre";
    HtmlTags[HtmlTags["blockquote"] = 30] = "blockquote";
    HtmlTags[HtmlTags["span"] = 31] = "span";
    HtmlTags[HtmlTags["a"] = 32] = "a";
    HtmlTags[HtmlTags["em"] = 33] = "em";
    HtmlTags[HtmlTags["strong"] = 34] = "strong";
    HtmlTags[HtmlTags["b"] = 35] = "b";
    HtmlTags[HtmlTags["i"] = 36] = "i";
    HtmlTags[HtmlTags["u"] = 37] = "u";
    HtmlTags[HtmlTags["s"] = 38] = "s";
    HtmlTags[HtmlTags["mark"] = 39] = "mark";
    HtmlTags[HtmlTags["small"] = 40] = "small";
    HtmlTags[HtmlTags["del"] = 41] = "del";
    HtmlTags[HtmlTags["ins"] = 42] = "ins";
    HtmlTags[HtmlTags["sup"] = 43] = "sup";
    HtmlTags[HtmlTags["sub"] = 44] = "sub";
    HtmlTags[HtmlTags["dfn"] = 45] = "dfn";
    HtmlTags[HtmlTags["code"] = 46] = "code";
    HtmlTags[HtmlTags["var"] = 47] = "var";
    HtmlTags[HtmlTags["samp"] = 48] = "samp";
    HtmlTags[HtmlTags["kbd"] = 49] = "kbd";
    HtmlTags[HtmlTags["q"] = 50] = "q";
    HtmlTags[HtmlTags["cite"] = 51] = "cite";
    HtmlTags[HtmlTags["ruby"] = 52] = "ruby";
    HtmlTags[HtmlTags["rt"] = 53] = "rt";
    HtmlTags[HtmlTags["rp"] = 54] = "rp";
    HtmlTags[HtmlTags["br"] = 55] = "br";
    HtmlTags[HtmlTags["wbr"] = 56] = "wbr";
    HtmlTags[HtmlTags["bdo"] = 57] = "bdo";
    HtmlTags[HtmlTags["bdi"] = 58] = "bdi";
    HtmlTags[HtmlTags["table"] = 59] = "table";
    HtmlTags[HtmlTags["caption"] = 60] = "caption";
    HtmlTags[HtmlTags["tr"] = 61] = "tr";
    HtmlTags[HtmlTags["td"] = 62] = "td";
    HtmlTags[HtmlTags["th"] = 63] = "th";
    HtmlTags[HtmlTags["thead"] = 64] = "thead";
    HtmlTags[HtmlTags["tfoot"] = 65] = "tfoot";
    HtmlTags[HtmlTags["tbody"] = 66] = "tbody";
    HtmlTags[HtmlTags["colgroup"] = 67] = "colgroup";
    HtmlTags[HtmlTags["col"] = 68] = "col";
    HtmlTags[HtmlTags["img"] = 69] = "img";
    HtmlTags[HtmlTags["figure"] = 70] = "figure";
    HtmlTags[HtmlTags["figcaption"] = 71] = "figcaption";
    HtmlTags[HtmlTags["video"] = 72] = "video";
    HtmlTags[HtmlTags["audio"] = 73] = "audio";
    HtmlTags[HtmlTags["source"] = 74] = "source";
    HtmlTags[HtmlTags["track"] = 75] = "track";
    HtmlTags[HtmlTags["iframe"] = 76] = "iframe";
    HtmlTags[HtmlTags["canvas"] = 77] = "canvas";
    HtmlTags[HtmlTags["abbr"] = 78] = "abbr";
    HtmlTags[HtmlTags["address"] = 79] = "address";
    HtmlTags[HtmlTags["meter"] = 80] = "meter";
    HtmlTags[HtmlTags["progress"] = 81] = "progress";
    HtmlTags[HtmlTags["time"] = 82] = "time";
    HtmlTags[HtmlTags["form"] = 83] = "form";
    HtmlTags[HtmlTags["button"] = 84] = "button";
    HtmlTags[HtmlTags["input"] = 85] = "input";
    HtmlTags[HtmlTags["textarea"] = 86] = "textarea";
    HtmlTags[HtmlTags["select"] = 87] = "select";
    HtmlTags[HtmlTags["option"] = 88] = "option";
    HtmlTags[HtmlTags["optgroup"] = 89] = "optgroup";
    HtmlTags[HtmlTags["label"] = 90] = "label";
    HtmlTags[HtmlTags["fieldset"] = 91] = "fieldset";
    HtmlTags[HtmlTags["legend"] = 92] = "legend";
    HtmlTags[HtmlTags["keygen"] = 93] = "keygen";
    HtmlTags[HtmlTags["command"] = 94] = "command";
    HtmlTags[HtmlTags["datalist"] = 95] = "datalist";
    HtmlTags[HtmlTags["menu"] = 96] = "menu";
    HtmlTags[HtmlTags["output"] = 97] = "output";
    HtmlTags[HtmlTags["details"] = 98] = "details";
    HtmlTags[HtmlTags["summary"] = 99] = "summary";
})(HtmlTags = exports.HtmlTags || (exports.HtmlTags = {}));
var Components = {};
var Plugins = {};
function registerPlugin(name, fn) {
    Plugins[name] = fn;
}
exports.registerPlugin = registerPlugin;
function registerComponent(name, component) {
    Components[name] = component;
}
exports.registerComponent = registerComponent;
var tags = Object.keys(HtmlTags).filter(function (key) { return isNaN(key); });
var NodeDefinition = /** @class */ (function () {
    function NodeDefinition(type, ref) {
        this.type = type;
        this.data = {};
        this.children = [];
        if (ref) {
            this.data.ref = ref;
        }
    }
    return NodeDefinition;
}());
exports.NodeDefinition = NodeDefinition;
function QuipFactory($createElement) {
    var stack = [];
    function createNode(definition) {
        if (typeof definition === 'string') {
            return definition;
        }
        else {
            var children = definition.children.map(createNode);
            return $createElement(definition.type, definition.data, children);
        }
    }
    function open(type, ref) {
        var item = new NodeDefinition(type, ref);
        var parent = stack[stack.length - 1];
        stack.push(item);
        if (parent) {
            parent.children.push(item);
        }
        return close;
    }
    function close() {
        var cur = stack.pop();
        return stack.length === 0
            ? createNode(cur)
            : close;
    }
    var q = close;
    tags.forEach(function (tag) {
        q[tag] = function (ref) {
            open(tag, ref);
            return q;
        };
    });
    var _loop_1 = function (name_1) {
        q[name_1] = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            Plugins[name_1].apply(Plugins, [stack[stack.length - 1]].concat(args));
            return q;
        };
    };
    for (var _i = 0, _a = Object.keys(Plugins); _i < _a.length; _i++) {
        var name_1 = _a[_i];
        _loop_1(name_1);
    }
    var _loop_2 = function (name_2) {
        q[name_2] = function (ref) {
            open(Components[name_2], ref);
            return q;
        };
    };
    for (var _b = 0, _c = Object.keys(Components); _b < _c.length; _b++) {
        var name_2 = _c[_b];
        _loop_2(name_2);
    }
    q.createElement = function (nodeType, ref) {
        open(nodeType, ref);
        return q;
    };
    return q;
}
exports.default = QuipFactory;
exports.QuipPlugin = {
    install: function (Vue) {
        if ('$quip' in Vue.prototype === false) {
            Object.defineProperty(Vue.prototype, '$quip', {
                get: function () {
                    return this.__quip__ = this.__quip__ || QuipFactory(this.$createElement);
                }
            });
        }
    }
};
registerPlugin('css', function (_a) {
    var data = _a.data;
    var params = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        params[_i - 1] = arguments[_i];
    }
    data.class = data.class || {};
    if (typeof params[0] === 'object') {
        data.class = __assign({}, data.class, params[0]);
    }
    else if (typeof params[0] === 'string') {
        data.class = __assign({}, data.class, params.reduce(function (obj, className) {
            obj[className] = true;
            return obj;
        }, {}));
    }
});
registerPlugin('style', function (_a) {
    var data = _a.data;
    var params = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        params[_i - 1] = arguments[_i];
    }
    data.style = data.style || {};
    if (typeof params[0] === 'object') {
        data.style = __assign({}, data.style, params[0]);
    }
    else if (typeof params[0] === 'string') {
        data.style[params[0]] = params[1];
    }
});
registerPlugin('on', function (_a) {
    var data = _a.data;
    var params = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        params[_i - 1] = arguments[_i];
    }
    data.on = data.on || {};
    if (typeof params[0] === 'object') {
        data.on = __assign({}, data.on, params[0]);
    }
    else if (typeof params[0] === 'string') {
        data.on[params[0]] = params[1];
    }
});
registerPlugin('prop', function (_a) {
    var data = _a.data;
    var params = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        params[_i - 1] = arguments[_i];
    }
    data.props = data.props || {};
    if (typeof params[0] === 'object') {
        data.props = __assign({}, data.props, params[0]);
    }
    else if (typeof params[0] === 'string') {
        data.props[params[0]] = params[1];
    }
});
registerPlugin('map', function (_a, items, fn) {
    var data = _a.data;
    items.map(fn);
});
var switchValue;
var switchActive;
registerPlugin('switch', function (_a, value) {
    var data = _a.data;
    switchValue = value;
    switchActive = true;
    return function () {
        switchActive = false;
    };
});
registerPlugin('case', function (_a, value, fn) {
    var data = _a.data;
    if (switchActive && switchValue === value) {
        fn();
        switchActive = false;
    }
});
registerPlugin('default', function (_a, fn) {
    var data = _a.data;
    if (switchActive) {
        fn(switchValue);
        switchActive = false;
    }
});
var doElse;
registerPlugin('if', function (_a, value, fn) {
    var data = _a.data;
    if (typeof value === 'function') {
        value = value();
    }
    doElse = !value;
    if (value) {
        fn();
    }
});
registerPlugin('else', function (_a, fn) {
    var data = _a.data;
    if (doElse) {
        fn();
    }
});
registerPlugin('attr', function (_a) {
    var data = _a.data;
    var params = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        params[_i - 1] = arguments[_i];
    }
    data.attrs = data.attrs || {};
    if (typeof params[0] === 'object') {
        data.attrs = __assign({}, data.attrs, params[0]);
    }
    else if (typeof params[0] === 'string') {
        data.attrs[params[0]] = params[1];
    }
});
registerPlugin('data', function (_a, customData) {
    var data = _a.data;
    Object.keys(customData).forEach(function (key) {
        data[key] = customData[key];
    });
});
registerPlugin('text', function (def, textContent) {
    def.children.push(textContent);
});
registerPlugin('bindProp', function (_a, prop, target, value, event) {
    var data = _a.data;
    if (event === void 0) { event = 'input'; }
    data.props = data.props || {};
    data.on = data.on || {};
    data.props[prop] = target[value];
    data.on[event] = function (newValue) { return target[value] = newValue; };
});
registerPlugin('bindAttr', function (_a, attr, target, value, event) {
    var data = _a.data;
    if (event === void 0) { event = 'input'; }
    data.attrs = data.attrs || {};
    data.on = data.on || {};
    data.attrs[attr] = target[value];
    data.on[event] = function (event) { return target[value] = event.target[attr]; };
});
//# sourceMappingURL=index.js.map