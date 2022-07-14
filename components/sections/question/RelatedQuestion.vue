<template>
    <!-- -----------------------------------------------
    Start ArticlesGrid
  ----------------------------------------------- -->
    <NLink
        :to="{name: 'questions-slug',params: {slug: rquestion.slug}}"
        class="question-title text-light-blue hover-blue text-decoration-none font-weight-semibold"
        >{{ rquestion.title }}</NLink
    >
    <!-- -----------------------------------------------
        End ArticlesGrid
    ----------------------------------------------- -->
</template>

<script>
export default {
    name: "RelatedQuestion",
    props: ["rquestion"]
};
</script>

<style lang="scss"></style>
