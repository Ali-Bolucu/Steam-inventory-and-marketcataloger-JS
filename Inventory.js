var name1 = "lale";
var name2 = "papatya";
let dates = [];
let classid;
let instanceid;
var row_count = 1;
var tem_name = "camonnnn";
var inner_c = 0;
var u_game_card = 0;
var row = "";

fetch(
  "https://steamcommunity.com/profiles/76561198867785639/inventory/json/753/6"
)
  .then(function (u) {
    return u.json();
  })
  .then(function (data) {
    console.log(data.rgDescriptions);

    let inv_inv = data.rgInventory;
    let inv_data = data.rgDescriptions;

    for (item in inv_data) {
      if (inv_data[item]["type"].slice(-12) == "Trading Card") {
        if (name1 != inv_data[item]["type"]) {
          name1 = inv_data[item]["type"];
        }

        if (name2 != inv_data[item]["name"]) {
          name2 = inv_data[item]["name"];

          var count_dates = 0;

          for (dat in inv_data) {
            if (
              inv_data[dat]["market_hash_name"] ===
              inv_data[item]["market_hash_name"]
            ) {
              classid = inv_data[dat]["classid"];
              instanceid = inv_data[dat]["instanceid"];

              if (typeof inv_data[dat]["cache_expiration"] != "undefined") {
                for (inst in inv_inv) {
                  if (
                    inv_inv[inst]["classid"] == classid &&
                    inv_inv[inst]["instanceid"] == instanceid
                  ) {
                    count_dates += 1;
                  }
                }
                dates.push(
                  inv_data[dat]["cache_expiration"]
                    .slice(0, -10)
                    .concat(" : ")
                    .concat(count_dates)
                );
              }

              count_dates = 0;
            }
          }

          classid = inv_data[item]["classid"];

          var count_num = 0;
          var count_data = 0;

          for (i in inv_inv) {
            if (inv_inv[i]["classid"] == classid) {
              count_num += 1;

              if (inv_inv[i]["instanceid"] == "0") {
                count_data += 1;
              } else {
                let card_drop = inv_inv[i]["classid"]
                  .concat("_")
                  .concat(inv_inv[i]["instanceid"]);
                if (inv_data[card_drop]["marketable"] == 1) {
                  count_data += 1;
                }
              }
            }
          }

          for (let x = 0; x < dates.length; x++) {
            let q1 = dates[x].slice(0, 10);

            for (let y = 0; y < dates.length; y++) {
              let q2 = dates[y].slice(0, 10);
              if (q1 < q2) {
                let a = dates.indexOf(dates[x]);
                let b = dates.indexOf(dates[y]);
                let useless;

                useless = dates[b];
                dates[b] = dates[a];
                dates[a] = useless;

                q1 = q2;
              }
            }
          }

          var inv_game_name = inv_data[item]["type"].slice(0, -13);
          var inv_card_name = inv_data[item]["name"];
          var inv_in_inv = count_num;
          var inv_off_sale = count_data;

          console.log(inv_game_name);
          console.log(inv_card_name);
          console.log(inv_in_inv);
          console.log(inv_off_sale);
          console.log(dates);
          console.log(
            "____________________________________________________________________"
          );

          var row_len = dates.length;
          if (row_len == 0) {
            row_len = 1;
          }

          function myFunction() {
            row += "<tr>";

            if (inv_data[item]["type"] != tem_name) {
              tem_name = inv_data[item]["type"];
              for (game_names in inv_data) {
                if (inv_data[game_names]["type"] == tem_name) {
                  u_game_card += 1;
                }
              }
              var url_game = inv_data[item]["market_fee_app"];
              row += `<td id="click_game" rowspan="${u_game_card}"> <a href="https:\/\/steamcommunity.com\/my\/gamecards\/${url_game}\/">${inv_game_name}</a> </td>`;
            }
            var url_card = inv_data[item]["market_hash_name"];
            row += `<td id="click_card" rowspan="${row_len}"> <a href="https://steamcommunity.com/market/listings/753/${url_card}">  ${inv_card_name} </a></td>`;
            row += `<td rowspan="${row_len}"> ${inv_in_inv} </td>`;
            row += `<td rowspan="${row_len}"> ${inv_off_sale} </td>`;

            if (typeof dates[0] !== "undefined") {
              row += `<td > ${dates[0]} </td>`;
            }
            row += "</tr>";

            for (var iii = 1; iii < row_len; iii++) {
              row += "<tr>";
              if (dates[iii] !== "undefined") {
                row += `<td > ${dates[iii]} </td>`;
              }
              row += "</tr>";
            }

            if (typeof dates[0] !== "undefined") {
              inner_c += dates.length;
            }
            if (inv_off_sale != 0) {
              inner_c += 1;
            }

            if (inner_c === u_game_card) {
              document.getElementById("inv_table").innerHTML += row;
              inner_c = 0;
              u_game_card = 0;
              row = "";
            }
          }

          myFunction();

          dates = [];
        }
      }
    }
  });
