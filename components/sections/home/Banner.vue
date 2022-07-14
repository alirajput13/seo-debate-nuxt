<template>
    <div class="banner-wrapper">
        <div
            class="mob-imagesetter homepage-banner-bg"
            :style="{
                backgroundImage: `url('/img/banner-bg.png')`
            }"
        >
            <v-container>
                <!-- -----------------------------------------------
            Start Banner
        ----------------------------------------------- -->
                <v-row justify="center">
                    <v-col cols="12" sm="10" md="8">
                        <h1 class="banner-title font-weight-bold text-center">
                            {{banner.h}}
                        </h1>
                        <!-- Search Section -->
                        <BannerSearch />
                    </v-col>
                </v-row>

                <!-- Banner Feature Cards -->
                <BannerCards :cards="banner.cards" />
                <!-- -----------------------------------------------
            End Banner
        ----------------------------------------------- -->
            </v-container>
        </div>
    </div>
</template>

<script>
export default {
    name: "Banner",
    props: ["banner"],
    components: {
        BannerSearch: () => import("@/components/sections/home/BannerSearch"),
        BannerCards: () => import("@/components/sections/home/BannerCards")
    }
};
</script>
