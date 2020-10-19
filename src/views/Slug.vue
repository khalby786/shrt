<template>
    <div class="redirect-text">
        <p>Hang on, you're being redirected!</p>
        <p v-if="url !== null">You are being redirected to {{url}}.</p>
        <p v-if="url === false">Slug doesn't exist!</p>
    </div>
</template>

<script>
    export default {
        name: "Slug",
        data() {
            return {
                slug: this.$route.params.slug,
                url: null
            }
        },
        created: function() {
            console.log(this.$route.params.slug)
            fetch("/api/geturl?slug=" + this.slug)
                .then(res => res.json())
                .then(data => {
                    if (data === null) {
                        this.url = false;
                        window.location.replace('/')
                    }
                    console.log("going to add 1 to counter!");
                    // fetch("/api/counter?slug=" + this.slug)
                    //     .then(res => res.text())
                    //     .then(data => console.log(data))
                    (async() => {
                        console.log(this.slug)
                        let request = await fetch("/api/counter?slug=" + this.slug)
                        let response = await request.text();
                        console.log(response);

                        window.location.replace(decodeURIComponent(data.url));
                        if (data.url === "https%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3DdQw4w9WgXcQ") {
                            this.url = "rickrolled";
                        } else {
                            this.url = decodeURIComponent(data.url);
                        }
                    })();
                })
        }
    }
</script>

<style scoped>

    .redirect-text {
        text-align: center;
        margin-top: 100px;
        font-family: 'Fira Mono', monospace;
    }

</style>