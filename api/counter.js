const { Deta } = require("deta");
const deta = Deta(process.env.PROJECT_KEY);
const db = deta.Base("urls");

module.exports = (req, res) => {
  let { slug } = req.query;

  if (!slug || slug.length === 0) {
    return res.status(400).send("Invalid slug");
  }

  db.get(slug)
    .then((data) => {
      console.log(data);
      data.visits++;
      console.log(data);
      db.put(data, slug)
        .then((data) => {
          res.send("Yaay!");
        })
        .catch((err) => {
          console.error(err);
        });
    })
    .catch((error) => {
      console.error(error);
      res.json({ status: 400, message: "Slug not found!" });
    });
};