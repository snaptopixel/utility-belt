import Vue, { CreateElement, VNode, VNodeData, VueConstructor, ComponentOptions } from 'vue'
import { VueClass } from 'vue-class-component/lib/declarations'

export interface IComponents {
  // Populated via declaration merging
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
  text (value: string): IQuip<T>
  map<I> (items: I[], factory: (item: I) => void): IQuip<T>
  callback (fn: (node: VNode) => void): IQuip<T>
  switch (value: any): IQuip<T>
  case (value: any, fn: () => void): IQuip<T>
  default (fn: (value: any) => void): IQuip<T>
  if (value: boolean | (() => boolean), fn: () => void): IQuip<T>
  else (fn: () => void): IQuip<T>
  attr (name: string, value: string): IQuip<T>
  attr (obj: {[attr: string]: string}): IQuip<T>
  data (data: VNodeData): IQuip<T>
  bind <P> (target: P, value: keyof P, prop: keyof AllTagProps[T], event?: string): IQuip<T>
}

export type PluginFn = (...args: any[]) => PluginCallback | void

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

export interface IQuip<T extends AllTagNames> extends TagFactory, IPlugins<T> {
  (ref?: string): IQuip<T>
}

declare module 'vue/types/vue' {
  interface Vue {
    $quip: IQuip<any>
  }
}

export type PluginTypes = IPlugins<any>
export type PluginNames = keyof PluginTypes
export type PluginCallback = (node: VNode, createElement: CreateElement) => void
export type ComponentNames = keyof IComponents

let Components: {[name in ComponentNames]?: VueClass<Vue> | ComponentOptions<Vue>} = {}
let Plugins: {[name in PluginNames]?: PluginFn} = {}

export function registerPlugin<PluginName extends PluginNames> (name: PluginName, fn: PluginFn) {
  Plugins[name] = fn
}

export function registerComponent (name: ComponentNames, component: VueClass<Vue> | ComponentOptions<Vue>) {
  (Components as any)[name] = component
}

const tags: HtmlTagNames[] = Object.keys(HtmlTags).filter(key => isNaN(key as any)) as HtmlTagNames[]

export default function QuipFactory ($createElement: CreateElement) {
  let nodeTree: VNode[] = []
  let node: VNode
  let nodeType: string | VueConstructor<Vue>
  let nodeDefinition: VNodeData
  let nodeCallbacks: PluginCallback[] = []

  function reset (src?: any) {
    nodeType = src
    nodeDefinition = {
      style: {},
      on: {},
      props: {},
      attrs: {}
    }
    nodeCallbacks.length = 0
  }

  reset()

  const q: any = () => {
    close()
    const node = nodeTree.pop()
    nodeDefinition = nodeTree[nodeTree.length - 1]
    return nodeTree.length === 0 ? node : q
  }

  tags.forEach(tag => {
    q[tag] = (ref?: string) => {
      open(tag, ref)
      return q
    }
  })

  for (const name of Object.keys(Plugins)) {
    q[name] = (...args: any[]) => {
      const callback = Plugins[name as PluginNames](nodeDefinition, ...args)
      if (callback) {
        nodeCallbacks.push(callback)
      }
      return q
    }
  }

  for (const name of Object.keys(Components)) {
    q[name] = (ref?: string) => {
      open(Components[name as ComponentNames], ref)
      return q
    }
  }

  function open (src: any, ref?: string) {
    close()
    reset(src)
    nodeDefinition.ref = ref
    return q
  }

  function close () {
    if (nodeType) {
      node = $createElement(nodeType, nodeDefinition, [])
      const parent = nodeTree[nodeTree.length - 1]
      if (parent) {
        nodeTree.push(node)
        parent.children.push(node)
      } else {
        nodeTree = [node]
      }
      nodeType = null
    }
    for (let callback of nodeCallbacks) {
      callback(node, $createElement)
    }
    nodeCallbacks.length = 0
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

registerPlugin('css', (def: VNodeData, ...params: any[]) => {
  def.class = def.class || {}
  if (typeof params[0] === 'object') {
    def.class = { ...def.class, ...params[0] }
  } else if (typeof params[0] === 'string') {
    def.class = {
      ...def.class,
      ...params.reduce((obj, className) => {
        obj[className] = true
        return obj
      }, {})
    }
  }
})

registerPlugin('style', (def: VNodeData, ...params: any[]) => {
  if (typeof params[0] === 'object') {
    def.style = { ...def.style, ...params[0] }
  } else if (typeof params[0] === 'string') {
    (def.style as any)[params[0]] = params[1]
  }
})

registerPlugin('on', (def: VNodeData, ...params: any[]) => {
  if (typeof params[0] === 'object') {
    def.on = { ...def.on, ...params[0] }
  } else if (typeof params[0] === 'string') {
    def.on[params[0]] = params[1]
  }
})

registerPlugin('prop', (def: VNodeData, ...params: any[]) => {
  if (typeof params[0] === 'object') {
    def.props = { ...def.props, ...params[0] }
  } else if (typeof params[0] === 'string') {
    def.props[params[0]] = params[1]
  }
})

registerPlugin('text', (def: VNodeData, value: string) => {
  return (vnode, createElement) => {
    vnode.children.push(createElement('i', value).children[0])
  }
})

registerPlugin('map', (def: VNodeData, items: any[], fn: (item: any) => void) => {
  items.map(fn)
})

let switchValue: any
let switchActive: boolean

registerPlugin('switch', (def: VNodeData, value: any) => {
  switchValue = value
  switchActive = true
  return () => {
    switchActive = false
  }
})

registerPlugin('case', (def: VNodeData, value: any, fn: () => void) => {
  if (switchActive && switchValue === value) {
    fn()
    switchActive = false
  }
})

registerPlugin('default', (def: VNodeData, fn: (value: any) => void) => {
  if (switchActive) {
    fn(switchValue)
    switchActive = false
  }
})

let doElse: boolean

registerPlugin('if', (def: VNodeData, value: boolean | (() => boolean), fn: () => void) => {
  if (typeof value === 'function') {
    value = value()
  }
  doElse = !value
  if (value) {
    fn()
  }
})

registerPlugin('else', (def: VNodeData, fn: () => void) => {
  if (doElse) { fn() }
})

registerPlugin('attr', (def: VNodeData, ...params: any[]) => {
  if (typeof params[0] === 'object') {
    def.attrs = { ...def.attrs, ...params[0] }
  } else if (typeof params[0] === 'string') {
    def.attrs[params[0]] = params[1]
  }
})

registerPlugin('data', (def: VNodeData, data: VNodeData) => {
  Object.keys(data).forEach((key: keyof VNodeData) => {
    def[key] = data[key]
  })
})

registerPlugin('bind', (def: VNodeData, target: any, value: string, prop: string, event: string = 'input') => {
  def.props[prop] = target[value]
  def.on[event] = (newValue: any) => target[value] = newValue
})
