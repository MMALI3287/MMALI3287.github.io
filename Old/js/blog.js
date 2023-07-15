const readMoreButtons = document.querySelectorAll(".read-more-btn");
const readLessButtons = document.querySelectorAll(".read-less-btn");

for (const readMoreButton of readMoreButtons) {
  readMoreButton.addEventListener("click", function () {
    const postContent = this.previousElementSibling;
    const readLessButton = this.nextElementSibling;
    postContent.style.display = "block";
    this.style.display = "none";
    readLessButton.style.display = "inline-block";
  });
}

for (const readLessButton of readLessButtons) {
  readLessButton.addEventListener("click", function () {
    const postContent = this.previousElementSibling.previousElementSibling;
    const readMoreButton = this.previousElementSibling;
    postContent.style.display = "none";
    this.style.display = "none";
    readMoreButton.style.display = "inline-block";
  });
}
