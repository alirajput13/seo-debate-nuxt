<template>
    <div>
        <AboutBanner />
        <div class="inner-top-spacer">
            <AboutStory />
            <AboutJoin />
            <AboutUserProblems />
            <AboutGetBoard />
        </div>
    </div>
</template>

<script>
export default {
    head() {
        return {
            title: "About",
            meta: [
                {
                    hid: "About description",
                    name: "SEO Debate",
                    content: "SEO Debate is the best way"
                }
            ]
        };
    },
    data() {
        return {};
    },
    components: {
        AboutBanner: () => import("@/components/sections/about/AboutBanner"),
        AboutStory: () => import("@/components/sections/about/AboutStory"),
        AboutJoin: () => import("@/components/sections/about/AboutJoin"),
        AboutGetBoard: () =>
            import("@/components/sections/about/AboutGetBoard"),
        AboutUserProblems: () =>
            import("@/components/sections/about/AboutUserProblems")
    },
    async asyncData({ $axios, store }) {
        if (!Object.values(store.state.homeLayout).length) {
            let data = await $axios.$get("/page?page=home&all=1");
            store.commit("update_home_layout", data);
        }
    }
};
</script>
