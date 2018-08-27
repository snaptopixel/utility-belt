import { Quip, QuipPlugin, QuipFactory, registerComponent, IQuip } from '../src/index'
import { Vue, Component } from 'vue-property-decorator'
import { mount } from '@vue/test-utils'

Vue.use(QuipPlugin)

declare module '../src/index' {
  interface IComponents {
    custom: void,
    SlotRenderer: void
  }
}

registerComponent('custom', {
  render () {
    const { i } = this.$quip
    return i()()
  }
})

@Quip @Component
export class SlotRenderer extends Vue {
  render () {
    const { div } = this.$quip
    return (
      div()
        .span('scopedSlot')
          .insertSlot('scoped', {
            message: 'Hello Slot'
          })
        ()
        .span('defaultSlot')
          .insertSlot()
        ()
        .span('namedSlot')
          .insertSlot('named')
        ()
      ()
    )
  }
}

@Component
class QuipRenderer extends Vue {
  render () {
    const { main } = this.$quip
    return(
      main('main-el')
        .header('header-el')
          .nav('nav-el')
            .ul('ul-el')
              .li('li1-el')()
              .li('li2-el')()
              .li('li3-el')()
            ()
          ()
        ()
      ()
    )
  }
}

@Component
class ExtraRenderer extends Vue {
  render () {
    const { div } = this.$quip
    return (
      div()
        .createElement('a', 'createEl')
          .text('Hello There')
          .attr('href', '#')
          .style('fontWeight', 'bold')
        ()
        .createElement({
          render () {
            const { h4 } = this.$quip as IQuip<any>
            return h4().text('Much custom')()
          }
        }, 'customEl')
          .text('Custom Stuff')
        ()
        .SlotRenderer('SlotRenderer')
          .slot(({ ul }) => {
            return ul()
              .li()
                .text('Default Slot')
              ()
            ()
          })
          .slot('scoped', ({ h1 }, { message }) => {
            return(
              h1()
                .text(`Slot Message: ${message}`)
              ()
            )
          })
          .slot('named', ({ h3 }) => {
            return h3()
              .text('Named Slot')
            ()
          })
        ()
      ()
    )
  }
}

describe('quip', () => {

  describe('basics', () => {
    const w = mount(QuipRenderer)

    it('creates properly structured dom', () => {
      const expectedDom = `
        <main>
          <header>
            <nav>
              <ul>
                <li></li>
                <li></li>
                <li></li>
              </ul>
            </nav>
          </header>
        </main>
      `.replace(/\s{2,}/g, '')
      expect(w.html()).to.eq(expectedDom)
    })

    it('exposes elements via "ref" property', () => {
      const getElement = (ref: string) => {
        return w.vm.$refs[ref] as Element
      }
      expect(getElement('main-el').nodeName).eq('MAIN')
      expect(getElement('header-el').nodeName).eq('HEADER')
      expect(getElement('nav-el').nodeName).eq('NAV')
      expect(getElement('ul-el').nodeName).eq('UL')
      expect(getElement('li1-el').nodeName).eq('LI')
      expect(getElement('li2-el').nodeName).eq('LI')
      expect(getElement('li3-el').nodeName).eq('LI')
    })

    it('works with functional components', () => {
      const w = mount({
        functional: true,
        render (h, { slots, data }) {
          const { div } = QuipFactory(h, slots(), data.scopedSlots)
          return div()()
        }
      })
      expect(w.html()).eq('<div></div>')
    })

    it('works with custom components', () => {
      const w = mount({
        render (h, context) {
          const { custom } = this.$quip
          return custom()()
        }
      })
      expect(w.html()).eq('<i></i>')
    })
  })

  describe('extras', () => {
    const w = mount(ExtraRenderer)
    const parent = w.find({ ref: 'SlotRenderer' })

    it('can create arbitrary vnodes via createElement()', () => {
      expect(w.find({ ref: 'createEl' }).html()).eq('<a href="#" style="font-weight: bold;">Hello There</a>')
      expect(w.find({ ref: 'customEl' }).html()).eq('<h4>Much custom</h4>')
    })

    it('can render default slot(s)', () => {
      const defaultSlot = parent.find({ ref: 'defaultSlot' })
      expect(defaultSlot.exists()).true
      expect(defaultSlot.text()).eq('Default Slot')
    })

    it('can render named slot(s)', () => {
      const namedSlot = parent.find({ ref: 'namedSlot' })
      expect(namedSlot.exists()).true
      expect(namedSlot.text()).eq('Named Slot')
    })

    it('can render scoped slot(s)', () => {
      const scopedSlot = parent.find({ ref: 'scopedSlot' })
      expect(scopedSlot.exists()).true
      expect(scopedSlot.text()).eq('Slot Message: Hello Slot')
    })
  })
})
