const { Deta } = require('deta');
const deta = Deta(process.env.PROJECT_KEY); 
const db = deta.Base('urls'); 

module.exports = (req, res) => {
    let { slug } = req.query;
    db.get(slug)
        // .then(res => res.json())
        .then(data => {
            res.json(data);
        }).catch(error => {
            console.error(error);
            res.json({ status: 400, message: "Slug not found!" })
        })
}