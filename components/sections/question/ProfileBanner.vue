<template>
  <div class="inner-banner-wrapper">
    <div
      class="question-banner-bg"
      :style="{
        backgroundImage: `url('/img/question-bg.png')`,
      }"
    >
      <v-container>
        <!-- -----------------------------------------------
						Start Banner
				----------------------------------------------- -->
        <v-row justify="start">
          <v-col lg="5" md="8" cols="12" class="d-flex align-center">
            <div class="d-flex align-start align-md-center">
              <v-img
                :src="profileData.avatar"
                class="rounded-circle profile-img"
                width="125"
              />
              <div class="ml-9">
                <h2>
                  {{ profileData.fullname }}
                  <span v-if="profileData.badge" class="ml-4 badge success-border">{{profileData.badge}}</span>
                </h2>
                <p>
                    <span v-if="profileData.position">{{profileData.position}}, </span> 
                    <span v-else>Position Unknown, </span>

                    <span v-if="profileData.company">
                        {{profileData.company}}
                    </span>
                    <span v-else>
                        No Company
                    </span>
                </p>
                <div class="d-flex align-center">
                  <!-- <v-btn
                    depressed
                    class="btn-custom-dark font-weight-semibold btn-hover"
                  >
                    Follow
                  </v-btn> -->
                  <v-btn
                    v-if="$auth.loggedIn && $auth.user.id == profileData.id"
                    :to="{name: 'users-username-profile-edit', params: {username: this.$route.params.username}}"
                    depressed
                    class="btn-custom-dark font-weight-semibold btn-hover ml-3"
                  >
                    Edit Profile
                  </v-btn>
                  <div class="d-flex align-center mt-3 ml-5">
                    <a :href="profileData.fb" rel="nofollow noopener" target="_blank" class="mr-3"
                      ><span
                        class="font-30 sprite-img social-icon facebook-hover facebook btn-hover"
                      ></span
                    ></a>
                    <a :href="profileData.twitter" rel="nofollow noopener" target="_blank" class="mr-3"
                      ><span
                        class="font-30 sprite-img social-icon twitter-hover twitter btn-hover"
                      ></span
                    ></a>
                    <a :href="profileData.insta" rel="nofollow noopener" target="_blank" class="mr-3"
                      ><span
                        class="font-30 sprite-img social-icon linkedin-hover linkedin btn-hover"
                      ></span
                    ></a>
                  </div>
                </div>
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
</template>
<script>
export default {
  name: "ProfileBanner",
  props: ["profileData"]
};
</script>

<style  lang="scss">
</style>