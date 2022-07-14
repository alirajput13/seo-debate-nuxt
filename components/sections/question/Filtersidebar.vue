<template>
    <div>
        <!-- My activity -->
        <v-list-group
            class="top-bottom-border-spacer customize-list border-bottom"
            value="m"
            
            :ripple="false"
            v-if="$auth.loggedIn"
        >
            <template v-slot:activator>
                <p class="mb-0 black--text font-18 font-weight-semibold">
                    My activity
                </p>
            </template>

            <div class="checkbox-list">
                <v-checkbox
                    class="mb-0"
                    label="Created or replied to"
                    color="primary"
                    value="by_me"
                    :disabled="disabled"
                    v-model="searchC"
                    hide-details
                ></v-checkbox>
            </div>
        </v-list-group>

        <!-- Contains -->
        <v-list-group
            class="top-bottom-border-spacer customize-list border-bottom"
            value="c"
            
            :ripple="false"
        >
            <template v-slot:activator>
                <p class="mb-0 black--text font-18 font-weight-semibold">
                    Contains
                </p>
            </template>

            <div class="checkbox-list">
                <v-checkbox
                    label="Recommended Answer"
                    color="primary"
                    :disabled="disabled"
                    value="recommended"
                    v-model="searchC"
                    hide-details
                ></v-checkbox>
                <v-checkbox
                    label="Bump Question"
                    color="primary"
                    :disabled="disabled"
                    value="bump"
                    v-model="searchC"
                    hide-details
                ></v-checkbox>
                <v-checkbox
                    label="Featured Questions"
                    color="primary"
                    :disabled="disabled"
                    value="featured"
                    v-model="searchC"
                    hide-details
                ></v-checkbox>
                <v-checkbox
                    class="mb-0"
                    label="Must read Questions"
                    color="primary"
                    :disabled="disabled"
                    value="must_read"
                    v-model="searchC"
                    hide-details
                ></v-checkbox>
            </div>
        </v-list-group>

        <!-- Question Type -->
        <v-list-group
            class="top-bottom-border-spacer customize-list border-bottom"
            value="q"
            
            :ripple="false"
        >
            <template v-slot:activator>
                <p class="mb-0 black--text font-18 font-weight-semibold">
                    Question Type
                </p>
            </template>

            <div class="checkbox-list">
                <v-checkbox
                    label="Recent Question"
                    color="primary"
                    :disabled="disabled"
                    value="recent"
                    v-model="searchC"
                    hide-details
                ></v-checkbox>
                <v-checkbox
                    label="Most Answered"
                    color="primary"
                    :disabled="disabled"
                    value="most_answered"
                    v-model="searchC"
                    hide-details
                ></v-checkbox>
                <v-checkbox
                    label="No Answers"
                    color="primary"
                    :disabled="disabled"
                    v-model="searchC"
                    value="no_answers"
                    hide-details
                ></v-checkbox>
                <v-checkbox
                    class="mb-0"
                    label="Most Visited"
                    color="primary"
                    :disabled="disabled"
                    value="most_viewed"
                    v-model="searchC"
                    hide-details
                ></v-checkbox>
            </div>
        </v-list-group>

        <!-- Details -->
        <v-list-group
            class="top-bottom-border-spacer customize-list border-bottom"
            value="d"
            
            :ripple="false"
        >
            <template v-slot:activator>
                <p class="mb-0 black--text font-18 font-weight-semibold">
                    Details
                </p>
            </template>

            <v-select
                hide-details
                class="customize-input mt-10"
                :items="items"
                item-text="title"
                item-value="id"
                :disabled="disabled"
                v-model="item"
                label="Topic"
                outlined
                clearable
            ></v-select>
        </v-list-group>

        <v-list-group
            class="top-bottom-border-spacer customize-list"
            value="s"
            
            :ripple="false"
        >
            <template v-slot:activator>
                <p class="mb-0 black--text font-18 font-weight-semibold">
                    Search
                </p>
            </template>

            <v-text-field
                label="Type Keywords"
                class="customize-input mt-10"
                outlined
                :loading="disabled"
                v-model="search"
                hide-details
                clearable
            >
                <v-icon class="text-muted" slot="append">
                    mdi-magnify
                </v-icon>
            </v-text-field>
        </v-list-group>
    </div>
</template>

<script>
export default {
    name: "FilterSidebar",
    data() {
        return {
            op: '',
            searchC:'',
            item:'',
            disabled: false,
            search: '',
            _timerId: null
        };
    },
    computed: {
        items() {
            return this.$store.getters.allTopics;
        }
    },
    methods:{
        searchQ(q){
            this.disabled = true
            this.$axios.post('questions/search',q)
            .then(res => {
                // commit to store ?
                this.$store.commit("update_questions", res.data);
                this.$nuxt.$emit('scroll2Q')
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
            .finally(() => {
                this.disabled = false
            })
        },
        reset(){
            if(!this.searchC && !this.item && !this.search){
                this.searchQ({q : ''})
            }
        }
    },
    watch: {
        searchC:function() {
            if(this.searchC){
                this.item = ''
                this.search = ''
                this.searchQ({ q: this.searchC })
            }else{
                this.reset()
            }
        },
        item:function() {
            if(this.item){
                this.searchC = ''
                this.search = ''
                this.searchQ({ q: 'topic', topic: this.item })
            }else{
                this.reset()
            }
        },
        search(val) {
			if (!val) {
                this.reset()
				return;
			}
            this.searchC = ''
            this.item = ''
			// cancel pending call
			clearTimeout(this._timerId);

			// Lazily load input items
			this._timerId = setTimeout(() => {
				this.searchQ({q: 'search', text: this.search})
			}, 700);
		},

    }
};
</script>
