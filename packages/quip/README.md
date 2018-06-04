<font size="6">quip</font>
_noun_
1. a clever or witty remark or comment.
1. a sharp, sarcastic remark; a cutting jest.
1. a quibble.

### Setup

```ts
import { QuipPlugin } from 'vue-quip';
import { Vue, Component } from 'vue-property-decorator';

Vue.use(QuipPlugin)
```

### Accessing shortcuts
Quip provides a number of built in tag-specific shortcuts as methods of the `$quip` object. For any that you'd like to use directly, simply use object destructuring to reference them:
```ts
const { ul } = this.$quip
```

### Creating nodes
Nodes are created by invoking a named _opening_ function, followed by invoking an anonymous _closing_ function:
```ts
return ul()()
// <ul></ul>
```

### Referencing nodes
You can optionally pass a `ref` value in the opening function in order to reference nodes elsewhere in your component:
```ts
render() {
  const { div } = this.$quip
  return div('mydiv')()
}
mounted() {
  const ref = this.$refs.mydiv
}
```

### Nesting nodes
Use method chaining to build complex structures easily and efficiently. Any calls you make _between_ opening and closing functions are applied to the current node.
> Note the use of parentheses after `return()` to allow multiple lines
```ts
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

### Building your template
```ts
return(
  main()
    .header()
      .nav()
        .ul()
          .li()()
          .li()()
          .li()()
        ()
      ()
    ()
  ()
)
```