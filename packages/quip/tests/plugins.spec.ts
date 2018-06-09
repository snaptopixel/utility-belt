import { QuipPlugin, registerComponent } from '../src/index'
import { Vue, Prop, Component } from 'vue-property-decorator'
import { mount } from '@vue/test-utils'
import { SinonSpy } from 'sinon'

Vue.use(QuipPlugin)

declare module '../src/index' {
  interface IComponents {
    'child': {foo?: string, bar?: string}
  }
}

@Component
export class Child extends Vue {
  @Prop() foo: string
  @Prop() bar: string
  render () {
    const { div } = this.$quip
    return div()()
  }
}

registerComponent('child', Child)

@Component
class MyComponent extends Vue {
  public onClick: SinonSpy = sinon.spy()
  public onMouseOver: SinonSpy = sinon.spy()
  render () {
    const { div, li, text } = this.$quip
    return(
      div()
        .div('data')
          .data({
            domProps: {
              innerHTML: 'Look at that'
            }
          })
        ()
        .div('attr')
          .attr({
            id: 'defined'
          })
          .attr('contentEditable', 'true')
        ()
        .div('css')
          .css('hey', 'bud')
          .css({
            foo: true,
            bar: false
          })
        ()
        .div('style')
          .style('fontSize', '10px')
          .style('fontWeight', 'bold')
          .style({
            display: 'block',
            textAlign: 'center'
          })
        ()
        .button('on')
          .on('click', this.onClick)
          .on({
            mouseover: this.onMouseOver
          })
        ()
        .child('child')
          .prop('foo', 'wow')
          .prop({
            bar: 'wee'
          })
        ()
        .div('text')
          .text('Hello World')
        ()
        .ul('map')
          .map([1,2,3], num => {
            li()
              .text(`item ${num}`)
            ()
          })
        ()
        .div('switch')
          .switch('b')
            .case('a', () => text('div a'))
            .case('b', () => {
              text('div b')
              div('nested-switch')
                .switch('foo')
                  .case('bar', () => text('bar'))
                  .case('foo', () => text('foo'))
              ()
            })
            .case('b', () => {
              text('yeye')
            })
            .case('c', () => text('div c'))
            .default(value => {
              text(`default ${value}`)
            })
        ()
        .div('default-switch')
          .switch('x')
          .default(value => {
            text(`default ${value}`)
          })
        ()
        .if(true, () => {
          div('iftrue')()
        })
        .else(() => {
          div('iffalse')()
        })
        .if(() => false, () => {
          div('iftruefn')()
        })
        .else(() => {
          div('iffalsefn')()
        })
      ()
    )
  }
}

describe('quip plugin', () => {
  const w = mount(MyComponent)

  describe('css()', () => {
    it('can add classes by name or object', () => {
      expect(w.find({ ref: 'css' }).element)
          .class('hey')
          .class('bud')
          .class('foo')
          .not.class('bar')
    })
  })

  describe('style()', () => {
    it('can add styles by name or object', () => {
      expect(w.find({ ref: 'style' }).element)
          .attr('style')
            .contains('font-size: 10px')
            .contains('font-weight: bold')
            .contains('display: block')
            .contains('text-align: center')
    })
  })

  describe('on()', () => {
    it('can add listeners by name or object', () => {
      const on = w.find({ ref: 'on' })
      on.trigger('click')
      on.trigger('mouseover')
      expect(w.vm.onClick).called
      expect(w.vm.onMouseOver).called
    })
  })

  describe('prop()', () => {
    it('can set props by name or object', () => {
      const props = w.find({ ref: 'child' }).props()
      expect(props.foo).eq('wow')
      expect(props.bar).eq('wee')
    })
  })

  describe('text()', () => {
    it('sets node text', () => {
      expect(w.find({ ref: 'text' }).text()).eq('Hello World')
    })
  })

  describe('map()', () => {
    it('maps an array', () => {
      const ul = w.find({ ref: 'map' })
      expect(ul.text())
          .contains('item 1')
          .contains('item 2')
          .contains('item 3')
    })
  })

  describe('switch()', () => {
    const div = w.find({ ref: 'switch' })
    const divNested = w.find({ ref: 'nested-switch' })
    const divDefault = w.find({ ref: 'default-switch' })
    it('works with case()', () => {
      expect(div.text()).contains('div b')
    })
    it('works when nested', () => {
      expect(divNested.text()).eq('foo')
    })
    it('works with default()', () => {
      expect(divDefault.text()).contains('default x')
    })
  })

  describe('if()', () => {
    it('works with a boolean', () => {
      expect(w.find({ ref: 'iftrue' }).element).exist
      expect(w.find({ ref: 'iffalse' }).element).undefined
    })
    it('works with a function', () => {
      expect(w.find({ ref: 'iftruefn' }).element).undefined
      expect(w.find({ ref: 'iffalsefn' }).element).exist
    })
  })

  describe('attr()', () => {
    it('defines attributes on VNodeData', () => {
      const m = w.find({ ref: 'attr' })
      expect(m.element.getAttribute('id')).eq('defined')
      expect(m.element.getAttribute('contentEditable')).eq('true')
    })
  })

  describe('data()', () => {
    it('defines properties on VNodeData', () => {
      expect(w.find({ ref: 'data' }).text()).eq('Look at that')
    })
  })
})
