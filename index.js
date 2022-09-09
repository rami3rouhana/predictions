// Api urls
let genderURL = "https://api.genderize.io?name=";
let ageURL = " https://api.agify.io/?name=";
let nationalityURL = "https://api.nationalize.io/?name=";
const dogUrl = "https://dog.ceo/api/breeds/image/random";

// Variables
const image = document.getElementById('dog-image');

// Fuctions

// Random dog image
const dogImage = async () => {
    const imgSrc = "./404.jpg"
    try{
        const res = await fetch(dogUrl);
        const data = await res.json();
        image.setAttribute("src", data.message);
    }
    catch(err){
        image.setAttribute("src", imgSrc)
        console.log(err);
    }
}

// Gender by name
const genderName = async (userName) => {
    genderURL = genderURL + userName;
    try {
        const res = await fetch(genderURL);
        const data = await res.json();
        return data.gender;
    }
    catch (err) {
        console.log(err);
    }
}

// Age by name
const ageName = async (userName) => {
    ageURL = ageURL + userName;
    try {
        const res = await fetch(ageURL);
        const data = await res.json();
        return data.age;
    }
    catch (err) {
        console.log(err);
    }
}

// Nationalities by name
const nationalityName = async (userName) => {
    nationalityURL = nationalityURL + userName;
    try {
        const res = await fetch(nationalityURL);
        const data = await res.json(); 
        return [data.country[0].country_id, data.country[1].country_id];
    }
    catch (err) {
        console.log(err);
    }
}

// Add image on load
window.onload = dogImage;

// Submit Name
document.getElementById('submit').onclick = async (e) => {
    e.preventDefault();
    const inputName = document.getElementById('name').value;
    const gender = await genderName(inputName);
    const age = await ageName(inputName);
    const nationality = await nationalityName(inputName);
    debugger
}