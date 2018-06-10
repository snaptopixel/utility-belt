# quip
Better render functions for Vue. No more string templates, JSX, createElement, or .vue files to worry about.

### Say what?
Vue supports render functions out of the box, they just don't end up looking very pretty and can be hard to deal with. The concept is simple… You do some work based on the current state, return a tree of VNodes and Vue makes updates where necessary.

With Quip, we're wrapping the typical VNode creation process: `createElement(tagName, data, children)` with chainable function calls and a few TypeScript conventions to make the syntax more approachable, attractive, type-safe and less error-prone.

### Setup
#### Installing Quip
```
yarn add @snaptopixel/quip
```

#### Registering Quip
```ts
import { QuipPlugin } from 'vue-quip';
import { Vue, Component } from 'vue-property-decorator';

Vue.use(QuipPlugin)
```

### Basic usage
Quip is meant to be used inside of component render functions, where you generate and return a tree of VNodes.

#### Creating vnodes
VNodes are created by invoking a named _opening_ function, followed by invoking an anonymous _closing_ function:
```ts
const { ul } = this.$quip
return ul()()
// <ul></ul>
```

#### Referencing vnodes
You can optionally pass a `ref` value in the opening function in order to reference vnodes elsewhere in your component:
```ts
render() {
  const { div } = this.$quip
  return div('mydiv')()
}
mounted() {
  const ref = this.$refs.mydiv
}
```

#### Nesting vnodes
Use method chaining to build complex structures easily and efficiently. Any calls you make _between_ opening and closing functions are applied to the current node.
> Note the use of parentheses after `return()` to allow multiple lines
```ts
const { ul } = this.$quip
return(
  ul()
    .li()
      .span()()
    ()
  ()
)
// <ul>
//   <li>
//     <span></span>
//   </li>
// </ul>
```

### Using plugins
Creating vnodes is fun, but not very useful in and of itself. In order to configure our newly created vnodes we use plugins. Quip comes with a set of useful plugins, as well as allowing for the creation of custom plugins.

#### css
```ts
// set classes directly
.div()
  .css('foo', 'bar')
()

// or provide an object
.div()
  .css({
    foo: true,
    bar: false
  })
()
```
#### style
```ts
// set properties individually
div()
  .style('fontSize', '10px')
  .style('fontWeight', 'bold')
()

// or provide an object
div()
  .style({
    display: 'block',
    textAlign: 'center'
  })
()
```
#### on
```ts
button()
  .on('click', this.onClick)
()

button()
  .on({
    mouseover: this.onMouseOver,
    mouseout: this.onMouseOut
  })
()
```