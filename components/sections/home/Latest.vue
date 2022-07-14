<template>
    
       <!-- -----------------------------------------------
        LAtest item loop
        ----------------------------------------------- -->
        <div class="featured-item">
          <div class="featured-icon">
            <v-btn fab small :color="latestitem.iconcolor" class="elevation-0">
              <span
                class="sprite-img featured-card-icon"
                :class="latestitem.icon"
              ></span>
            </v-btn>
          </div>
          <div class="featured-item-content">
            <NLink
              :to="{name: `${latestitem.badgetext.toLowerCase()}-slug`, params: {slug: latestitem.slug}}"
              class="item-title font-weight-semibold no-effect-button text-decoration-none"
            >
              {{ latestitem.title }}
            </NLink>
            <div class="d-md-flex align-center mt-3">
              <div class="d-md-flex">
                <span :class="latestitem.badgebg" class="badge">{{
                  latestitem.badgetext
                }}</span>
                <div
                  class="ml-0 ml-md-7 mt-4 mt-md-0 pr-7 border-right border-sm-right-0"
                >
                  <span
                    >In
                    <NLink
                      :to="{name: 'slug', params: {slug: latestitem.category_slug}}"
                      class="category-title no-effect-button"
                      >{{ latestitem.category_title }}</NLink
                    ></span
                  >
                </div>
              </div>

              <div class="ml-0 ml-md-7 d-flex mt-7 mt-md-0">
                <div class="py-2 py-md-0 pr-7 border-right">
                  <span>{{ latestitem.date }}</span>
                </div>
                <div class="ml-7 py-2 py-md-0">
                  <span>{{ latestitem.views }} Views </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      <!-- -----------------------------------------------
        End LAtest item loop
        ----------------------------------------------- -->
        <!-- -----------------------------------------------
        LAtest item pagination
        ----------------------------------------------- -->
      
    <!-- -----------------------------------------------
        End Featured
    ----------------------------------------------- -->
  
</template>

<script>
export default {
  name: "Latest",
  props: ["latestitem"],
  components: {},
  data: () => ({
    
  }),
  // async fetch() {
  //   this.featureditem = await fetch(
  //     "https://api.npoint.io/794fe8504dfa95d5b355"
  //   ).then((res) => res.json());
  // },
  computed: {
    
  },
 
};
</script>

<style lang="scss">
</style>