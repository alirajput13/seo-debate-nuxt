<template>
    <div class="c2a-section">
        <!-- -----------------------------------------------
	        Start C2a
	    ----------------------------------------------- -->
        <v-card class="c2a-card primary">
            <v-card-text>
                <div class="d-md-flex align-center">
                    <v-btn fab color="warning" class="elevation-0">
                        <span class="sprite-img c2a-comment-icon"></span>
                    </v-btn>
                    <div class="ml-0 ml-md-8 my-4 my-md-0">
                        <p
                            class="font-weight-semibold font-18 white--text mb-0"
                        >
                            Unable to find what you are looking for?
                        </p>
                        <p
                            class="font-weight-semibold font-18 white--text mb-0"
                        >
                            Try asking the Community.
                        </p>
                    </div>
                    <div class="ml-auto text-right mt-8 mt-md-0">
                        <!-- <v-btn text class="white primary--text font-weight-bold">
              Ask Now
            </v-btn> -->
                        <v-btn
                            text
                            class="white primary--text font-weight-bold"
                            @click="ask"
                            >Ask</v-btn
                        >
                    </div>
                </div>
            </v-card-text>
        </v-card>
        <!-- -----------------------------------------------
	        End C2a
	    ----------------------------------------------- -->
    </div>
</template>

<script>
export default {
    name: "C2a",
    methods: {
        ask() {
            this.$nuxt.$emit("AskQuestionOpen");
        }
    }
};
</script>
