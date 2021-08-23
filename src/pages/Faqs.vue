<template>
  <q-page class="bg-secondary" padding>
    <div class="row justify-center">
      <div class="col-10 bg-white">
        <q-list bordered>
          <q-expansion-item
            group="somegroup"
            icon="explore"
            label="First"
            default-opened
            header-class="text-dark"
          >
            <q-card>
              <q-card-section>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quidem, eius reprehenderit eos corrupti
                commodi magni quaerat ex numquam, dolorum officiis modi facere maiores architecto suscipit iste
                eveniet doloribus ullam aliquid.
              </q-card-section>
            </q-card>
          </q-expansion-item>

          <q-separator />

          <q-expansion-item group="somegroup" icon="perm_identity" label="Second" header-class="text-dark">
            <q-card>
              <q-card-section>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quidem, eius reprehenderit eos corrupti
                commodi magni quaerat ex numquam, dolorum officiis modi facere maiores architecto suscipit iste
                eveniet doloribus ullam aliquid.
              </q-card-section>
            </q-card>
          </q-expansion-item>
        </q-list>
      </div>
    </div>
  </q-page>
</template>

<script>

export default {
  name: 'PageFaqs',
  components: {
  },
  data () {
    return {
    }
  }
}
</script>
