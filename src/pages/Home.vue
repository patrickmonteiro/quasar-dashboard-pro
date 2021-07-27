<template>
  <q-page class="row q-col-gutter-md bg-secondary" padding>
    <div class="col-md-3 col-sm-12 col-xs-12" v-for="card in 4" :key="card">
      <q-card class="my-card"  bordered>
        <q-card-section horizontal>
          <q-card-section class="q-pt-xs">
            <!-- <div class="text-overline">Overline</div> -->
            <div class="text-h5 q-mt-sm q-mb-xs">Capacity</div>
            <div class="text-h6 text-grey">
              150GB
            </div>
          </q-card-section>

          <q-card-section class="fit row justify-end content-end">
            <q-avatar
              size="70px"
              font-size="52px"
              color="warning"
              text-color="white"
              icon="mdi-database-plus-outline"
            />
          </q-card-section>
        </q-card-section>
        <q-separator />

        <q-card-actions>
          <q-btn flat color="grey-7" icon="refresh">
            Refresh
          </q-btn>
        </q-card-actions>
      </q-card>
    </div>
  </q-page>
</template>

<script>
export default {
  name: 'PageIndex'
}
</script>
