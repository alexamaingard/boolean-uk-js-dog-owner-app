/*
- Each list item should be clickable. When you click on an item, the 
selected dog should display on the main card
- The main card should contain all the information from the selected dog. 
Follow the template for the main card that you'll find on the HTML file.
- There should be only one card at the time on the screen
- The card should have a button that toggles for the selected dog between 
good dog/ bad dog

Tips
- Take advantage of scope in JS to have access to the data you need
- Remember you can add event listeners to any element on the page

Challenge
You might have noticed there's a plus button at the beginning of the top 
row. Add the behaviour to it. When clicked, it should replace the main card 
with a form to add a new dog to the list. 
You'll find a template for the form on the HTML page. Once the form is 
submitted, add the new dog to the beginning of the list, right next to 
the plus button.
*/

console.log(data);

// WRITE YOUR CODE BELOW!
function createElement(tag) {
    const element = document.createElement(tag);
    return element;
}

function createElementWithText(tag, text) {
    const element = document.createElement(tag);
    element.innerText = text;
    return element;
}

const addDogButton = document.querySelector('.dogs-list__button--add');

const dogListContainer = document.querySelector('.dogs-list');
dogListContainer.className = 'dogs-list';

let dogsAddedToList = 0;

function createDogListItem(parentElement, dogs){
    const dog = createElementWithText('li', dogs.name);
    dog.className = 'dogs-list__button';
    dog.id = dogs.id;
    parentElement.append(dog);
}

function displayDogInList(){
    if(dogsAddedToList < data.length){
        createDogListItem(dogListContainer,data[dogsAddedToList]);
        dogsAddedToList++;   
    }
}

const dogsMainSection = document.querySelector('.main__dog-section');

function checkIfGoodDog(dog, goodDogButton){
    const goodDog = dog.isGoodDog;
    goodDogButton.innerText = (goodDog? 'Good ' : 'Bad ') + 'Dog!';
    return (goodDog? 'no' : 'yes');
}

function createDogCredentials(parentElement, dog){
    const dogName = createElementWithText('h2', dog.name);
    const dogImage = createElement('img');
    dogImage.setAttribute('src', dog.image);
    parentElement.append(dogName, dogImage);
}

function createDogBio(parentElement, dog){
    const dogBioContainer = createElement('div');
    dogBioContainer.className = 'main__dog-section__desc';
    parentElement.append(dogBioContainer);
    const bioHeader = createElementWithText('h3', 'Bio');
    const bioText = createElementWithText('p', dog.bio);
    dogBioContainer.append(bioHeader, bioText);
}

function dogBehaviour(parentElement, dog){
    const naughtyDog = createElement('p');
    const italicText = createElementWithText('em', 'Is naughty? ');
    const goodDogButton = createElement('button');
    const isNaughty = checkIfGoodDog(dog, goodDogButton);
    naughtyDog.append(italicText, isNaughty);
    parentElement.append(naughtyDog, goodDogButton);
}

function createDogCard(parentElement, dog){
    parentElement.innerText = '';
    createDogCredentials(parentElement, dog);
    createDogBio(parentElement, dog);
    dogBehaviour(parentElement, dog);
}

function displayDogCard(dog){
    createDogCard(dogsMainSection, dog);
}

function displayAddDogForm(){

}

data.forEach(dog => {
    displayDogInList();
});

const dog = document.querySelector('.dogs-list');
dog.addEventListener("click", function (event) {
    event.preventDefault();
    let dogID = event.target.id;
    let li = event.target.closest('li');
    if(!li){
        return;
    }
    createDogCard(dogsMainSection, data[dogID-1]);
});

//addEventListener('click', displayAddDogForm);