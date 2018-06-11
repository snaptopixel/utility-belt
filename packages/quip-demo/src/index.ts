import { QuipPlugin } from '@snaptopixel/quip'
import Vue from 'vue'
import App from './app'

Vue.use(QuipPlugin)

export default new Vue({
  el: 'body',
  render (h) {
    return h(App)
  }
})
