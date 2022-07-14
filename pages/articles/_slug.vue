<template>
    <div>
        <div
            class="section-bg-img bg-grediant-before"
            :style="{
                backgroundImage: `url('/img/article-bg.jpg')`
            }"
        >
            <!-- -----------------------------------------
      ArticlesGrid
      ----------------------------------------- -->
            <v-container class="inner-top-spacer">
                <div class="position-relative">
                     <div class="down-circle">
                        <a href="#" v-scroll-to="{ el: '#article-body', offset: -60 }"
                        ><span class="btn-more">Find out more</span></a
                        >
                    </div>
                <v-row class="mt-12 article-spacer">
                    <v-col md="6" cols="12">
                        <div class="d-flex align-end flex-column" style="height: 300px">
                <span
                  class="
                    badge
                    primary-lighten-5
                    mr-auto
                    primary--text
                    py-1
                    px-4
                  "
                  >{{ data.category.title }}</span
                >
                <h1 class="line-title font-weight-bold mt-12">
                  {{ data.title }}
                </h1>
                <div class="d-flex align-center mt-auto mr-auto">
                  <div>
                    <v-img
                      :src="data.img"
                      :alt="data.author.avatar"
                      class="rounded-circle"
                      width="55"
                      height="55"
                    ></v-img>
                  </div>
                  <p class="ml-5">
                    <span>By</span>
                    <NLink
                                :to="data.author.link"
                                class="author-name mr-5"
                                >{{ data.author.fullname }}</NLink
                            >
                    <br />
                    On {{ data.createdAt }}
                  </p>
                </div>
              </div>
            </v-col>
            <v-col cols="12" md="6">
              <v-img
                :src="data.img"
                :alt="data.img"
                class="rounded"
                height="300"
              ></v-img>
            </v-col>
          </v-row>
        </div>
        <v-divider />
                <!-- ------------------------------------------------- -->
                <!-- Page Content -->
                <!-- ------------------------------------------------- -->
                <v-row  justify="center" class="inner-top-spacer" id="article-body">
                    <!-- ------------------------------------------------- -->
                    <!-- Content sidebar -->
                    <!-- ------------------------------------------------- -->
                    <v-col cols="12" lg="1" class="d-none d-lg-block" sticky-container>

                        <div class="left-sidebar">
            
              <div
                class="stickey-sidebar"
                v-sticky
                sticky-offset="offset"
                sticky-z-index="zindex"
              >
                <div class="article-sidebar pt-0">
                  <div class="mb-6">
                    <a
                        :href="`https://www.facebook.com/sharer/sharer.php?u=${data.link}`"
                                                    class="text-decoration-none"
                                                    rel="nofollow noopener"
                                                    target="_blank"
                                                >
                                                    <span
                                                        class="sprite-img social-icon facebook"
                                                    ></span>
                                                </a>                            
                  </div>
                  <div class="mb-6">
                    <a
                                                    :href="`https://twitter.com/intent/tweet?text=${data.title}&url=${data.link}`"
                                                    class="text-decoration-none"
                                                    rel="nofollow noopener"
                                                    target="_blank"
                                                >
                                                    <span
                                                        class="sprite-img social-icon twitter"
                                                    ></span>
                                                </a>
                  </div>
                  <div class="">
                    <a
                                                    :href="`https://www.linkedin.com/shareArticle?url=${data.link}&title=${data.title}`"
                                                    class="text-decoration-none"
                                                    rel="nofollow noopener"
                                                    target="_blank"
                                                >
                                                    <span
                                                        class="sprite-img social-icon linkedin"
                                                    ></span>
                                                </a>
                  </div>
                </div>
              </div>
            </div>
          </v-col>
                    <!-- ------------------------------------------------- -->
                    <!-- Content area -->
                    <!-- ------------------------------------------------- -->
                    <v-col cols="12" lg="10">
                        <div class="article-detail-part">
                            <div v-html="data.content"></div>
                            <!-- ------------------------------------------------- -->
                            <!-- Social Sharing -->
                            <!-- ------------------------------------------------- -->
                            <div class="social-sharing-apart article-spacer">
                                <div class="d-flex align-center">
                                    <nuxt-link 
                                        v-for="(t,i) in data.types" 
                                        :key="i" 
                                        :to="{name: 'topics-slug', params:{slug: t.slug}}"
                                        class="hashtags text-decoration-none" 
                                        :class="i? 'ml-2':''">
                                        #{{t.title}}
                                    </nuxt-link>
                                </div>
                                <div class="ml-auto mt-8 mt-md-0">
                                    <div class="d-flex align-center">
                                        <span>Share</span>
                                        <ul class="social-listing">
                                            <li>
                                                <a
                                                   :href="`https://www.facebook.com/sharer/sharer.php?u=${data.link}`"
                                                    class="text-decoration-none"
                                                    rel="nofollow noopener"
                                                    target="_blank"
                                                >
                                                    <span
                                                        class="sprite-img social-icon facebook"
                                                    ></span>
                                                </a>     
                                            </li>
                                            <li class="pl-4">
                                                <a
                                                    :href="`https://twitter.com/intent/tweet?text=${data.title}&url=${data.link}`"
                                                    class="text-decoration-none"
                                                    rel="nofollow noopener"
                                                    target="_blank"
                                                >
                                                    <span
                                                        class="sprite-img social-icon twitter"
                                                    ></span>
                                                </a>
                                            </li>
                                            <li class="pl-4">
                                                <a
                                                    :href="`https://www.linkedin.com/shareArticle?url=${data.link}&title=${data.title}`"
                                                    class="text-decoration-none"
                                                    rel="nofollow noopener"
                                                    target="_blank"
                                                >
                                                    <span
                                                        class="sprite-img social-icon linkedin"
                                                    ></span>
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <!-- ------------------------------------------------- -->
                            <!-- Related article -->
                            <!-- ------------------------------------------------- -->
                            <div v-if="filteredRelatedArticles.length">
                                <div class="article-spacer-title blue--text">
                                    Related Articles
                                </div>
                                <v-row>
                                    <v-col
                                        class="py-0"
                                        md="12"
                                        v-for="(blog, i) in filteredRelatedArticles
                                        .splice(Math.round(Math.random(0,filteredRelatedArticles.length - 1)) ,1)"
                                        :key="i"
                                    >
                                        <RelatedArticle :blog="blog" />
                                    </v-col>
                                </v-row>
                            </div>
                            <!-- ------------------------------------------------- -->
                            <!-- Reply Form -->
                            <!-- ------------------------------------------------- -->
                            <comment-form :id="data.id" link="comment" action="comment"/>
                            <!-- ------------------------------------------------- -->
                            <!-- comments -->
                            <!-- ------------------------------------------------- -->
                            <div class="mb-15" v-if="data && data.comments">
                                <Comments link="comment-reply" :comments="data.comments" />
                            </div>
                        </div>
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
            title: this.data.seo_title || this.data.title,
            link: [
                {
                    rel: 'canonical',
                    href: this.data.conancial_link || 'https://seodebate.com' + this.$route.path
                }
            ],
            meta: [
                {
                    hid: 'description',
                    name: 'description',
                    content: this.data.description
                },
                {
                    property: 'og:title',
                    content: this.data.seo_title || this.data.title,
                },
                {
                    property: 'og:image',
                    content: this.data.img
                },
                {
                    property: 'og:description',
                    content: this.data.description
                },
                {
                    property: 'og:type',
                    content: 'article'
                },
                {
                    property: 'article:published_time',
                    content: this.data.published_at
                },
                {
                    property: 'article:modified_time',
                    content: this.data.modified_at
                },
                {
                    property: 'twitter:title',
                    content: this.data.seo_title || this.data.title,
                },
                {
                    property: 'twitter:image',
                    content: this.data.img
                },
                {
                    property: 'twitter:description',
                    content: this.data.description
                },
                {
                    name: 'twitter:card',
                    content: `summary_large_image`,
                }
            ]
        };
    },

    data() {
        return {
            data: {},
            //relatedarticles: [],
            offset: { top: 120 },
            zindex: 0,
            bdcrumbs: [
                {
                    text: "Home",
                    disabled: false,
                    to: "/"
                },
                {
                    text: "Articles",
                    disabled: false,
                    to: "/articles"
                }
            ],
            scrollableitems: [],
            comments: [],
        };
    },
    async asyncData({ $axios, params, error }) {
        let data = await $axios.$get(`article/${params.slug}`)
        .catch((err) => {
            error({ statusCode: 404, message: err.message })
        });
        return {data}
    },
    async fetch() {
        if(!this.$store.state.allArticles.length){
            let articles = await this.$axios.$get("/articles");
            this.$store.commit("update_articles", articles);
        }
    },
    methods: {
        scrollTopoint(index) {
            const el = document.querySelector(index);
            if (el) {
                const scrollTo = el.getBoundingClientRect().top;
                window.scrollBy({
                    top: scrollTo - 120,
                    left: 0,
                    behavior: "smooth"
                });
            }
        },
        formatData(content){
            let parser = document.createElement('div');
            parser.innerHTML = content

            // H1
            Array.from(parser.querySelectorAll('h2')).forEach( h2 => {
                h2.classList.add('article-detail-title')
                let target = `h2${this.scrollableitems.length}`
                h2.setAttribute('id', target)
                this.scrollableitems.push({
                    title : h2.innerText,
                    target : `#${target}`
                })
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
                let q = document.createElement('span')
                q.classList.add('sprite-img','article-quote-img')

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
        },
    },
    computed: {
        filteredRelatedArticles: function() {
            if(this.data && this.data.category){
                return this.$store.state.allArticles.filter(
                    blog =>
                        blog.category.title == this.data.category.title &&
                        blog.title != this.data.title
                );
            }
            return []
        }
    },
    mounted(){
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
    components: {
        CommentForm: () => import("@/components/sections/misc/articaleCommentsForm"),
        Comments: () => import("@/components/sections/article/Comments"),
        RelatedArticle: () => import("@/components/sections/article/RelatedArticle"),
        Newsletter: () => import("@/components/sections/shared/Newsletter"),
        Breadcrumb: () => import("@/components/sections/shared/Breadcrumb")
    }
};
</script>
