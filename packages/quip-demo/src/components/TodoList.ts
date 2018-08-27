import { Vue, Component , Prop } from 'vue-property-decorator'
import { Quip } from '@snaptopixel/quip'
import '@/components/Todo'
import { style } from 'typestyle'

declare module '@snaptopixel/quip' {
  interface IComponents {
    TodoList: Pick<TodoList, 'todos'>
  }
}

export interface ITodo {
  label: string
  done: boolean
}

const listStyle = style({
  $nest: {
    'ul': {
      listStyle: 'none',
      margin: 0,
      padding: 0
    },
    li: {
      margin: 0
    }
  }
})

@Quip @Component
export default class TodoList extends Vue {
  @Prop() todos!: ITodo[]
  render () {
    const { li, div } = this.$quip
    return(
      div()
        .css(listStyle)
        .button()
          .text('Add Todo')
          .on({
            click: () => this.todos.push({ label: 'New', done: true })
          })
        ()
        .ul()
          .map(this.todos, (todo) => {
            li()
              .Todo()
                .prop({
                  label: todo.label,
                  done: todo.done
                })
                .on({
                  change: done => todo.done = done
                })
              ()
            ()
          })
        ()
      ()
    )
  }
}


// assuming Webpack's HMR API.
// https://webpack.js.org/guides/hot-module-replacement/
if (module.hot) {
  const api = require('vue-hot-reload-api')
  const Vue = require('vue')

  // make the API aware of the Vue that you are using.
  // also checks compatibility.
  api.install(Vue)

  // compatibility can be checked via api.compatible after installation
  if (!api.compatible) {
    throw new Error('vue-hot-reload-api is not compatible with the version of Vue you are using.')
  }

  // indicate this module can be hot-reloaded
  module.hot.accept()

  if (!module.hot.data) {
    // for each component option object to be hot-reloaded,
    // you need to create a record for it with a unique id.
    // do this once on startup.
    api.createRecord('todo-list', TodoList)
  } else {
    // if a component has only its template or render function changed,
    // you can force a re-render for all its active instances without
    // destroying/re-creating them. This keeps all current app state intact.
    api.rerender('todo-list', TodoList)

    // --- OR ---

    // if a component has non-template/render options changed,
    // it needs to be fully reloaded. This will destroy and re-create all its
    // active instances (and their children).
    api.reload('todo-list', TodoList)
  }
}