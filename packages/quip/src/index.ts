import Vue, { CreateElement, VNode, VNodeData, ComponentOptions, AsyncComponent, Component } from 'vue'
import { VueClass } from 'vue-class-component/lib/declarations'

export interface IComponents {
  // Declared elsewhere
}

export interface IPlugins<T extends AllTagNames> {
  css (obj: any): IQuip<T>
  css (...classes: string[]): IQuip<T>
  style (name: keyof CSSStyleDeclaration, value: string): IQuip<T>
  style (declaration: Partial<CSSStyleDeclaration>): IQuip<T>
  on (event: string, callback: (...params: any[]) => void): IQuip<T>
  on (events: {[event: string]: (...params: any[]) => void}): IQuip<T>
  prop<K extends keyof AllTagProps[T]> (name: K, value: AllTagProps[T][K]): IQuip<T>
  prop (props: AllPropTypes<T>): IQuip<T>
  attr (name: string, value: string): IQuip<T>
  attr (obj: {[attr: string]: string}): IQuip<T>
  text (value: string): IQuip<T>
  map<I> (items: I[], factory: (item: I) => void): IQuip<T>
  switch (value: any): IQuip<T>
  case (value: any, fn: () => void): IQuip<T>
  default (fn: (value: any) => void): IQuip<T>
  if (value: boolean | (() => boolean), fn: () => void): IQuip<T>
  else (fn: () => void): IQuip<T>
  data (data: VNodeData): IQuip<T>
  text (textContent: string): IQuip<T>
  bindProp<P> (prop: keyof AllTagProps[T], target: P, value: keyof P, event?: string): IQuip<T>
  bindAttr<P> (attr: string, target: P, value: keyof P, event?: string): IQuip<T>
}

export type PluginFn = (def: NodeDefinition, ...args: any[]) => void

export enum HtmlTags {
  html, head, meta, link, title, base, body, nav, header, footer, main, aside, article, section, h1, h2, h3, h4, h5, h6, hr, ul, ol, li, dl, dt, dd, div, p, pre, blockquote, span, a, em, strong, b, i, u, s, mark, small, del, ins, sup, sub, dfn, code, var, samp, kbd, q, cite, ruby, rt, rp, br, wbr, bdo, bdi, table, caption, tr, td, th, thead, tfoot, tbody, colgroup, col, img, figure, figcaption, video, audio, source, track, iframe, canvas, abbr, address, meter, progress, time, form, button, input, textarea, select, option, optgroup, label, fieldset, legend, keygen, command, datalist, menu, output, details, summary
}

export type HtmlTagNames = keyof typeof HtmlTags

export type HtmlTagProps = {
  [k in HtmlTagNames]: void;
}

export type AllTagProps = HtmlTagProps & IComponents
export type AllTagNames = keyof AllTagProps
export type AllPropTypes<T extends AllTagNames> = AllTagProps[T]

export type TagFactory = {
  [TagName in AllTagNames]: IQuip<TagName>
}

export interface ICreateable {
  createElement (nodeType: any, textContent?: string): IQuip<any>
}

export interface IQuip<T extends AllTagNames> extends TagFactory, IPlugins<T>, ICreateable {
  (textContent?: string): IQuip<T>
}

declare module 'vue/types/vue' {
  interface Vue {
    readonly $quip: IQuip<any>
  }
}

export type PluginTypes = IPlugins<any>
export type PluginNames = keyof PluginTypes
export type ComponentNames = keyof IComponents

let Components: {[name in ComponentNames]?: VueClass<Vue> | ComponentOptions<Vue>} = {}
let Plugins: {[name in PluginNames]?: PluginFn} = {}

export function registerPlugin<PluginName extends PluginNames> (name: PluginName, fn: PluginFn) {
  Plugins[name] = fn
}

export function registerComponent (name: ComponentNames, component: Component<any, any, any, any> | AsyncComponent<any, any, any, any>) {
  (Components as any)[name] = component
}

const tags: HtmlTagNames[] = Object.keys(HtmlTags).filter(key => isNaN(key as any)) as HtmlTagNames[]

export class NodeDefinition {
  public data: VNodeData = {}
  public children: Array<NodeDefinition | string> = []
  constructor (
    public type: any,
    ref: string
  ) {
    if (ref) { this.data.ref = ref }
  }
}

export default function QuipFactory ($createElement: CreateElement) {
  const stack: NodeDefinition[] = []

  function createNode (definition: NodeDefinition | string): VNode | string {
    if (typeof definition === 'string') {
      return definition
    } else {
      const children = definition.children.map(createNode)
      return $createElement(
        definition.type,
        definition.data,
        children
      )
    }
  }

  function open (type: any, ref?: string) {
    const item = new NodeDefinition(type, ref)
    const parent = stack[stack.length - 1]
    stack.push(item)
    if (parent) {
      parent.children.push(item)
    }
    return close
  }

  function close () {
    const cur = stack.pop()
    return stack.length === 0
      ? createNode(cur)
      : close
  }

  const q: any = close

  tags.forEach(tag => {
    q[tag] = (ref?: string) => {
      open(tag, ref)
      return q
    }
  })

  for (const name of Object.keys(Plugins)) {
    q[name] = (...args: any[]) => {
      Plugins[name as PluginNames](stack[stack.length - 1], ...args)
      return q
    }
  }

  for (const name of Object.keys(Components)) {
    q[name] = (ref?: string) => {
      open(Components[name as ComponentNames], ref)
      return q
    }
  }

  q.createElement = (nodeType: any, ref?: string) => {
    open(nodeType, ref)
    return q
  }

  return q
}

export const QuipPlugin = {
  install (Vue: any) {
    if ('$quip' in Vue.prototype === false) {
      Object.defineProperty(Vue.prototype, '$quip', {
        get () {
          return this.__quip__ = this.__quip__ || QuipFactory(this.$createElement)
        }
      })
    }
  }
}

registerPlugin('css', ({ data }, ...params: any[]) => {
  data.class = data.class || {}
  if (typeof params[0] === 'object') {
    data.class = { ...data.class, ...params[0] }
  } else if (typeof params[0] === 'string') {
    data.class = {
      ...data.class,
      ...params.reduce((obj, className) => {
        obj[className] = true
        return obj
      }, {})
    }
  }
})

registerPlugin('style', ({ data }, ...params: any[]) => {
  data.style = data.style || {}
  if (typeof params[0] === 'object') {
    data.style = { ...data.style, ...params[0] }
  } else if (typeof params[0] === 'string') {
    (data.style as any)[params[0]] = params[1]
  }
})

registerPlugin('on', ({ data }, ...params: any[]) => {
  data.on = data.on || {}
  if (typeof params[0] === 'object') {
    data.on = { ...data.on, ...params[0] }
  } else if (typeof params[0] === 'string') {
    data.on[params[0]] = params[1]
  }
})

registerPlugin('prop', ({ data }, ...params: any[]) => {
  data.props = data.props || {}
  if (typeof params[0] === 'object') {
    data.props = { ...data.props, ...params[0] }
  } else if (typeof params[0] === 'string') {
    data.props[params[0]] = params[1]
  }
})

registerPlugin('map', ({ data }, items: any[], fn: (item: any) => void) => {
  items.map(fn)
})

let switchValue: any
let switchActive: boolean

registerPlugin('switch', ({ data }, value: any) => {
  switchValue = value
  switchActive = true
  return () => {
    switchActive = false
  }
})

registerPlugin('case', ({ data }, value: any, fn: () => void) => {
  if (switchActive && switchValue === value) {
    fn()
    switchActive = false
  }
})

registerPlugin('default', ({ data }, fn: (value: any) => void) => {
  if (switchActive) {
    fn(switchValue)
    switchActive = false
  }
})

let doElse: boolean

registerPlugin('if', ({ data }, value: boolean | (() => boolean), fn: () => void) => {
  if (typeof value === 'function') {
    value = value()
  }
  doElse = !value
  if (value) {
    fn()
  }
})

registerPlugin('else', ({ data }, fn: () => void) => {
  if (doElse) { fn() }
})

registerPlugin('attr', ({ data }, ...params: any[]) => {
  data.attrs = data.attrs || {}
  if (typeof params[0] === 'object') {
    data.attrs = { ...data.attrs, ...params[0] }
  } else if (typeof params[0] === 'string') {
    data.attrs[params[0]] = params[1]
  }
})

registerPlugin('data', ({ data }, customData: VNodeData) => {
  Object.keys(customData).forEach((key: keyof VNodeData) => {
    data[key] = customData[key]
  })
})

registerPlugin('text', (def, textContent: string) => {
  def.children.push(textContent)
})

registerPlugin('bindProp', ({ data }, prop: string, target: any, value: string, event: string = 'input') => {
  data.props = data.props || {}
  data.on = data.on || {}
  data.props[prop] = target[value]
  data.on[event] = (newValue: any) => target[value] = newValue
})

registerPlugin('bindAttr', ({ data }, attr: string, target: any, value: string, event: string = 'input') => {
  data.attrs = data.attrs || {}
  data.on = data.on || {}
  data.attrs[attr] = target[value]
  data.on[event] = (event: UIEvent) => target[value] = (event.target as any)[attr]
})
