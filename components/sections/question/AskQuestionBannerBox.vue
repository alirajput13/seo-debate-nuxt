<template>
    <div class="d-flex w-100 align-center">
        <span class="sprite-img ask-question-img d-none d-lg-block"></span>
        <v-card
            class="ask-question-banner no-underline elevation-0 border-all w-100"
        >
            <div class="browser-actions">
                <v-icon color="error">mdi-brightness-1</v-icon>
                <v-icon color="warning">mdi-brightness-1</v-icon>
                <v-icon color="success">mdi-brightness-1</v-icon>
            </div>
            <v-textarea
                name="askquestion"
                placeholder="Ask a Question"
                rows="3"
                v-model="title"
                class="font-weight-semibold text-blue"
                no-resize
            ></v-textarea>
            <div class="text-right">
                <v-btn color="primary" @click="showDialog">Ask</v-btn>
                <v-dialog v-model="dialog" persistent max-width="700px">
                    <v-card>
                        <v-card-title class="headline">
                            Ask Question
                            <div class="ml-auto">
                                <v-btn icon @click="dialog = false">
                                    <v-icon>mdi-close</v-icon>
                                </v-btn>
                            </div>
                        </v-card-title>
                        <v-form ref="askQuestion" @submit.prevent="askQuestion">
                            <v-card-text class="mt-5 border-top pt-10">
                                <v-row no-gutters class="mt-4">
                                    <v-col cols="12" md="12" class="py-0">
                                        <v-text-field
                                            class="form-line-control with-icon"
                                            outlined
                                            label="Question Title"
                                            prepend-inner-icon="mdi-comment-text-outline"
                                            v-model="title"
                                            :rules="[ v => !!v || 'Question title is required', v => v.length > 15 || 'Question title too short']"
                                            hide-details="auto"
                                        ></v-text-field>
                                    </v-col>
                                    <v-row class="my-4">
                                        <v-col cols="12" md="6" class="py-0">
                                            <v-select
                                                :items="categories"
                                                class="form-line-control with-icon"
                                                outlined
                                                label="Category"
                                                v-model="category"
                                                item-text="title"
                                                item-value="id"
                                                :rules="[ v => !!v || 'Please select a category for your question' ]"
                                                prepend-inner-icon="mdi-checkbox-multiple-blank-circle-outline"
                                                hide-details="auto"
                                            ></v-select>
                                        </v-col>
                                        <v-col cols="12" md="6" class="py-0">
                                            <v-autocomplete
                                                class="form-line-control with-icon"
                                                hide-details="auto"
                                                label="Topics"
                                                v-model="topic"
                                                outlined
                                                chips
                                                small-chips
                                                multiple
                                                item-text="title"
                                                item-value="id"
                                                :items="topics"
                                                prepend-inner-icon="mdi-format-list-bulleted"
                                            >
                                            </v-autocomplete>
                                        </v-col>
                                    </v-row>
                                    <v-col cols="12" md="12" class="py-0">
                                        <div class="border-all rounded mb-8">
                                            <ClientOnly>
                                            <!-- Use the component in the right place of the template -->
                                            <tiptap-vuetify
                                                v-model="content"
                                                :extensions="extensions"
                                                placeholder="Type here..."
                                                class="tiptop-editor"
                                                rows="5"
                                                required
                                            />

                                            <template #placeholder> Loading... </template>
                                            </ClientOnly>
                                        </div>
                                    </v-col>
                                    <v-col cols="12" md="12" class="py-0">
                                        <v-checkbox
                                            class="mt-0 mb-5 custom-label"
                                            label="Do you have a video related to this question?"
                                            color="primary"
                                            v-model="has_video"
                                            hide-details="auto"
                                        ></v-checkbox>
                                    </v-col>
                                    <v-fade-transition>
                                        <v-row class="mt-4" v-if="has_video">
                                            <v-col cols="12" md="6" class="py-0">
                                                <v-select
                                                    :items="videoitems"
                                                    class="form-line-control with-icon"
                                                    outlined
                                                    label="Video Type"
                                                    prepend-inner-icon="mdi-video"
                                                    v-model="video_type"
                                                    :rules="has_video ? [v => !!v || 'Video type is required'] : []"
                                                    hide-details="auto"
                                                ></v-select>
                                            </v-col>
                                            <v-col cols="12" md="6" class="py-0">
                                                <v-text-field
                                                    class="form-line-control with-icon"
                                                    outlined
                                                    label="Video URL"
                                                    v-model="video_id"
                                                    prepend-inner-icon="mdi-play-box-outline"
                                                    :rules="has_video ? video_rule : []"
                                                    hide-details="auto"
                                                ></v-text-field>
                                            </v-col>
                                        </v-row>
                                    </v-fade-transition>
                                    <v-col cols="12" md="12" class="py-0">
                                        <v-checkbox
                                            class="mt-0 mb-6 custom-label"
                                            label="Get notified by email when someone answers this question"
                                            color="primary"
                                            hide-details
                                            v-model="get_notified"
                                        ></v-checkbox>
                                    </v-col>
                                    <v-col cols="12" md="12" class="py-0">
                                        <v-checkbox
                                            class="mt-0 mb-6 custom-label"
                                            label="By asking your question, you agree to the Terms of Service and Privacy Policy"
                                            color="primary"
                                            v-model="terms"
                                            :rules="[v => !!v || 'Required']"
                                            hide-details="auto"
                                        ></v-checkbox>
                                    </v-col>
                                    <v-col cols="12" md="12" class="mt-6">
                                        <v-btn type="submit" color="primary" block>
                                            Publish Your Question
                                        </v-btn>
                                    </v-col>
                                </v-row>
                            </v-card-text>
                        </v-form>
                    </v-card>
                </v-dialog>
            </div>
        </v-card>
    </div>
</template>
<script>
import {
  TiptapVuetify,
  Bold,
  Italic,
  BulletList,
  ListItem,
  Link,
  History,
  Heading
} from "tiptap-vuetify";
export default {
    name: "AskQuestionBannerBox",
    data() {
        return {
            dialog: false,
            categories: [
                "Identification",
                "Technical Seo",
                "On Page Seo",
                "Off Page Seo"
            ],
            topics: [],
            values: [],
            videoitems: ["Youtube"],
            title: "",
            category: "",
            topic: [],
            content: "",
            has_video: false,
            video_type: "Youtube",
            video_id: "",
            video_rule: [
                v => !!v || 'Video URL is required',
                v => !!v && /^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/.test(v) || 'Please provide a valid link'
            ],
            get_notified: false,
            terms: false,
            // declare extensions you want to use
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
            showContent: true,
        };
    },
    methods: {
        async askQuestion(){
            if(this.$refs.askQuestion.validate()){
                if(this.htmlToText(this.content) === ''){
                    this.$swal({
                        title: `Validation error!`,
                        text: "Question body can\'t be empty!",
                        icon: "error"
                    });
                    return
                }
                try {
                    const token = await this.$recaptcha.execute('question')

                    // send token to server alongside your form data

                    let data = {
                        title: this.title,
                        body: this.content,
                        category: this.category,
                        topics: this.topic,
                        has_video: this.has_video ? 1 : 0,
                        video_type: this.video_type,
                        video_id: this.video_id,
                        get_notified: this.get_notified,
                        terms: this.terms,
                        recapcha: token
                    }
                    this.$axios.post('questions',data)
                    .then(res => {
                        this.$swal({
                            title: `Success!`,
                            text: res.data.message,
                            icon: "success"
                        });
                        this.$store.commit('add_new_question', res.data.question)
                        // Reset - auto reset creates error
                        this.title = ''
                        this.category = ''
                        this.topic = []
                        this.content = ''
                        this.has_video = false
                        this.video_type = ''
                        this.video_id = ''
                        this.dialog = false
                    })
                    .catch(err => {
                        this.$swal({
                            title: `Error ${err.response.status}!`,
                            text: err.response.data.message,
                            icon: "error"
                        });
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
        },
        showDialog(){
            if(this.$auth.loggedIn){
                this.dialog = true
            }else{
                this.$nuxt.$emit('loginBox')
            }
        },
        htmlToText (html) {
            return html.replace(/<[^>]*>?/gm, '')
        },
    },
    mounted() {
        this.$nuxt.$on("AskQuestionOpen", () => {
            this.dialog = true;
        });
    },
    components: {
        TiptapVuetify
    },
    watch:{
        async dialog(){
            if(this.dialog){
                this.topics = await this.$axios.$get('types')
                this.categories = await this.$axios.$get('categories')
            }
        }
    }
};
</script>

<style lang="scss">
.ask-question-banner {
    padding: 5px 15px 15px 15px !important;
    .browser-actions {
        .v-icon {
            font-size: 16px !important;
        }
    }
}
.tiptap-vuetify-editor .ProseMirror {
    min-height: 90px;
}
</style>
