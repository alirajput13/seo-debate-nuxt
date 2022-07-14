<template>
    <v-form @submit.prevent="postAnswer">
        <ClientOnly>
            <!-- Use the component in the right place of the template -->
            <tiptap-vuetify
                v-model="content"
                :extensions="extensions"
                placeholder="Write your answer..."
                @keydown="checkError"
                class="tiptop-editor"
                id="tiptop-editor"
            />

            <template #placeholder>
                Loading...
            </template>
        </ClientOnly>
        <div class="d-flex align-center">
            <small v-if="error" class="error--text ml-10">{{error}}</small>
            <v-btn
                color="primary"
                type="submit"
                class="ml-auto mt-10 mr-10 mb-10">
                Submit
            </v-btn>
        </div>
    </v-form>
</template>

<script>
import {
    TiptapVuetify,
    Heading,
    Bold,
    Italic,
    BulletList,
    ListItem,
    Link,
    History
} from "tiptap-vuetify";
export default {
    components: { TiptapVuetify },
    props:{
        question:{
            type: Number,
            default: 1
        }
    },
    data: () => ({
        extensions: [
            Bold, Italic, ListItem, BulletList, Link,
            [
                Heading, {
                options: {
                    levels: [2, 3 ]
                }
            }],
            History
        ],
        showContent: false,
        // starting editor's content
        content: ``,
        error: ''
    }),
    methods:{
        checkError(){
            if(this.content.replace(/<[^>]*>?/gm, '')){
                this.error = ""
            }
        },
        postAnswer(){

            if(!this.$auth.loggedIn){
                this.$nuxt.$emit('loginBox')
                return
            }
            // alert('Post!!!')
            if(!this.content.replace(/<[^>]*>?/gm, '')){
                this.error = "Answer body can\'t be empty"
                return
            }
            this.$axios.post('answer',{
                question: this.question,
                body: this.content
            })
            .then((res) => {
                this.content = ""
                this.$nuxt.$emit('answered',res.data)
            })
            .catch((err) => {
                this.$swal({
                    title: `Error ${err.response.status}!`,
                    text: err.response.data.message,
                    icon: "error"
                });
            })
        },
    }
};
</script>
<style lang="scss">
.tiptop-editor{
    .v-card{
      box-shadow:none!important;
      border:0;
    }
    .theme--light.v-toolbar.v-sheet{
      border-bottom:1px solid rgba(0,0,0,0.1);
      border-radius: 5px;
    }
}
</style>
