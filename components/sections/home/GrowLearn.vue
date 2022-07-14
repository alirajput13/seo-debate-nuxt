<template>
    <div class="growlearn-wrapper">
        <div class="container">
            <!-- -----------------------------------------------
        Start GrowLearn
    ----------------------------------------------- -->
            <div>
                <h2 class="font-weight-bold text-center section-title">
                    {{layout.h2}}
                </h2>
                <p class="text-center mt-4">
                    {{layout.s2}}
                </p>
            </div>

            <!-- Cards -->
            <v-row class="grow-card-row" justify="center">
                <v-col
                    cols="12"
                    sm="12"
                    md="12"
                    lg="4"
                    class="py-sm-0"
                    v-for="(item, i) in layout.cards"
                    :key="i"
                >
                    <v-card class="elevation-0 grow-card">
                        <v-card-text class="px-0 pt-sm-0">
                            <div class="d-flex align-start">
                                <v-btn
                                    depressed
                                    color="primary"
                                    class="grow-icon no-cursor"
                                >
                                    <span
                                        :class="imgbg[i]"
                                        class="grow-img sprite-img"
                                    />
                                </v-btn>
                                <div class="grow-card-content">
                                    <h3
                                        class="font-weight-bold primary--text grow-title"
                                    >
                                        {{ item.title }}
                                    </h3>
                                    <p class="subtext-spacer">
                                        {{ item.text }}
                                    </p>
                                </div>
                            </div>
                        </v-card-text>
                    </v-card>
                </v-col>
            </v-row>

            <!-- -----------------------------------------------
        End GrowLearn
    ----------------------------------------------- -->
        </div>
        <div
            :style="{
                backgroundImage: `url('/img/video-bg.png')`,
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'top center',
                width: '100%'
            }"
        >
            <GrowLearnVideo :video="layout.v" />
        </div>
    </div>
</template>

<script>
export default {
    name: "GrowLearn",
    props:["layout"],
    components: {
        GrowLearnVideo: () =>
            import("@/components/sections/home/GrowLearnVideo")
    },
    data: () => ({
        imgbg: [
            "grow1",
            "grow2",
            "grow3",
        ]
    }),
    methods: {}
};
</script>

<style lang="scss"></style>
