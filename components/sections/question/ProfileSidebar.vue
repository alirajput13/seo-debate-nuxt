<template>
  <div>
    <h2 v-if="profileData.about_me" class="font-weight-semibold border-bottom pb-5 font-18 mb-9 mt-12 pt-4">
      About Me
    </h2>
    <p class="font-16 text-light-blue mt-10 pt-4">
      {{profileData.about_me}}
    </p>
    <h2
      class="font-weight-semibold border-bottom pb-5 font-18 mb-9 mt-10 pt-10"
    >
      Credentials & Highlights
    </h2>
    <div class="d-flex align-center py-7">
      <div class="flex-shrink-0">
        <div class="sprite-img highlight icon1"></div>
      </div>
      <span class="ml-5 text-light-blue font-16">
        {{profileData.position || 'Unknown Position'}} at {{profileData.company || 'Unknown Company'}}
      </span>
    </div>
    <div class="d-flex align-start py-7">
      <div class="flex-shrink-0">
        <div class="sprite-img highlight icon2"></div>
      </div>
      <span class="ml-5 text-light-blue font-16">
        {{profileData.degree }}{{ profileData.field ? ` in ${profileData.field}` : ''}} {{profileData.edu_inst || 'Unknown Institute'}}
      </span>
    </div>
    <div class="d-flex align-start py-7">
      <div class="flex-shrink-0">
        <div class="sprite-img highlight icon3"></div>
      </div>
      <span class="ml-5 text-light-blue font-16">
        {{profileData.location ? `Lives in ${profileData.location}` : 'Unknown'}}
      </span>
    </div>
    <h2
      class="font-weight-semibold border-bottom pb-5 font-18 mb-9 mt-10 pt-10"
    >
      Knows About
    </h2>
    <NLink
      v-for="(category, i) in $store.getters.latestCategories"
      :to="{name: 'slug',params: { slug: category.slug }}"
      :key="i"
      class="d-flex align-center hover-blue py-7 text-decoration-none"
    >
      <span class="sprite-img category-icon" :class="`category${i+1}`" />
      <span class="font-weight-bold text-blue hover-blue font-16 ml-7">
        {{ category.title }}
      </span>
    </NLink>
  </div>
</template>
<script>
export default {
  name: "ProfileSidebar",
  props:["profileData"],

};
</script>