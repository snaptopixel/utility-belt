import { Component, Vue, Prop } from 'vue-property-decorator'
import { registerComponent } from '@snaptopixel/quip'

declare module '@snaptopixel/quip' {
  interface IComponents {
    todo: { complete: boolean, label: string }
  }
}

@Component
class TodoItem extends Vue {
  $refs: {
    checkbox: HTMLInputElement
  }
  @Prop() complete: boolean
  @Prop() label: string
  render () {
    const { label } = this.$quip
    return (
      label()
        .style('opacity', this.complete ? '0.5' : '')
        .input('checkbox')
          .attr('type', 'checkbox')
          .attr('checked', this.complete ? '' : null)
          .on('change', this.onToggle)
        ()
        .span()
          .text(this.label)
        ()
      ()
    )
  }
  onToggle () {
    this.$emit('input', this.$refs.checkbox.checked)
  }
}

registerComponent('todo', TodoItem)
