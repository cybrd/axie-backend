// ==UserScript==
// @name     Axie Zone Finder
// @namespace axie
// @include https://axie.zone/finder?search=breed_count:0*;view_genes
// @version  1
// @grant    none
// @require     https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js
// @require     https://gist.github.com/raw/2625891/waitForKeyElements.js
// ==/UserScript==

// start page: https://axie.zone/finder?search=breed_count:0;view_genes

let start = 0;
let timeout;
const resultsNode = $("#search_result_container")[0];
const config = { attributes: true, childList: true, subtree: true };
const callback = function (mutationsList) {
  for (const mutation of mutationsList) {
    if (mutation.type === "childList") {
      clearTimeout(timeout);
      timeout = setTimeout(resultsCB, 2000);
    }
  }
};
const observer = new MutationObserver(callback);
observer.observe(resultsNode, config);

async function resultsCB() {
  const apiUrl =
    "https://dxmwof9qec.execute-api.ap-northeast-1.amazonaws.com/dev/update";

  const axieNodes = $(".search_result_wrapper.result_genes");
  console.log(axieNodes.length);

  const requestObj = [];

  axieNodes.each(function () {
    let id = $(".search_result", this).attr("href").substr(42);
    id = id.substr(0, id.length - 19);
    const breedCount = $("div.subcaption", this).html().substr(13);
    const eye1 = $("tr.eyes td:eq(1)", this).html();
    const eye2 = $("tr.eyes td:eq(2)", this).html();
    const eye3 = $("tr.eyes td:eq(3)", this).html();
    const ear1 = $("tr.ears td:eq(1)", this).html();
    const ear2 = $("tr.ears td:eq(2)", this).html();
    const ear3 = $("tr.ears td:eq(3)", this).html();
    const back1 = $("tr.back td:eq(1)", this).html();
    const back2 = $("tr.back td:eq(2)", this).html();
    const back3 = $("tr.back td:eq(3)", this).html();
    const mouth1 = $("tr.mouth td:eq(1)", this).html();
    const mouth2 = $("tr.mouth td:eq(2)", this).html();
    const mouth3 = $("tr.mouth td:eq(3)", this).html();
    const horn1 = $("tr.horn td:eq(1)", this).html();
    const horn2 = $("tr.horn td:eq(2)", this).html();
    const horn3 = $("tr.horn td:eq(3)", this).html();
    const tail1 = $("tr.tail td:eq(1)", this).html();
    const tail2 = $("tr.tail td:eq(2)", this).html();
    const tail3 = $("tr.tail td:eq(3)", this).html();
    const price = $("div.price", this).html().substr(2);

    const eye1class = $("tr.eyes td:eq(1)", this).attr("class");
    const eye2class = $("tr.eyes td:eq(2)", this).attr("class");
    const eye3class = $("tr.eyes td:eq(3)", this).attr("class");
    const ear1class = $("tr.ears td:eq(1)", this).attr("class");
    const ear2class = $("tr.ears td:eq(2)", this).attr("class");
    const ear3class = $("tr.ears td:eq(3)", this).attr("class");
    const back1class = $("tr.back td:eq(1)", this).attr("class");
    const back2class = $("tr.back td:eq(2)", this).attr("class");
    const back3class = $("tr.back td:eq(3)", this).attr("class");
    const mouth1class = $("tr.mouth td:eq(1)", this).attr("class");
    const mouth2class = $("tr.mouth td:eq(2)", this).attr("class");
    const mouth3class = $("tr.mouth td:eq(3)", this).attr("class");
    const horn1class = $("tr.horn td:eq(1)", this).attr("class");
    const horn2class = $("tr.horn td:eq(2)", this).attr("class");
    const horn3class = $("tr.horn td:eq(3)", this).attr("class");
    const tail1class = $("tr.tail td:eq(1)", this).attr("class");
    const tail2class = $("tr.tail td:eq(2)", this).attr("class");
    const tail3class = $("tr.tail td:eq(3)", this).attr("class");

    const axieObj = {
      id,
      breedCount,
      eye1,
      eye2,
      eye3,
      ear1,
      ear2,
      ear3,
      back1,
      back2,
      back3,
      mouth1,
      mouth2,
      mouth3,
      horn1,
      horn2,
      horn3,
      tail1,
      tail2,
      tail3,
      price,
      eye1class,
      eye2class,
      eye3class,
      ear1class,
      ear2class,
      ear3class,
      back1class,
      back2class,
      back3class,
      mouth1class,
      mouth2class,
      mouth3class,
      horn1class,
      horn2class,
      horn3class,
      tail1class,
      tail2class,
      tail3class,
    };

    requestObj.push(axieObj);
  });
  console.log(requestObj[0]);

  if (axieNodes.length) {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestObj),
    });
    response.json().then((data) => {
      console.log(data);
      console.log(start);

      if (start) {
        setTimeout(function () {
          $("div.page_nav i.right:eq(0)").click();
        }, 2000);
      }
    });
  }
}

$("div.page_nav i.right:eq(0)").on("click", function () {
  start = 1;
});
