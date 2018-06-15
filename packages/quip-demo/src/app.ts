import { Vue, Component } from 'vue-property-decorator'
import './todo/TodoItem'

@Component
export default class App extends Vue {
  public todoItems = [
    { label: 'Item One', completed: true },
    { label: 'Item Two', completed: false },
    { label: 'Item Three', completed: false },
    { label: 'Item Four', completed: false }
  ]
  get debugTodoItems () {
    return JSON.stringify(this.todoItems, null, 2)
  }
  render () {
    const { div, li } = this.$quip
    return (
      div()
        .pre()
          .text(this.debugTodoItems)
        ()
        .ul()
          .map(this.todoItems, item => {
            li()
              .todo()
                .prop('label', item.label)
                .bind(item, 'completed', 'complete')
              ()
            ()
          })
        ()
      ()
    )
  }
}
