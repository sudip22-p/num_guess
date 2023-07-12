let submitBtn=document.getElementById("submit");
let remarks=document.getElementById("remark");
let numOfGuess=document.getElementById("guessedCount");
let lastFive=document.getElementById("lastFiveHistory");
let inc=document.getElementById("incrementBtn");
let dec=document.getElementById("decrementBtn");
let value=1;
document.getElementById("myGuess").value=value;
let guesses = [];
function storeGuess(guess) {
  guesses.push(guess);

  if (guesses.length > 5) {
    guesses.shift();
  }
}
let randomNumber = Math.floor(Math.random() * 100) + 1;
var guessedCount=0;
inc.addEventListener("click",()=>{
    if(value<100){
        value++;
    }
    document.getElementById("myGuess").value=value;
});
dec.addEventListener("click",()=>{
    if(value>1){
        value--;
    }
    document.getElementById("myGuess").value=value;
});
submitBtn.addEventListener("click",()=>{
    let getNum=document.getElementById("myGuess").value;
    if(getNum==""){
        remarks.innerHTML="*Guess the value first then submit!!";
        remarks.style.color="red";
    }
    else{
        number=parseInt(getNum);
        if(number>=1&&number<=100){
            checkGuessedValue(number);
        }
        else{
            remarks.innerHTML="*INVALID NUM!! *Guess the value in betn 1 & 100!!";
            remarks.style.color="red";
        }
    }
});
function checkGuessedValue(num){
    guessedCount++;
    if(guessedCount<10){
        let temp="0"+guessedCount;
        guessedCount=temp;
    }
    numOfGuess.innerHTML=guessedCount.toString();
    if(num==randomNumber){
        document.getElementById("changeTt").innerHTML="Success in attempt No:"+guessedCount.toString();
        document.getElementById("lastFive").style.display="none";
        remarks.innerHTML="*U ROCKED!! *Correct Guess!!";
        remarks.style.color="gold";
        guesses=[];
        guessedCount=0;
        submitBtn.innerHTML="Guess Again";
        submitBtn.addEventListener("click",()=>{
            location.reload();
        });
        randomNumber = Math.floor(Math.random() * 100) + 1;
    }
    else{
        document.getElementById("lastFive").style.display="flex";
        diff=num-randomNumber;
        if(diff>7){
            storeGuess(num);
            let lastFiveGuess="";
            for (let i = guesses.length-1; i >=0; i--) {
                lastFiveGuess += " @"+guesses[i].toString();
              }              
            lastFive.innerHTML=lastFiveGuess.toString();
            remarks.innerHTML="*TOO MUCH!! *Guess further smaller number!!";
            remarks.style.color="red";
        }
        if(diff<(-7)){
            storeGuess(num);
            let lastFiveGuess="";
            for (let i = guesses.length-1; i >=0; i--) {
                lastFiveGuess += " @"+guesses[i].toString();
              }              
            lastFive.innerHTML=lastFiveGuess.toString();
            remarks.innerHTML="*TOO LOW!! *Guess further bigger number!!";
            remarks.style.color="red";
        }
        if(diff>=(-7)&&diff<0){
            storeGuess(num);
            let lastFiveGuess="";
            for (let i = guesses.length-1; i >=0; i--) {
                lastFiveGuess += " @"+guesses[i].toString();
              }              
            lastFive.innerHTML=lastFiveGuess.toString();
            remarks.innerHTML="*SO CLOSE!! *Guess further bigger number!!";
            remarks.style.color="#00FF00";
        }
        if(diff<=7&&diff>0){
            storeGuess(num);
            let lastFiveGuess="";
            for (let i = 0; i < guesses.length; i++) {
                lastFiveGuess += " @"+guesses[i].toString();
              }              
            lastFive.innerHTML=lastFiveGuess.toString();
            remarks.innerHTML="*SO CLOSE!! *Guess further smaller number!!";
            remarks.style.color="#00FF00";
        }
    }

}