const express = require("express");
const router = express.Router();
var { generateItemSets } = require("../../bigml/index");
router.use(express.static("public"));
var load_button;

router.get("/itemsets", async (req, res) => {
    load_button=false;
    var result = await generateItemSets();
    parsed = JSON.stringify(result,null,2)
    console.log(parsed)
    var data = { load_button:load_button, item_sets:parsed};
    res.render("pages/bigml",data);
});

router.get("/", async (req, res) => {
    load_button=true;
    var data = { load_button:load_button };
    res.render("pages/bigml",data);
});

module.exports = router;
