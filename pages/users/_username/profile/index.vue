<template>
    <div>
        <ProfileBanner
            :profileData="profileData"
        />
        <div
            class="section-bg-img"
            :style="{
                backgroundImage: `url('/img/article-bg.jpg')`
            }"
        >
            <!-- -----------------------------------------
      Profile Section
      ----------------------------------------- -->
            <ProfileBannerTabCard :profileData="profileData" />
            <Newsletter />
        </div>
    </div>
</template>

<script>
export default {
    middleware: "auth",
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
    data(){
        return{
            profileData: {}
        }
    },
    async asyncData({ $axios, params }) {
        let profileData = await $axios.$get(`/user/${params.username}`);
        return { profileData }
    },
    components: {
        ProfileBanner: () =>
            import("@/components/sections/question/ProfileBanner"),
        ProfileBannerTabCard: () =>
            import("@/components/sections/question/ProfileBannerTabCard"),
        Newsletter: () => import("@/components/sections/shared/Newsletter")
    }
};
</script>
