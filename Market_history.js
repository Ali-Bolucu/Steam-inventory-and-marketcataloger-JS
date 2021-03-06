let curr_pos = 0;
let market_h = new Object();
market_h = [
  {
    game_name: "0",
    cards: [
      {
        card_name: "0",
        oBought: "TEST",
        oSelled: "TEST",
        total_m_spend: "TEST",
        total_m_earned: "TEST",
        total: "TEST",
        oIN: "TEST",
        oON: "TEST",
        buy_order: "TEST",
      },
    ],
  },
];
function fect_market() {
  fetch(
    `https://steamcommunity.com/market/myhistory/render/?query=&start=${curr_pos}&count=500`
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

      let total_pos = data["total_count"];
      console.log(data["total_count"]);
      market_h[0]["game_name"] = total_pos;

      for (let i = 0; i < market_history.length; i++) {
        let status = market_history[i]
          .getElementsByClassName(
            "market_listing_left_cell market_listing_gainorloss"
          )[0]
          ["innerText"].trim();
        console.log(status);

        let image = market_history[i].getElementsByTagName("img")[0]
          .attributes[1].nodeValue;
        //console.log(image);

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
        //console.log(date_acted);

        let date_listed = market_history[i]
          .getElementsByClassName(
            "market_listing_right_cell market_listing_listed_date can_combine"
          )[1]
          .innerText.trim();
        //console.log(date_listed);
        /*
        console.log("________________________________________________________");
        document.getElementById("demo").innerHTML +=
          "<br>" +
          status +
          "__" +
          price +
          "__" +
          card_name +
          "__" +
          game_name +
          "</br>";
          */
        //console.log(market_h.length);

        for (let container = 0; container < market_h.length; container++) {
          //console.log(container + "====== " + market_h.length);
          //
          //__________game_found__________________
          if (market_h[container]["game_name"] == game_name) {
            for (
              let contain_card = 0;
              contain_card < market_h[container]["cards"].length;
              contain_card++
            ) {
              //console.log(market_h[container]["cards"].length + "____" + contain_card);
              let max_con = market_h[container]["cards"].length;

              //_____________card_found_____________
              if (
                market_h[container]["cards"][contain_card]["card_name"] ==
                card_name
              ) {
                card_status_all(status, price, contain_card, container);
                console.log("girim card bulma");
                console.log("_________________");
                break;
              }

              //__________card_create__________________
              else if (
                contain_card + 1 == max_con &&
                market_h[container]["cards"][contain_card]["card_name"] !=
                  card_name
              ) {
                console.log("girim card yaratma");
                console.log("_________________");
                market_h[container]["cards"][max_con] = {
                  card_name: card_name,
                  oBought: "0",
                  oSelled: "0",
                  total_m_spend: "0",
                  total_m_earned: "0",
                  total: "0",
                  oIN: "0",
                  oON: "0",
                  buy_order: "0",
                };

                card_status_all(status, price, max_con, container);

                break;
              }
            }

            break;
          }

          //_____________game_create_________________________
          else if (
            market_h.length == container + 1 &&
            market_h[container]["game_name"] != game_name
          ) {
            console.log("girim oyun yaratma");
            console.log(market_h.length);
            console.log("_________________");
            market_h[market_h.length] = {
              game_name: game_name,
              cards: [
                {
                  card_name: card_name,
                  oBought: "0",
                  oSelled: "0",
                  total_m_spend: "0",
                  total_m_earned: "0",
                  total: "0",
                  oIN: "0",
                  oON: "0",
                  buy_order: "0",
                },
              ],
            };

            card_status_all(status, price, 0, market_h.length - 1);
            break;
          }
        }
      }

      curr_pos += 500;

      if (total_pos > curr_pos) {
        market_h[0]["cards"][0]["card_name"] =
          curr_pos + parseInt(market_h[0]["cards"][0]["card_name"], 10);
        fect_market();
      }
    });
}

function card_status_all(status, price, position, container) {
  if (status == "+") {
    card_bought_spend(price, position, container);
  }
  if (status == "-") {
    card_sold_earned(price, position, container);
  }
  if (status == "" && price != "") {
    card_put_on_sale(position, container);
  }
  if (status == "" && price == "") {
    card_canceled_on_sale(position, container);
  }
}

function card_bought_spend(price, position, container) {
  var price = parseInt(price.replace(",", ""));
  market_h[container]["cards"][position]["total_m_spend"] =
    price + parseInt(market_h[container]["cards"][position]["total_m_spend"]);

  market_h[container]["cards"][position]["total"] =
    parseInt(market_h[container]["cards"][position]["total"]) - price;

  market_h[container]["cards"][position]["oBought"] =
    parseInt(market_h[container]["cards"][position]["oBought"], 10) + 1;
}
function card_sold_earned(price, position, container) {
  var price = parseInt(price.replace(",", ""));
  market_h[container]["cards"][position]["total_m_earned"] =
    price + parseInt(market_h[container]["cards"][position]["total_m_earned"]);

  market_h[container]["cards"][position]["total"] =
    price + parseInt(market_h[container]["cards"][position]["total"]);

  market_h[container]["cards"][position]["oSelled"] =
    parseInt(market_h[container]["cards"][position]["oSelled"], 10) + 1;
}
function card_put_on_sale(position, container) {
  market_h[container]["cards"][position]["oON"] =
    parseInt(market_h[container]["cards"][position]["oON"], 10) + 1;
}
function card_canceled_on_sale(position, container) {
  market_h[container]["cards"][position]["oON"] =
    parseInt(market_h[container]["cards"][position]["oON"], 10) - 1;
}

function basma() {
  document.getElementById("deneme").innerHTML +=
    "<br>" + JSON.stringify(market_h) + "</br>";
}

/*

price in değeri düzeltilecek

+1 ler de inte dünüştürme yapılacak

game add le card add arasında düzeltme olması lazım

yeni oyun eklerken ilk kartı eklicek, yoksa hep test kartı oluşur

*/

fect_market();

document.getElementById("deneme").innerHTML += market_h.length;

setTimeout(basma, 2000);

function anan() {
  document.getElementById("deneme").innerHTML += market_h.length;
}
setTimeout(anan, 2000);
