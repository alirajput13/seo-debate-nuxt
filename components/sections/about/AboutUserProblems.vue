<template>
  <div class="aboutuserprb-spacer">
    <v-container>
      <v-row justify="center">
        <v-col lg="7" md="10" cols="12">
          <div class="text-center">
            <span class="text-uppercase">About Us</span>
            <h2 class="font-weight-bold text-center section-title pb-12">
              SEODebate aims to solve problems that users are facing.
            </h2>
          </div>
          <div class="mt-12">
            <div class="d-flex align-start pb-10">
              <span class="flex-shrink-0 sprite-img arrow-img"></span>
              <p class="ml-5 font-18">
                A Q&A platform with SEO experts on hand at all hours of the day.
                If you run into problems or need tips for optimizing your
                website, you can utilize our service and find practical
                solutions.
              </p>
            </div>
            <div class="d-flex align-start py-10">
              <span class="flex-shrink-0 sprite-img arrow-img"></span>
              <p class="ml-5 font-18">
                Step-by-step guidelines. There's plenty of information about SEO
                on the internet, but it can be difficult for beginners to
                navigate. SEODebate is completely beginner friendly, and we can
                teach people how to optimize websites for their clients and
                personal blogs.
              </p>
            </div>
            <div class="d-flex align-start py-10">
              <span class="flex-shrink-0 sprite-img arrow-img"></span>
              <p class="ml-5 font-18">
                Templates, tools, and resources. When you start out in the SEO
                field, you may have to create templates for reports, competitive
                analysis, audits, proposals, etc. SEODebate streamlines this
                process by offering templates and resources to download. This
                can help you save time and show more productivity to your
                clients.
              </p>
            </div>
            <div class="d-flex align-start py-10">
              <span class="flex-shrink-0 sprite-img arrow-img"></span>
              <p class="ml-5 font-18">
                Articles and posts about the latest SEO trends. Anyone working
                in this field is aware that search engines update their
                algorithms very frequently. Therefore, your optimization
                strategies are also subject to constant change. SEODebate helps
                you keep up with the latest trends and changes in the
                algorithms.
              </p>
            </div>
            <div class="d-flex align-start py-10">
              <span class="flex-shrink-0 sprite-img arrow-img"></span>
              <p class="ml-5 font-18">
                Visual content and tutorials. Topics such as writing a meta-
                description and optimizing SPA website can be difficult for
                users to grasp from reading alone. Therefore, we’ve created
                videos to help you streamline your SEO process.
              </p>
            </div>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<script>
export default {
  name: "AboutUserProblems",
  data() {
    return {
      imgshow: true,
    };
  }
};
</script>

<style  lang="scss">
.aboutuserprb-spacer {
  padding: 80px 0 120px;
}

@media (min-width: 768px) and (max-width: 1023px) {
  .aboutuserprb-spacer {
    padding: 80px 0 40px;
  }
}

@media (max-width: 767px) {
  .aboutuserprb-spacer {
    padding: 80px 0 40px;
  }
}
</style>