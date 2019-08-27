import aside from './components/home/aside'
import header from './components/home/header'
import comment from './components/home/comment'
import picture from './components/home/main/picture'
import dialog from './components/home/main/dialog'
import {
  quillEditor
} from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

export default {
  install (Vue) {
    Vue.component('com-side', aside)
    Vue.component('com-header', header)
    Vue.component('com-bread', comment)
    Vue.component('quill-editor', quillEditor)
    Vue.component('com-picture', picture)
    Vue.component('com-dialog', dialog)
  }
}
