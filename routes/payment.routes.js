const { default: axios } = require("axios");

const router = require("express").Router();

/* GET payment page */
router.get("/", (req, res, next) => {
  res.render("payment");
});

router.post("/createContext", (req, res, next) => {
  //
  // Create a server-side context
  //
  // Il s'agit de creer un JWT qui sera utilisé coté client pour créer les chmaps de formulaire
  //
  // https://developer.cybersource.com/docs/cybs/en-us/digital-accept-flex/developer/all/rest/digital-accept-flex/microform-integ/microform-integ-getting-started/creating-server-side-context.html
  //

  axios
    .post("https://apitest.cybersource.com/microform/v2/sessions", {
      targetOrigins: ["http://localhost:3000"],
    })
    .then(function (response) {
      console.log("response=", response);
    })
    .catch(function (err) {
      console.log(err);
      next(err);
    });
});

module.exports = router;
