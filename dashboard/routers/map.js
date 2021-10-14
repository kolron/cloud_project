
const express =require('express')
const router = express.Router()
router.get('/', (req, res) => {
  var data = {
    card1: [
      {districtId:"central", title: "מרכז", value: 3500, unit: " חבילות", fotterIcon: "", fotterText: " ", color: ""}
    ],
    card2: [
      {districtId:"haifa", title: "חיפה", value: 500, unit: " חבילות", fotterIcon: "", fotterText: " ", color: "" }
    ],
    card3: [
      {districtId:"north", title: "צפון", value: 3500, unit: " חבילות", fotterIcon: "", fotterText: " ", color: "" }
    ],
    card4: [
      {districtId:"tel aviv", title: "תל אביב", value: 1500, unit: " חבילות", fotterIcon: "", fotterText: " ", color: "" },
      {districtId:"jerusalem", title: "ירושלים", value: 700, unit: " חבילות", fotterIcon: "", fotterText: " ", color: "" }
    ],
    card5: [
      {districtId:"samaria", title: "יהודה ושומרון", value: 700, unit: " חבילות", fotterIcon: "", fotterText: "", color: "" },
      {districtId:"south", title: "דרום", value: 700, unit: " חבילות", fotterIcon: "", fotterText: "", color: "" }
    ]}
  
  res.render("pages/map", data)
})


module.exports = router