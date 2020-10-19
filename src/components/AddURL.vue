<template>
    <form @submit.prevent="addUrl()">
        <input id="url" type="url" placeholder="enter url to shorten. eg.: https://google.com" v-model="url" /><br>
        <input id="slug" type="text" placeholder="enter slug for shortened url. eg.: /myshorturl" v-model="slug" /><br>
        <input id="submit-url" type="submit" value="small-ify!" />
    </form>
    <p class="message">
        {{message}}
    </p>
</template>

<script>

    export default {
        name: "AddURL",
        data() {
            return {
                url: null,
                slug: null,
                message: ""
            }
        },
        methods: {
            addUrl() {
                console.log(this.url);
                console.log(this.slug);
                console.log(process.env.PROJECT_KEY);

                // fetch("/api/hasurl?slug" + this.slug)
                //     .then(res => res.json())
                //     .then(data => {
                //         console.log(data);
                //         if (data !== null) {
                //             console.log("slug exists!")
                //             return;
                //         }
                //     })

                function validURL(str) {
                    var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
                        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
                        '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
                        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
                        '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
                        '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
                    return !!pattern.test(str);
                }

                if (validURL(this.url) === false) {
                    // not a valid url
                    this.message = "Please enter a valid URL!";
                    return;
                }

                fetch(`/api/url`, {
                    method: 'POST',
                    body: JSON.stringify({ url: encodeURIComponent(this.url), slug: this.slug }),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }).then(res => res.text())
                .then(data => alert(data))
            }
        },
    }

</script>

<style>

    form {
        padding: 5vw;
    }

    [type=url], [type=text] {
        display: block;
        padding: 10px 20px;
        width: 100%;
        border-radius: 5px;
        box-shadow: none;
        border: 1px solid grey;
        color: black;
        font-family: "Fira Code", monospace;
        transition: 150ms;
        margin: 0 auto;
    }

    [type=url]:hover, [type=text]:hover {
        border: 1px solid black;
        transition: 150ms;
    }

    [type=submit] {
        display: block;
        margin-top: 15px;
        border-radius: 5px;
        box-shadow: none;
        border: 1px solid grey;
        color: black;
        font-family: "Fira Code", monospace;
        transition: 150ms;
        padding: 10px 20px;
        cursor: pointer;
        background-color: white;
        margin: 0 auto;
    }

    [type=submit]:hover {
        background-color: black;
        color: white;
        transition: 150ms;
    }

    [type=submit]:active {
        background-color: yellow;
        color: black;
        transition: 150ms;
    }

    .message {
        text-align: center;
    }

</style>