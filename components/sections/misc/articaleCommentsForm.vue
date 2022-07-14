<template>
    <div class="article-spacer">
        <div class="article-spacer-title blue--text">
            Leave a reply
        </div>
        <v-form ref="reply" @submit.prevent="reply">
            <v-row>
                <v-col cols="12" md="12" class="py-0">
                    <v-textarea
                        class="form-line-control"
                        label="Message"
                        :rules="[v => !!v || 'Please type something first']"
                        v-model="reply_text"
                        outlined
                        hide-details="auto"
                    ></v-textarea>
                </v-col>
                <v-col cols="12" class="py-0">
                    <v-checkbox
                        label="Participate in the conversation via email"
                        color="primary"
                        value="indigo"
                        hide-details
                      ></v-checkbox>
                    <v-btn
                        type="submit"
                        depressed
                        color="primary"
                        class="mt-12"
                    >
                        Submit
                    </v-btn>
                </v-col>
            </v-row>
        </v-form>
    </div>
</template>

<script>
export default {
    data(){
        return {
            reply_text: ''
        }
    },
    props:['id', 'link', 'action'],
    methods:{
        async reply(){
            if(this.$auth.loggedIn){
                if(this.$refs.reply.validate()){

                    try {
                        const token = await this.$recaptcha.execute(this.action)
                        // Post reply
                        let data = {
                            id : this.id,
                            comment : this.reply_text,
                            recapcha : token
                        }
                        this.$axios.$post(this.link,data)
                        .then((res) => {
                            this.$refs.reply.reset()
                            this.$nuxt.$emit('replied',res)
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
            }else{
                this.$nuxt.$emit('loginBox')
            }
        },
    }
};
</script>
