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
                                Password Reset
                            </h1>
                            <p class="text-light-blue mt-4 text-center">
                                to continue to SEODebate
                            </p>
                            <v-form
                                ref="reset"
                                @submit.prevent="reset"
                                class="login-top-spacer"
                            >
                                <v-text-field
                                    class="form-line-control form-line-lg mb-0 mt-3 font-16"
                                    placeholder="Enter new password here"
                                    type="password"
                                    v-model="password"
                                    :rules="passwordR"
                                    outlined
                                    hide-details="auto"
                                ></v-text-field>
                                <v-text-field
                                    class="form-line-control form-line-lg mb-0 mt-3 font-16"
                                    placeholder="Re-enter password here"
                                    type="password"
                                    v-model="password_confirmation"
                                    :rules="[v => !!v && v == password || 'Passwords don\'t match']"
                                    outlined
                                    hide-details="auto"
                                ></v-text-field>
                                <div class="d-flex align-center">
                                    <v-btn
                                        depressed
                                        class="login-btn"
                                        color="primary"
                                        type="submit"
                                    >
                                        Recover Password
                                    </v-btn>
                                </div>
                            </v-form>
                            <div class="text-center login-top-spacer">
                                <p class="text-light-blue">
                                    Back to
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
    head() {
        return {
            title: "Reset Password?",
            meta: [
                {
                    hid: "Reset Password",
                    name: "SEO Debate",
                    content: "SEO Debate is the best way"
                }
            ]
        };
    },
    data() {
        return {
            password:'',
            password_confirmation:'',
            passwordR: [
                v => !!v || "Password is required",
                v => !!v && v.length >= 8 || "Password too short",
                v => !!v && /[a-z]/.test(v) || "Password must contain a letter",
                v => !!v && /[0-9]/.test(v) || "Password must contain a digit",
            ],
        };
    },
    methods:{
        async reset(){
            if (this.$refs.reset.validate()) {
                try {
                    const token = await this.$recaptcha.execute('resetPass')

                    // send token to server alongside your form data
                    
                    let data = {
                        email : this.$route.query.email,
                        token : this.$route.query.token,
                        password : this.password,
                        password_confirmation : this.password_confirmation,
                        recapcha: token
                    }
                    this.$axios.post('reset-password',data)
                        .then(res => {
                            this.$swal({
                                title: "Success!",
                                text: res.data.message,
                                icon: "success",
                                confirmButtonText: "Login here"
                            })
                            .then(() => {
                                this.$router.push({name: 'login'})
                            })
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
    }
};
</script>