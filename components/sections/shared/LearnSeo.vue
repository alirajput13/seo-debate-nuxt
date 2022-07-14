<template>
    <div class="learn-seo-wrapper">
        <!-- -----------------------------------------------
        Start Learn Seo
    ----------------------------------------------- -->
        <v-container class="py-0">
            <div class="listing-box">
                <v-row>
                    <v-col cols="12" lg="7">
                        <h2 class="font-weight-bold text-h4">
                            {{ layout.h4 }}
                        </h2>
                        <v-row class="list-spacer">
                            <ul class="common-links three-part">
                                <li v-for="link in layout.topics" :key="link.id">
                                    <n-link
                                        :to="{name: 'topics-slug', params:{slug: link.slug}}"
                                        class="d-flex align-center seo-type-item text-decoration-none font-weight-semibold"
                                    >
                                        <v-icon class="mr-4 text-info"
                                            >mdi-chevron-right</v-icon
                                        >
                                        <span>{{ link.title }}</span>
                                    </n-link>
                                </li>
                            </ul>
                        </v-row>
                    </v-col>
                    <v-col cols="12" lg="5" class="text-center">
                        <img src="/img/learn-seo-img.png" class="listing-side-img" alt="Learn Seo" >
                    </v-col>
                </v-row>
            </div>
        </v-container>
        <!-- -----------------------------------------------
        End Learn Seo
    ----------------------------------------------- -->
    </div>
</template>

<script>
export default {
    name: "LearnSeo",
    props: ["layout"],
};
</script>
