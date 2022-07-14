<template>
    <div>
        <ContactBanner />
        <Newsletter />
    </div>
</template>

<script>
export default {
    head() {
        return {
            title: "Contact"
        }
    },
    components: {
        ContactBanner: () =>
            import("@/components/sections/contact/ContactBanner"),
        Newsletter: () => import("@/components/sections/shared/Newsletter")
    }
};
</script>
