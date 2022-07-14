<template>
    <v-app dark>
        <!--v-if="$route.name!=='login'"-->
        <Header
            v-if="
                $route.name !== 'login' &&
                    $route.name !== 'register' &&
                    $route.name !== 'forgot'
            "
        />
        <v-main>
            <nuxt />
        </v-main>
        <Footer
            v-if="
                $route.name !== 'login' &&
                    $route.name !== 'register' &&
                    $route.name !== 'forgot'
            "
        />
    </v-app>
</template>

<script>
export default {
    components: {
        Header: () => import("@/components/layouts/Header"),
        Footer: () => import("@/components/layouts/Footer")
    }
};
</script>

<style></style>
