import { Vue, Component } from 'vue-property-decorator'
import { QuipPlugin } from '@snaptopixel/quip'

Vue.use(QuipPlugin)

interface ITodo {
  label: string
  done?: boolean
}

@Component
class TodoList extends Vue {
  todos: ITodo[] = [
    { label: 'Hello', done: false },
    { label: 'World', done: false }
  ]
  render () {
    const { ul, li } = this.$quip
    return(
      ul()
        .map(this.todos, (todo) => {
          li()
            .text(todo.label)
            .input()
              .attr('type', 'checkbox')
              .bindAttr(todo, 'done', 'checked', 'change')
            ()
          ()
        })
      ()
    )
  }
}

export default new Vue({
  el: 'app',
  render (h) {
    return h(TodoList)
  }
})
