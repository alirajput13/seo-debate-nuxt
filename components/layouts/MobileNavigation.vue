<template>
    <div class="pa-4">
        <!-- -----------------------------------------------
          Start Listing of item (Navigation)
    ----------------------------------------------- --
    <v-list dense>
      <v-list-item-group v-model="group" active-class="primary--text text--accent-4" >
        <v-list-item  v-for="link in data" :key="link.id" link nuxt :to="link.to" >
          <v-list-item-content>
            <v-list-item-title>{{ link.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list> -->

        <v-list class="mob-navigation">
            <!-- profile -->
            <v-expansion-panels v-if="$auth.loggedIn" accordion>
                <v-expansion-panel class="noshadow">
                    <v-expansion-panel-header
                        class="px-6 border-top border-bottom rounded-0"
                    >
                        <v-avatar size="35" class="rounded-0 justify-start">
                            <img
                                :src="$auth.user.avatar"
                                :alt="$auth.user.username"
                                class="rounded-circle"
                            />
                        </v-avatar>
                        <span class="ml-n16 text-blue font-16 font-weight-bold"
                            >{{$auth.user.fullname}}</span
                        >
                    </v-expansion-panel-header>
                    <v-expansion-panel-content class="elevation-0">
                        <v-list>
                            <v-list-item nuxt :to="$auth.user.profile">
                                <v-list-item-title class="text-light-blue">
                                    My Profile
                                </v-list-item-title>
                            </v-list-item>
                            <v-list-item @click="$auth.logout()">
                                <v-list-item-title class="text-light-blue">
                                    Logout
                                </v-list-item-title>
                            </v-list-item>
                        </v-list>
                    </v-expansion-panel-content>
                </v-expansion-panel>
            </v-expansion-panels>
            <div v-for="item in data" :key="item.title">
                <v-list-item
                    v-if="!item.dd"
                    class="mobile-nav-sub"
                    @click="$router.push(item.to)"
                    nuxt
                >
                    <v-list-item-content>
                        <v-list-item-title>
                            {{item.title}}
                        </v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
                <v-list-group
                    v-else
                    v-model="item.active"
                    :append-icon="item.dd ? 'mdi-chevron-down' : ''"
                    no-action
                >
                    <template v-slot:activator>
                        <v-list-item-content>
                            <v-list-item-title>{{ item.title }}</v-list-item-title>
                        </v-list-item-content>
                    </template>

                    <v-list-item
                        v-for="child in item.children"
                        :key="child.title"
                        class="mobile-nav-sub"
                        :to="{name: 'slug', params: {slug: child.slug}}"
                        nuxt
                    >
                        <v-list-item-content>
                            <v-list-item-title>
                                    {{child.title}}
                            </v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                </v-list-group>
            </div>
            <v-btn color="primary" block nuxt to="/login/" v-if="!$auth.loggedIn" elevation="0">
                Login - Register
            </v-btn>
        </v-list>
        <!-- -----------------------------------------------
          End Listing of item (Navigation)
    ----------------------------------------------- -->
    </div>
</template>

<script>
export default {
    name: "MobileNavigation",
    components: {
        Logo: () => import("@/components/layouts/Logo")
    },
    props:['data']
};
</script>
<style lang="scss">
.noshadow {
    &.v-expansion-panel::before {
        box-shadow: none;
    }
}
.theme--light.v-expansion-panels
    .v-expansion-panel-header
    .v-expansion-panel-header__icon
    .v-icon {
    color: #031b4e !important;
}

.font-16 {
    font-size: 16px;
}

.profile-dropdown {
    &.v-list {
        .v-list-item {
            min-height: 38px;
            padding: 0 41px;
            .v-list-item__title {
                font-size: 15px !important;
            }
        }
    }
}
</style>
