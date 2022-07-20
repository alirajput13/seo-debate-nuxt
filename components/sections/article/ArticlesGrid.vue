<template>
    <!-- -----------------------------------------------
    Start ArticlesGrid
  ----------------------------------------------- -->
   <!-- -----------------------------------------------
    Start ArticlesGrid
  ----------------------------------------------- -->
  <div class="article-card pt-12 border-top article-spacer">
    <div class="d-flex justify-space-between">
      <NLink
        :to="{ name: 'articles-slug', params: { slug: blog.slug } }"
        class="text-decoration-none d-flex"
      >
        <span class="badge py-1 px-4 primary-lighten-5 primary--text">{{
          blog.category.slug
        }}</span>
      </NLink>
      <span class="article-time">{{ blog.createdAt }}</span>
    </div>
    <NLink :to="{ name: 'articles-slug', params: { slug: blog.slug } }">
      <v-img
        height="250"
        :src="blog.img"
        :alt="blog.img"
        class="article-img my-10"
      ></v-img>
    </NLink>

    <div class="article-detail mt-0">
      <div>
        <NLink
          :to="{ name: 'articles-slug', params: { slug: blog.slug } }"
          class="article-title border-line font-weight-semibold"
          >{{ blog.title }}</NLink
        >
      </div>
      <div class="d-flex align-center article-cat-view mt-7">
        <div>
          <span>By</span>
          <NLink
            :to="{ name: 'articles-slug', params: { slug: blog.slug } }"
            class="author-name"
            >{{ blog.author.fullname }}</NLink
          >
        </div>

        <div class="ml-9 border-left pl-9">
          <span class="view-text">{{ blog.views ?blog.views:0 }} Views</span>
        </div>
      </div>
      <div class="author-details d-flex justify-space-between my-12">
        {{ blog.description }}
      </div>
    </div>

    <!-- read more -->

    <a :href="`/articles/${blog.slug}`" class="text-decoration-none btn-readmore1">
      <span class="sprite-img plus-icon"></span>
      <span class="ml-3 text-subtitle-2 white--text read-text">Read More</span>
    </a>
  </div>
    <!-- -----------------------------------------------
        End ArticlesGrid
    ----------------------------------------------- -->
</template>

<script>
export default {
    name: "ArticlesGrid",
    props: ["blog"],
    methods: {
        viewPro(username) {
            if (this.$auth.loggedIn) {
                this.$router.push({
                    name: "users-username-profile",
                    params: { username }
                });
            } else {
                this.$nuxt.$emit("loginBox");
            }
        }
    }
};
</script>

<style lang="scss" scoped>
.btn-readmore {
  color: #fff;
  font-size: 13px;
  text-transform: uppercase;
  letter-spacing: 2px;
  font-weight: 500;
  position: relative;
  padding-left: 50px;
  padding-right: 20px;
  display: inline-block;
  align-items: center;
  height: 50px;
  line-height: 50px;
  z-index: 3;
  transition: 0.5s cubic-bezier(0.25, 0.8, 0.25, 1) 0s;
  position: relative;
  .plus-icon {
    position: absolute;
    left: 10px;
    top: 10px;
  }
  .read-text {
    &:before {
      background-color: #3669e9;
      z-index: -1;
      content: "";
      position: absolute;
      left: 0;
      top: 50%;
      transform: translateY(-50%);
      width: 50px;
      height: 50px;
      box-shadow: 0 2px 4px rgb(107 124 147 / 6%);
      border-radius: 25px;
      transition: 0.5s cubic-bezier(0.25, 0.8, 0.25, 1) 0s;
    }
  }
}

.article-title.border-line {
  background-image: linear-gradient(180deg, transparent 96%, #3669e9 0);
  transition: background-size 0.6s ease;
  background-size: 0 100%;
  background-repeat: no-repeat;
}

.col-md-6.col-lg-4:nth-child(1),
.col-md-6.col-lg-4:nth-child(2),
.col-md-6.col-lg-4:nth-child(3) {
  .article-card {
    border-top: 0px !important;
    padding-top: 0 !important;
  }
}

.article-card {
  &:hover {
    .btn-readmore .read-text:before {
      width: 100%;
    }
    .article-title.border-line {
      background-size: 100% 100%;
    }
  }
}
</style>
.btn-readmore1 {
  color: #fff;
  font-size: 13px;
  text-transform: uppercase;
  letter-spacing: 2px;
  font-weight: 500;
  position: relative;
  padding-left: 50px;
  padding-right: 20px;
  display: inline-block;
  align-items: center;
  height: 50px;
  line-height: 50px;
  z-index: 3;
  transition: 0.5s cubic-bezier(0.25, 0.8, 0.25, 1) 0s;
  position: relative;
  .plus-icon {
    position: absolute;
    left: 10px;
    top: 10px;
  }
  .read-text {
    &:before {
      background-color: #3669e9;
      z-index: -1;
      content: "";
      position: absolute;
      left: 0;
      top: 50%;
      transform: translateY(-50%);
      width: 50px;
      height: 50px;
      box-shadow: 0 2px 4px rgb(107 124 147 / 6%);
      border-radius: 25px;
      transition: 0.5s cubic-bezier(0.25, 0.8, 0.25, 1) 0s;
    }
  }
}

.article-title.border-line {
  background-image: linear-gradient(180deg, transparent 96%, #3669e9 0);
  transition: background-size 0.6s ease;
  background-size: 0 100%;
  background-repeat: no-repeat;
}

.col-md-6.col-lg-4:nth-child(1),
.col-md-6.col-lg-4:nth-child(2),
.col-md-6.col-lg-4:nth-child(3) {
  .article-card {
    border-top: 0px !important;
    padding-top: 0 !important;
  }
}

.article-card {
  &:hover {
    .btn-readmore1 .read-text:before {
      width: 100%;
    }
    .article-title.border-line {
      background-size: 100% 100%;
    }
  }
}
</style>