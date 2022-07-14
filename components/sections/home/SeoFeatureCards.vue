<template>
    <div class="featurecard-wrapper">
        <!-- -----------------------------------------------
        Start Feature Cards
    ----------------------------------------------- -->
        <v-container>
            <div>
                <h2 class="font-weight-bold text-center section-title">
                    {{ layout.h3 }}
                </h2>
                <p class="text-center mt-4">
                    {{ layout.s3 }}
                </p>
            </div>

            <v-row class="seo-feature-card-top-spacer">
                <v-col
                    cols="12"
                    lg="6"
                    md="6"
                    v-for="(item, i) in layout.cards"
                    :key="i"
                >
                    <v-card class="seo-feature-card">
                        <v-card-text>
                            <v-btn
                                fab
                                icon
                                large
                                :color="icons[i].icontextcolor"
                                :class="icons[i].iconbgcolor"
                                class="seo-feature-icon no-cursor"
                            >
                                <span
                                    class="sprite-img seo-featured-card-icon"
                                    :class="icons[i].icon"
                                ></span>
                            </v-btn>
                            <h3 class="text-h4">{{ item.title }}</h3>
                            <p class="seo-feature-subtext">
                                {{ item.text }}
                            </p>
                            <NLink
                                :to="item.link"
                                class="px-0 font-weight-semibold no-effect-button text-decoration-none bottom-line-animation">
                                Learn More
                            </NLink>
                        </v-card-text>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
        <!-- -----------------------------------------------
        End Feature Cards
    ----------------------------------------------- -->
    </div>
</template>

<script>
export default {
    name: "SeoFeatureCards",
    props:["layout"],
    components: {},
    data: () => ({
        icons: [
            {
                icontextcolor: "primary",
                iconbgcolor: "primary-lighten-5 primary-shadow",
                icon: "icon1",
            },
            {
                icontextcolor: "error",
                iconbgcolor: "error-lighten-5 error-shadow",
                icon: "icon2",
            },
            {
                icontextcolor: "success",
                iconbgcolor: "success-lighten-5 success-shadow",
                icon: "icon3",
            },
            {
                icontextcolor: "info",
                iconbgcolor: "info-lighten-5 info-shadow",
                icon: "icon4",
            },
            {
                icontextcolor: "warning",
                iconbgcolor: "warning-lighten-5 warning-shadow",
                icon: "icon5",
            },
            {
                icontextcolor: "accent",
                iconbgcolor: "accent-lighten-5 accent-shadow",
                icon: "icon6",
            }
        ]
    }),
};
</script>