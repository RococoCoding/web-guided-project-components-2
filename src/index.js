// Imports at the top of the file!
// We never nest imports inside blocks of code!
import axios from 'axios'

// WE SELDOM DO THE FOLLOWING
// WE SELDOM DO THE FOLLOWING
// WE SELDOM DO THE FOLLOWING
// WE SELDOM DO THE FOLLOWING
// a function that returns a Promise (like Axios)
function fakeAxios() {
  return Promise.resolve({ success: true, data: { foo: 'bar' } })
}

// WE DO THE FOLLOWING ALL THE TIME
// WE DO THE FOLLOWING ALL THE TIME
// WE DO THE FOLLOWING ALL THE TIME
// WE DO THE FOLLOWING ALL THE TIME
fakeAxios()
  .then(data => {
    // Chrome invokes this when the data arrives in the distant future
    // We can do whatever with the data, but only in here
    // We don't know necessarily what the data will look like. Use breakpoints!
    // REMEMBER: ONLY IN HERE DO WE HAVE ACCESS TO THE DATA
    console.log('hurray, the data is here')
    console.log(data)
    // throw new Error('ARGH that hurt') // artificial error
    return data //  this gets injected into the next .then
    // if we return another promise instead of "normal" data
    // the "future" data gets injected into the next .then
  })
  .then(moreData => {
    // you can return from the previous .then all you want
    // then you need another .then
    console.log('here is your stuff you returned in the other .then', moreData)
  })
  .catch(error => {
    // anything goes wrong during I/O (or even inside one of the .then)
    // and this callback gets executed by Chrome, passing the error
    debugger
  })

console.log('hello world') // this will run BEFORE the .then/.catch callbacks
// THE DATA WILL NEVER BE HERE!!! THE CODE IN THIS REGION RAN EONS BEFORE THE DATA RETURNED!!!!

// 👉 TASK 1- Test out the following endpoints:

//     https://lambda-times-api.herokuapp.com/friends
//     https://lambda-times-api.herokuapp.com/friends/1
//     https://lambda-times-api.herokuapp.com/quotes
//     https://lambda-times-api.herokuapp.com/cards
//     https://lambda-times-api.herokuapp.com/breeds
//     https://dog.ceo/api/breeds/image/random

//    * With HTTPie (command-line tool)
//    * With Postman (tool with GUI)
//    * With Chrome
//    * With JS using the native fetch


// 👉 TASK 2- Select the "entry point", the element
// inside of which we'll inject our dog cards 
const entryPoint = document.querySelector('.entry')


// 👉 TASK 3- `dogCardMaker` takes an object and returns a Dog Card.
// Use this function to build a Card, and append it to the entry point.
function dogCardMaker({ imageURL, breed }) {
  // instantiating the elements
  const dogCard = document.createElement('div')
  const image = document.createElement('img')
  const heading = document.createElement('h3')
  // setting class names, attributes and text
  heading.textContent = `Breed: ${breed}`
  image.src = imageURL
  image.classList.add('dog-image')
  dogCard.classList.add('dog-card')
  // creating the hierarchy
  dogCard.appendChild(image)
  dogCard.appendChild(heading)
  // adding some interactivity
  dogCard.addEventListener('click', () => {
    dogCard.classList.toggle('selected')
  })
  // never forget to return!
  return dogCard
}


// 👉 TASK 4- Bring the Axios library into the project using one of two methods:
//    * Traditional way: put another script tag inside index.html (`https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js`)
//    * Proyects with npm: install it with npm and import it into this file
console.log('actually axios', axios)

// 👉 TASK 5- Fetch dogs from `https://dog.ceo/api/breed/{breed}/images/random/{number}`
//    * ON SUCCESS: use the data to create dogCards and append them to the entry point
//    * ON FAILURE: log the error to the console
//    * IN ANY CASE: log "done" to the console
axios.get('https://dog.ceo/api/breed/mastiff/images/random/3')
  .then(stuff => {
    // THIS IS THE ONLY PLACE WHERE WE HAVE ACCESS TO THE IMAGE URLS FROM THE ENDPOINT
    // THIS IS THE ONLY PLACE WHERE WE HAVE ACCESS TO THE IMAGE URLS FROM THE ENDPOINT
    // THIS IS THE ONLY PLACE WHERE WE HAVE ACCESS TO THE IMAGE URLS FROM THE ENDPOINT
    console.log('response body axios puts in "data" property', stuff.data)
    console.log('the array of dog images', stuff.data.message)
    const dogImageURLsArr = stuff.data.message

    dogImageURLsArr.forEach(URL => {
      const dogCard = dogCardMaker({ imageURL: URL, breed: 'mastiff' })
      entryPoint.appendChild(dogCard)
    })
    // function dogCardMaker expects this: { imageURL, breed }
  })
  .catch(err => {
    console.log(err)
    debugger
  })
// fetch('https://dog.ceo/api/breed/mastiff/images/random/3')
//   .then(partOfTheResponse => {
//     // fetch is sooo eager to give sth quick,
//     // it resolves some data before the body is in
//     return partOfTheResponse.json() // this operation ALSO returns a promise
//   })
//   .then(jsonStuff => {
//     debugger
      // THIS IS THE ONLY PLACE WHERE WE HAVE ACCESS TO THE IMAGE URLS FROM THE ENDPOINT
      // THIS IS THE ONLY PLACE WHERE WE HAVE ACCESS TO THE IMAGE URLS FROM THE ENDPOINT
      // THIS IS THE ONLY PLACE WHERE WE HAVE ACCESS TO THE IMAGE URLS FROM THE ENDPOINT
//   })
//   .catch(err => {
//     debugger
//   })

// 👉 (OPTIONAL) TASK 6- Wrap the fetching operation inside a function `getDogs`
// that takes a breed and a count (of dogs)


// 👉 (OPTIONAL) TASK 7- Put a button in index.html to 'get dogs' and add a click
// event listener that executes `getDogs`


// 👉 (OPTIONAL) TASK 8- Import the breeds from `breeds.js`
// or request them from https://lambda-times-api.herokuapp.com/breeds
// and loop over them, fetching a dog at each iteration
