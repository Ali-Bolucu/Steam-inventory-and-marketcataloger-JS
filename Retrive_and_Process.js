document.addEventListener(
  "DOMContentLoaded",
  function () {
    var checkPageButton = document.getElementById("gettowindow");
    checkPageButton.addEventListener(
      "click",
      function () {
        var retrievedObject = localStorage.getItem("market_h");

        function basma() {
          document.getElementById("deneme").innerHTML += JSON.parse(
            retrievedObject
          );
          console.log("retrievedObject: ", JSON.parse(retrievedObject));
        }
        setTimeout(basma, 2000);
      },
      false
    );
  },
  false
);
