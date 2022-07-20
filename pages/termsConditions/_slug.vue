<template>
    <div
        class="section-bg-img"
        :style="{
            backgroundImage: `url('/img/article-bg.jpg')`
        }"
    >
        <!-- -----------------------------------------
      Start Question Detail
    ----------------------------------------- -->
        <v-container class="inner-top-spacer">
            <!-- ------------------------------------------------- -->
            <!-- Breacrumb -->
            <!-- ------------------------------------------------- -->
            <v-row>
                <v-col md="12" cols="12">
                    <breadcrumb
                        :items="bdcrumbs"
                        :pagetitle="selectedResource.title"
                        :type="selectedResource.file_type"
                    />
                </v-col>
            </v-row>
            <v-row class="mt-12">
                <v-col lg="3" md="12" class="d-none d-md-block">
                    <h4 class="text-uppercase mb-0 font-14 font-weight-regular">
                        Categories
                    </h4>
                    <div class="mt-7">
                        <NLink
                            v-for="(category, i) in $store.getters.latestCategories"
                            :key="i"
                            :to="{name: 'slug',params: { slug: category.slug }}"
                            class="d-flex align-center hover-blue py-7 border-bottom text-decoration-none"
                        >
                            <span
                                class="sprite-img category-icon"
                                :class="`category${i+1}`"
                            />
                            <span
                                class="font-weight-bold text-blue hover-blue font-16 ml-7"
                            >
                                {{ category.title }}
                            </span>
                        </NLink>
                    </div>
                </v-col>
                <v-col lg="8" offset-lg="1" md="12">
                    <v-card
                        class="article-detail-part pl-0 elevation-0 border-all"
                    >
                        <v-card-text>
                            
                            <div class="mb-12 font-18 text-light-blue lh-30">
                                {{selectedResource.description}}
                            </div>
                            <v-img :src="selectedResource.img" :alt="selectedResource.thumb_alt" class="rounded" />
                            <v-btn
                                block
                                large
                                class="elevation-0 mt-12 btn-custom-sm"
                                color="primary"
                                dark
                                @click="download(selectedResource.id,selectedResource.docname)"
                            >
                                <div class="d-block d-md-flex align-center">
                                    <span class="mr-2 d-block">Free Download</span>
                                    <span class="white--text op-5">
                                        ({{new Intl.NumberFormat('en-GB',{minimumIntegerDigits:3})
                                        .format(selectedResource.downloads) || '000'}} downloads)
                                    </span>
                                </div>
                            </v-btn>
                        </v-card-text>
                        <div class="mt-12 px-10 px-md-15" v-html="selectedResource.content"></div>
                    </v-card>
                    
                    <!-- ------------------------------------------------- -->
                    <!-- Reply Form -->
                    <!-- ------------------------------------------------- -->
                    <comment-form :id="selectedResource.id" link="resource-comment" action="comment"/>
                    <!-- ------------------------------------------------- -->
                    <!-- comments -->
                    <!-- ------------------------------------------------- -->
                    <div class="mb-15">
                        <Comments link="resource-comment-reply" :comments="selectedResource.comments" />
                    </div>
                </v-col>
            </v-row>
            <!-- ------------------------------------------------- -->
            <!-- Related article -->
            <!-- ------------------------------------------------- -->
            <div v-if="relatedresources.length" class="pt-12 mt-10">
                <h2 class="text-h2 related-title pb-4 pb-md-10">
                    Related Resources
                </h2>
                <v-row class="mt-5 mt-md-12">
                    <v-col lg="12">
                        <v-row>
                            <Relatedresource
                                :resourcequestion="resourcequestion"
                                v-for="(resourcequestion,
                                i) in relatedresources.slice(0, 3)"
                                :key="i"
                            />
                        </v-row>
                    </v-col>
                </v-row>
            </div>
        </v-container>
        <!-- -----------------------------------------
      End Question Detail
    ----------------------------------------- -->
    </div>
</template>
<script>
export default {
    auth:false,
    head() {
        return {
            title: this.selectedResource.title,
            link: [
                {
                    rel: 'canonical',
                    href: this.selectedResource.canonical_link || 'https://seodebate.com' + this.$route.path
                }
            ],
            meta: [
                {
                    name: 'robots',
                    content: !!+this.selectedResource.index ? 'index,follow' : 'noindex'
                },
                {
                    name: 'title',
                    content: this.selectedResource.seo_title || this.selectedResource.title
                },
                {
                    name: 'description',
                    content: this.selectedResource.description
                },
                {
                    property: 'og:title',
                    content: this.selectedResource.seo_title || this.selectedResource.title
                },
                {
                    property: 'og:description',
                    content: this.selectedResource.description
                },
                {
                    property: 'og:url',
                    content: 'https://seodebate.com' + this.$route.path
                },
                {
                    property: 'twitter:title',
                    content: this.selectedResource.seo_title || this.selectedResource.title
                },
                {
                    property: 'twitter:description',
                    content: this.selectedResource.description
                },
                {
                    property: 'twitter:url',
                    content: 'https://seodebate.com' + this.$route.path
                },
            ]
        };
    },
    data() {
        return {
            selectedResource: {},
            bdcrumbs: [
                {
                    text: "Home",
                    disabled: false,
                    to: "/"
                },
                {
                    text: "Resource",
                    disabled: false,
                    to: "/resources"
                }
            ],
        };
    },
    computed: {
        relatedresources: function() {
            if(this.selectedResource && this.selectedResource.category){
                return this.$store.getters.allPrivacy.filter(
                    rs =>
                        rs.title !== this.selectedResource.title
                );
            }
            return []
        }
    },
    async asyncData({ $axios, store, params, error }) {
        // Categories in the left
        if (store.state.latestCategories.length) {
            let categories = await $axios.$get("/categories");

            store.commit("update_latest_categories", categories);
        }
        let selectedResource = await $axios.$get(`resource/${params.slug}`)
        .catch((err) => {
            error({ statusCode: 404, message: err.message })
        });
        return { selectedResource }
    },
    components: {
        CommentForm: () => import("@/components/sections/misc/CommentForm"),
        Comments: () => import("@/components/sections/article/Comments"),
        Relatedresource: () => import("@/components/sections/resources/Relatedresource"),
        Breadcrumb: () => import("@/components/sections/shared/Breadcrumb")
    },
    mounted(){
        // Load all videos 
        if(!this.$store.state.allResources.length){
            this.$axios.$get("/resources").then( res => this.$store.commit("update_resources", res))
        }
        this.$nuxt.$on('UpdateCommentReply',({res, comment_id}) => {
            this.selectedResource.comments.forEach(c => {
                if(c.id == comment_id){
                    c.children.unshift(res)
                }
            });
        })
        this.$nuxt.$on('replied',(res) => {
            this.selectedResource.comments.unshift(res)
            setTimeout(() => {
                this.$vuetify.goTo(`#comment-${res.id}`)
            },100)
        })

        this.selectedResource.content = this.formatData(this.selectedResource.content)
    },
    methods:{
        download(id,name){
            if(!this.$auth.loggedIn){
                this.$nuxt.$emit('loginBox')
                return;
            }
            this.$axios.get(`resource-download/${id}`,{
                responseType : 'blob'
            })
            .then(res => {
                let link = document.createElement('a')
                link.download = name
                link.href = window.URL.createObjectURL(res.data)
                link.click()
            })
            .catch(err => {
                this.$swal({
                    title: `Error ${err.response.status}!`,
                    text: err.response.data.message,
                    icon: "error"
                });
            })
        },
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
        }
    },
};
</script>

<style lang="scss">
.lh-30 {
    line-height: 30px !important;
}
.op-5 {
    opacity: 0.5;
}
.btn-custom-sm {
    width: 100%;
    font-size: 15px !important;
}
</style>
