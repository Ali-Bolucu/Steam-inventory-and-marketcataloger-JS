const domparser = new DOMParser();

fetch(
  "https://steamcommunity.com/market/myhistory/render/?query=&start=0&count=500"
)
  .then(function (u) {
    return u.json();
  })
  .then(function (data) {
    let txt = data["results_html"];

    var parser = new DOMParser();
    var htmlDoc = parser.parseFromString(txt, "text/html");

    let market_history = htmlDoc.getElementsByClassName(
      "market_listing_row market_recent_listing_row"
    );

    for (let i = 0; i < market_history.length; i++) {
      let status = market_history[i]
        .getElementsByClassName(
          "market_listing_left_cell market_listing_gainorloss"
        )[0]
        ["innerText"].trim();
      console.log(status);

      let image = market_history[i].getElementsByTagName("img")[0].attributes[1]
        .nodeValue;
      console.log(image);

      let price = market_history[i]
        .getElementsByClassName("market_listing_price")[0]
        .innerText.trim();
      console.log(price);

      let card_name = market_history[i].getElementsByClassName(
        "market_listing_item_name"
      )[0].innerText;
      console.log(card_name);

      let game_name = market_history[i].getElementsByClassName(
        "market_listing_game_name"
      )[0].innerText;
      console.log(game_name);

      let date_acted = market_history[i]
        .getElementsByClassName(
          "market_listing_right_cell market_listing_listed_date can_combine"
        )[0]
        .innerText.trim();
      console.log(date_acted);

      let date_listed = market_history[i]
        .getElementsByClassName(
          "market_listing_right_cell market_listing_listed_date can_combine"
        )[1]
        .innerText.trim();
      console.log(date_listed);

      console.log("________________________________________________________");
    }

    document.getElementById("demo").innerHTML += market_history[0];
  });

let market_h = new Object();
market_h = {
  game_name: "",
  cards: [
    {
      card_name: "test1",
      oBought: "0",
      oSelled: "0",
      total_m_spend: "0",
      total_m_earned: "0",
      total: "0",
      oIN: "0",
      oON: "0",
      buy_order: "0",
    },
    {
      card_name: "test2",
      oBought: "2",
      oSelled: "2",
      total_m_spend: "2",
      total_m_earned: "2",
      total: "2",
      oIN: "2",
      oON: "2",
      buy_order: "2",
    },
  ],
};

for (i in market_h) {
  document.getElementById("deneme").innerHTML = JSON.stringify(market_h);
}
