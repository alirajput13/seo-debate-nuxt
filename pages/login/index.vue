<template>
    <div
        class="section-bg-img with-login"
        :style="{
            backgroundImage: `url('/img/login-bg.png')`
        }"
    >
        <!-- -----------------------------------------
      Start Question Detail
    ----------------------------------------- -->
        <v-container class="">
            <v-row justify="center" class="with-login">
                <v-col cols="12" lg="5" md="8">
                    <div class="text-center mb-9">
                        <NLink to="/" aria-label="SEO Debate Logo">
                            <span
                                class="theme-logo sprite-img"
                            ></span>
                        </NLink>
                    </div>
                    <v-card class="elevation-0 border-all login-card">
                        <v-card-text>
                            <h1
                                class="banner-title text-blue font-weight-bold text-center"
                            >
                                Login
                            </h1>
                            <p class="text-light-blue mt-4 text-center">
                                to continue to SEODebate
                            </p>
                            <v-form @submit.stop.prevent="login" ref="login" class="login-top-spacer">
                                <v-text-field
                                    class="form-line-control form-line-lg"
                                    label="Enter your email id"
                                    autocomplete="email"
                                    v-model="email"
                                    :rules="[
                                        v => !!v || 'Email is required',
                                        v =>
                                            /\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/.test(
                                                v
                                            ) || 'E-mail must be valid'
                                    ]"
                                    type="email"
                                    outlined
                                    hide-details="auto"
                                ></v-text-field>
                                <v-text-field
                                    type="password"
                                    class="form-line-control form-line-lg"
                                    label="Enter your password"
                                    :rules="[v => !!v || 'Password is required']"
                                    v-model="password"
                                    outlined
                                    autocomplete="current-password"
                                    hide-details="auto"
                                ></v-text-field>
                                <div class="d-flex align-center">
                                    <v-btn
                                        type="submit"
                                        depressed
                                        class="login-btn"
                                        color="primary"
                                    >
                                        Login
                                    </v-btn>
                                    <div class="ml-auto">
                                        <NLink
                                            to="/forgot/"
                                            class="font-weight-semibold text-decoration-none">Forgot password?</NLink>
                                    </div>
                                </div>
                            </v-form>
                            <div class="text-center login-top-spacer">
                                <p class="text-light-blue">
                                    Don't have an account?
                                    <NLink
                                        to="/register/"
                                        class="font-weight-semibold text-decoration-none"
                                        >Create one</NLink
                                    >
                                </p>
                            </div>
                        </v-card-text>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
        <!-- -----------------------------------------
      End Question Detail
    ----------------------------------------- -->
    </div>
</template>
<script>
export default {
    middleware: 'guest',
    head() {
        return {
            title: "Login",
            link: [
                {
                    rel: 'canonical',
                    href: 'https://seodebate.com' + this.$route.path
                }
            ],
            meta: [
                {
                    name: 'robots',
                    content: 'index,follow'
                },
                {
                    name: 'title',
                    content: 'SEO Debate login.'
                }
            ]
        };
    },
    data() {
        return {
            email: '',
            password:'',
            snackbar: false,
            type: 'error',
            text: ''
        };
    },
    methods:{
        async login(){
            if(this.$refs.login.validate()){
                try {
                    const token = await this.$recaptcha.execute('login')

                    // send token to server alongside your form data
                    
                    let data = {
                        email : this.email,
                        password : this.password,
                        recapcha: token
                    }
                    this.$auth.loginWith('laravelJWT', { data })
                    .catch((err) => {
                        if(err.response.status == 422){
                            this.$swal({
                                title: `Error ${err.response.status}!`,
                                text: err.response.data.errors[Object.keys(err.response.data.errors)[0]][0],
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
            }
        }
    },
};
</script>

<style lang="scss">
.with-login {
    min-height: 90vh;
    align-content: center;
}
</style>
