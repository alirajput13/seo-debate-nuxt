<template>
  <div>
    <NLink :to="{name: 'slug',params: { slug: topcategory.slug }}"  class="d-flex align-center hover-blue text-decoration-none">
      <span class="sprite-img category-icon" :class="`category${j+1}`" />
      <span class="font-weight-bold text-blue hover-blue font-16 ml-7">
        {{topcategory.title}}
      </span>
    </NLink>
  </div>
</template>
<script>
export default {
  name: "BannerCategoryCard",
  props: ["topcategory", "j"],

};
</script>