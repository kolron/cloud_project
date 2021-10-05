const express =require('express')
const router = express.Router()

router.get('/', (req, res) => {
    var data = {
      cards:[
       {title: "Dan Cluster", value: 1500, unit:" Packages",footerIcon:"Average size", footerText:"Medium",footerIcon:"toll",mainIcon:"tour"},
       {title: "Haifa", value: 320, unit:" Packages",footerIcon:"Average size", footerText:"Medium",footerIcon:"flight_land",mainIcon:"turned_in"},
       {title: "Samaria", value: 500, unit:" Packages",footerIcon:"Average size", footerText:"Medium",footerIcon:"turned_in_not",mainIcon:"anchor"},
       {title: "South", value: 100, unit:" Packages",footerIcon:"Average size", footerText:"Medium",footerIcon:'hourglass_full',mainIcon:"flaky"}
      ]
    }
    res.render("pages/dashboard",data)
  })

module.exports = router