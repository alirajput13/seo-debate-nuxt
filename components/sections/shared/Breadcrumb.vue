<template>
    <div class="breadcrumbs">
        <!-- -----------------------------------------------
        Start Learn Seo
    ----------------------------------------------- -->

        <v-breadcrumbs :items="items" class="px-0">
            <template v-slot:divider>
                <v-icon>mdi-chevron-right</v-icon>
            </template>
            <v-breadcrumbs-item
                slot="item"
                :disabled="item.disabled"
                slot-scope="{ item }"
                exact
                :to="item.to"
            >
                {{ item.text }}
            </v-breadcrumbs-item>
        </v-breadcrumbs>
        <div class="d-flex align-center">
            <p class="font-30 blue--text font-weight-bold mb-0">{{ pagetitle }}</p>
            <div v-if="type" class="ml-auto">
                <span
                    :class="type"
                    class="sprite-img file-type"
                ></span>
            </div>
        </div>
        <!-- -----------------------------------------------
        End Learn Seo
    ----------------------------------------------- -->
    </div>
</template>

<script>
export default {
    name: "Breadcrumb",
    props: ["items", "pagetitle", "type"],
    components: {},
    methods: {}
};
</script>

<style lang="scss"></style>
