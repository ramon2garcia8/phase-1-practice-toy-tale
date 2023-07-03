let addToy = false;

fetch("http://localhost:3000/toys")
  .then(res => res.json())
  .then(data => data.forEach(toy => createAllCards(toy)))

  function createAllCards(toy) { 
    const divCard = document.createElement("div")
    divCard.className = "card"
    const h2Card = document.createElement("h2")
    h2Card.textContent = toy.name
    const imgCard = document.createElement("img")
    imgCard.src = toy.image
    imgCard.className = "toy-avatar"
    const pCard = document.createElement("p")
    pCard.textContent = `${toy.likes} Likes`
    const buttonCard = document.createElement("button")
    buttonCard.className = "like-btn"
    buttonCard.id = toy.id
    buttonCard.textContent = "Like ❤️"

    divCard.append(h2Card, imgCard, pCard, buttonCard)
    const toyCollection = document.getElementById("toy-collection")
    toyCollection.append(divCard)
  }

document.addEventListener("DOMContentLoaded", () => {
  const toyForm = document.getElementsByClassName("add-toy-form")[0]
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });

  toyForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const toyArray = document.getElementsByClassName("input-text")
    const toyName = toyArray[0].value
    const toyImage = toyArray[1].value

    const toyObj = {
      name: toyName,
      image: toyImage,
      likes: 0
    }

    const config = {
      method: "POST",
      headers: {"Content-Type": "application/json"},

      body: JSON.stringify(toyObj)
    }
    fetch("http://localhost:3000/toys", config)
    .then(res => res.json())
    .then(data => createAllCards(data))

    // This may not be the best option but needed to refresh the page with the latest content
    // Must find alternative for it - Update the DOM without reloading the page
    //window.location.reload()
  })

  /*
  const toyButton = document.getElementsByClassName("like-btn")[0]
  const toyLikes = 0 //toyButton.likes
  toyButton.addEventListener("click", () => incrementLikes())

  function incrementLikes() {
    toyLikes.likes ++;
    fetch("http://localhost:3000/toys/:id", {
      method: "PATCH",
      headers: {
        "Content-Type" : "application/json"
      },
      body: JSON.stringify(
      {
        "likes": `${toyLikes.likes} Likes`
      }
    )
  })
  .then(response => response.json())
  .then(json => {
    toyLikes.innerText = `${json.likes} Likes`;
  });
  }
  */
});
