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
        <v-container>
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
                                Register
                            </h1>
                            <p class="text-light-blue mt-4 text-center">
                                to continue to SEODebate
                            </p>
                            <v-form
                                @submit.stop.prevent="register"
                                ref="register"
                                class="login-top-spacer"
                            >
                                <v-text-field
                                    class="form-line-control form-line-lg"
                                    label="Enter first name"
                                    :rules="[
                                        v => !!v || 'First name is required'
                                    ]"
                                    v-model="first_name"
                                    autofocus
                                    autocomplete="given-name"
                                    outlined
                                    hide-details="auto"
                                ></v-text-field>
                                <v-text-field
                                    class="form-line-control form-line-lg"
                                    label="Enter last name"
                                    :rules="[
                                        v => !!v || 'Last name is required'
                                    ]"
                                    v-model="last_name"
                                    outlined
                                    autocomplete="family-name"
                                    hide-details="auto"
                                ></v-text-field>
                                <v-text-field
                                    class="form-line-control form-line-lg"
                                    label="Enter your email id"
                                    autocomplete="email"
                                    :rules="[
                                        v => !!v || 'Email is required',
                                        v =>
                                            /\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/.test(
                                                v
                                            ) || 'E-mail must be valid'
                                    ]"
                                    v-model="email"
                                    type="email"
                                    outlined
                                    hide-details="auto"
                                ></v-text-field>
                                <v-text-field
                                    type="password"
                                    class="form-line-control form-line-lg"
                                    label="Enter your password"
                                    :rules="passwordR"
                                    v-model="password"
                                    outlined
                                    hide-details="auto"
                                ></v-text-field>
                                <v-text-field
                                    type="password"
                                    class="form-line-control form-line-lg"
                                    label="Confirm your password"
                                    :rules="[v => !!v && v == password || 'Passwords don\'t match']"
                                    v-model="password_confirmation"
                                    outlined
                                    hide-details="auto"
                                ></v-text-field>
                                <div class="d-flex align-center">
                                    <v-btn
                                        depressed
                                        type="submit"
                                        class="login-btn"
                                        color="primary"
                                    >
                                        Register
                                    </v-btn>
                                </div>
                            </v-form>
                            <div class="text-center login-top-spacer">
                                <p class="text-light-blue">
                                    Already have an account?
                                    <NLink
                                        to="/login/"
                                        class="font-weight-semibold text-decoration-none"
                                        >Login</NLink
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
            title: "Register",
            link: [
                {
                    rel: 'canonical',
                    href: 'https://seodebate.com' + this.$route.path
                }
            ],
            meta: [
                {
                    name: 'robots',
                    content:'index,follow'
                },
                {
                    name: 'title',
                    content: 'SEO Debate register.'
                }
            ]
        };
    },
    data() {
        return {
            passwordR: [
                v => !!v || "Password is required",
                v => !!v && v.length >= 8 || "Password too short",
                v => !!v && /[a-z]/.test(v) || "Password must contain a letter",
                v => !!v && /[0-9]/.test(v) || "Password must contain a digit",
            ],
            first_name: '',
            last_name: '',
            email: '',
            password: '',
            password_confirmation: '',
        };
    },
    methods: {
        async register() {
            if (this.$refs.register.validate()) {
                try {
                    const token = await this.$recaptcha.execute('register')

                    // send token to server alongside your form data
                    
                    let data = {
                        first_name : this.first_name,
                        last_name : this.last_name,
                        email : this.email,
                        password : this.password,
                        password_confirmation : this.password_confirmation,
                        recapcha: token
                    }
                    this.$axios.post('register',data)
                        .then(res => {
                            this.$swal({
                                title: "Registration Successful",
                                text: res.data.message,
                                icon: "success"
                            });
                            this.$refs.register.reset()
                        })
                        .catch(err => {
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
    mounted(){
        if (this.$auth.$state.loggedIn) {
          return this.$router.push('/')
        }
    }
};
</script>

<style lang="scss"></style>
