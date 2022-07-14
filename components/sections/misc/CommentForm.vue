<template>
    <div class="add-comment-section mt-0 border-bottom">
       
        <v-form ref="reply" @submit.prevent="reply">
            <v-row>
                <v-col
                    cols="12"
                    md="9"
                    class="d-flex align-stretch mb-6 mb-md-0"
                  >
                    <v-text-field
                      class="form-line-control margin-0"
                      placeholder="Add your comment here"
                      :rules="[v => !!v || 'Please type something first']"
                      v-model="reply_text"
                      outlined
                      hide-details
                    ></v-text-field>
                  </v-col>
                <v-col
                  cols="12"
                  md="3" 
                  class="d-flex align-stretch"
                >
                    <v-btn
                      type="submit"
                      block
                      depressed
                      class="py-11 d-flex align-stretch"
                      color="primary"
                    >
                      Add Comment
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
