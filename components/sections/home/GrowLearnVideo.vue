<template>
    <div class="container mt-12">
        <!-- -----------------------------------------------
        Start GrowLearn Video
    ----------------------------------------------- -->
        <v-row justify="center">
            <v-col cols="12" lg="8" class="px-lg-0">
                <v-card class="video-card">
                    <div v-if="imgshow" class="position-relative d-flex flex-column align-center justify-center">
                        <img :src="video.thumb" alt="Video thumbnail" style="width: 100%;"/>
                        <v-btn
                            class="play-btn circle-ripple"
                            fab
                            dark
                            small
                            color="primary"
                            v-if="imgshow"
                            aria-label="Play Video"
                            id="playVid"
                            type="button"
                        >
                            <v-icon dark> mdi-play </v-icon>
                        </v-btn>
                    </div>
                    <div v-show="!imgshow" class="mb-0 lh">
                        <video id="video" controls playsinline style="width:100%">
                            <source
                                src="video/seo_debate_av1.mp4"
                                type="video/mp4"
                            >
                            <source
                                src="/video/seo_debate_vp9.webm"
                                type="video/webm"
                            >
                            <source
                                src="video/seo_debate_264.mp4"
                                type="video/mp4"
                            >
                        </video>
                    </div>

                    <v-card-text class="primary">
                        <h2 class="white--text font-weight-bold">
                            {{ video.h }}
                        </h2>
                        <p class="white--text mb-0 mt-5">
                            {{ video.s }}
                        </p>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
        <!-- -----------------------------------------------
        End GrowLearn Video
    ----------------------------------------------- -->
        <!-- -----------------------------------------------
        Start GrowLearn Client
    ----------------------------------------------- -->
        <v-row justify="center" class="mt-7">
            <v-col cols="12" lg="8" class="px-lg-0">
                <div
                    class="d-lg-flex text-center justify-space-between align-items-center"
                >
                    <div v-for="(item, i) in clientitems" :key="i">
                        <NLink :to="item.clienturl">
                            <span
                                :class="item.clientimg"
                                class="sprite-img client-icon"
                            />
                        </NLink>
                    </div>
                </div>
            </v-col>
        </v-row>
        <!-- -----------------------------------------------
        Start GrowLearn Client
    ----------------------------------------------- -->
    </div>
</template>

<script>
export default {
    name: "GrowLearnVideo",
    props: ['video'],
    components: {},
    data: () => ({
        dialog: false,
        imgshow: true,
        clientitems: [
            {
                clientimg: "client1",
                clienturl: "/"
            },
            {
                clientimg: "client2",
                clienturl: "/"
            },
            {
                clientimg: "client3",
                clienturl: "/"
            },
            {
                clientimg: "client4",
                clienturl: "/"
            },
            {
                clientimg: "client5",
                clienturl: "/"
            }
        ]
    }),
    mounted(){
        document.querySelector('#playVid').addEventListener("click", () => {
            this.imgshow = false
            let video = document.querySelector('video#video')
            video.play()
        })
    }
};
</script>

<style lang="scss">
#silentbox-overlay__close-button {
    right: 20px !important;
}
.lh {
    line-height: 0px;
}
</style>
