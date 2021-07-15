const { Deta } = require("deta");
const deta = Deta(process.env.PROJECT_KEY);
const db = deta.Base("urls");

module.exports = (req, res) => {
  let { slug } = req.query;
  db.get(decodeURIComponent(slug))
    .then((data) => {
      console.log(data);
      if (data === null) {
        res.status(200).json({ status: 400, message: "Slug not found!" });
        return;
      }
      res
        .status(200)
        .json({ status: 200, message: "Slug exists!", data: data });
    })
    .catch((error) => {
      console.error(error);
      res
        .status(500)
        .json({
          status: 500,
          message: "Something went wrong, try again?",
          error: error,
        });
    });
};
