import { CreateElement, VNode, VNodeData, AsyncComponent, Component } from 'vue';
export interface IComponents {
    h: {
        el: string | Component<any, any, any, any> | AsyncComponent<any, any, any, any> | (() => Component);
        data: VNodeData;
    };
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
    attr(name: string, value: string): IQuip<T>;
    attr(obj: {
        [attr: string]: string;
    }): IQuip<T>;
    text(value: string): IQuip<T>;
    map<I>(items: I[], factory: (item: I) => void): IQuip<T>;
    switch(value: any): IQuip<T>;
    case(value: any, fn: () => void): IQuip<T>;
    default(fn: (value: any) => void): IQuip<T>;
    if(value: boolean | (() => boolean), fn: () => void): IQuip<T>;
    else(fn: () => void): IQuip<T>;
    data(data: VNodeData): IQuip<T>;
    bindProp<P>(target: P, value: keyof P, prop: keyof AllTagProps[T], event?: string): IQuip<T>;
    bindAttr<P>(target: P, value: keyof P, attr: string, event?: string): IQuip<T>;
}
export declare type PluginFn = (...args: any[]) => PluginCallback | void;
export declare enum HtmlTags {
    html = 0,
    head = 1,
    meta = 2,
    link = 3,
    title = 4,
    base = 5,
    body = 6,
    nav = 7,
    header = 8,
    footer = 9,
    main = 10,
    aside = 11,
    article = 12,
    section = 13,
    h1 = 14,
    h2 = 15,
    h3 = 16,
    h4 = 17,
    h5 = 18,
    h6 = 19,
    hr = 20,
    ul = 21,
    ol = 22,
    li = 23,
    dl = 24,
    dt = 25,
    dd = 26,
    div = 27,
    p = 28,
    pre = 29,
    blockquote = 30,
    span = 31,
    a = 32,
    em = 33,
    strong = 34,
    b = 35,
    i = 36,
    u = 37,
    s = 38,
    mark = 39,
    small = 40,
    del = 41,
    ins = 42,
    sup = 43,
    sub = 44,
    dfn = 45,
    code = 46,
    var = 47,
    samp = 48,
    kbd = 49,
    q = 50,
    cite = 51,
    ruby = 52,
    rt = 53,
    rp = 54,
    br = 55,
    wbr = 56,
    bdo = 57,
    bdi = 58,
    table = 59,
    caption = 60,
    tr = 61,
    td = 62,
    th = 63,
    thead = 64,
    tfoot = 65,
    tbody = 66,
    colgroup = 67,
    col = 68,
    img = 69,
    figure = 70,
    figcaption = 71,
    video = 72,
    audio = 73,
    source = 74,
    track = 75,
    iframe = 76,
    canvas = 77,
    abbr = 78,
    address = 79,
    meter = 80,
    progress = 81,
    time = 82,
    form = 83,
    button = 84,
    input = 85,
    textarea = 86,
    select = 87,
    option = 88,
    optgroup = 89,
    label = 90,
    fieldset = 91,
    legend = 92,
    keygen = 93,
    command = 94,
    datalist = 95,
    menu = 96,
    output = 97,
    details = 98,
    summary = 99,
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
export declare type PluginCallback = (node: VNode, createElement: CreateElement) => void;
export declare type ComponentNames = keyof IComponents;
export declare function registerPlugin<PluginName extends PluginNames>(name: PluginName, fn: PluginFn): void;
export declare function registerComponent(name: ComponentNames, component: Component<any, any, any, any> | AsyncComponent<any, any, any, any>): void;
export default function QuipFactory($createElement: CreateElement): any;
export declare const QuipPlugin: {
    install(Vue: any): void;
};
