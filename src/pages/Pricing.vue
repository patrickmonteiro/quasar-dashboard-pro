<template>
  <q-page class="bg-secondary" padding>
    <div class="row q-col-gutter-md">
      <div class="col-3" v-for="card in 4" :key="card" >
        <q-card bordered class="fit">
          <q-card-section>
            <q-btn
              outline
              rounded
              size="sm"
              :ripple="false"
              color="purple-6"
              label="Free Forever"
            />
          </q-card-section>

          <q-card-section class="q-pl-lg">
            <div class="text-h5 text-bold">Free</div>
            <q-item-label caption lines="2">For Individuals</q-item-label>
          </q-card-section>

          <q-card-section>
            <q-list dense>
              <q-item clickable v-ripple>
                <q-item-section avatar>
                  <q-icon color="primary" name="mdi-check" />
                </q-item-section>

                <q-item-section>
                  100MB File Space
                </q-item-section>
              </q-item>

              <q-item clickable v-ripple>
                <q-item-section avatar>
                  <q-icon color="primary" name="mdi-check" />
                </q-item-section>

                <q-item-section>
                  2 Active Projects
                </q-item-section>
              </q-item>

              <q-item clickable v-ripple>
                <q-item-section avatar>
                  <q-icon color="primary" name="mdi-check" />
                </q-item-section>

                <q-item-section>
                  Limited Boards
                </q-item-section>
              </q-item>

              <q-item clickable v-ripple>
                <q-item-section avatar>
                  <q-icon color="primary" name="mdi-check" />
                </q-item-section>

                <q-item-section>
                  Basic Project Management
                </q-item-section>
              </q-item>
            </q-list>
          </q-card-section>

          <q-card-actions>
            <q-btn class="q-pa-xs" rounded color="purple-5">Get Started</q-btn>
          </q-card-actions>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script>

export default {
  name: 'PagePricing',
  components: {
  }
}
</script>
