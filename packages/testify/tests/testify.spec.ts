import basicComponent from '~/fixtures/basic-component.vue'
import classComponent from '~/fixtures/class-component.vue'
import { shallowMount } from '@vue/test-utils'

describe('testify', () => {
  it('can make assertions via expect', () => {
    const foo = true
    expect(foo).eq(true)
  })

  it('uses sinon and sinon-chai', () => {
    const spy = sinon.spy()
    spy(1,2,3,4)
    expect(spy).calledWith(1,2,3,4)
  })

  it('uses jsdom and chai-dom', () => {
    const div = document.createElement('div')
    div.classList.add('test-class')
    expect(document.body).not.to.contain(div)
    document.body.appendChild(div)
    expect(document.body).to.contain(div)
    expect(div).to.have.class('test-class')
  })

  describe('requiring files', () => {
    it('can require ts files', () => {
      expect(window.myGlobal).true
    })
    it('can require js files', () => {
      expect(window.myJSGlobal).true
    })
    it('can create chai plugins', () => {
      expect('foo').to.be.foo
      expect('bar').not.to.be.foo
      expect('bar').to.be.bar
      expect('foo').not.to.be.bar
    })
  })

  describe('vue support', () => {
    it('compiles typescript w/template', () => {
      expect(shallowMount(basicComponent).element)
        .match('div')
        .text('Hello Vue')
      expect(shallowMount(classComponent).element)
        .match('div')
        .text('Hello Vue')
    })
    it('throws error with unknown script lang', () => {
      expect(() => require('./fixtures/unsupported-component.vue')).to.throw()
    })
  })
})
