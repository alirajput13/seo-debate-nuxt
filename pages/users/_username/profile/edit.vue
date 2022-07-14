<template>
    <div>
        <div class="inner-banner-wrapper">
            <div
                class="question-banner-bg"
                :style="{
                    backgroundImage: `url('/img/question-bg.png')`
                }"
            >
                <v-container>
                    <!-- -----------------------------------------------
						Start Banner
				----------------------------------------------- -->
                    <v-row justify="start">
                        <v-col
                            lg="5"
                            md="8"
                            cols="12"
                            class="d-flex align-center"
                        >
                            <div class="d-flex align-start align-md-center">
                                <div class="position-relative">
                                    <v-img
                                        :src="previewURL || profileData.avatar"
                                        class="rounded-circle profile-img"
                                        width="100"
                                    />
                                    <div class="with-overlay">
                                        <div class="text-center">
                                            <v-icon v-if="!previewURL" class="white--text"
                                                >mdi-camera</v-icon
                                            >
                                            <input
                                                v-if="!previewURL"
                                                type="file"
                                                @change="previewImage"
                                                class="inputfile pointer"
                                                accept="image/*"
                                            />
                                            <div v-if="!previewURL" class="white--text">
                                                change
                                            </div>
                                            <div @click="save" style="cursor:pointer" v-if="previewURL" class="white--text">
                                                save
                                            </div>
                                            <div @click="removeImage" style="cursor:pointer" v-if="previewURL" class="white--text">
                                                remove
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="ml-9">
                                    <h2>
                                        {{profileData.fullname}}
                                        <span v-if="profileData.badge" class="ml-4 badge success-border"
                                            >{{profileData.badge}}</span
                                        >
                                    </h2>
                                    <p>{{profileData.position || 'Unknown Position'}} {{profileData.company || 'No Company'}}</p>
                                </div>
                            </div>
                        </v-col>
                    </v-row>
                    <!-- -----------------------------------------------
						Start Banner
				----------------------------------------------- -->
                </v-container>
            </div>
        </div>
        <div
            class="section-bg-img"
            :style="{
                backgroundImage: `url('/img/article-bg.jpg')`
            }"
        >
            <!-- -----------------------------------------
      Profile Section
      ----------------------------------------- -->
            <EditProfileBannerTabCard :profileData="profileData" />
            <Newsletter />
        </div>
    </div>
</template>

<script>
export default {
    middleware: 'auth',
    head() {
        return {
            title: "User Profile Detail",
            meta: [
                {
                    hid: "Question Author description",
                    name: "SEO Debate",
                    content: "SEO Debate is the best way"
                }
            ]
        };
    },
    data(){
        return{
            profileData: {},
            previewURL: null,
            file: {}
        }
    },
    methods: {
        previewImage(event) {
            // Reference to the DOM input element
            var input = event.target;
            // Ensure that you have a file before attempting to read it
            if (input.files && input.files[0]) {
                this.file = input.files[0]
                this.previewURL = URL.createObjectURL(input.files[0])
            }
        },
        removeImage(){
            this.previewURL = null
        },
        save(){
            let formData = new FormData
            formData.append('avatar', this.file)

            this.$axios.$post(
                'user/avatar',
                formData,
                {"content-type": "multipart/form-data"}
            )
            .then(res => {
                this.$auth.fetchUser()
                this.previewURL = null
                this.profileData.avatar = res

                this.$swal({
                    title: "Success!",
                    text: 'Your profile image was updated successfully.',
                    icon: "success",
                });
            })
            .catch(err => {
                this.$swal({
                    title: "Error!",
                    text: err.response.data.message,
                    icon: "error",
                });
            })
        }
    },
    async fetch() {
        this.profileData = await this.$axios.$get(`/user/${this.$route.params.username}`);
    },
    components: {
        ProfileBanner: () =>
            import("@/components/sections/question/ProfileBanner"),
        Newsletter: () => import("@/components/sections/shared/Newsletter"),
        EditProfileBannerTabCard: () =>
            import("@/components/sections/question/EditProfileBannerTabCard")
    },
    mounted() {}
};
</script>
