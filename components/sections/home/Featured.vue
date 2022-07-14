<template>
    <!-- -----------------------------------------------
        Start Featured
    ----------------------------------------------- -->
      <div class="featured-item">
        <div class="featured-icon">
          <v-btn fab small :color="featureditem.iconcolor" class="elevation-0 mb-8 mb-md-0">
            <span
              :class="featureditem.icon"
              class="sprite-img featured-card-icon"
            ></span>
          </v-btn>
        </div>
        <div class="featured-item-content">
          <NLink
            :to="{name: `${featureditem.badgetext.toLowerCase()}-slug`, params: {slug: featureditem.slug}}"
            class="item-title font-weight-semibold no-effect-button text-decoration-none"
          >
            {{ featureditem.title }}
          </NLink>
          <div class="d-md-flex align-center mt-3">
            <div class="d-md-flex">
              <span :class="featureditem.badgebg" class="badge">{{
                featureditem.badgetext
              }}</span>
              <div
                class="ml-0 ml-md-7 mt-4 mt-md-0 pr-7 border-right border-sm-right-0"
              >
                <span
                  >In
                  <NLink
                    :to="{name: 'slug', params: {slug: featureditem.category_slug}}"
                    class="category-title no-effect-button"
                    >{{ featureditem.category_title }}</NLink
                  ></span
                >
              </div>
            </div>

            <div class="ml-0 ml-md-7 d-flex mt-7 mt-md-0">
              <div class="py-2 py-md-0 pr-7 border-right">
                <span>{{ featureditem.date }}</span>
              </div>
              <div class="ml-7 py-2 py-md-0">
                <span>{{ featureditem.views }} Views </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    <!-- -----------------------------------------------
        End Featured
    ----------------------------------------------- -->
  
</template>

<script>
export default {
  name: "Featured",
  props:["featureditem"],
};
</script>