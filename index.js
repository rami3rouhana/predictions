// Api urls
const genderURL = "https://api.genderize.io?name=";
const ageURL = " https://api.agify.io/?name=";
const nationalityURL =  "https://api.nationalize.io/?name=";
const dogUrl = "https://dog.ceo/api/breeds/image/random";

// Variables
const name = document.getElementById('name').value ;
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

// Add image on load
window.onload = dogImage;

// Submit Name
document.getElementById('submit').onclick = function () {
        
}