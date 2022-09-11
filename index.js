// Api urls
let genderURL = "https://api.genderize.io?name=";
let ageURL = " https://api.agify.io/?name=";
let nationalityURL = "https://api.nationalize.io/?name=";
const dogUrl = "https://dog.ceo/api/breeds/image/random";

// Random dog image
const dogImage = async () => {
    const imgSrc = "./404.jpg"
    const image = document.getElementById('dog-image');
    try{
        const res = await axios(dogUrl);
        image.setAttribute("src", res.data.message);
    }
    catch(err){
        image.setAttribute("src", imgSrc)
        console.log(err);
    }
}

// Gender by name
const genderName = async (userName) => {
    try {
        const res = await axios(genderURL + userName);
        return res.data.gender;
    }
    catch (err) {
        console.log(err);
    }
}

// Age by name
const ageName = async (userName) => {
    try {
        const res = await axios(ageURL + userName);
        return res.data.age;
    }
    catch (err) {
        console.log(err);
    }
}

// Nationalities by name
const nationalityName = async (userName) => {
    try {
        const res = await axios(nationalityURL + userName); 
        return [res.data.country[0].country_id, res.data.country[1].country_id];
    }
    catch (err) {
        console.log(err);
    }
}

// Add image on load
window.onload = dogImage;

// Add emptyspace restrication
document.getElementById('submit-name').addEventListener("keypress",(e)=>{
    if (!(e.charCode >= 97 && e.charCode <= 122) && !(e.charCode >= 65 && e.charCode <= 90)){
        e.returnValue = '';
    }
})

// Submit Name
document.getElementById('submit').onclick = async (e) => {
    e.preventDefault();

    // Add name to profile
    const inputName = document.getElementById('submit-name');
    const pageName = document.getElementById('name');
    pageName.innerText = inputName.value;

    // Add empty restriction
    if(inputName.value == ""){
        return false;
    }

    // Add gender to profile
    const gender = await genderName(inputName.value);
    const pageGender = document.getElementById('gender');
    pageGender.innerText = gender;
    
    // Add age to profile
    const age = await ageName(inputName.value);
    const pageAge = document.getElementById('age');
    pageAge.innerText = age;

    // Add nationalities to profile
    const nationalities = await nationalityName(inputName.value);
    const pageNationalities = document.getElementById('nationalities');
    pageNationalities.innerText = `${nationalities[0]}, ${nationalities[1]}`;

    // Clear input
    document.getElementById("submit-name").value = '';
}