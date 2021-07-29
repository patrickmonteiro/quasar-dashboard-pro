import { Notify } from 'quasar'
import Vue from 'vue'

const setNotifyDanger = (message = '') => {
  Notify.create({
    color: 'negative',
    position: 'bottom',
    message: message || 'Oops, we had an error!',
    icon: 'report_problem'
  })
}
Vue.prototype.$notifyDanger = setNotifyDanger

const setNotifySuccess = (message = '') => {
  Notify.create({
    color: 'positive',
    position: 'bottom',
    message: message || 'Operation successful!',
    icon: 'check_circle'
  })
}
Vue.prototype.$notifySuccess = setNotifySuccess

export {
  setNotifyDanger,
  setNotifySuccess
}
