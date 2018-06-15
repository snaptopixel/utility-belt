import { Vue, Component } from 'vue-property-decorator'
import './todo/TodoItem'

@Component
export default class App extends Vue {
  render () {
    const { div } = this.$quip
    return (
      div()
        .todo()
          .model()
          .on('change', (valley) => console.log('vv', valley))
        ()
      ()
    )
  }
}
