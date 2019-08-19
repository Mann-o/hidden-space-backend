import Vue from 'vue'

import GalleryImage from './components/GalleryImage'

Vue.component('gallery-image', () => GalleryImage)

new Vue().$mount('#app')
