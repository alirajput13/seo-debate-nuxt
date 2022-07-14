<template>
    <v-form ref="search" @submit.prevent="search" class="search-container">
        <!-- -----------------------------------------------
        Start Banner Search
    ----------------------------------------------- -->
        <v-text-field
            class="search-widget"
            placeholder="Search anything"
            hide-details="auto"
            v-model="value"
            autocomplete="off"
            prepend-icon="mdi-magnify"
            solo
        >
            <!-- <template v-slot:item="data">
                <v-list-item-content>
                    <v-list-item-title
                        v-html="data.item.title"
                    ></v-list-item-title>
                    <v-list-item-subtitle
                        v-html="data.item.badgetext"
                    ></v-list-item-subtitle>
                </v-list-item-content>
            </template> -->
        </v-text-field>
        <button type="submit" aria-label="Search" hidden></button>
        <!-- -----------------------------------------------
        End Banner Search
    ----------------------------------------------- -->
    </v-form>
</template>

<script>
export default {
    name: "BannerSearch",
    data: () => ({
        value: ""
    }),
    methods: {
        search(){
            if(this.value){
                // Check if already in search page 
                this.$nuxt.$emit('hideSearchBar')
                if(this.$route.name == 'search'){
                    this.$nuxt.$emit('SearchNow', this.value)
                }
                else{
                    this.$router.push({name:'search', query:{q: this.value}})
                }
            }
        }
    }
};
</script>
