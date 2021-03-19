fetch(
  `https://steamcommunity.com/market/myhistory/render/?query=&start=0&count=1`
)
  .then(function (u) {
    return u.json();
  })
  .then(function (data) {
    let total_pos = data["total_count"];

    var retrievedObject = localStorage.getItem("market_h");
    let retrieveddata = JSON.parse(retrievedObject);

    document.getElementById("deneme").innerHTML =
      "Total number of transection : " +
      total_pos +
      " / Last uptade : " +
      retrieveddata[0]["game_name"];
  }, false);
