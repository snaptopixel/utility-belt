import { Vue, Component } from 'vue-property-decorator'

@Component
export default class App extends Vue {
  render () {
    const { div } = this.$quip
    return (
      div()
        .text('Yeah Dawg')
      ()
    )
  }
}
