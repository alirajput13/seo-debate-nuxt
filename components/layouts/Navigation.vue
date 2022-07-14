<template>
    <!-- -----------------------------------------------
        Start Desktop Navigation item
  ----------------------------------------------- -->
    <div class="navigation">
        <ul class="navbar-nav">
            <li
                :class="link.mega ? 'nav-item megamenu' : 'nav-item'"
                v-for="link in data"
                :key="link.id">
                <n-link
                    class="nav-link"
                    :to="link.to"
                    :event="link.disabled ? '' : 'click'"
                >
                    {{ link.title }}
                    <v-icon class="text-info font-16" v-if="link.dd"
                        >mdi-chevron-down</v-icon
                    >
                </n-link>
                <ul
                    v-if="link.children"
                    :class="link.mega ? 'first-dd megamenu-dd' : 'first-dd'"
                >
                    <li
                        v-for="(sub, index) in link.children"
                        :key="index">

                        <n-link class="nav-link" :to="{name: 'slug',params: { slug: sub.slug }}">
                            {{ sub.title }}
                        </n-link>
                    </li>
                </ul>
            </li>
        </ul>
    </div>
    <!-- -----------------------------------------------
        End Desktop Navigation item
  ----------------------------------------------- -->
</template>

<script>
export default {
    name: "Navigation",
    props:['data']
};
</script>

<style lang="scss">
.font-12 {
    font-size: 12px;
}
</style>
