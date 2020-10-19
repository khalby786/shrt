const { Deta } = require('deta');
const deta = Deta(process.env.PROJECT_KEY); 
const db = deta.Base('urls'); 

module.exports = (req, res) => {
    let { slug } = req.query;

    db.get(slug)
        // .then(res => res.json())
        .then(data => {
            console.log(data);
            data.visits++;
            console.log(data);
            db.put(data, slug)
                    .then(data => {
                        res.send("Yaay!");
                    })
                    .catch(err => {
                        console.error(err);
                    });
        }).catch(error => {
            console.error(error);
            res.json({ status: 400, message: "Slug not found!" })
        })

    
}