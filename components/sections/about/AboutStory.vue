<template>
    <div
        class="aboutstory-bg"
        :style="{
            backgroundImage: `url('/img/about/about-story-bg.png')`
        }"
    >
        <v-container id="story">
            <v-row justify="center">
                <v-col lg="8" md="10" cols="12">
                    <div class="text-center">
                        <span class="text-uppercase">The Story</span>
                        <h2
                            class="font-weight-bold text-center section-title pb-12"
                        >
                            SEODebate strives to create experts out of
                            beginners.
                        </h2>
                        <v-card class="video-card">
                            <div
                                v-if="imgshow"
                                class="position-relative d-flex flex-column align-center justify-center"
                            >
                                <v-img
                                    :src="$store.state.homeLayout.vthumb"
                                    aspect-ratio="1.7778"
                                    width="100%"
                                />
                                <v-btn
                                    class="play-btn circle-ripple"
                                    fab
                                    dark
                                    small
                                    color="primary"
                                    v-if="imgshow"
                                    @click="imgshow = !imgshow"
                                >
                                    <v-icon dark> mdi-play </v-icon>
                                </v-btn>
                            </div>
                            <div v-else class="mb-0 lh">
                                <video controls controlslist="nodownload" autoplay width="100%">
                                    <source
                                        src="/video/seo_debate_av1.mp4"
                                        type="video/mp4; codecs=av01.0.05M.08,opus"
                                    />
                                    <source
                                        src="/video/seo_debate_vp9.webm"
                                        type="video/webm; codecs=vp9,opus"
                                    />
                                    <source
                                        src="/video/seo_debate_264.mp4"
                                        type="video/mp4; codecs=avc1.4D401E,mp4a.40.2"
                                    />
                                </video>
                            </div>
                        </v-card>
                        <p class="pt-10 text-center">
                            With the rising popularity of SEO as a tool for
                            businesses to promote themselves, many content
                            writers and web designers adopted the title of ‘SEO
                            expert’. However, people still lack <br />
                            technical, in-depth knowledge of the subject, and
                            tend to run into problems <br />
                            once they have to tackle practical problems.
                        </p>
                    </div>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>
<script>
export default {
    name: "AboutStory",
    data() {
        return {
            imgshow: true
        };
    },
};
</script>

<style lang="scss">
.aboutstory-bg {
    background-size: cover;
    background-position: center;
    padding: 40px 0 80px;
}
</style>
