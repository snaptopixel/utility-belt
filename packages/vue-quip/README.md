# vue-quip
<font size="6" face="Georgia, serif">quip</font>
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

### Import tag-specific shortcuts
Reference any tags that you'd like to use by destructuring them from `this.$quip`
```ts
const { ul } = this.$quip
```

### Creating nodes
Nodes are created by invoking a named _opening_ function call followed by an anonymous _closing_ function call.
```ts
return ul()()

// <ul></ul>
```

### Nesting nodes
Quip uses method chaining to build complex structures easily and efficiently. Any calls you make _after_ an opening function call are applied to that node, until the anyonymous _closing_ function is invoked.
> Note the use of parentheses after `return()` to enable multiline syntax.
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