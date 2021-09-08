const { Deta } = require("deta");
const deta = Deta(process.env.PROJECT_KEY);
const db = deta.Base("urls");

module.exports = (req, res) => {
  let { slug } = req.query;
  if (!slug || slug.length === 0) {
    return res.status(400).json({
      message: "Please provide a valid slug",
    });
  }

  db.get(slug)
    .then((data) => {
      if (data === null) {
        res.json({ status: 400, message: "Slug not found!" });
        return;
      } else {
        res.json({ status: 200, message: "Slug found!", data: data });
      }
    })
    .catch((error) => {
      console.error(error);
      res.json({
        status: 500,
        message: "Something went wrong, try again?",
        error: error,
      });
    });
};
