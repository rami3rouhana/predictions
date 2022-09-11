// Api urls
let genderURL = "https://api.genderize.io?name=";
let ageURL = " https://api.agify.io/?name=";
let nationalityURL = "https://api.nationalize.io/?name=";
const dogUrl = "https://dog.ceo/api/breeds/image/random";
const acitiviyUrl = "https://www.boredapi.com/api/activity";
const ipUrl = "https://api.ipify.org/?format=json";

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

// User Activity
const activityName = async () => {
    try {
        const res = await axios(acitiviyUrl); 
        return [res.data.activity];
    }
    catch (err) {
        console.log(err);
    }
}

// Ip by name
const userIp = async () => {
    try {
        debugger
        const res = await axios(ipUrl); 
        return [res.data.ip];
    }
    catch (err) {
        console.log(err);
        return '(Please Remove Advert from chrome)';
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

    // Variables
    const pageGender = document.getElementById('gender');
    const pageAge = document.getElementById('age');
    const pageNationalities = document.getElementById('nationalities');
    const pageActivity = document.getElementById('activity');
    const pageIp =  document.getElementById('ip');

    // Add name to profile
    const inputName = document.getElementById('submit-name');
    const pageName = document.getElementById('name');
    pageName.innerText = inputName.value;

    // Add user ip
    const ip = await userIp();
    pageIp.innerText = pageIp.innerText + ip;

    // Load data from local storage
    if(localStorage.getItem(inputName.value)){
        const userData = JSON.parse(localStorage.getItem(inputName.value))
        pageGender.innerText = userData.gender;
        pageAge.innerText = userData.age;
        pageNationalities.innerText = userData.nationalities;
        alert("Welcome Back!")
        return false;
    }

    // Add empty restriction
    if(inputName.value == ""){
        return false;
    }

    // Add gender to profile
    const gender = await genderName(inputName.value);
    pageGender.innerText = gender;
    
    // Add age to profile
    const age = await ageName(inputName.value);
    pageAge.innerText = age;

    // Add nationalities to profile
    const nationalities = await nationalityName(inputName.value);
    pageNationalities.innerText = `${nationalities[0]}, ${nationalities[1]}`;

    // Add activity to profile
    const activity = await activityName();
    pageActivity.innerText = activity;

    // Signup using localstorage
    localStorage.setItem(inputName.value, JSON.stringify({
        age,
        gender,
        nationalities:[nationalities[0], nationalities[1]],
        activity
    }))

    // Clear input
    document.getElementById("submit-name").value = '';
}