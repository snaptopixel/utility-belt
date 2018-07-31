<template>
  <div>{{message}}</div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

@Component
export default class MyComponent extends Vue {
  message = 'Hello Vue'
}
</script>
