import { QuipPlugin } from '../src/index'
import { Vue, Component } from 'vue-property-decorator'
import { mount } from '@vue/test-utils'

Vue.use(QuipPlugin)

@Component
class MyComponent extends Vue {
  render () {
    const { main } = this.$quip
    return(
      main('main')
        .header('header')
          .nav('nav')
            .ul('ul')
              .li('li1')()
              .li('li2')()
              .li('li3')()
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
    `
    expect(w.html()).to.eq(expectedDom.replace(/\s/g, ''))
  })

  it('exposes elements via "ref" property', () => {
    const getElement = (ref: string) => {
      return w.vm.$refs[ref] as Element
    }
    expect(getElement('main').nodeName).eq('MAIN')
    expect(getElement('header').nodeName).eq('HEADER')
    expect(getElement('nav').nodeName).eq('NAV')
    expect(getElement('ul').nodeName).eq('UL')
    expect(getElement('li1').nodeName).eq('LI')
    expect(getElement('li2').nodeName).eq('LI')
    expect(getElement('li3').nodeName).eq('LI')
  })
})
