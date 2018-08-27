import { Vue, Component } from 'vue-property-decorator'
import { QuipPlugin } from '@snaptopixel/quip'
import { normalize, setupPage } from 'csstips'
import { cssRaw, cssRule } from 'typestyle'
import '@/components/TodoList'

Vue.use(QuipPlugin)

cssRaw(`@import url('//fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,600');`)
normalize()
setupPage('#app')
cssRule('body', {
  fontFamily: `'Source Sans Pro', Helvetica, sans-serif`,
  fontWeight: 300
} as any)

@Component
class App extends Vue {
  todos = [
    { label: 'Item A', done: false },
    { label: 'Item B', done: true },
    { label: 'Item C', done: false }
  ]
  render () {
    const { TodoList } = this.$quip
    return (
      TodoList()
        .bindProp('todos', this, 'todos', 'change')
      ()
    )
  }
}

const app = new Vue({
  el: '#app',
  render (h) {
    return h(App)
  }
})
