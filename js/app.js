const quotesText = document.querySelector(".quotesText");
const quotesAuthor = document.querySelector(".quotesAuthor");
const quotesBtn = document.getElementById("quoteGenerator");
let quotesData = "";
let quotesResponse = "";
function quotesGenerator() {
    let randomIndex = Math.floor(Math.random() * quotesData.length);
    let randomQuote = quotesData[randomIndex];
    quotesText.innerText = randomQuote.text;
    if (randomQuote.author !== null) {
        quotesAuthor.innerText = `By ${randomQuote.author}`;
    } else {
        quotesAuthor.innerText = "By Unknown";
    }
}
const getQuotes = async () => {
    const quotesAPI = "https://type.fit/api/quotes";
    try {
        quotesResponse = await fetch(quotesAPI);
        quotesData = await quotesResponse.json();
        quotesData.forEach((quote) =>
            quote.author === null ? (quote.author = "unknown") : quote.author
        );
        quotesGenerator();
    } catch (error) {
        document.body.innerText = error;
    }
};
quotesBtn.addEventListener("click", quotesGenerator);
getQuotes();

const searchQuotes = document.getElementById("searchField");
const recommendQuotes = document.querySelector(".recommendQuotes");
function constructFilteredQuotes(quoteArray) {
    recommendQuotes.innerHTML = "";
    quoteArray.forEach((quoteItem) => {
        const list = document.createElement("li");
        const span = document.createElement("span")
        list.classList.add("quote-search-item");
        span.classList.add("quote-search-author")
        list.textContent = quoteItem.text;
        span.textContent = quoteItem.author;
        list.appendChild(span);
        recommendQuotes.appendChild(list);
    });
    console.log(recommendQuotes);
}

searchQuotes.addEventListener("input", function (e) {
    let char = this.value.toLowerCase();
    console.log(char);
    let filteredQuotes = quotesData.filter((quote) => {
        let author = quote.author.toLowerCase();
        return (author.startsWith(char));
    });
    console.log(filteredQuotes);
    if (char !== "") {
        constructFilteredQuotes(filteredQuotes);
    }
    else{
        recommendQuotes.innerHTML = "";
    }
});

const searchQuotePage = document.getElementById("searchTheQuote");
const getQuotePage = document.getElementById("getTheQuote");
const quoteSection = document.getElementById("container-quotes");
const searchSection = document.getElementById("search-quotes");

class Fade {
  constructor(selector, p1, p2) {
    let element = document.querySelector(selector);
    element: element, p1, p2;
  }
  leftMotion() {
    element.style.transform = `translateX(${p2}%)`;
  }
  rightMotion() {}
  topMotion() {}
  bottomMotion() {}
}

searchQuotePage.addEventListener("click", () => {
  quoteSection.classList.add("shrink");
  quoteSection.addEventListener("animationend", function () {
    if (this.classList.contains("shrink")) {
      this.classList.replace("shrink", "leftMotion");
      this.addEventListener("animationend", () => {
        this.style.display = "none";
        searchSection.style.display = "block";
        searchSection.classList.add("topMotion");
      });
    }
  });
});
