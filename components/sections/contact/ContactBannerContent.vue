<template>
    <div>
        <v-row justify="start">
            <v-col lg="8" cols="12">
                <h1 class="line-title font-weight-bold">
                    Have something to share or question? Don’t hesitate to
                    contact us.
                </h1>
            </v-col>
        </v-row>
        <v-card class="border-all z-2">
            <v-card-text>
                <v-form ref="contact" @submit.prevent="contact">
                    <v-row>
                        <v-col cols="12" md="6" class="pb-0">
                            <label class="font-weight-bold text-blue"
                                >First Name</label
                            >
                            <v-text-field
                                class="form-line-control mt-4"
                                outlined
                                v-model="first"
                                :rules="[ v => !!v || 'First name is required' ]"
                                hide-details="auto"
                            ></v-text-field>
                        </v-col>
                        <v-col cols="12" md="6" class="pb-0">
                            <label class="font-weight-bold text-blue"
                                >Last Name</label
                            >
                            <v-text-field
                                class="form-line-control mt-4"
                                outlined
                                v-model="last"
                                :rules="[ v => !!v || 'Lirst name is required' ]"
                                hide-details="auto"
                            ></v-text-field>
                        </v-col>
                        <v-col cols="12" md="6" class="py-0">
                            <label class="font-weight-bold text-blue"
                                >Email Address</label
                            >
                            <v-text-field
                                class="form-line-control mt-4"
                                type="email"
                                autocomplete="email"
                                outlined
                                v-model="email"
                                :rules="[
                                    v => !!v || 'Email is required',
                                    v =>
                                        /\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/.test(
                                            v
                                        ) || 'Email must be valid'
                                ]"
                                hide-details="auto"
                            ></v-text-field>
                        </v-col>
                        <v-col cols="12" md="6" class="py-0">
                            <label class="font-weight-bold text-blue"
                                >Phone</label
                            >
                            <v-text-field
                                class="form-line-control mt-4"
                                outlined
                                v-model="phone"
                                hide-details="auto"
                            ></v-text-field>
                        </v-col>
                        <v-col cols="12" class="py-0">
                            <label class="font-weight-bold text-blue"
                                >Why would you like to get in touch?</label
                            >
                            <v-select
                                class="form-line-control mt-4"
                                outlined
                                v-model="reason"
                                :rules="[ v => !!v || 'Please select a reason' ]"
                                hide-details="auto"
                                :items="items"
                            >
                            </v-select>
                        </v-col>
                        <v-col cols="12" class="py-0">
                            <label class="font-weight-bold text-blue"
                                >Message</label
                            >
                            <v-textarea
                                class="form-line-control mt-4"
                                outlined
                                v-model="msg"
                                :rules="[ v => !!v || 'Please type your message first' ]"
                                hide-details="auto"
                            ></v-textarea>
                        </v-col>
                    </v-row>
                    <v-btn
                        depressed
                        color="primary"
                        class="mt-10 btn-custom-md font-16"
                        type="submit"
                    >
                        Send Message
                    </v-btn>
                </v-form>
            </v-card-text>
        </v-card>
    </div>
</template>
<script>
export default {
    name: "ContactBannerContent",
    data() {
        return {
            items: [
                "I want to submit resource",
                "I want to submit file",
                "I want to submit zip",
                "I want to submit pdf"
            ],
            first: '',
            last: '',
            email: '',
            phone: '',
            reason: '',
            msg: '',
        };
    },
    methods:{
        async contact(){
            if(this.$refs.contact.validate()){
                try {
                    const token = await this.$recaptcha.execute('contact')

                    // send token to server alongside your form data
                    
                    let data = {
                        first : this.first,
                        last : this.last,
                        email : this.email,
                        phone : this.phone,
                        reason : this.reason,
                        msg : this.msg,
                        recapcha: token
                    }
                    this.$axios.post('contact',data)
                        .then(res => {
                            this.$swal({
                                title: "Thanks for contacting!",
                                text: res.data.message,
                                icon: "success"
                            });
                            this.$refs.contact.reset()
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
                }
                catch (error) {
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

<style lang="scss">
.btn-custom-md {
    height: 50px !important;
    padding: 0 39px !important;
    min-width: 180px !important;
}
.z-2 {
    z-index: 2;
}
</style>
