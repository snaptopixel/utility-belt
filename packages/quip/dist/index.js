"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var HtmlTags;
(function (HtmlTags) {
    HtmlTags[HtmlTags["head"] = 0] = "head";
    HtmlTags[HtmlTags["meta"] = 1] = "meta";
    HtmlTags[HtmlTags["link"] = 2] = "link";
    HtmlTags[HtmlTags["title"] = 3] = "title";
    HtmlTags[HtmlTags["base"] = 4] = "base";
    HtmlTags[HtmlTags["body"] = 5] = "body";
    HtmlTags[HtmlTags["nav"] = 6] = "nav";
    HtmlTags[HtmlTags["header"] = 7] = "header";
    HtmlTags[HtmlTags["footer"] = 8] = "footer";
    HtmlTags[HtmlTags["main"] = 9] = "main";
    HtmlTags[HtmlTags["aside"] = 10] = "aside";
    HtmlTags[HtmlTags["article"] = 11] = "article";
    HtmlTags[HtmlTags["section"] = 12] = "section";
    HtmlTags[HtmlTags["h1"] = 13] = "h1";
    HtmlTags[HtmlTags["h2"] = 14] = "h2";
    HtmlTags[HtmlTags["h3"] = 15] = "h3";
    HtmlTags[HtmlTags["h4"] = 16] = "h4";
    HtmlTags[HtmlTags["h5"] = 17] = "h5";
    HtmlTags[HtmlTags["h6"] = 18] = "h6";
    HtmlTags[HtmlTags["hr"] = 19] = "hr";
    HtmlTags[HtmlTags["ul"] = 20] = "ul";
    HtmlTags[HtmlTags["ol"] = 21] = "ol";
    HtmlTags[HtmlTags["li"] = 22] = "li";
    HtmlTags[HtmlTags["dl"] = 23] = "dl";
    HtmlTags[HtmlTags["dt"] = 24] = "dt";
    HtmlTags[HtmlTags["dd"] = 25] = "dd";
    HtmlTags[HtmlTags["div"] = 26] = "div";
    HtmlTags[HtmlTags["p"] = 27] = "p";
    HtmlTags[HtmlTags["pre"] = 28] = "pre";
    HtmlTags[HtmlTags["blockquote"] = 29] = "blockquote";
    HtmlTags[HtmlTags["span"] = 30] = "span";
    HtmlTags[HtmlTags["a"] = 31] = "a";
    HtmlTags[HtmlTags["em"] = 32] = "em";
    HtmlTags[HtmlTags["strong"] = 33] = "strong";
    HtmlTags[HtmlTags["b"] = 34] = "b";
    HtmlTags[HtmlTags["i"] = 35] = "i";
    HtmlTags[HtmlTags["u"] = 36] = "u";
    HtmlTags[HtmlTags["s"] = 37] = "s";
    HtmlTags[HtmlTags["mark"] = 38] = "mark";
    HtmlTags[HtmlTags["small"] = 39] = "small";
    HtmlTags[HtmlTags["del"] = 40] = "del";
    HtmlTags[HtmlTags["ins"] = 41] = "ins";
    HtmlTags[HtmlTags["sup"] = 42] = "sup";
    HtmlTags[HtmlTags["sub"] = 43] = "sub";
    HtmlTags[HtmlTags["dfn"] = 44] = "dfn";
    HtmlTags[HtmlTags["code"] = 45] = "code";
    HtmlTags[HtmlTags["var"] = 46] = "var";
    HtmlTags[HtmlTags["samp"] = 47] = "samp";
    HtmlTags[HtmlTags["kbd"] = 48] = "kbd";
    HtmlTags[HtmlTags["q"] = 49] = "q";
    HtmlTags[HtmlTags["cite"] = 50] = "cite";
    HtmlTags[HtmlTags["ruby"] = 51] = "ruby";
    HtmlTags[HtmlTags["rt"] = 52] = "rt";
    HtmlTags[HtmlTags["rp"] = 53] = "rp";
    HtmlTags[HtmlTags["br"] = 54] = "br";
    HtmlTags[HtmlTags["wbr"] = 55] = "wbr";
    HtmlTags[HtmlTags["bdo"] = 56] = "bdo";
    HtmlTags[HtmlTags["bdi"] = 57] = "bdi";
    HtmlTags[HtmlTags["table"] = 58] = "table";
    HtmlTags[HtmlTags["caption"] = 59] = "caption";
    HtmlTags[HtmlTags["tr"] = 60] = "tr";
    HtmlTags[HtmlTags["td"] = 61] = "td";
    HtmlTags[HtmlTags["th"] = 62] = "th";
    HtmlTags[HtmlTags["thead"] = 63] = "thead";
    HtmlTags[HtmlTags["tfoot"] = 64] = "tfoot";
    HtmlTags[HtmlTags["tbody"] = 65] = "tbody";
    HtmlTags[HtmlTags["colgroup"] = 66] = "colgroup";
    HtmlTags[HtmlTags["col"] = 67] = "col";
    HtmlTags[HtmlTags["img"] = 68] = "img";
    HtmlTags[HtmlTags["figure"] = 69] = "figure";
    HtmlTags[HtmlTags["figcaption"] = 70] = "figcaption";
    HtmlTags[HtmlTags["video"] = 71] = "video";
    HtmlTags[HtmlTags["audio"] = 72] = "audio";
    HtmlTags[HtmlTags["source"] = 73] = "source";
    HtmlTags[HtmlTags["track"] = 74] = "track";
    HtmlTags[HtmlTags["iframe"] = 75] = "iframe";
    HtmlTags[HtmlTags["canvas"] = 76] = "canvas";
    HtmlTags[HtmlTags["abbr"] = 77] = "abbr";
    HtmlTags[HtmlTags["address"] = 78] = "address";
    HtmlTags[HtmlTags["meter"] = 79] = "meter";
    HtmlTags[HtmlTags["progress"] = 80] = "progress";
    HtmlTags[HtmlTags["time"] = 81] = "time";
    HtmlTags[HtmlTags["form"] = 82] = "form";
    HtmlTags[HtmlTags["button"] = 83] = "button";
    HtmlTags[HtmlTags["input"] = 84] = "input";
    HtmlTags[HtmlTags["textarea"] = 85] = "textarea";
    HtmlTags[HtmlTags["select"] = 86] = "select";
    HtmlTags[HtmlTags["option"] = 87] = "option";
    HtmlTags[HtmlTags["optgroup"] = 88] = "optgroup";
    HtmlTags[HtmlTags["label"] = 89] = "label";
    HtmlTags[HtmlTags["fieldset"] = 90] = "fieldset";
    HtmlTags[HtmlTags["legend"] = 91] = "legend";
    HtmlTags[HtmlTags["keygen"] = 92] = "keygen";
    HtmlTags[HtmlTags["command"] = 93] = "command";
    HtmlTags[HtmlTags["datalist"] = 94] = "datalist";
    HtmlTags[HtmlTags["menu"] = 95] = "menu";
    HtmlTags[HtmlTags["output"] = 96] = "output";
    HtmlTags[HtmlTags["details"] = 97] = "details";
    HtmlTags[HtmlTags["summary"] = 98] = "summary";
    HtmlTags[HtmlTags["template"] = 99] = "template";
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
function Quip(target) {
    registerComponent(target.name, target);
    return target;
}
exports.Quip = Quip;
var tags = Object.keys(HtmlTags).filter(function (key) { return isNaN(key); });
var NodeDefinition = /** @class */ (function () {
    function NodeDefinition(type, parent, ref) {
        this.type = type;
        this.parent = parent;
        this.data = {};
        this.children = [];
        if (ref) {
            this.data.ref = ref;
        }
    }
    return NodeDefinition;
}());
exports.NodeDefinition = NodeDefinition;
var SlotDefinition = /** @class */ (function () {
    function SlotDefinition(parent, name, scope) {
        this.parent = parent;
        this.name = name;
        this.scope = scope;
    }
    return SlotDefinition;
}());
exports.SlotDefinition = SlotDefinition;
function err(message) {
    throw new Error("[Quip Error] " + message);
}
function QuipFactory($createElement, $slots, $scopedSlots) {
    var stack = [];
    var activeDefinition;
    function createNode(definition) {
        if (definition instanceof NodeDefinition) {
            var children = definition.children.map(createNode);
            return $createElement(definition.type, definition.data, children);
        }
        else if (definition instanceof SlotDefinition) {
            if ($scopedSlots && $scopedSlots[definition.name]) {
                var renderFn = $scopedSlots[definition.name];
                return renderFn.__quip__
                    ? renderFn(q, definition.scope)
                    : renderFn(definition.scope);
            }
            else if ($slots && $slots[definition.name]) {
                return $slots[definition.name];
            }
            else {
                err("Slot not found! The slot \"" + definition.name + "\" was referenced but has not been defined");
            }
        }
        else {
            return definition;
        }
    }
    function open(type, ref) {
        var parent = activeDefinition;
        activeDefinition = new NodeDefinition(type, parent, ref);
        stack.push(activeDefinition);
        if (parent) {
            parent.children.push(activeDefinition);
        }
        return close;
    }
    function close() {
        var cur = stack.pop();
        activeDefinition = stack[stack.length - 1];
        return cur.parent
            ? close
            : createNode(cur);
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
            Plugins[name_1].apply(Plugins, [activeDefinition].concat(args));
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
    q.slot = function (name, renderFn) {
        if (typeof name !== 'string') {
            renderFn = name;
            name = 'default';
        }
        else if (!renderFn) {
            err('No render function provided! You must pass a render function when defining a slot');
        }
        renderFn.__quip__ = true;
        var data = activeDefinition.data;
        data.scopedSlots = data.scopedSlots || {};
        data.scopedSlots[name] = renderFn;
        return q;
    };
    q.insertSlot = function (name, scope) {
        if (name === void 0) { name = 'default'; }
        var parent = activeDefinition;
        parent.children.push(new SlotDefinition(parent, name, scope));
        return q;
    };
    return q;
}
exports.QuipFactory = QuipFactory;
exports.QuipPlugin = {
    install: function (Vue) {
        if ('$quip' in Vue.prototype === false) {
            Object.defineProperty(Vue.prototype, '$quip', {
                get: function () {
                    return this.__quip__ = this.__quip__ || QuipFactory(this.$createElement, this.$slots, this.$scopedSlots);
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
registerPlugin('map', function (_def, items, fn) {
    items.map(fn);
});
var switchValue;
var switchActive;
registerPlugin('switch', function (_def, value) {
    switchValue = value;
    switchActive = true;
    return function () {
        switchActive = false;
    };
});
registerPlugin('case', function (_def, value, fn) {
    if (switchActive && switchValue === value) {
        fn();
        switchActive = false;
    }
});
registerPlugin('default', function (_def, fn) {
    if (switchActive) {
        fn(switchValue);
        switchActive = false;
    }
});
var doElse;
registerPlugin('if', function (_def, value, fn) {
    if (typeof value === 'function') {
        value = value();
    }
    doElse = !value;
    if (value) {
        fn();
    }
});
registerPlugin('else', function (_def, fn) {
    if (doElse) {
        fn();
    }
});
registerPlugin('attr', function (def) {
    var params = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        params[_i - 1] = arguments[_i];
    }
    def.data.attrs = def.data.attrs || {};
    if (typeof params[0] === 'object') {
        for (var _a = 0, _b = Object.keys(params[0]); _a < _b.length; _a++) {
            var attr = _b[_a];
            def.data.attrs[attr] = params[0][attr];
        }
    }
    else if (typeof params[0] === 'string') {
        def.data.attrs[params[0]] = params[1];
    }
});
registerPlugin('data', function (_a, customData) {
    var data = _a.data;
    Object.keys(customData).forEach(function (key) {
        data[key] = customData[key];
    });
});
registerPlugin('text', function (def, value) {
    def.children.push(value);
});
registerPlugin('html', function (def, value) {
    def.data.domProps = def.data.domProps || {};
    def.data.domProps.innerHTML = value;
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