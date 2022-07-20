<template>
    <div>
        <!-- <h1 class="line-title font-weight-bold">Download My Quick Win SEO Tips</h1> -->
        <h1 class="line-title font-weight-bold">
            {{ $store.state.termsConditionLayout.header1 }}
        </h1>
        <p class="font-16">
            {{ $store.state.termsConditionLayout.sub1 }}
        </p>
        <!-- <v-btn
      class="mt-12 font-weight-semibold"
      large
      color="primary">
        Free Download Now
      </v-btn> -->
    </div>
</template>
<script>
export default {
    name: "ResoucesBannerContent"
};
</script>
