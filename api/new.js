const { Deta } = require('deta');
const deta = Deta(process.env.PROJECT_KEY); 
const db = deta.Base('urls'); 

module.exports = (req, res) => {
    let { url, slug } = req.body;

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
                res.status(401).json({ status: 401, message: "Slug already exists!" });
            } else {
                db.put({ "url": url, "visits": 0 }, slug)
                    .then(data => {
                        res.status(200).json({ status: 200, message: "URL successfully shortened!", slug: slug });
                    })
                    .catch(err => {
                        res.status(500).json({ status: 500, message:"Something went wrong, try again?", error: err });
                    });
            }
        }).catch(error => {
            console.error(error);
            res.status(500).json({ status: 500, message:"Something went wrong, try again?", error: error });
        })
}