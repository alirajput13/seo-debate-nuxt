<template>
  <!-- -----------------------------------------------
    Start ArticlesGrid
  ----------------------------------------------- -->
    <v-card class="article-card">
        <v-row no-gutters>
            <v-col cols="12" md="6">
                <NLink :to="{name: 'articles-slug', params:{slug: blog.slug}}">
                    <v-img height="100%"  :src="blog.img" :alt="blog.img"></v-img>
                </NLink>
            </v-col>
            <v-col cols="12" md="6">
                <v-card-text>
                    <span class="article-time">{{blog.createdAt}}</span>
                    <div class="article-detail">
                        <div>
                            <NLink :to="{name: 'articles-slug', params:{slug: blog.slug}}" class="article-title font-weight-semibold">{{blog.title}}</NLink>
                        </div>                        
                        <div class="d-flex align-center article-cat-view">
                            <NLink :to="`/${blog.category.slug}`" class="text-decoration-none">
                                <span class="badge primary-lighten-5 primary--text">{{blog.category.title}}</span>
                            </NLink>
                            
                            <div class="ml-9">
                                <span class="view-text">{{blog.views}} Views</span>
                            </div>
                        </div>
                        <div class="author-details">
                            <span>By</span>
                            <NLink :to="`/articles/author/${blog.authorlink}`" class="author-name">{{blog.authorname}}</NLink>
                        </div>
                    </div>
                </v-card-text>
            </v-col>
        </v-row>
    </v-card>  
    <!-- -----------------------------------------------
        End ArticlesGrid
    ----------------------------------------------- -->
</template>

<script>
export default {
  name: "RelatedArticle",
  props: ["blog"],
};
</script>