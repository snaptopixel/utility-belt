import { VNode, VNodeData, AsyncComponent, Component, CreateElement } from 'vue';
import { ScopedSlot } from 'vue/types/vnode';
export interface IComponents {
}
export interface IPlugins<T extends AllTagNames> {
    css(obj: any): IQuip<T>;
    css(...classes: string[]): IQuip<T>;
    style(name: keyof CSSStyleDeclaration, value: string): IQuip<T>;
    style(declaration: Partial<CSSStyleDeclaration>): IQuip<T>;
    on(event: string, callback: (...params: any[]) => void): IQuip<T>;
    on(events: {
        [event: string]: (...params: any[]) => void;
    }): IQuip<T>;
    prop<K extends keyof AllTagProps[T]>(name: K, value: AllTagProps[T][K]): IQuip<T>;
    prop(props: AllPropTypes<T>): IQuip<T>;
    attr(name: string, value: string | boolean): IQuip<T>;
    attr(obj: {
        [attr: string]: string | boolean;
    }): IQuip<T>;
    text(value: string): IQuip<T>;
    map<I>(items: I[], factory: (item: I) => void): IQuip<T>;
    switch(value: any): IQuip<T>;
    case(value: any, fn: () => void): IQuip<T>;
    default(fn: (value: any) => void): IQuip<T>;
    if(value: boolean | (() => boolean), fn: () => void): IQuip<T>;
    else(fn: () => void): IQuip<T>;
    data(data: VNodeData): IQuip<T>;
    text(value: string): IQuip<T>;
    html(value: string): IQuip<T>;
    bindProp<P>(prop: keyof AllTagProps[T], target: P, value: keyof P, event?: string): IQuip<T>;
    bindAttr<P>(attr: string, target: P, value: keyof P, event?: string): IQuip<T>;
}
export declare type PluginFn = (def: NodeDefinition, ...args: any[]) => void;
export declare enum HtmlTags {
    head = 0,
    meta = 1,
    link = 2,
    title = 3,
    base = 4,
    body = 5,
    nav = 6,
    header = 7,
    footer = 8,
    main = 9,
    aside = 10,
    article = 11,
    section = 12,
    h1 = 13,
    h2 = 14,
    h3 = 15,
    h4 = 16,
    h5 = 17,
    h6 = 18,
    hr = 19,
    ul = 20,
    ol = 21,
    li = 22,
    dl = 23,
    dt = 24,
    dd = 25,
    div = 26,
    p = 27,
    pre = 28,
    blockquote = 29,
    span = 30,
    a = 31,
    em = 32,
    strong = 33,
    b = 34,
    i = 35,
    u = 36,
    s = 37,
    mark = 38,
    small = 39,
    del = 40,
    ins = 41,
    sup = 42,
    sub = 43,
    dfn = 44,
    code = 45,
    var = 46,
    samp = 47,
    kbd = 48,
    q = 49,
    cite = 50,
    ruby = 51,
    rt = 52,
    rp = 53,
    br = 54,
    wbr = 55,
    bdo = 56,
    bdi = 57,
    table = 58,
    caption = 59,
    tr = 60,
    td = 61,
    th = 62,
    thead = 63,
    tfoot = 64,
    tbody = 65,
    colgroup = 66,
    col = 67,
    img = 68,
    figure = 69,
    figcaption = 70,
    video = 71,
    audio = 72,
    source = 73,
    track = 74,
    iframe = 75,
    canvas = 76,
    abbr = 77,
    address = 78,
    meter = 79,
    progress = 80,
    time = 81,
    form = 82,
    button = 83,
    input = 84,
    textarea = 85,
    select = 86,
    option = 87,
    optgroup = 88,
    label = 89,
    fieldset = 90,
    legend = 91,
    keygen = 92,
    command = 93,
    datalist = 94,
    menu = 95,
    output = 96,
    details = 97,
    summary = 98,
    template = 99
}
export declare type HtmlTagNames = keyof typeof HtmlTags;
export declare type HtmlTagProps = {
    [k in HtmlTagNames]: void;
};
export declare type AllTagProps = HtmlTagProps & IComponents;
export declare type AllTagNames = keyof AllTagProps;
export declare type AllPropTypes<T extends AllTagNames> = AllTagProps[T];
export declare type TagFactory = {
    [TagName in AllTagNames]: IQuip<TagName>;
};
export interface IQuip<T extends AllTagNames> {
    createElement(nodeType: any, ref?: string): IQuip<any>;
    slot(nameOrRenderFn: string | SlotRenderFn, renderFn?: SlotRenderFn): IQuip<any>;
    insertSlot(name?: string, scope?: {
        [prop: string]: any;
    }): IQuip<any>;
}
export interface IQuip<T extends AllTagNames> extends TagFactory, IPlugins<T> {
    (ref?: string): IQuip<T>;
}
declare module 'vue/types/vue' {
    interface Vue {
        readonly $quip: IQuip<any>;
    }
}
export declare type PluginTypes = IPlugins<any>;
export declare type PluginNames = keyof PluginTypes;
export declare type ComponentNames = keyof IComponents;
export declare function registerPlugin<PluginName extends PluginNames>(name: PluginName, fn: PluginFn): void;
export declare function registerComponent(name: ComponentNames, component: Component<any, any, any, any> | AsyncComponent<any, any, any, any>): void;
export declare function Quip(target: any): any;
export declare class NodeDefinition {
    type: any;
    parent: NodeDefinition;
    data: VNodeData;
    children: Array<NodeDefinition | string | SlotDefinition>;
    constructor(type: any, parent: NodeDefinition, ref: string);
}
export interface IScopedSlots {
    [key: string]: ScopedSlot;
}
export interface ISlots {
    [key: string]: VNode[];
}
export declare type SlotRenderFn = ($quip: IQuip<any>, scope: {
    [prop: string]: any;
}) => IQuip<any>;
export declare class SlotDefinition {
    parent: NodeDefinition;
    name: string;
    scope?: {
        [prop: string]: any;
    };
    constructor(parent: NodeDefinition, name: string, scope?: {
        [prop: string]: any;
    });
}
export declare function QuipFactory($createElement: CreateElement, $slots: ISlots, $scopedSlots: IScopedSlots): any;
export declare const QuipPlugin: {
    install(Vue: any): void;
};
