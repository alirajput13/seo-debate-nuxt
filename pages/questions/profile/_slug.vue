<template>
    <div>
        <ProfileBanner :username="data.username" :uimage="data.img" />
        <div
            class="section-bg-img"
            :style="{
                backgroundImage: `url('/img/article-bg.jpg')`
            }"
        >
            <!-- -----------------------------------------
      Profile Section
      ----------------------------------------- -->
            <ProfileBannerTabCard />
            <Newsletter />
        </div>
    </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
    middleware: 'auth',
    head() {
        return {
            title: "User Profile Detail",
            meta: [
                {
                    hid: "Question Author description",
                    name: "SEO Debate",
                    content: "SEO Debate is the best way"
                }
            ]
        };
    },
    data() {
        return {
            data: [],
            slug: this.$route.params.slug,
            bdcrumbs: [
                {
                    text: "Home",
                    disabled: false,
                    to: "/"
                },
                {
                    text: "Questions",
                    disabled: false,
                    to: "/questions"
                },
                {
                    text: "Profile",
                    disabled: true,
                    to: "/"
                }
            ]
        };
    },
    computed: {
        ...mapGetters(["allQuestions"]),
        filteredQuestions: function() {
            return this.allQuestions.filter(
                question => question.username === this.data.username
            );
        }
    },
    components: {
        ProfileBanner: () =>
            import("@/components/sections/question/ProfileBanner"),
        ProfileBannerTabCard: () =>
            import("@/components/sections/question/ProfileBannerTabCard"),
        Newsletter: () => import("@/components/sections/shared/Newsletter")
    },
    mounted() {
        this.data = this.allQuestions.find(
            question => question.userlink == this.$route.params.slug
        );
        console.log(this.data);
    }
};
</script>
