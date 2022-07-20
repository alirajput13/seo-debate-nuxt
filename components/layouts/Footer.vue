<template>
    <!-- -----------------------------------------------
        Start Footer
  ----------------------------------------------- -->
    <v-footer
        class="mt-15"
    >
        <v-container>
            <v-row class="py-0 py-md-15">
                <!-- -----------------------------------------------
        First Column
      ----------------------------------------------- -->
                <v-col cols="12" sm="12" md="12" lg="4" class="px-xs-0">
                    <Logo />
                    <p class="mt-15">
                        SEODebate is a platform that links SEO professionals with each other and with those who need their help. Sign up today for unlimited SEO resources, videos, articles, and one-on-one counseling.
                    </p>
                    <v-btn
                        class="btn-hover mt-15"
                        color="primary"
                        nuxt
                        to="/about/"
                        elevation="0"
                    >
                        Learn More
                    </v-btn>
                </v-col>
                <!-- -----------------------------------------------
        Second Column
      ----------------------------------------------- -->
                <v-col cols="12" sm="12" md="12" lg="5" class="px-xs-0">
                    <p class="primary--text text-h5 mb-0">Quick Links</p>
                    <ul class="common-links three-part pl-0 mt-10">
                        <li v-for="link in data" :key="link.id">
                            <n-link
                                :to="link.to"
                                class="seo-type-item text-decoration-none d-flex align-center"
                            >
                                <v-icon class="text-info d-block d-md-none"
                                    >mdi-chevron-right</v-icon
                                >
                                <span>{{ link.title }}</span>
                            </n-link>
                        </li>
                    </ul>
                </v-col>
                <!-- -----------------------------------------------
        Third Column
      ----------------------------------------------- -->
                <v-col cols="12" sm="12" md="12" lg="3" class="px-xs-0">
                    <p class="primary--text text-h5 mb-0">Be Social</p>
                    <div class="mt-15">
                        <a href="https://facebook.com/seodebate" aria-label="Seodebate" rel="nofollow noopener" target="_blank" class="mr-3"
                            ><span
                                class="font-30 sprite-img social-icon facebook btn-hover"
                            ></span
                        ></a>
                        <a href="https://twitter.com/seodebate" aria-label="Seodebate" rel="nofollow noopener" target="_blank" class="mr-3"
                            ><span
                                class="font-30 sprite-img social-icon twitter btn-hover"
                            ></span
                        ></a>
                        <a href="https://linkedin.com/company/seodebate" aria-label="Seodebate" rel="nofollow noopener" target="_blank" class="mr-3"
                            ><span
                                class="font-30 sprite-img social-icon linkedin btn-hover"
                            ></span
                        ></a>
                    </div>
                    <p class="mt-15">
                        Copyright {{new Date().getFullYear()}}, All Rights Reserved by SEODebate.com
                    </p>
                </v-col>
            </v-row>
        </v-container>
        <!-- -----------------------------------------------
       Back to top
      ----------------------------------------------- -->
        <client-only>
            <back-to-top bottom="50px" right="50px">
                <v-btn type="button" aria-label="Back to top" class="mx-2 scroll-top-btn" fab dark color="primary">
                    <v-icon dark> mdi-arrow-up </v-icon>
                </v-btn>
            </back-to-top>
        </client-only>
    </v-footer>
    <!-- -----------------------------------------------
        End Footer
  ----------------------------------------------- -->
</template>

<script>
export default {
    name: "Footer",
    data() {
        return {
            data: [
                { id: 1, to: "/questions/", title: "Questions" },
                { id: 2, to: "/identification/", title: "Identification" },
                { id: 3, to: "/privacyPolicy/", title: "Privacy Policy" },
                { id: 4, to: "/videos/", title: "Videos" },
                { id: 5, to: "/technical-seo/", title: "Technical SEO" },
                { id: 6, to: "/termsConditions/", title: "Terms \u0026 Condition" },
                { id: 7, to: "/articles/", title: "Articles" },
                { id: 8, to: "/on-page-seo/", title: "On-Page SEO" },
                { id: 9, to: "/about/", title: "About Us" },
                { id: 10, to: "/resources/", title: "Resources" },
                { id: 11, to: "/off-page-seo/", title: "Off-Page SEO" },
                { id: 12, to: "/contact/", title: "Contact Us" },
                { id: 13, to: "/tools/", title: "Tools" }
            ]
        };
    },
    components:{
        Logo: () => import("@/components/layouts/Logo")
    }
};
</script>

<style lang="scss">
.btn-to-top {
    width: 60px;
    height: 60px;
    padding: 10px 16px;
    border-radius: 50%;
    font-size: 22px;
    line-height: 22px;
}
.scroll-top-btn {
    position: absolute;
    bottom: 30px;
    right: 30px;
    position: fixed;
    z-index: 100;
}
</style>
