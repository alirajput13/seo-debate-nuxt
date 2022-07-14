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
                                Forgot Password?
                            </h1>
                            <p class="text-light-blue mt-4 text-center">
                                to continue to SEODebate
                            </p>
                            <v-form
                                ref="forgot"
                                @submit.prevent="forgot"
                                class="login-top-spacer"
                            >
                                <v-text-field
                                    class="form-line-control form-line-lg"
                                    label="Enter your email id"
                                    outlined
                                    v-model="email"
                                    :rules="[
                                        v => !!v || 'Email is required',
                                        v =>
                                            /\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/.test(
                                                v
                                            ) || 'E-mail must be valid'
                                    ]"
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
            title: "Forgot Password?",
            meta: [
                {
                    hid: "Forgot Password",
                    name: "SEO Debate",
                    content: "SEO Debate is the best way"
                }
            ]
        };
    },
    data() {
        return {
            email:''
        };
    },
    methods:{
        async forgot(){
            if (this.$refs.forgot.validate()) {
                try {
                    const token = await this.$recaptcha.execute('fPass')

                    // send token to server alongside your form data
                    
                    let data = {
                        email : this.email,
                        recapcha: token
                    }
                    this.$axios.post('forgot-password',data)
                        .then(res => {
                            this.$swal({
                                title: "Link Sent!",
                                text: res.data.message,
                                icon: "success"
                            })
                            this.$refs.forgot.reset()
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

<style lang="scss"></style>
