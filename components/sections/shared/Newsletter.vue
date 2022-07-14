<template>
    <div class="newsletter-wrapper">
        <!-- -----------------------------------------------
        Start Newsletter
    ----------------------------------------------- -->
        <div
            class="inner-content"
            :style="{
                backgroundImage: `url('/img/newsletter-bg.${webp_support ? 'webp':'png'}')`
            }"
        >
            <v-container>
                <v-row align="center" justify="center">
                    <v-col lg="8" class="px-lg-0">
                        <div>
                            <p
                                class="font-weight-bold text-center section-title newsletter-title"
                            >
                                Subscribe to our newsletter
                            </p>
                            <p class="text-center mt-4">
                                Don’t miss out on any of the latest SEO trends
                                and tips! Get our newsletter today by entering
                                your email address below.
                            </p>
                        </div>
                        <v-form ref="sub" @submit.prevent="sub">
                            <v-row
                                class="d-md-flex align-center justify-center mb-5 mb-md-0"
                            >
                                <v-col
                                    md="3"
                                    class="px-lg-3 text-center py-0"
                                    lg="2"
                                    sm="6"
                                    v-for="(c,i) in $store.getters.latestCategories"
                                    :key="i"
                                >
                                    <v-checkbox
                                        :label="c.title"
                                        color="primary"
                                        :value="c.id"
                                        v-model="categories"
                                        :rules="[ v => !!v.length || 'Select at least one category']"
                                        multiple
                                        hide-details
                                    ></v-checkbox>
                                </v-col>
                            </v-row>
                            <div class="mt-12">
                                <div class="d-md-flex align-center newsletter-search no-underline">
                                    <v-text-field
                                        class="search-news-widget white"
                                        placeholder="Email Address"
                                        hide-details
                                        autocomplete="email"
                                        v-model="email"
                                        :rules="[
                                            v => !!v || 'Email is required',
                                            v =>
                                                /\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/.test(
                                                    v
                                                ) || 'E-mail must be valid'
                                        ]"
                                    >
                                    </v-text-field>
                                    <v-btn type="submit" depressed color="primary">
                                        Subscribe
                                    </v-btn>
                                </div>
                                <small class="error--text ml-10">{{eroor}}</small>
                            </div>
                        </v-form>
                    </v-col>
                </v-row>
            </v-container>
        </div>
        <!-- -----------------------------------------------
        End Newsletter
    ----------------------------------------------- -->
    </div>
</template>

<script>
export default {
    name: "Newsletter",

    components: {},
    data() {
        return {
            email: '',
            eroor: '',
            categories: [],
            webp_support: true
        };
    },
    methods: {
        async sub() {
            if(this.$refs.sub.validate()){
                try {
                    const token = await this.$recaptcha.execute('newsletter')

                    // send token to server alongside your form data
                    this.$axios.post('subscribe-newsletter',{
                        email: this.email,
                        categories: this.categories,
                        recapcha: token
                    })
                    .then(res => {
                        this.$swal({
                            title: "Thank you!",
                            text: res.data.message,
                            icon: "success"
                        });
                        this.$refs.sub.reset()
                    })
                    .catch(err => {
                        if(err.response.status == 422){
                            this.$swal({
                                title: `Error ${err.response.status}!`,
                                text: Object.values(err.response.data.errors)[0][0],
                                icon: "error"
                            });
                        }else{
                            this.$swal({
                                title: `Error ${err.response.status}!`,
                                text: err.response.data.message,
                                icon: "error"
                            });
                        }
                    })

                } catch (error) {
                    console.log('ReCaptcha error:', error)
                    this.$swal({
                        title: 'Error',
                        text: "ReCaptcha Validation error, Please try again later.",
                        icon: "error"
                    });
                }
            }else{
                this.eroor = this.$refs.sub.inputs[4].errorBucket[0]
            }
        }
    },
    mounted(){
        this.webp_support = localStorage.getItem('webp_support')
    },
    async fetch() {
        if(!this.$store.state.latestCategories.length){
            let categories = await this.$axios.$get("/categories");
            this.$store.commit("update_latest_categories", categories);
        }
    },
};
</script>

<style lang="scss">
.newsletter-title {
    color: #031b4e;
}
</style>
