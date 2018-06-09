import { IQuip } from './index'
import installPlugins from './plugins'
import Vue, { CreateElement, VNode, VNodeData, VueConstructor, ComponentOptions } from 'vue'
import { VueClass } from 'vue-class-component/lib/declarations'

export interface IComponents {
  // Populated via declaration merging
}

export interface IPlugins<T extends AllTagNames> {
  // Populated via declaration merging
}

type PluginFn = (...args: any[]) => PluginCallback | void

enum HtmlTags {
  html, head, meta, link, title, base, body, nav, header, footer, main, aside, article, section, h1, h2, h3, h4, h5, h6, hr, ul, ol, li, dl, dt, dd, div, p, pre, blockquote, span, a, em, strong, b, i, u, s, mark, small, del, ins, sup, sub, dfn, code, var, samp, kbd, q, cite, ruby, rt, rp, br, wbr, bdo, bdi, table, caption, tr, td, th, thead, tfoot, tbody, colgroup, col, img, figure, figcaption, video, audio, source, track, iframe, canvas, abbr, address, meter, progress, time, form, button, input, textarea, select, option, optgroup, label, fieldset, legend, keygen, command, datalist, menu, output, details, summary
}

type HtmlTagNames = keyof typeof HtmlTags

type HtmlTagProps = {
  [k in HtmlTagNames]: void;
}

export type AllTagProps = HtmlTagProps & IComponents
export type AllTagNames = keyof AllTagProps
export type AllPropTypes<T extends AllTagNames> = AllTagProps[T]

type TagFactory = {
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

type PluginTypes = IPlugins<any>
type PluginNames = keyof PluginTypes
type PluginCallback = (node: VNode, createElement: CreateElement) => void
type ComponentNames = keyof IComponents

let Components: {[name in ComponentNames]?: VueClass<Vue> | ComponentOptions<Vue>} = {}
let Plugins: {[name in PluginNames]?: PluginFn} = {}

export function registerPlugin<PluginName extends PluginNames> (name: PluginName, fn: PluginFn) {
  Plugins[name] = fn
}

export function registerComponent<ComponentName extends keyof IComponents> (name: ComponentName, component: VueClass<Vue> | ComponentOptions<Vue>) {
  Components[name] = component
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
    nodeDefinition = {}
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

installPlugins()
