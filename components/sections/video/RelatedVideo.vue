<template>
  <!-- -----------------------------------------------
    Start Related Video
  ----------------------------------------------- -->
    <v-card class="article-card mb-7">
        <v-row no-gutters>
            <v-col cols="12" md="12">
                <NLink :to="{name: 'videos-slug', params: {slug: video.slug}}" class="d-flex align-center justify-center">
                    <v-img height="100%"  :src="video.thumb" :alt="video.thumb_alt"></v-img>
                    <v-btn
                        class="play-btn with-detail"
                        fab
                        dark
                        small
                        color="primary"
                      >
                        <v-icon dark> mdi-play </v-icon>
                      </v-btn>
                </NLink>
            </v-col>
            <v-col cols="12" md="12">
                <v-card-text>
                    <span class="article-time">{{video.createdAt}}</span>
                    <div class="article-detail">
                        <div>
                            <NLink :to="{name: 'videos-slug', params: {slug: video.slug}}" class="article-title font-weight-semibold">{{video.title}}</NLink>
                        </div>                        
                        <div class="d-flex align-center article-cat-view">
                            <NLink :to="{name: 'slug', params: {slug: video.category.to}}" class="text-decoration-none">
                                <span class="badge primary-lighten-5 primary--text">{{video.category.title}}</span>
                            </NLink>
                            
                            <div class="ml-9">
                                <span class="view-text">{{video.views}} Views</span>
                            </div>
                        </div>
                        <div class="author-details">
                            <span>By</span>
                            <NLink :to="video.author.link" class="author-name">{{video.author.fullname}}</NLink>
                        </div>
                    </div>
                </v-card-text>
            </v-col>
        </v-row>
    </v-card>  
    <!-- -----------------------------------------------
        End Related Video
    ----------------------------------------------- -->
</template>

<script>
export default {
  name: "RelatedVideo",
  props: ["video"],
};
</script>