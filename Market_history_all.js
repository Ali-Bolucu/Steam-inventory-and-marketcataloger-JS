document.addEventListener(
  "DOMContentLoaded",
  function () {
    var checkPageButton = document.getElementById("collector");
    checkPageButton.addEventListener(
      "click",
      function () {
        let curr_pos = 0;
        let market_h = new Object();
        market_h = [
          {
            game_name: "0",
            cards: [
              {
                card_name: "Card name",
                oBought: "Quantity purchased",
                oSelled: "Quantity sold",
                total_m_spend: "Total money spend",
                total_m_earned: "Total money earned",
                total: "Total",
                oIN: "Number of in inventory",
                oON: "Number of in sale",
                buy_order: "Buy_order",
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
                //console.log(status);

                let image = market_history[i].getElementsByTagName("img")[0]
                  .attributes[1].nodeValue;
                //console.log(image);

                let price = market_history[i]
                  .getElementsByClassName("market_listing_price")[0]
                  .innerText.trim();

                price = price.replace(",", ".");
                //console.log(price);

                let card_name = market_history[i].getElementsByClassName(
                  "market_listing_item_name"
                )[0].innerText;
                //console.log(card_name);

                let game_name = market_history[i].getElementsByClassName(
                  "market_listing_game_name"
                )[0].innerText;
                //console.log(game_name);

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

                for (
                  let container = 0;
                  container < market_h.length;
                  container++
                ) {
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
                        market_h[container]["cards"][contain_card][
                          "card_name"
                        ] == card_name
                      ) {
                        card_status_all(status, price, contain_card, container);

                        //console.log("_________________");
                        break;
                      }

                      //__________card_create__________________
                      else if (
                        contain_card + 1 == max_con &&
                        market_h[container]["cards"][contain_card][
                          "card_name"
                        ] != card_name
                      ) {
                        //console.log("_________________");
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
                    //console.log(market_h.length);
                    //console.log("_________________");
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
              document.getElementById("deneme").innerHTML = "";
              curr_pos += 500;
              document.getElementById("deneme").innerHTML +=
                "WAIT! : " + curr_pos;

              if (market_h[0].game_name > curr_pos) {
                fect_market();
              } else {
                document.getElementById("deneme").innerHTML +=
                  "DONE! , Total number of transection:" +
                  market_h[0].game_name;

                kaydetme();
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

          var price = parseInt(price.replace(".", ""));
          var tem_total_spend = parseInt(market_h[container]["cards"][position]["total_m_spend"].replace(".",""));
          var total = parseInt(market_h[container]["cards"][position]["total"].replace(".", ""));

          var dec;
          var flo;



          var ff = price + tem_total_spend;
          var gg = total - price;


          if(ff.toString(10).slice(0,-2) == ""){
            dec = "0";
          }
          else if (ff.toString(10).slice(0,-2) != ""){   
            dec = ff.toString(10).slice(0,-2);
          }
          
         if(ff.toString(10).slice(-2, -1) == ""){  
            flo = "0"+ ff.toString(10).slice(-1);
          }
          else if (ff.toString(10).slice(-2, -1) != ""){
            flo = ff.toString(10).slice(-2);
          }
         
         market_h[container]["cards"][position]["total_m_spend"] = dec + "." + flo;

         var flag = 0;
         if(gg.toString(10).slice(0,1) == "-"){
           flag =1;
           gg = gg.toString(10).slice(1);
 
         }

         if(gg.toString(10).slice(0,-2) == ""){
          dec = "0";
        }
        else if (gg.toString(10).slice(0,-2) != ""){   
          dec = gg.toString(10).slice(0,-2);
        }
        
       if(gg.toString(10).slice(-2, -1) == ""){  
          flo = "0"+ gg.toString(10).slice(-1);
        }
        else if (gg.toString(10).slice(-2, -1) != ""){
          flo = gg.toString(10).slice(-2);
        }

        if(flag == 1){

          market_h[container]["cards"][position]["total"] = "-" + dec + "." + flo;
        }else{
          market_h[container]["cards"][position]["total"] = dec + "." + flo;
        }

          market_h[container]["cards"][position]["oBought"] = parseInt(market_h[container]["cards"][position]["oBought"], 10) + 1;

          
        }

        function card_sold_earned(price, position, container) {



          var price = parseInt(price.replace(".", ""));
          var tem_total_spend = parseInt(market_h[container]["cards"][position]["total_m_earned"].replace(".",""));
          var total = parseInt(market_h[container]["cards"][position]["total"].replace(".", ""));

          var dec;
          var flo;



          var ff = price + tem_total_spend;
          var gg = total + price;


          if(ff.toString(10).slice(0,-2) == ""){
            dec = "0";
          }
          else if (ff.toString(10).slice(0,-2) != ""){   
            dec = ff.toString(10).slice(0,-2);
          }
          
         if(ff.toString(10).slice(-2, -1) == ""){  
            flo = "0"+ ff.toString(10).slice(-1);
          }
          else if (ff.toString(10).slice(-2, -1) != ""){
            flo = ff.toString(10).slice(-2);
          }
         
         market_h[container]["cards"][position]["total_m_earned"] = dec + "." + flo;


         var flag = 0;
        if(gg.toString(10).slice(0,1) == "-"){
          flag =1;
          gg = gg.toString(10).slice(1);

        }




         if(gg.toString(10).slice(0,-2) == ""){
          dec = "0";
        }
        else if (gg.toString(10).slice(0,-2) != ""){   
          dec = gg.toString(10).slice(0,-2);
        }
        
       if(gg.toString(10).slice(-2, -1) == ""){  
          flo = "0"+ gg.toString(10).slice(-1);
        }
        else if (gg.toString(10).slice(-2, -1) != ""){
          flo = gg.toString(10).slice(-2);
        }
        if(flag == 1){

          market_h[container]["cards"][position]["total"] = "-" + dec + "." + flo;
        }else{
          market_h[container]["cards"][position]["total"] = dec + "." + flo;
        }

          


          market_h[container]["cards"][position]["oSelled"] =
            parseInt(market_h[container]["cards"][position]["oSelled"], 10) + 1;

          market_h[container]["cards"][position]["oON"] =
            parseInt(market_h[container]["cards"][position]["oON"], 10) - 1;
        }

        function card_put_on_sale(position, container) {
          market_h[container]["cards"][position]["oON"] =
            parseInt(market_h[container]["cards"][position]["oON"], 10) + 1;
        }

        function card_canceled_on_sale(position, container) {
          market_h[container]["cards"][position]["oON"] =
            parseInt(market_h[container]["cards"][position]["oON"], 10) - 1;
        }


        function kaydetme() {
          localStorage.setItem("market_h", JSON.stringify(market_h));


        

        
        }


        fect_market();
      },
      false
    );
  },
  false
);
