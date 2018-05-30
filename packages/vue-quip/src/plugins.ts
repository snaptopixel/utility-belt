import { VNode } from 'vue'
import { IQuipApi } from './index'

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
  }
}

export default function install(Quip: IQuipApi) {
  Quip.registerPlugin('css', (def, ...params: any[]) => {
    def.class = def.class || {}
    if (typeof params[0] === 'object') {
      def.class = {...def.class, ...params[0]}
    } else if(typeof params[0] === 'string') {
      def.class = {
        ...def.class,
        ...params.reduce((obj, className) => {
        obj[className] = true
        return obj
      }, {})
      }
    }
  })
  
  Quip.registerPlugin('style', (def, ...params: any[]) => {
    def.style = def.style || {}
    if (typeof params[0] === 'object') {
      def.style = {...def.style, ...params[0]}
    } else if(typeof params[0] === 'string') {
      def.style[params[0]] = params[1]
    }
  })
  
  Quip.registerPlugin('on', (def, ...params: any[]) => {
    def.on = def.on || {}
    if (typeof params[0] === 'object') {
      def.on = {...def.on, ...params[0]}
    } else if(typeof params[0] === 'string') {
      def.on[params[0]] = params[1]
    }
  })
  
  Quip.registerPlugin('prop', (def, ...params: any[]) => {
    def.props = def.props || {}
    if (typeof params[0] === 'object') {
      def.props = {...def.props, ...params[0]}
    } else if(typeof params[0] === 'string') {
      def.props[params[0]] = params[1]
    }
  })
  
  Quip.registerPlugin('text', (def, value: string) => {
    return (vnode, createElement) => {
      vnode.children.push(createElement('span', null, [value]))
    }
  })
  
  Quip.registerPlugin('map', (def, items: any[], fn: (item: any) => void) => {
    items.map(fn)
  })
  
  let switchValue: any
  let switchActive: boolean
  
  Quip.registerPlugin('switch', (def, value: any) => {
    switchValue = value
    switchActive = true
    return () => {
      switchActive = false
    }
  })
  
  Quip.registerPlugin('case', (def, value: any, fn: () => void) => {
    if (!switchActive) {
      throw new Error('case() must follow switch()')
    }
    if(switchValue === value) {
      fn();
    }
  })
  
  Quip.registerPlugin('default', (def, fn: (value: any) => void) => {
    if (!switchActive) {
      throw new Error('default() must follow switch()')
    }
    fn(switchValue);
  })
  
  let doElse: boolean
  
  Quip.registerPlugin('if', (def, value: boolean | (() => boolean), fn: () => void) => {
    if (typeof value === 'function') {
      value = value()
    }
    doElse = !value
    if (value) {
      fn()
    }
  })
  
  Quip.registerPlugin('else', (def, fn: () => void) => {
    if (doElse) { fn() }
  })  
}
