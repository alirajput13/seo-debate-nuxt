<template>
    <div class="homepage">
        <Categorybanner
            seocategory="Search Results"
            :categorySubtext="`Search result for: ${this.$route.query.q} `"
        />
        <v-container class="category-card-spacer d-none d-md-block">
            <!-- -----------------------------------------------
          Start Category Card
      ----------------------------------------------- -->
            <v-card>
                <v-card-text class="px-12 py-8">
                    <v-row>
                        <v-col
                            cols="12"
                            md="6"
                            lg="3"
                            class="py-8"
                            v-for="(topcategory, j) in $store.state.latestCategories"
                            :key="j"
                        >
                            <BannerCategoryCard
                                :topcategory="topcategory"
                                :j="j"
                            />
                        </v-col>
                    </v-row>
                </v-card-text>
            </v-card>
            <!-- -----------------------------------------------
          End Category Card
      ----------------------------------------------- -->
        </v-container>
        <div class="featured-wrapper" id="Latestsection">
            <v-container>
                <h2 class="font-weight-bold text-h4">Search Results</h2>
                <div class="featured-card">
                    <Latest
                        :latestitem="latestitem"
                        v-for="(latestitem, i) in visibleLatestItem"
                        :key="i"
                    />
                </div>
                <div
                    v-if="search.length"
                    class="d-md-flex justify-content-space-between mt-10"
                    @click="scrollToSection">
                    <v-pagination
                        class="theme-pagination ma-auto"
                        v-model="updatePage"
                        :length="Math.ceil(search.length / perPage)"
                        :total-visible="7"
                    ></v-pagination>
                    <div
                        class="d-flex align-center justify-center mt-10 mt-md-0"
                    >
                        Go to
                        <input
                            type="text"
                            v-model.lazy="updatePage"
                            class="form-control ml-3"
                        />
                        <v-btn color="primary" small class="ml-3 custom-button">
                            <v-icon>mdi-check</v-icon>
                        </v-btn>
                    </div>
                </div>
                <v-alert
                    dense
                    outlined
                    type="error"
                    class="mt-15"
                    v-else
                >
                    No Results found
                </v-alert>
            </v-container>
        </div>
        <Newsletter />
    </div>
</template>

<script>
export default {
    data(){
        return{
            page: 1,
            perPage: 6,
            search: []
        }
    },
    computed: {
        updatePage: {
            get: function() {
                return this.page;
            },
            set: function(pagenumber) {
                var pagenum = parseInt(pagenumber);
                this.page = pagenum;
            }
        },
        visibleLatestItem() {
            return this.search.slice(
                (this.page - 1) * this.perPage,
                this.page * this.perPage
            );
        }
    },
    methods: {
        scrollToSection() {
            const el = document.querySelector("#Latestsection");
            if (el) {
                const scrollTo = el.getBoundingClientRect().top;
                window.scrollBy({
                    top: scrollTo - 120,
                    left: 0,
                    behavior: "smooth"
                });
            }
        }
    },
    mounted(){
        this.$nuxt.$on('SearchNow', (q) => {
            this.$axios.post(`/search`,{q})
            .then(res => {
                this.search = res.data
                this.scrollToSection()
            })
        })
    },
    async asyncData({ $axios, store, query }) {
        if (!store.state.latestCategories.length) {
            let categories = await $axios.$get("/categories");
            store.commit("update_latest_categories", categories);
        }
        const search = await $axios.$post(`/search`,{q: query.q.replace('/','')})
        return { search }
    },
    components:{
        Categorybanner: () => import("@/components/sections/categorybanner/Categorybanner"),
        Latest: () => import("@/components/sections/home/Latest"),
        Newsletter: () => import("@/components/sections/shared/Newsletter")
    }
}
</script>