<template>
    <div>
        <div
            class="section-bg-img"
            :style="{
                backgroundImage: `url('/img/article-bg.jpg')`
            }"
        >
            <!-- -----------------------------------------
             Videos Details page
            ----------------------------------------- -->
            <v-container class="inner-top-spacer bottom-spacer">
              
                <!-- ------------------------------------------------- -->
                <!-- Page Content -->
                <!-- ------------------------------------------------- -->
                <v-row>
                    <!-- ------------------------------------------------- -->
                    <!-- Content sidebar -->
                    <!-- ------------------------------------------------- -->
                    <!-- ------------------------------------------------- -->
                    <!-- Content area -->
                    <!-- ------------------------------------------------- -->
                    <v-col cols="12" lg="8">
                        <div>
                            <div
                            v-html="data.video"
                             ></div>
                        </div>
                            <div class="mt-10">
                             <h3>{{ data.title }}</h3>
                            </div>
                            <div class="mt-2 d-flex align-start">
                             <p class="mb-0">
                               <span>{{ data.views ?data.views : 0 }} views</span>
                             </p>
                        <div class="ml-auto d-flex">
                            <a
                            href="javascript:void(0)"
                            text
                            class="
                                no-effect-button
                                hover-blue
                                d-flex
                                pr-6
                                align-center
                                text-decoration-none text-blue
                            "
                            >
                            <span class="sprite-img like-icon"></span>
                            <span class="ml-4 text-subtitle-1">{{data.likes ?data.likes :0}}</span>
                            </a>
                            <a
                            href="javascript:void(0)"
                            text
                            class="
                                no-effect-button
                                hover-blue
                                text-decoration-none
                                pl-6
                                text-blue
                                d-flex
                                align-center
                            "
                            >
                            <span class="sprite-img dislike-icon"></span>
                            <span class="ml-4 text-subtitle-1">DISLIKE</span>
                            </a>
                            <a
                            href="javascript:void(0)"
                            text
                            class="
                                no-effect-button
                                hover-blue
                                text-decoration-none
                                pl-6
                                text-blue
                                d-flex
                                align-center
                            "
                            >
                            <span class="sprite-img share-icon"></span>
                            <span class="ml-4 text-subtitle-1">SHARE</span>
                            </a>
                       </div>
                    </div>
                         <v-divider class="my-10"></v-divider>
                <div>
                    <div class="d-flex align-start">
                        <div>
                        <v-img
                            :src="data.author.avatar"
                            :alt="data.author.avatar"
                            width="48"
                            height="48"
                            class="rounded-circle"
                        />
                        </div>
                        <div class="ml-8">
                        <h4>{{ data.author.username }}</h4>
                        <p class="mt-4 mb-5">
                        {{data.description}}
                        </p>
                        <a href="#" class="text-blue hover-blue text-uppercase text-decoration-none text-subtitle-2">Show More</a>
                        </div>
                    </div>
                </div>
                            <v-divider class="mt-10"></v-divider>

                     <comment-form :id="data.id" link="video-comment" action="comment"/>
                            <!-- ------------------------------------------------- -->
                            <!-- comments -->
                            <!-- ------------------------------------------------- -->
                            <VideoComments  link="video-comment-reply" :comments="data.comments"/>
            </v-col>
                            <!-- </v-card> -->
                            <!-- ------------------------------------------------- -->
                            <!-- Related Videos -->
                            <!-- ------------------------------------------------- -->
                            <v-col cols="12" lg="4">
                            <div v-if="filteredRelatedVideos.length">
                                <h2 class="article-spacer-title">
                                    Related Videos
                                </h2>
                                <v-row>
                                    <v-col
                                        class="py-0"
                                        md="6"
                                        v-for="(video,i) in filteredRelatedVideos.splice(0,1)"
                                        :key="i"
                                    >
                                        <RelatedVideo :video="video" />
                                    </v-col>
                                </v-row>
                            </div>
                            <!-- ------------------------------------------------- -->
                            <!-- Reply Form -->
                            <!-- ------------------------------------------------- -->
                            
                        
                    </v-col>
                </v-row>
            </v-container>
            <Newsletter />
        </div>
    </div>
</template>

<script>
export default {
    auth:false,
    head() {
        return {
            title: this.data.title,
            meta: [
                {
                    hid: "Video detail description",
                    name: "SEO Debate",
                    content: "SEO Debate is the best way"
                }
            ]
        };
    },

    data() {
        return {
            data: {},
            //relatedarticles: [],
            slug: this.$route.params.slug,
            imgshow: true,
            bdcrumbs: [
                {
                    text: "Home",
                    disabled: false,
                    to: "/"
                },
                {
                    text: "Videos",
                    disabled: false,
                    to: "/videos"
                }
            ],
        };
    },
    computed: {
        filteredRelatedVideos: function() {
            return this.$store.state.allVideos.filter(
                video => video.title !== this.data.title
            );
        }
    },
    async asyncData({ $axios, store, params, error }) {
        // Categories in the left 
        if(store.state.latestCategories.length){
            let categories = await $axios.$get("/categories");
    
            store.commit("update_latest_categories", categories);
        }
        let data = await $axios.$get(`video/${params.slug}`)
        .catch((err) => {
            error({ statusCode: 404, message: err.message })
        })
        return { data }
    },
    components: {
        CommentForm: () => import("@/components/sections/misc/CommentForm"),
        Comments: () => import("@/components/sections/article/Comments"),
        Newsletter: () => import("@/components/sections/shared/Newsletter"),
        Breadcrumb: () => import("@/components/sections/shared/Breadcrumb"),
        RelatedVideo: () => import("@/components/sections/video/RelatedVideo"),
        VideoComments: () => import("@/components/sections/video/videoComments"),

    },
    mounted(){
        // Load all videos 
        if(!this.$store.state.allVideos.length){
            this.$axios.$get("/videos").then( res => this.$store.commit("update_videos", res))
        }
        this.$nuxt.$on('UpdateCommentReply',({res, comment_id}) => {
            this.data.comments.forEach(c => {
                if(c.id == comment_id){
                    c.children.unshift(res)
                }
            });
        })
        this.$nuxt.$on('replied',(res) => {
            this.data.comments.unshift(res)
            setTimeout(() => {
                this.$vuetify.goTo(`#comment-${res.id}`)
            },100)
        })

        this.data.content = this.formatData(this.data.content)
    },
    methods:{
        formatData(content){
            let parser = document.createElement('div');
            parser.innerHTML = content

            // H1
            Array.from(parser.querySelectorAll('h2')).forEach( h2 => {
                h2.classList.add('article-detail-title')
            })
            Array.from(parser.querySelectorAll('[style*="background-color"]')).forEach( span => {
                span.classList.add('warning-alerts')
                span.removeAttribute('style')
            } )
            // Images
            Array.from(parser.querySelectorAll('img')).forEach( img => {
                img.setAttribute('width', '100%')
                img.removeAttribute('height')
            })
            // H3
            Array.from(parser.querySelectorAll('h3')).forEach( h3 => h3.classList.add('font-weight-bold','font-24','my-4') )
            // H4
            Array.from(parser.querySelectorAll('h4')).forEach( h4 => h4.classList.add('font-weight-bold','font-21','my-4') )
            // H5
            Array.from(parser.querySelectorAll('h5')).forEach( h5 => h5.classList.add('font-weight-bold','font-18','my-7') )
            // H6
            // Semibold font-16 font-weight-semibold mt-12
            // Semibold font-16 font-weight-semibold primary--text mt-12
            Array.from(parser.querySelectorAll('h6')).forEach( h6 => h6.classList.add('font-weight-semibold','font-18','my-4') )
            // p
            Array.from(parser.querySelectorAll('p')).forEach( p => p.classList.add('font-18', 'mt-10') )
            // bold inside p
            Array.from(parser.querySelectorAll('p strong')).forEach( ps => ps.classList.add('font-weight-semibold', 'text-blue') )

            //tags font-16 primary--text mt-12
            //semibold font-112 primary--text font-weight-semibold text-uppercase mt-12
            // a
            Array.from(parser.querySelectorAll('a')).forEach( a => a.classList.add('font-weight-bold') )
            // ul
            Array.from(parser.querySelectorAll('ul')).forEach( ul => {
                ul.classList.add('article-listing')
                Array.from(ul.querySelectorAll('li')).forEach(li => {
                    const originalText = li.innerText
                    li.classList.add('d-flex', 'align-start')
                    li.innerHTML = '<i aria-hidden="true" class="v-icon notranslate primary--text mdi mdi-chevron-right theme--light"></i>'
                    let span = document.createElement('span')
                    span.classList.add('content', 'font-weight-semibold')
                    span.innerText = originalText
                    li.appendChild(span)
                })
            })
            // ol
            Array.from(parser.querySelectorAll('ol')).forEach( ol => {
                ol.classList.add('article-listing')
                Array.from(ol.querySelectorAll('li')).forEach(li => {
                    let inner = li.querySelectorAll('strong')
                    if(inner){
                        Array.from(inner).forEach(s => s.classList.add('font-weight-semibold', 'text-blue'))
                    }
                    const originalText = li.innerHTML
                    li.classList.add('d-flex', 'align-start')
                    li.innerHTML = '<i aria-hidden="true" class="v-icon notranslate primary--text mdi mdi-check theme--light"></i>'
                    let div = document.createElement('div')
                    div.classList.add('content', 'ml-12', 'font-weight-regular', 'text-light-blue', 'font-weight-semibold')
                    div.innerHTML = originalText
                    li.appendChild(div)
                })
            })
            // blockquote
            Array.from(parser.querySelectorAll('blockquote')).forEach( b => {
                let by = b.querySelector('strong')
                let aby = ''
                if(by){
                    aby = by.innerHTML
                    b.removeChild(by)
                }
                const original = b.innerHTML
                // wrapper
                let n = document.createElement('div')
                n.classList.add('article-quote')

                // Quote image 
                // let q = document.createElement('span')
                // q.classList.add('sprite-img','article-quote-img')

                // text content 
                let h3 = document.createElement('h3')
                h3.classList.add('article-title')
                h3.innerHTML = original
                
                n.appendChild(q)
                n.appendChild(h3)

                // AUthor if given 
                if(by){
                    let author = document.createElement('div')
                    author.classList.add('quote-author-name', 'font-weight-semibold', 'text-decoration-none')
                    author.innerHTML = aby
                    n.appendChild(author)
                }


                b.replaceWith(n)
            })

            return parser.innerHTML
        }
    }
};
</script>

<style lang="scss">
.question-banner-bg.current {
    padding-top: 40px !important;
    padding-bottom: 0 !important;
}
div iframe{
    width: 100%;
    height: 400px;
}
</style>
