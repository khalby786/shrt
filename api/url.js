const { Deta } = require('deta');
const deta = Deta(process.env.PROJECT_KEY); 
const db = deta.Base('urls'); 

module.exports = (req, res) => {
    let { url, slug } = req.body;
    // (async() => {
    //     try {
    //         await db.put({ "url": url }, slug);
    //     } catch(e) {
    //         console.error(e);
    //     }
    // })();
    // res.send("Hopefully, it worked!");

    function validURL(str) {
        var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
            '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
            '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
            '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
            '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
            '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
        return !!pattern.test(str);
    }

    url = decodeURIComponent(url);

    if (validURL(url) === false) {
        // not a valid url
        res.send("Please enter a valid URL!");
        return;
    }

    url = encodeURIComponent(url);

    db.get(slug)
        .then(data => {
            console.log(data)
            if (data !== null) {
                res.send({ status: 401, message: "Slug already exists!" });
            } else {
                db.put({ "url": url, "visits": 0 }, slug)
                    .then(data => {
                        res.send("Yaay!");
                    })
                    .catch(err => {
                        console.error(err);
                    });
            }
        }).catch(error => {
            console.error(error);
            res.send({ status: 500, message: "Slug already exists!" })
        })

    console.log("is this code being executed?")
}