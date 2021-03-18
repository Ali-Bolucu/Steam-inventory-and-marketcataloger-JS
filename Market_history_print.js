document.addEventListener(
  "DOMContentLoaded",
  function () {
    var checkPageButton = document.getElementById("gettowindow");

    checkPageButton.addEventListener(
      "click",
      function () {
        var retrievedObject = localStorage.getItem("market_h");
        let retrieveddata = JSON.parse(retrievedObject);
        var row = "";

        document.getElementById("deneme").innerHTML +=
          "Last count : " + retrieveddata[0]["game_name"];

        function basma() {
          console.log("retrievedObject: ", JSON.parse(retrievedObject));

          for (var i = 0; i < retrieveddata.length; i++) {
            row += "<tr>";
            row += `<td rowspan=""> ${retrieveddata[i]["game_name"]} </td>`;
            row += "</tr>";

            for (var ii = 0; ii < retrieveddata[i]["cards"].length; ii++) {
              row += "<tr>";
              row += `<td rowspan=""> ${retrieveddata[i]["cards"][ii]["card_name"]} </td>`;
              row += `<td rowspan=""> ${retrieveddata[i]["cards"][ii]["oBought"]} </td>`;
              row += `<td rowspan=""> ${retrieveddata[i]["cards"][ii]["oSelled"]} </td>`;
              row += `<td rowspan=""> ${retrieveddata[i]["cards"][ii]["total_m_spend"]} </td>`;
              row += `<td rowspan=""> ${retrieveddata[i]["cards"][ii]["total_m_earned"]} </td>`;
              row += `<td rowspan=""> ${retrieveddata[i]["cards"][ii]["total"]} </td>`;
              row += `<td rowspan=""> ${retrieveddata[i]["cards"][ii]["oON"]} </td>`;
              row += `<td rowspan=""> ${retrieveddata[i]["cards"][ii]["oIN"]} </td>`;
              row += `<td rowspan=""> ${retrieveddata[i]["cards"][ii]["buy_order"]} </td>`;

              row += "</tr>";
            }
          }

          document.getElementById("market_table").innerHTML += row;
        }

        basma();
      },
      false
    );
  },
  false
);
