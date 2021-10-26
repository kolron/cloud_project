const express = require("express");
const router = express.Router();
var { generateItemSets } = require("../../bigml/index");
router.use(express.static("public"));
var load_button;

function getPosition(string, subString, index) {
    return string.split(subString, index).join(subString).length;
  }

router.get("/itemsets", async (req, res) => {
    load_button=false;
    var result = await generateItemSets();
    parsed = JSON.stringify(result,null,2)
    console.log(parsed)


    
    var count = (parsed.match(/{/g) || []).length;
    var items = []
    var compliments = []
    var supports = []
    var confidences = []
    for (let i = 0; i < count; i++) {
        var start_item = getPosition(parsed, 'items', i + 1) + 9
        var end_item = getPosition(parsed, 'compliment', i + 1) - 9
        var item = parsed.substring(start_item, end_item)
        console.log(item)

        var start_compliment = getPosition(parsed, 'compliment', i + 1) + 14
        var end_compliment = getPosition(parsed, 'support', i + 1) - 9
        var compliment = parsed.substring(start_compliment ,end_compliment)
        console.log(compliment)

        var start_support = getPosition(parsed, 'support', i + 1) + 12
        var end_support = getPosition(parsed, 'confidence', i + 1) - 8
        var support = parsed.substring(start_support, end_support)
        console.log(support)

        var start_confidence = getPosition(parsed, 'confidence', i + 1) + 13
        var end_confidence = getPosition(parsed, '\}', i + 1) - 2
        var confidence = parsed.substring(start_confidence, end_confidence)
        console.log(confidence)

        
        items[i] = item
        compliments[i] = compliment
        supports[i] = support
        confidences[i] = confidence

    }
    var data = { load_button:load_button, item_sets:parsed, items: items, compliments: compliments, supports: supports, confidences: confidences, count: count};
    res.render("pages/bigml",data);
});

router.get("/", async (req, res) => {
    load_button=true;
    var data = { load_button:load_button, items: "", compliments: "", count: "" };
    res.render("pages/bigml",data);
});

module.exports = router;
