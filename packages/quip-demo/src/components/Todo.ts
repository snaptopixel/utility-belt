import { Vue, Component, Prop } from 'vue-property-decorator'
import { Quip } from '@snaptopixel/quip'
import { style, stylesheet, keyframes } from 'typestyle'
import * as checkmark from '@/assets/check.svg'

declare module '@snaptopixel/quip' {
  interface IComponents {
    Todo: Pick<Todo, 'done' | 'label'>
  }
}

const checkInAnimation = keyframes({
  to: { strokeDashoffset: 0 }
})
const checkOutAnimation = keyframes({
  from: { strokeDashoffset: 0 }
})

const labelStyle = style({
  fontSize: 20,
  color: '#666',
  $nest: {
    '.checkbox': {
      position: 'relative',
      display: 'inline-block',
      width: 24,
      height: 24,
      border: '1px solid rgba(255, 255, 255, 0.5)',
      boxShadow: '0 0 0 1px rgba(0, 0, 0, 0.1), 0 2px 0 0 rgba(0, 0, 0, 0.1)',
      background: 'linear-gradient(to bottom, #eee, white 70%)',
      borderRadius: 3,
      transition: 'box-shadow 200ms',
      marginRight: 10,
      verticalAlign: 'text-bottom',
      $nest: {
        'svg': {
          width: 18,
          height: 18,
          position: 'absolute',
          top: 2,
          left: 2,
          strokeDasharray: 30,
          strokeDashoffset: 30,
          animation: `${checkOutAnimation} 100ms linear forwards`,
          filter: 'drop-shadow( 2px 1px 0 rgba(0,0,0,0.1) )',
          $nest: {
            'path': {
              stroke: 'currentColor'
            }
          }
        },
        'input:focus + &': {
          boxShadow: '0 0 0 3px rgba(59, 153, 252, 0.5)'
        },
        'input:checked + & > svg': {
          display: 'block',
          animation: `${checkInAnimation} 100ms linear forwards`
        }
      }
    }
  }
})

let uid = new Date().getTime()

@Quip @Component
export default class Todo extends Vue {
  @Prop() public done!: boolean
  @Prop() public label!: string

  private id = `checkbox-${uid++}`

  mounted () {
    console.log('mouttasdadsat', this.label)
  }

  updated () {
    console.log('updatezzasdasfa')
  }

  private render () {
    const { div } = this.$quip
    return (
      div()
        .input('checkbox')
          .style({ opacity: '0', position: 'absolute' })
          .attr({ id: this.id, type: 'checkbox', checked: this.done })
          .on({ change: this.onCheckboxChange })
        ()
        .label()
          .css(labelStyle)
          .attr({ for: this.id })
          .span()
            .css('checkbox')
            .html(checkmark)
          ()
          .text(this.label)
        ()
      ()
    )
  }

  private onCheckboxChange () {
    const c = this.$refs.checkbox as HTMLInputElement
    this.$emit('change', c.checked)
  }
}

// assuming Webpack's HMR API.
// https://webpack.js.org/guides/hot-module-replacement/
if (module.hot) {
  const api = require('vue-hot-reload-api')
  const Vue = require('vue')

  // make the API aware of the Vue that you are using.
  // also checks compatibility.
  api.install(Vue)

  // compatibility can be checked via api.compatible after installation
  if (!api.compatible) {
    throw new Error('vue-hot-reload-api is not compatible with the version of Vue you are using.')
  }

  // indicate this module can be hot-reloaded
  module.hot.accept()

  if (!module.hot.data) {
    // for each component option object to be hot-reloaded,
    // you need to create a record for it with a unique id.
    // do this once on startup.
    api.createRecord('very-unique-id', Todo)
  } else {
    // if a component has only its template or render function changed,
    // you can force a re-render for all its active instances without
    // destroying/re-creating them. This keeps all current app state intact.
    api.rerender('very-unique-id', Todo)

    // --- OR ---

    // if a component has non-template/render options changed,
    // it needs to be fully reloaded. This will destroy and re-create all its
    // active instances (and their children).
    api.reload('very-unique-id', Todo)
  }
}
