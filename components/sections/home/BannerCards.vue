<template>
    <div>
        <!-- -----------------------------------------------
        Start Banner Cards
    ----------------------------------------------- -->
        <v-row class="banner-card-spacer">
            <v-col
                cols="12"
                sm="6"
                md="6"
                lg="3"
                v-for="(item, i) in cards"
                :key="i"
            >
                <v-card class="banner-card" :class="i%2 != 0 ? 'top-spacer' : ''">
                    <v-card-text class="banner-card-content pb-0">
                        <span
                            :class="images[i]"
                            class="sprite-img feature-icon"
                        />
                        <h2 class="font-weight-bold banner-card-title mt-3">
                            {{ item.category }}
                        </h2>
                        <p class="banner-card-subtext">
                            {{ item.description }}
                        </p>
                    </v-card-text>
                    <div class="banner-card-footer pt-0">
                        <NLink
                            :to="item.link"
                            class="px-0 font-weight-semibold no-effect-button text-decoration-none bottom-line-animation"
                        >
                            Learn More
                        </NLink>
                    </div>
                </v-card>
            </v-col>
        </v-row>
        <!-- -----------------------------------------------
        End Banner Cards
    ----------------------------------------------- -->
    </div>
</template>

<script>
export default {
    name: "BannerCards",
    props: ['cards'],
    components: {},
    data: () => ({
        images:[
            "feature1",
            "feature2",
            "feature3",
            "feature4",
        ],
    }),
    methods: {}
};
</script>

<style lang="scss"></style>
