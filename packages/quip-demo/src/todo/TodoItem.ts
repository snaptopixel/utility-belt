import { Component, Vue, Prop } from 'vue-property-decorator'
import { registerComponent } from '@snaptopixel/quip'

declare module '@snaptopixel/quip' {
  interface IComponents {
    todo: {
      value: boolean
    }
  }
}

@Component
class TodoItem extends Vue {
  $refs: {
    checkbox: HTMLInputElement
  }
  @Prop() value: boolean
  render () {
    const { label } = this.$quip
    console.log('render', Object.getOwnPropertyDescriptor(this, 'value'))
    return (
      label()
        .input('checkbox')
          .attr('type', 'checkbox')
          .attr('checked', this.value ? '' : null)
          .on('change', this.onToggle)
        ()
        .span()
          .text('Hello')
        ()
      ()
    )
  }
  onToggle (event: UIEvent) {
    event.preventDefault()
    this.$emit('change', this.$refs.checkbox.checked)
  }
}

registerComponent('todo', TodoItem)
