import { VNode, VNodeData } from 'vue'
import { registerPlugin } from './index'

declare module './index' {
  export interface IPlugins<T> {
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
  }
}

export default function install () {
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
    def.style = def.style || {}
    if (typeof params[0] === 'object') {
      def.style = { ...def.style, ...params[0] }
    } else if (typeof params[0] === 'string') {
      (def.style as any)[params[0]] = params[1]
    }
  })

  registerPlugin('on', (def: VNodeData, ...params: any[]) => {
    def.on = def.on || {}
    if (typeof params[0] === 'object') {
      def.on = { ...def.on, ...params[0] }
    } else if (typeof params[0] === 'string') {
      def.on[params[0]] = params[1]
    }
  })

  registerPlugin('prop', (def: VNodeData, ...params: any[]) => {
    def.props = def.props || {}
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
    def.attrs = def.attrs || {}
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
}
