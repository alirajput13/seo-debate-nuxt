<template>
</template>

<script>
export default {
    mounted(){
        this.verify()
    },
    methods:{
        async verify() {
            await this.$axios.post(`verify`,{
                user : this.$route.params.user,
                token : this.$route.params.token
            })
            .then(res => {
                this.$swal({
                    title: `Success!`,
                    text: res.data.message,
                    icon: "success",
                    confirmButtonText: "Login here"
                })
                .then(() => {
                    this.$router.push({name: 'login'})
                })
            })
            .catch(err => {
                this.$swal({
                    title: `Error ${err.response.status}!`,
                    text: err.response.data.message,
                    icon: "error"
                })
                .then(() => {
                    this.$router.push('/')
                })
            })
        },
    }
}
</script>