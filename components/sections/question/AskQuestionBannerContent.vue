<template>
  <div>
      <h1 class="line-title font-weight-bold">{{$store.state.questionLayout.header1}}</h1>
      <p class="font-16">{{$store.state.questionLayout.sub1}}</p>
      <v-row class="meta-counter-widget">
        <v-col cols="4" class="text-center text-md-left">
          <span class="font-16">Questions</span>
          <p class="meta-digits font-weight-bold">{{$store.state.questionLayout.questions || '00'}}</p>
        </v-col>
        <v-col cols="4" class="text-center text-md-left">
          <span class="font-16">Answers</span>
          <p class="meta-digits font-weight-bold">{{$store.state.questionLayout.answers || '00'}}</p>
        </v-col>
        <v-col cols="4" class="text-center text-md-left">
          <span class="font-16">Users</span>
          <p class="meta-digits font-weight-bold">{{$store.state.questionLayout.users || '00'}}</p>
        </v-col>
      </v-row>
  </div>
</template>
<script>
export default {
  name: "AskQuestionBannerContent"
};
</script>