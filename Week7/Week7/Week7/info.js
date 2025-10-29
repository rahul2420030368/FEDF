import { books } from './data.js';

export function addMoreInfo() {
  const bookList = document.getElementById("bookList");

  // Add a More Info button next to each book
  books.forEach((book, index) => {
    const bookDiv = bookList.children[index];

    // Create button
    const infoBtn = document.createElement("button");
    infoBtn.textContent = "More Info";
    infoBtn.style.background = "#ffcccb"; // light pink
    infoBtn.style.marginLeft = "8px";

    // Create hidden info section
    const infoDiv = document.createElement("div");
    infoDiv.style.display = "none";
    infoDiv.style.marginTop = "5px";
    infoDiv.style.fontSize = "14px";
    infoDiv.style.color = "#444";

    // Add your extra details here
    const descriptions = {
      "One of Us Is Lying": {
        genre: "YA Mystery/Thriller",
        storyline: "Five students enter detention, but only four walk out alive.",
      },
      "One of Us Is Next": {
        genre: "YA Mystery",
        storyline: "A deadly new game of truth or dare takes over Bayview High.",
      },
      "One of Us Is Back": {
        genre: "YA Thriller",
        storyline: "Old secrets resurface as danger returns to Bayview.",
      },
      "The Housemaid": {
        genre: "Psychological Thriller",
        storyline: "A maid uncovers dark secrets in her employer’s home.",
      },
      "The Housemaid's Secret": {
        genre: "Thriller",
        storyline: "A sequel with deeper mysteries and shocking twists.",
      },
      "A Good Girl's Guide to Murder": {
        genre: "YA Mystery",
        storyline: "A student re-investigates a closed murder case for her project.",
      },
      "As Good As Dead": {
        genre: "YA Thriller",
        storyline: "The final chapter in Pip’s dangerous investigation journey.",
      },
      "I Fell in Love with Hope": {
        genre: "Contemporary Fiction",
        storyline: "A heartfelt story of love, friendship, and resilience.",
      },
      "Twisted Games": {
        genre: "Romance",
        storyline: "A forbidden royal romance full of passion and challenges.",
      }
    };

    const desc = descriptions[book.title];
    infoDiv.innerHTML = `
      <em>Author:</em> ${book.author}<br>
      <em>Genre:</em> ${desc.genre}<br>
      <em>Storyline:</em> ${desc.storyline}
    `;

    // Toggle visibility on click
    infoBtn.addEventListener("click", () => {
      infoDiv.style.display = infoDiv.style.display === "none" ? "block" : "none";
    });

    bookDiv.querySelector("div:last-child").appendChild(infoBtn);
    bookDiv.appendChild(infoDiv);
  });
}
