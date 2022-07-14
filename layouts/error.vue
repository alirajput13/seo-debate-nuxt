<template>
   <v-container >
    <v-row justify="center" align="center" class="errorpage">
      <v-col cols="12" sm="8" md="12" class="align-stretch">
        <div class="text-center">
           <h1 v-if="error.statusCode === 404">
              {{ pageNotFound }}
            </h1>
            <h1 v-else>
              {{ otherError }}
            </h1>
            <v-btn color="primary" nuxt to="/" rounded x-large elevation="0">
              Back To home
            </v-btn>
        </div>
      </v-col>
    </v-row>
    </v-container>    
  
</template>

<script>
export default {
  layout: 'empty',
  props: {
    error: {
      type: Object,
      default: null
    }
  },
  data () {
    return {
      pageNotFound: '404 Not Found',
      otherError: 'An error occurred'
    }
  },
  head () {
    const title = this.error.statusCode === 404 ? this.pageNotFound : this.otherError
    return {
      title
    }
  }
}
</script>

<style>
.errorpage{
  height:70vh;
}
h1 {
  font-size: 70px;
}
</style>
