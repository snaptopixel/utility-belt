import Quip, { QuipPlugin, registerComponent } from '../src/index'
import { Vue, Component } from 'vue-property-decorator'
import { mount } from '@vue/test-utils'

Vue.use(QuipPlugin)

declare module '../src/index' {
  interface IComponents {
    'custom': void
  }
}

registerComponent('custom', {
  render () {
    const { i } = this.$quip
    return i()()
  }
})

@Component
class MyComponent extends Vue {
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

describe('quip', () => {
  const w = mount(MyComponent)

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
    `.replace(/\s/g, '')
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
      render (h, context) {
        const { div } = Quip(h)
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
