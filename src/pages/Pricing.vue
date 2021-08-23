<template>
  <q-page class="bg-secondary" padding>
    <div class="row q-col-gutter-lg">
      <div class="col-md-3 col-sm-12 col-xs-12" v-for="plan in plans" :key="plan" >
        <q-card bordered class="fit">
          <q-card-section>
            <q-btn
              outline
              rounded
              size="sm"
              :ripple="false"
              :color="plan.color"
              :label="plan.model"
            />
          </q-card-section>

          <q-card-section class="q-pl-lg">
            <div class="text-h4 text-bold">{{ plan.title }}</div>
            <q-item-label caption lines="2">{{ plan.subtitle }}</q-item-label>
          </q-card-section>

          <q-separator />

          <q-card-section class="q-py-xl">
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
            <q-btn class="shadow-3" :color="plan.color">Get Started</q-btn>
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
  },
  data () {
    return {
      plans: [
        {
          title: 'Free',
          subtitle: 'For Individuals',
          color: 'purple-5',
          model: 'Free Forever'
        },
        {
          title: '$ 20',
          subtitle: 'For 2 Users',
          color: 'blue-5',
          model: 'Basic Plan'
        },
        {
          title: '$ 50',
          subtitle: 'For 5 Users',
          color: 'red-5',
          model: 'Business'
        },
        {
          title: '$ 79',
          subtitle: 'For 10 Users',
          color: 'green-6',
          model: 'Enterprise'
        }
      ]
    }
  }
}
</script>
