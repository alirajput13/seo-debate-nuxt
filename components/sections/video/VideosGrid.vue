<template>
    <!-- -----------------------------------------------
    Start VideosGrid
  ----------------------------------------------- -->
    <v-card class="article-card elevation-0 border-all">
        <NLink
            :to="{ name: 'videos-slug', params: { slug: video.slug } }"
            class="position-relative d-flex align-center justify-center"
        >
            <v-img
                height="250"
                :src="video.thumb"
                :alt="video.thumb_alt"
            ></v-img>
            <v-btn class="play-btn" fab dark small color="primary">
               <v-icon dark> mdi-play </v-icon>
            </v-btn>
        </NLink>

        <v-card-text>
            <span class="article-time">{{ video.createdAt }}</span>
            <div class="article-detail">
                <div>
                    <NLink
                        :to="{
                            name: 'videos-slug',
                            params: { slug: video.slug }
                        }"
                        class="article-title font-weight-semibold"
                        >{{ video.title }}</NLink
                    >
                </div>
                <div class="d-flex align-center article-cat-view">
                    <NLink
                        :to="{name: 'slug',params: { slug: video.category.slug }}"
                        class="text-decoration-none"
                    >
                        <span class="badge primary-lighten-5 primary--text">{{
                            video.category.title
                        }}</span>
                    </NLink>

                    <div class="ml-9">
                        <span class="view-text">{{ video.views ?video.views : 0 }} Views</span>
                    </div>
                </div>
                <div class="author-details">
                    <span>By</span>
                    <a href="javascript:void(0)" @click="viewPro(video.author.username)" class="author-name">{{ video.author.fullname }}</a>
                </div>
            </div>
        </v-card-text>
    </v-card>
    <!-- -----------------------------------------------
        End VideosGrid
    ----------------------------------------------- -->
</template>

<script>
export default {
    name: "VideosGrid",
    props: ["video"],
    methods:{
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

<style lang="scss">
.play-btn.with-detail {
    top: 20% !important;
}
</style>
