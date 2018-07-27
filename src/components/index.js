import alert from './alert/alert.js'
import edit from './edit/edit.vue'
import carousel from './carousel/carousel.vue'
import digitalRolling from './digitalRolling/digitalRolling.vue'
import rollScreen from './rollScreen/rollScreen.vue'
import flexBox from './flexBox/flexBox.vue'
import sideNavigation from './sideNavigation/sideNavigation.vue'
export default {
  install: function (vue) {
    vue.prototype.$alert = alert
    vue.component('edit', edit)
    vue.component('carousel', carousel)
    vue.component('digitalRolling', digitalRolling)
    vue.component('rollScreen', rollScreen)
    vue.component('flexBox', flexBox)
    vue.component('sideNavigation', sideNavigation)
  }
}
