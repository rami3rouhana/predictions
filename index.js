// Api urls
let genderURL = "https://api.genderize.io?name=";
let ageURL = " https://api.agify.io/?name=";
let nationalityURL =  "https://api.nationalize.io/?name=";
const dogUrl = "https://dog.ceo/api/breeds/image/random";

// Variables
const image = document.getElementById('dog-image');

// Fuctions

// Random dog image
const dogImage = async () => {
    const imgSrc = "./404.jpg"
    fetch(dogUrl).then( (r) =>
        r.json()
    ).then((data) => {
        data
        image.setAttribute("src",data.message);
    }).catch((err)=>{
        image.setAttribute("src",imgSrc)
        console.log(err);
    })
}

// Gender by name
const genderName = async (userName) => {
    genderURL = genderURL + userName;
    fetch(genderURL).then( (r) =>
        r.json()
    ).then((data) => {
        return data.gender;
    }).catch((err)=>{
        console.log(err);
    })
}

// Add image on load
window.onload = dogImage;

// Submit Name
document.getElementById('submit').onclick = function () {
    const inputName = document.getElementById('name').value;
    const age = genderName(inputName);
}