var { v4: uuidv4 } = require("uuid");

function shuffle(array) {
    let currentIndex = array.length,
      randomIndex;
  
    // While there remain elements to shuffle...
    while (currentIndex != 0) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }
  
    return array;
  }
  
  var products = [
    { name: "earphones", price: 10 },
    { name: "phone_case", price: 2 },
    { name: "pillow", price: 20 },
    { name: "shoes", price: 50 },
    { name: "laptop", price: 200 },
    { name: "backpack", price: 50 },
    { name: "type-C cable", price: 3 },
    { name: "mug", price: 1 },
    { name: "mouse", price: 20 },
    { name: "keyboard", price: 20 },
    { name: "batteries", price: 1 },
  ];
  
  function generateItems(list) {
    if (!list) {
      list = products;
    }
    let shuffled = shuffle(list);
    var selected = shuffled.slice(0, Math.floor(Math.random() * 4 + 1));
    var size;
    if (selected.length<=2) {
        size = "Small";
    }
    else if(selected.length == 3){
        size = "Medium";
    } else{
        size = "Large";

    }
    return { items: selected, size: size };
  }
  
  function generateSerial() {
    var serial = uuidv4();
    return serial;
  }
  
  function generateAdress() {
    const district = [
      "north",
      "haifa",
      "central",
      "south",
      "tel aviv",
      "jerusalem",
      "samaria",
    ];
    var shuffled = shuffle(district);
    console.log("shuffeled dist");
    var selected_dist = shuffled.slice(0, Math.floor(Math.random() + 1));
    let cities;
    if (selected_dist == "north") {
      cities = [
        "Nazareth",
        "Acre",
        "Naharia",
        "Afula",
        "Karmiel",
        "Tiberias",
        "Safed",
        "Yokneam",
        "Qiryat Shemona",
      ];
    } else if (selected_dist == "haifa") {
      cities = [
        "Haifa",
        "Hadera",
        "Givat Ada",
        "Qiryat Motzkin",
        "Or Akiva",
        "Aviel",
      ];
    } else if (selected_dist == "central") {
      cities = [
        "Kfar Saba",
        "Herzliya",
        "Givatayim",
        "Ramat Gan",
        "Kfar Yona",
        "Netanya",
      ];
    } else if (selected_dist == "tel aviv") {
      cities = ["Tel-Aviv"];
    } else if (selected_dist == "jerusalem") {
      cities = ["Jerusalem"];
    } else if (selected_dist == "samaria") {
      cities = ["Ariel"];
    } else {
      cities = ["Beer Sheva", "Eilat", "Ashkelon", "Ashdod", "Qiryat Malachi"];
    }
    var shuffled = shuffle(cities);
    var selected_city = shuffled.slice(0, Math.floor(Math.random() + 1));
    var house_number = Math.floor(Math.random() * 30 + 1);
    return {
      address: `${selected_city}, ${house_number}, ${selected_dist} district`,
      district: selected_dist[0],
    };
  }
  
  function genereatePrice(items) {
    var price = 0;
    var tax_status = "";
    for (var i = 0; i < items.length; i++) {
      price += items[i].price;
    }
    if (price < 50) {
      tax_status = 0;
    } else if (price > 50 && price < 75) {
      tax_status = 10;
    } else {
      tax_status = 25;
    }
    return { price: price, tax_status: tax_status };
  }
  
  function generateName(name) {
    if (name) {
      return name;
    } else {
      name = "john doe";
    }
    return name;
  }
  function getFullDate() {
    var d = new Date(),
      month = "" + d.getMonth(),
      day = "" + d.getDate(),
      year = d.getFullYear();
  
    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;
  
    return [day, month, year].join("-");
  }

  module.exports = {getFullDate,generateName,generateAdress,generateItems,genereatePrice,generateSerial}