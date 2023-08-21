const inputSlider =document.querySelector("[data-lengthSlider]");
const passwordDisplay = document.querySelector("[data-passwordDisplay]");
const lengthDisplay = document.querySelector("[data-lengthNumber]");
const uppercaseCheck = document.querySelector("#uppercase");
const lowercaseCheck = document.querySelector("#lowercase");
const numbersCheck = document.querySelector("#numbers");
const symbolsCheck = document.querySelector("#symbols");
const indicator = document.querySelector("[data-indicator]");
const copyBtn = document.querySelector("[data-copy]");
const copyMsg = document.querySelector("[data-copyMsg]"); 
const generatebtn=document.querySelector(".generateButton");
const allCheckBox =document.querySelectorAll("input[type=checkbox]"); 
const symbols = '~`!@#$%^&*()_-+={[}]|:;"<,>.?/';


let password ="";
let passwordLength =10;
let checkCount =0  ;
handlerSlider();

function handlerSlider(){
    inputSlider.value = passwordLength;
    lengthDisplay.innerText =passwordLength;
}

function setIndicator(color){
    indicator.style.backgroundColor = color;
}

function getRndInteger(min,max){
    return Math.floor(Math.random()*(max-min)) + min;
}
function generateRandomNumber(){
    return getRndInteger(0,9);
}

function generateLowerCase(){
    return String.fromCharCode(getRndInteger(97,123));

}
function generateUpperCase(){
    return String.fromCharCode(getRndInteger(65,91));
    
}

function generateSymbols(){
    const random = getRndInteger(0,symbols.length);
    return symbols.charAt(random);
}


function calcStrength(){
    let hasUpper =false;
    let hasLower =false;
    let hasNum =false;
    let hasSym =false;
    if(uppercaseCheck.checked) hasUpper=true;
    if(lowercaseCheck.checked) hasLower=true;
    if(numbersCheck.checked) hasNum=true;
    if(symbolsCheck.checked) hasSym=true;
    if(hasUpper && hasLower && (hasNum||hasSym) && passwordLength>=8){
        setIndicator("#0f0");
    } else if(
        (hasLower||hasUpper)&&
        (hasNum||hasSym)&& 
        password.length>=6 )
     { 
        setIndicator("#ff00");
     } else{
        setIndicator("#f00");
     }
}
async function copyContent(){
    try {
        await navigator.clipboard.writeText(passwordDisplay.value);
        copyMsg.innerText="copied";
    }
    catch(e){
        copyMsg.innerText="failed";
    }
    copyMsg.classList.add("active");
    
    setTimeout(() =>{
        copyMsg.classList.remove("active");
    },2000);
}
function shufflePassword(array) {
    //Fisher Yates Method
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
      }
    let str = "";
    array.forEach((el) => (str += el));
    return str;
}

function handleCheckBoxChange(){
    checkCount=0;
    allCheckBox.forEach((checkbox)=>{
        if(checkbox.checked){
            checkCount++;
        }
    });

    if(passwordLength < checkCount){
        passwordLength = checkCount;
        handlerSlider();
    }
}

allCheckBox.forEach((checkbox)=>{
    checkbox.addEventListener('change',handleCheckBoxChange);
})

inputSlider.addEventListener('input', (e) => {
    passwordLength=e.target.value;
    handlerSlider();
    
})

copyBtn.addEventListener('click',()=>{
    if(passwordDisplay.value)
        copyContent();   
})

generatebtn.addEventListener('click',()=>{
    if(checkCount==0) return;

    if(passwordLength<checkCount){
        passwordLength=checkCount; 
        handlerSlider();
    }
    console.log("starting the jounery");
    password="";
    let funArr=[];
    if(uppercaseCheck.checked){
        funArr.push(generateUpperCase);
    }
    if(lowercaseCheck.checked){
        funArr.push(generateLowerCase);
    }
    if(numbersCheck.checked)
        funArr.push(generateRandomNumber);
    if(symbolsCheck.checked){
        funArr.push(generateSymbols);
    }

        for(let i=0; i<funArr.length;i++){
            password +=funArr[i]();
        }

        console.log("Compulsory addition done");

        for(let i=0; i<passwordLength-funArr.length;i++){
            let randindex= getRndInteger(0, funArr.length);
            password+=funArr[randindex]();
        }
        console.log(" shuffling done");


        password= shufflePassword(Array.from(password));

        passwordDisplay.value =password;
        console.log("ui addition done");
        calcStrength();
    

});