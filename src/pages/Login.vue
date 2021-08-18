<template>
  <div class="row justify-center" style="height: 100vh">
    <transition name="fade">
      <div class="col-xs-12 col-sm-6 flex container-logo bg-grey-3">
        <q-icon
          v-if="login"
          name="mdi-arrow-left"
          class="q-ma-lg absolute-full cursor-pointer"
          size="21px"
          color="white"
          @click="login = !login"
        />
        <div class="column self-center q-mx-auto">
          <img
            class="q-mx-auto q-pb-md"
            src="../assets/quasar-logo-vertical.svg"
            :width="$q.screen.gt.sm ? '300' : '100'"
          />
        </div>
      </div>
    </transition>
    <div class="column q-gutter-y-md q-pa-md self-center q-mx-auto">
      <div
        class="text-center"
        :class="
          $q.screen.gt.sm
            ? 'text-h5 text-weight-bold'
            : 'text-h6 text-weight-bold'
        "
      >
        ACCESS MY ACCOUNT
      </div>
      <q-input required filled bottom-slots v-model="email" label="Email">
        <template v-slot:prepend>
          <q-icon name="email" />
        </template>
      </q-input>
      <q-input filled bottom-slots v-model="password" label="Password">
        <template v-slot:prepend>
          <q-icon name="lock" />
        </template>
      </q-input>

      <q-btn
        id="btn-login"
        rounded
        color="positive"
        size="lg"
        label="Continuar"
        :loading="loading1"
        @click="simulateProgress(1)"
      >
        <template v-slot:loading>
          <q-spinner-gears />
        </template>
      </q-btn>

      <div class="divider q-mb-sm"></div>
      <div class="row">
        <div class="col-12">
          <div class="row justify-center q-gutter-lg">
            <div class="col-5">
              <q-btn
                class="float-right "
                size="18.7px"
                round
                color="blue-10"
                icon="mdi-facebook"
              />
            </div>
            <div class="col-5">
              <q-btn
                class=""
                size="18.7px"
                round
                color="red-8"
                icon="mdi-google"
              />
            </div>
            <div class="col-12">
              <div
                class="text-weight-bold text-uppercase text-center cursor-pointer q-pb-md"
              >
                Ainda não sou cliente
              </div>
              <div
                class="text-weight-bold text-uppercase text-center cursor-pointer"
              >
                Esqueci minha senha
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      loading1: false,
      email: '',
      password: '',
      login: false,
      fade: true
    }
  },
  methods: {
    simulateProgress (number) {
      this.fade = false
      this[`loading${number}`] = true
      setTimeout(() => {
        this[`loading${number}`] = false
        if (this.login === true) {
          this.$router.push({ name: 'home' })
        }
        this.login = true
        this.fade = true
      }, 1000)
    }
  }
}
</script>
<style>
div.container-logo {
  background-color: #ee2e5d;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 1s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0.2;
}
@media screen and (min-width: 320px) and (max-width: 737px) {
  div.container-logo {
    height: 183px !important;
    width: 100% !important;
  }
}
#btn-login {
  font-size: 16px !important ;
  font-weight: bold;
  height: 70px;
}
.divider {
  border-top: 1px solid #ebecf3;
}
</style>
