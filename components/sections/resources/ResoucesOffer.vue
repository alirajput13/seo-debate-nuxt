<template>
  <div>
    <v-row justify="space-between">
      <v-col cols="12" lg="4">
        <h2 class="text-h2">{{$store.state.resourceLayout.header1}}</h2>
      </v-col>
      <v-col cols="12" lg="6">
        <v-row no-gutters>
          <v-col cols="12" md="6" class="d-flex align-center">
            <v-btn fab
              x-large class="elevation-0 custom-lg-btn"
              color="primary-lighten-5"
              dark
            >
              <span class="sprite-img file-icon"></span>
            </v-btn>
            <div class="ml-8">
              <span class="font-16">Available Resources</span>
              <h3 class="offer-digit font-weight-bold">{{new Intl.NumberFormat('en-GB',{minimumIntegerDigits:3}).format($store.state.resourceLayout.resources) || '000'}}</h3>
            </div>
          </v-col>
          <v-col cols="12" md="6" class="d-flex align-center justify-start justify-md-end mt-8 mt-md-0">
            <v-btn fab
              x-large class="elevation-0 custom-lg-btn"
              color="primary-lighten-5"
              dark
            >
              <span class="sprite-img download-icon"></span>
            </v-btn>
            <div class="ml-8">
              <span class="font-16">Downloaded</span>
              <h3 class="offer-digit font-weight-bold">{{new Intl.NumberFormat('en-GB',{compactDisplay:"short", notation: "compact"}).format($store.state.resourceLayout.downloads) || '0k'}}</h3>
            </div>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </div>
</template>
<script>
export default {
  name: "ResoucesOffer"   
};
</script>

<style  lang="scss">
.offer-digit {
  font-size: 36px;
}
.text-h2 {
  line-height: 35px !important;
}
</style>