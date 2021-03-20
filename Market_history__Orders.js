document.addEventListener(
  "DOMContentLoaded",
  function () {
    var checkPageButton = document.getElementById("buy_sell");
    checkPageButton.addEventListener(
      "click",
      function () {
        var retrievedObject = localStorage.getItem("market_h");
        let market_h = JSON.parse(retrievedObject);

        var curr_pos = 0;

        function fect_listing() {
          fetch(`https://steamcommunity.com/market/mylistings/render/?query=&start=${curr_pos}&count=100`)
            .then(function (u) {
              return u.json();
            })
            .then(function (data) {
              // console.log(data.results_html);

              let txt = data["results_html"];

              var parser = new DOMParser();
              var htmlDoc = parser.parseFromString(txt, "text/html");

              let market_orders = htmlDoc.getElementsByClassName("market_listing_row market_recent_listing_row");

              //console.log(market_orders);

              for (let i = 0; i < market_orders.length; i++) {
                let game_name = market_orders[i].getElementsByClassName("market_listing_game_name")[0]["innerText"];
                let card_name = market_orders[i].getElementsByClassName("market_listing_item_name_link")[0]["innerText"];

                let price_buyer = market_orders[i].getElementsByClassName("market_listing_price")[0]["innerText"].trim();
                let date_listed = market_orders[i].getElementsByClassName("market_listing_listed_date_combined")[0]["innerText"].trim();

                //console.log(game_name);
                //console.log(card_name);
                // console.log(price_buyer);
                //  console.log(date_listed);
                // console.log("_________________________");

                for (let container = 0; container < market_h.length; container++) {
                  //__________game_found__________________
                  if (market_h[container]["game_name"] == game_name) {
                    for (let contain_card = 0; contain_card < market_h[container]["cards"].length; contain_card++) {
                      //_____________card_found_____________

                      if (market_h[container]["cards"][contain_card]["card_name"] == card_name) {
                        market_h[container]["cards"][contain_card]["oON"] = 1 + parseInt(market_h[container]["cards"][contain_card]["oON"], 10);

                        break;
                      }
                    }
                  }
                }
              }
              console.log(curr_pos);
              curr_pos += 100;

              if (data.total_count > curr_pos) {
                console.log("_____________alooo____________");
                fect_listing();
              } else {
                document.getElementById("deneme").innerHTML += "DONE! , Total number of sell order:" + data.total_count;

                kaydetme();
              }

              function kaydetme() {
                localStorage.setItem("market_h", JSON.stringify(market_h));
              }
            });
        }

        fect_listing();
      },
      false
    );
  },
  false
);
