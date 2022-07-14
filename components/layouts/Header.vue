<template>
    <div>
        <!-- -----------------------------------------------
          Start Header
    ----------------------------------------------- -->
        <v-app-bar
            :class="
                ['about', 'contact'].includes($route.name)
                ? 'header2'
                : 'not done'
            "
            app
            fixed
            class="app-header"
            color="white"
            flat
            elevate-on-scroll
        >
            <v-container class="py-0 fill-height px-sm-0">
                <!-- Logo -->
                <Logo />
                <v-spacer></v-spacer>
                <!-- Desktop view Navigation -->
                <Navigation :data="links" class="d-none d-lg-flex" />

                <v-spacer></v-spacer>
                <!-- Search icon -->
                <div class="header-search-icon">
                    <v-btn
                        icon
                        small
                        class="mr-5"
                        @click="showheaderSearch = !showheaderSearch"
                    >
                        <v-icon>mdi-magnify</v-icon>
                    </v-btn>
                    <div class="header-search" v-if="showheaderSearch">
                        <BannerSearch />
                        <v-btn
                            icon
                            small
                            class="mr-5 serch-btn"
                            @click="showheaderSearch = !showheaderSearch"
                        >
                            <v-icon>mdi-close</v-icon>
                        </v-btn>
                    </div>
                </div>
                <!-- Search icon -->
                <!---Notification -->
                <!-- <v-menu
                    class="d-none d-md-block"
                    bottom
                    left
                    offset-y
                    open-on-hover
                    origin="top right"
                    >
                    <template v-slot:activator="{ on }">
                        <v-btn
                        icon
                        v-on="on"
                        class="mr-1 text-light-blue d-none d-md-block"
                        >
                        <v-icon>mdi-bell</v-icon>
                        </v-btn>
                    </template>

                    <v-list class="first-dd">
                        <h4 class="pa-8 font-weight-semibold font-18 pt-5">
                        Notifications
                        </h4>
                        <v-divider></v-divider>
                        <v-list-item
                        v-for="(item, i) in notifications"
                        :key="i"
                        @click="href"
                        >
                        <v-list-item-title>
                            <div class="d-flex align-center py-6">
                            <div class>
                                <v-btn
                                class="mr-6"
                                depressed
                                fab
                                small
                                dark
                                :color="item.iconbg"
                                >
                                <v-icon dark>{{ item.icon }}</v-icon>
                                </v-btn>
                            </div>
                            <div>
                                <h4 class="font-weight-semibold mb-2">{{ item.title }}</h4>
                                <span
                                class="text-light-blue font-15 d-block text-truncate"
                                >{{ item.desc }}</span
                                >
                                <small class="text-light-blue">{{ item.time }}</small>
                            </div>
                            </div>
                        </v-list-item-title>
                        </v-list-item>
                    </v-list>
                    </v-menu> -->
                <!---Notification -->
                <!-- profile -->
                <v-menu
                    bottom
                    left
                    open-on-hover
                    offset-y
                    origin="top right"
                    class="d-none d-md-block first-dd"
                    v-if="$auth.loggedIn"
                >
                    <template v-slot:activator="{ on }">
                        <v-btn icon v-on="on" class="mr-1 d-none d-md-block">
                            <v-avatar size="40">
                                <img
                                    :src="$auth.user.avatar"
                                    :alt="$auth.user.username"
                                />
                            </v-avatar>
                        </v-btn>
                    </template>

                    <v-list>
                        <v-list-item nuxt :to="$auth.user.profile">
                            <v-list-item-title class="text-light-blue">
                                My Profile
                            </v-list-item-title>
                        </v-list-item>
                        <v-list-item @click="logout">
                            <v-list-item-title class="text-light-blue">
                                Logout
                            </v-list-item-title>
                        </v-list-item>
                    </v-list>
                </v-menu>
                <!-- profile -->
                <!-- login-regiter -->
                <v-btn
                    class="d-none d-lg-flex btn-hover"
                    color="primary"
                    nuxt
                    to="/login/"
                    elevation="0"
                    v-else
                >
                    Login - Register
                </v-btn>
                <!-- Mobile Hamburger button -->
                <div class="d-block d-lg-none">
                    <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
                </div>
                <v-dialog v-model="dialog" persistent max-width="600px">
                    <v-card>
                        <v-card-title class="headline">
                            <div>
                                <h4
                                    class="font-weight-bold banner-title text-h4 text-blue mb-4"
                                >
                                    Login
                                </h4>
                                <p class="text-light-blue mt-4 text-center body-1">
                                    to continue to SEODebate
                                </p>
                            </div>
                            <div class="ml-auto">
                                <v-btn icon @click="dialog = false">
                                    <v-icon>mdi-close</v-icon>
                                </v-btn>
                            </div>
                        </v-card-title>
                        <v-card-text class="border-top pt-10">
                            <v-form ref="login" @submit.prevent="login" class="mt-5">
                                <v-text-field
                                            class="form-line-control form-line-lg"
                                            label="Enter your email id"
                                            autocomplete="email"
                                            v-model="email"
                                            :rules="[
                                                v => !!v || 'Email is required',
                                                v =>
                                                    /\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/.test(
                                                        v
                                                    ) || 'E-mail must be valid'
                                            ]"
                                            type="email"
                                            outlined
                                            hide-details="auto"
                                        ></v-text-field>
                                        <v-text-field
                                            type="password"
                                            class="form-line-control form-line-lg"
                                            label="Enter your password"
                                            :rules="[v => !!v || 'Password is required']"
                                            v-model="password"
                                            outlined
                                            hide-details="auto"
                                        ></v-text-field>
                                <div class="d-flex align-center">
                                    <v-btn
                                        depressed
                                        class="login-btn"
                                        color="primary"
                                        type="submit"
                                    >
                                        Login
                                    </v-btn>
                                    <div class="ml-auto">
                                        <NLink
                                            to="/forgot"
                                            class="font-weight-semibold text-decoration-none"
                                            >Forgot password?</NLink
                                        >
                                    </div>
                                </div>
                            </v-form>
                            <div class="text-center login-top-spacer">
                                <p class="text-light-blue">
                                    Don't have an account?
                                    <NLink
                                        to="/register/"
                                        class="font-weight-semibold text-decoration-none"
                                        >Create one</NLink
                                    >
                                </p>
                            </div>
                        </v-card-text>
                    </v-card>
                </v-dialog>
            </v-container>
        </v-app-bar>
        <!-- -----------------------------------------------
          End Header
    ----------------------------------------------- -->

        <!-- -----------------------------------------------
          Start Mobile Navigation
    ----------------------------------------------- -->
        <v-navigation-drawer
            v-model="drawer"
            class="d-lg-none mob-header-fixed"
            temporary
        >
            <div class="pa-5 d-flex align-items-center">
                <!-- Logo -->
                <Logo />
                <div class="ml-auto">
                    <!-- Close button -->
                    <v-btn
                        @click.stop="drawer = !drawer"
                        small
                        elevation="0"
                        class="white px-0"
                    >
                        <v-icon>mdi-window-close</v-icon>
                    </v-btn>
                </div>
            </div>
            <MobileNavigation :data="links"/>
        </v-navigation-drawer>
        <!-- -----------------------------------------------
          End Mobile Navigation
    ----------------------------------------------- -->
    </div>
</template>

<script>
export default {
    name: "Header",

    components: {
        Logo: () => import("@/components/layouts/Logo"),
        Navigation: () => import("@/components/layouts/Navigation"),
        MobileNavigation: () => import("@/components/layouts/MobileNavigation"),
        BannerSearch: () => import("@/components/sections/home/BannerSearch")
    },
    data() {
        return {
            drawer: null,
            showheaderSearch: false,
            notifications: [
                {
                    title: "Launch Admin",
                    iconbg: "error",
                    icon: "mdi-link-variant",
                    desc: "Just see the my new admin!",
                    time: "9:30AM"
                },
                {
                    title: "Event today",
                    iconbg: "success",
                    icon: "mdi-calendar-check",
                    desc: "Just a reminder that you have event",
                    time: "10:30AM"
                },
                {
                    title: "Settings",
                    iconbg: "info",
                    icon: "mdi-cog",
                    desc: "You can customize this template.",
                    time: "11:30AM"
                },
                {
                    title: "Pavan Kumar",
                    iconbg: "indigo",
                    icon: "mdi-account",
                    desc: "Sent you an notification",
                    time: "12:30AM"
                }
            ],
            userprofile: [
                { title: "My Profile", to: "/" },
                { title: "Logout", to: "/" }
            ],
            dialog: false,
            email: '',
            password:'',
        };
    },
    methods: {
        async logout() {
            await this.$auth.logout()
        },
        async login(){
            if(this.$refs.login.validate()){
                try {
                    const token = await this.$recaptcha.execute('question')

                    // send token to server alongside your form data

                    let data = {
                        email : this.email,
                        password : this.password,
                        recapcha : token
                    }
                    this.$auth.loginWith('laravelJWT', { data })
                    .then(() => {
                        this.dialog = false
                    })
                    .catch((err) => {
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
        support_format_webp(){
            var elem = document.createElement('canvas');

            if (!!(elem.getContext && elem.getContext('2d'))){
                // was able or not to get WebP representation
                return elem.toDataURL('image/webp').indexOf('data:image/webp') == 0;
            }
            else
            {
                // very old browser like IE 8, canvas not supported
                return false;
            }
        }
    },
    mounted(){
        this.$nuxt.$on('loginBox',() => {
            this.dialog = true
        })
        this.$nuxt.$on('hideSearchBar',() => {
            this.showheaderSearch = false
        })
        localStorage.setItem('webp_support', this.support_format_webp())
    },
    computed:{
        links(){
            return [
                {
                    dd: false,
                    id: 1,
                    to: "/about/",
                    icon: "mdi-arrow-right",
                    title: "About"
                },
                {
                    dd: true,
                    id: 2,
                    to: "/explore",
                    icon: "mdi-arrow-right",
                    mega: true,
                    title: "Explore",
                    children: this.$store.state.latestCategories,
                    disabled: true
                },
                {
                    dd: false,
                    id: 3,
                    to: "/questions/",
                    icon: "mdi-arrow-right",
                    title: "Questions"
                },
                {
                    dd: false,
                    id: 4,
                    to: "/videos/",
                    icon: "mdi-arrow-right",
                    title: "Videos"
                },
                {
                    dd: false,
                    id: 5,
                    to: "/articles/",
                    icon: "mdi-arrow-right",
                    title: "Articles"
                },
                {
                    dd: false,
                    id: 6,
                    to: "/resources/",
                    icon: "mdi-arrow-right",
                    title: "Resources"
                },
                {
                    dd: false,
                    id: 7,
                    to: "/tools/",
                    icon: "mdi-arrow-right",
                    title: "Tools"
                }
            ]
        }
    },
    async fetch() {
        if(!this.$store.state.latestCategories.length){
            let data = await this.$axios.$get("/categories");
            this.$store.commit("update_latest_categories", data);
        }
    },
};
</script>

<style lang="scss">
.app-header.v-sheet.header2 {
  background-color: #fff !important;
}
.header-search-icon {
    position: static;
    z-index: 10;
}
.header-search {
    position: absolute;
    left: 0px;
    right: 0;
    max-width: 1200px;
    top: 9px;
    margin: 0 auto;
    padding: 0px 15px;
    .serch-btn {
        position: absolute;
        right: 15px;
        top: 12px;
    }
    .search-container {
        max-width: 1170px;
        margin: 0 auto;
    }
    .search-widget {
        margin-top: 0px !important;
    }
}
</style>
