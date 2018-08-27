import Vue, { VNode, VNodeData, ComponentOptions, AsyncComponent, Component, CreateElement } from 'vue'
import { VueClass } from 'vue-class-component/lib/declarations'
import { ScopedSlot } from 'vue/types/vnode'

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
  attr (name: string, value: string | boolean): IQuip<T>
  attr (obj: {[attr: string]: string | boolean}): IQuip<T>
  text (value: string): IQuip<T>
  map<I> (items: I[], factory: (item: I) => void): IQuip<T>
  switch (value: any): IQuip<T>
  case (value: any, fn: () => void): IQuip<T>
  default (fn: (value: any) => void): IQuip<T>
  if (value: boolean | (() => boolean), fn: () => void): IQuip<T>
  else (fn: () => void): IQuip<T>
  data (data: VNodeData): IQuip<T>
  text (value: string): IQuip<T>
  html (value: string): IQuip<T>
  bindProp<P> (prop: keyof AllTagProps[T], target: P, value: keyof P, event?: string): IQuip<T>
  bindAttr<P> (attr: string, target: P, value: keyof P, event?: string): IQuip<T>
}

export type PluginFn = (def: NodeDefinition, ...args: any[]) => void

export enum HtmlTags {
  head, meta, link, title, base, body, nav, header, footer, main, aside, article, section, h1, h2, h3, h4, h5, h6, hr, ul, ol, li, dl, dt, dd, div, p, pre, blockquote, span, a, em, strong, b, i, u, s, mark, small, del, ins, sup, sub, dfn, code, var, samp, kbd, q, cite, ruby, rt, rp, br, wbr, bdo, bdi, table, caption, tr, td, th, thead, tfoot, tbody, colgroup, col, img, figure, figcaption, video, audio, source, track, iframe, canvas, abbr, address, meter, progress, time, form, button, input, textarea, select, option, optgroup, label, fieldset, legend, keygen, command, datalist, menu, output, details, summary, template
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

export interface IQuip<T extends AllTagNames> {
  createElement (nodeType: any, ref?: string): IQuip<any>
  slot (nameOrRenderFn: string | SlotRenderFn, renderFn?: SlotRenderFn): IQuip<any>
  insertSlot (name?: string, scope?: {[prop: string]: any}): IQuip<any>
}

export interface IQuip<T extends AllTagNames> extends TagFactory, IPlugins<T> {
  (ref?: string): IQuip<T>
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

export function Quip (target: any) {
  registerComponent(target.name as never, target)
  return target
}

const tags: HtmlTagNames[] = Object.keys(HtmlTags).filter(key => isNaN(key as any)) as HtmlTagNames[]

export class NodeDefinition {
  public data: VNodeData = {}
  public children: Array<NodeDefinition | string | SlotDefinition> = []
  constructor (
    public type: any,
    public parent: NodeDefinition,
    ref: string
  ) {
    if (ref) { this.data.ref = ref }
  }
}

export interface IScopedSlots {
  [key: string]: ScopedSlot
}

export interface ISlots {
  [key: string]: VNode[]
}

export type SlotRenderFn = ($quip: IQuip<any>, scope: {[prop: string]: any}) => IQuip<any>

export class SlotDefinition {
  constructor (
    public parent: NodeDefinition,
    public name: string,
    public scope?: {[prop: string]: any}
  ) {

  }
}

function err (message: string) {
  throw new Error(`[Quip Error] ${message}`)
}

export function QuipFactory ($createElement: CreateElement, $slots: ISlots, $scopedSlots: IScopedSlots) {
  const stack: NodeDefinition[] = []
  let activeDefinition: NodeDefinition

  function createNode (definition: NodeDefinition | string | SlotDefinition): VNode | string | VNode[] {
    if (definition instanceof NodeDefinition) {
      const children = definition.children.map(createNode)
      return $createElement(
        definition.type,
        definition.data,
        children
      )
    } else if (definition instanceof SlotDefinition) {
      if ($scopedSlots && $scopedSlots[definition.name]) {
        const renderFn = $scopedSlots[definition.name] as any
        return renderFn.__quip__
          ? renderFn(q, definition.scope)
          : renderFn(definition.scope)
      } else if ($slots && $slots[definition.name]) {
        return $slots[definition.name]
      } else {
        err(`Slot not found! The slot "${definition.name}" was referenced but has not been defined`)
      }
    } else {
      return definition
    }
  }

  function open (type: any, ref?: string) {
    const parent = activeDefinition
    activeDefinition = new NodeDefinition(type, parent, ref)
    stack.push(activeDefinition)
    if (parent) {
      parent.children.push(activeDefinition)
    }
    return close
  }

  function close () {
    const cur = stack.pop()
    activeDefinition = stack[stack.length - 1]
    return cur.parent
      ? close
      : createNode(cur)
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
      Plugins[name as PluginNames](activeDefinition, ...args)
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

  q.slot = (name: string | SlotRenderFn, renderFn: SlotRenderFn) => {
    if (typeof name !== 'string') {
      renderFn = name
      name = 'default'
    } else if (!renderFn) {
      err('No render function provided! You must pass a render function when defining a slot')
    }
    (renderFn as any).__quip__ = true
    const { data } = activeDefinition
    data.scopedSlots = data.scopedSlots || {}
    data.scopedSlots[name] = renderFn as any
    return q
  }

  q.insertSlot = (name = 'default', scope?: {[prop: string]: any}) => {
    const parent = activeDefinition
    parent.children.push(new SlotDefinition(parent, name, scope))
    return q
  }

  return q
}

export const QuipPlugin = {
  install (Vue: any) {
    if ('$quip' in Vue.prototype === false) {
      Object.defineProperty(Vue.prototype, '$quip', {
        get () {
          return this.__quip__ = this.__quip__ || QuipFactory(this.$createElement, this.$slots, this.$scopedSlots)
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
    data.style[params[0]] = params[1]
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

registerPlugin('map', (_def, items: any[], fn: (item: any) => void) => {
  items.map(fn)
})

let switchValue: any
let switchActive: boolean

registerPlugin('switch', (_def, value: any) => {
  switchValue = value
  switchActive = true
  return () => {
    switchActive = false
  }
})

registerPlugin('case', (_def, value: any, fn: () => void) => {
  if (switchActive && switchValue === value) {
    fn()
    switchActive = false
  }
})

registerPlugin('default', (_def, fn: (value: any) => void) => {
  if (switchActive) {
    fn(switchValue)
    switchActive = false
  }
})

let doElse: boolean

registerPlugin('if', (_def, value: boolean | (() => boolean), fn: () => void) => {
  if (typeof value === 'function') {
    value = value()
  }
  doElse = !value
  if (value) {
    fn()
  }
})

registerPlugin('else', (_def, fn: () => void) => {
  if (doElse) { fn() }
})

registerPlugin('attr', (def, ...params: any[]) => {
  def.data.attrs = def.data.attrs || {}
  if (typeof params[0] === 'object') {
    for (const attr of Object.keys(params[0])) {
      def.data.attrs[attr] = params[0][attr]
    }
  } else if (typeof params[0] === 'string') {
    def.data.attrs[params[0]] = params[1]
  }
})

registerPlugin('data', ({ data }, customData: VNodeData) => {
  Object.keys(customData).forEach((key: keyof VNodeData) => {
    data[key] = customData[key]
  })
})

registerPlugin('text', (def, value: string) => {
  def.children.push(value)
})

registerPlugin('html', (def, value: string) => {
  def.data.domProps = def.data.domProps || {}
  def.data.domProps.innerHTML = value
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
