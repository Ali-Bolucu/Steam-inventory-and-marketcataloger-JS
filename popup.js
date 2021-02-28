document.addEventListener(
  "DOMContentLoaded",
  function () {
    var checkPageButton = document.getElementById("inventory");
    checkPageButton.addEventListener(
      "click",
      function () {
        window.open("Inventory.html", "_blank");
      },
      false
    );
  },
  false
);

document.addEventListener(
  "DOMContentLoaded",
  function () {
    var checkPageButton = document.getElementById("market");
    checkPageButton.addEventListener(
      "click",
      function () {
        window.open("Market_history.html", "_blank");
      },
      false
    );
  },
  false
);
