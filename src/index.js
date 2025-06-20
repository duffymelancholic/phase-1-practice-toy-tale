let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
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
});


fetch('http://localhost:3000/toys')
  .then(resp => resp.json())
  .then(toys => toys.forEach(renderToyCard));

  function renderToyCard(toy) {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
      <h2>${toy.name}</h2>
      <img src="${toy.image}" class="toy-avatar" />
      <p>${toy.likes} Likes</p>
      <button class="like-btn" id=${toy.id}>Like ❤️</button>
    `;
    
    card.querySelector('button').addEventListener('click', () => likeToy(toy, card));
    
    document.querySelector('#toy-collection').appendChild(card);
  }
  

  document.querySelector('.add-toy-form').addEventListener('submit', function(e) {
    e.preventDefault();
  
    const name = e.target.name.value;
    const image = e.target.image.value;
  
    fetch('http://localhost:3000/toys', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({ name, image, likes: 0 })
    })
      .then(resp => resp.json())
      .then(newToy => renderToyCard(newToy));
  
    e.target.reset();
  });
  

  function likeToy(toy, card) {
    const newLikes = toy.likes + 1;
  
    fetch(`http://localhost:3000/toys/${toy.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({ likes: newLikes })
    })
      .then(resp => resp.json())
      .then(updatedToy => {
        toy.likes = updatedToy.likes;
        card.querySelector('p').textContent = `${updatedToy.likes} Likes`;
      });
  }
// This code fetches a list of toys from a server, renders each toy as a card, allows users to like toys, and add new toys through a form submission.
// It uses the Fetch API to interact with a RESTful API, updating the DOM dynamically based on user interactions.
// The code also handles form submission to create new toys and updates the likes count when a toy is liked.
// The toys are displayed in a collection, and each toy card includes a name, image, likes count, and a like button.
// The like button updates the likes count both in the UI and on the server, ensuring that the displayed data is always current.
// The code is structured to be modular, with separate functions for rendering toy cards, liking toys, and handling form submissions.
// The use of event listeners allows for interactive behavior, making the application responsive to user actions.
// The code is designed to be run in a browser environment, assuming a server is running on `http://localhost:3000` that provides the necessary API endpoints for toys.
// The toys are expected to have properties like `id`, `name`, `image`, and `likes`, which are used to render the toy cards and manage interactions.
// The code is written in JavaScript and uses modern ES6+ features like arrow functions, template literals, and the Fetch API for cleaner and more efficient code.
// It is a simple yet effective implementation of a toy management system that demonstrates basic CRUD operations (Create, Read, Update) using a RESTful API approach.
// The code is easy to extend and modify, allowing for additional features or changes in the future, such as deleting toys or adding more attributes to the toy objects.
// Overall, this code provides a solid foundation for a toy management application, showcasing how to work with APIs, handle user input, and dynamically update the UI  

