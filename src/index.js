console.log(data);

function createElement(tag) {
    const element = document.createElement(tag);
    return element;
}

function createElementWithText(tag, text) {
    const element = document.createElement(tag);
    element.innerText = text;
    return element;
}

const dogListContainer = document.querySelector('.dogs-list');
dogListContainer.className = 'dogs-list';

function createDogListItem(dogs){
    const dog = createElementWithText('li', dogs.name);
    dog.className = 'dogs-list__button';
    dog.id = dogs.id;
    return dog;
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
    goodDogButton.id = 'toggle';
    const isNaughty = checkIfGoodDog(dog, goodDogButton);
    naughtyDog.append(italicText, isNaughty);
    parentElement.append(naughtyDog, goodDogButton);
}

function createDogCard(parentElement, dog){
    parentElement.innerText = '';
    createDogCredentials(parentElement, dog);
    createDogBio(parentElement, dog);
    dogBehaviour(parentElement, dog);
    const toggleButton = document.querySelector('#toggle');
    toggleButton.addEventListener('click', function(event) {
        event.preventDefault();
        if(toggleButton.innerText === 'Good Dog!'){
            toggleButton.innerText = 'Bad Dog!';
        }
        else{
            toggleButton.innerText = 'Good Dog!';
        }
    });
}

function displayDogCard(dog){
    createDogCard(dogsMainSection, dog);
}

function createLabel (parentElement, inputLabel, labelFor){
    const label = createElementWithText('label', inputLabel);
    label.setAttribute('for', labelFor);
    parentElement.append(label);
}

function createInput(parentElement, labelFor, inputType){
    const input = createElement('input');
    input.setAttribute('type', inputType);
    input.id = labelFor;
    input.setAttribute('name', labelFor);
    parentElement.append(input);
    return input;
}

function addDogElementToForm(parentElement, inputLabel, labelFor, inputType){
    createLabel(parentElement, inputLabel, labelFor);
    createInput(parentElement, labelFor, inputType);
}

function addTextAreaElementToForm(parentElement, inputLabel, labelFor, rows){
    const label = createElementWithText('label', inputLabel);
    label.setAttribute('for', labelFor);
    const textArea = createElement('textarea');
    textArea.setAttribute('rows', rows);
    textArea.setAttribute('name', labelFor);
    textArea.id = labelFor;
    parentElement.append(label, textArea);
}

function newDogInput(input){
    input.addEventListener('click', function (event){
        event.preventDefault();
        const name = document.querySelector('#name').value; 
        const picture = document.querySelector('#image').value;
        const bio = document.querySelector('#bio').value;
        const newDog = {
            id: 0,
            name: name,
            bio: bio,
            image: picture
        }
        data.unshift(newDog);
        for(let i = 0; i < data.length; i++){
            data[i].id += 1;

        }
        dogListContainer.innerHTML = '';
        const addDogButton = createElementWithText('li', '+');
        addDogButton.className = 'dogs-list__button dogs-list__button--add';
        dogListContainer.append(addDogButton);
        addDogButton.addEventListener('click', displayAddDogForm);
        data.forEach(dog => {
            const dogLi = createDogListItem(dog);
            dogListContainer.append(dogLi);
        });
        document.querySelector('.header').append(dogListContainer);
        document.querySelector('.form').reset();
    });
}

function createForm(parentElement){
    parentElement.innerText = '';
    const formHeader = createElementWithText('h2', 'Add a new Dog');
    const formContainer = createElement('form');
    formContainer.className = 'form';
    addDogElementToForm(formContainer, 'Dog\'s name', 'name', 'text');
    addDogElementToForm(formContainer, 'Dog\'s picture', 'image', 'url');
    addTextAreaElementToForm(formContainer, 'Dog\'s bio', 'bio', 5);
    const submitInput = createInput(formContainer, 'submit', 'submit');
    submitInput.setAttribute('value', 'Let\'s add a dog!');
    submitInput.className = 'form__button';
    parentElement.append(formHeader, formContainer);
    newDogInput(submitInput);
}

function displayAddDogForm(){
    createForm(dogsMainSection);
}

data.forEach(dog => {
    const dogLi = createDogListItem(dog);
    dogListContainer.append(dogLi);
});

dogListContainer.addEventListener("click", function (event) {
    event.preventDefault();
    let dogID = event.target.id;
    let li = event.target.closest('li');
    if(li.className === 'dogs-list__button dogs-list__button--add'){
        return;
    }
    else if(!li){
        return;
    }
    createDogCard(dogsMainSection, data[dogID-1]);
});


const addDogButton = document.querySelector('.dogs-list__button--add');
addDogButton.addEventListener('click', displayAddDogForm);