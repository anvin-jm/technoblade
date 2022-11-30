const RANDOM_QUOTE_API_URL = "http://api.quotable.io/random";
const quoteDisplayElement = document.getElementById("quoteDisplay");
const quoteInputElement = document.getElementById("quoteInput");
const timerElement = document.getElementById("timer");

window.oncontextmenu = function () {
  return false;
};

//courtesy of BoogieJack.com
function killCopy(e) {
  return false;
}
function reEnable() {
  return true;
}
document.onselectstart = new Function("return false");
if (window.sidebar) {
  document.onmousedown = killCopy;
  document.onclick = reEnable;
}

quoteInputElement.addEventListener("input", () => {
  const arrayQuote = quoteDisplayElement.querySelectorAll("span");
  const arrayValue = quoteInputElement.value.split("");

  let correct = true;
  arrayQuote.forEach((characterSpan, index) => {
    const character = arrayValue[index];
    if (character == null) {
      characterSpan.classList.remove("correct");
      characterSpan.classList.remove("incorrect");
      correct = false;
    } else if (character === characterSpan.innerText) {
      characterSpan.classList.add("correct");
      characterSpan.classList.remove("incorrect");
    } else {
      characterSpan.classList.remove("correct");
      characterSpan.classList.add("incorrect");
      correct = false;
    }
  });

  if (correct) {
    finalvalue = getTimerTime1();
    sessionStorage.setItem("finalvalue", finalvalue);
    window.location.replace("finish.html");
  }
});

function getRandomQuote() {
  return fetch(RANDOM_QUOTE_API_URL)
    .then((response) => response.json())
    .then((data) => data.content);
}

async function renderNewQuote() {
  const quote = await `import java.util.Scanner;
public class MatixMultiplication
{public static void main(String args[])
{int n; Scanner input = new Scanner(System.in);
System.out.println("Enter the number of rows and columns of the matrices.");
n = input.nextInt();
int[][] a = new int[n][n]; int[][] b = new int[n][n]; int[][] c = new int[n][n];
for (int i = 0; i < n; i++)
{for (int j = 0; j < n; j++)
{a[i][j] = input.nextInt();}}
System.out.println("Enter the numbers of the 2nd matrix. Numbers will be added row wise.");
for (int i = 0; i < n; i++)
{for (int j = 0; j < n; j++)
{b[i][j] = input.nextInt();}}
System.out.println("Generating the multiplication of matrices..");
for (int i = 0; i < n; i++)
{for (int j = 0; j < n; j++){
for (int k = 0; k < n; k++)
{c[i][j] = c[i][j] + a[i][k] * b[k][j];}}}`;
  quoteDisplayElement.innerHTML = "";
  quote.split("").forEach((character) => {
    const characterSpan = document.createElement("span");
    characterSpan.innerText = character;
    quoteDisplayElement.appendChild(characterSpan);
  });
  quoteInputElement.value = null;
  startTimer();
}

let startTime;
function startTimer() {
  timerElement.innerText = 0;
  startTime = new Date();
  setInterval(() => {
    timer.innerText = getTimerTime();
  }, 1000);
}

function getTimerTime() {
  return Math.floor((new Date() - startTime) / 1000);
}

function getTimerTime1() {
  return (new Date() - startTime) / 1000;
}

renderNewQuote();
