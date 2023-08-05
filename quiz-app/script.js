const questionContainer = document.querySelector(".question");
const questionResult = document.getElementById("question");
const answerContainer = document.querySelector(".answer-container");
const a = document.getElementById("a");
const b = document.getElementById("b");
const c = document.getElementById("c");
const d = document.getElementById("d");
const submitBtn = document.getElementById("submit");

const quizData = [
  {
    question: "hewan apa yang kakinya dua",
    a: "bebek",
    b: "angsa",
    c: "ular",
    d: "harimau",
    correct: "a",
  },
  {
    question: "1 + 1 Berapa",
    a: "2",
    b: "4",
    c: "jendela",
    d: "batang",
    correct: "c",
  },
  {
    question: "What is the most widely used programming language in the world",
    a: "python",
    b: "java",
    c: "javascript",
    d: "c++",
    correct: "c",
  },
  {
    question: "Which company developed the Android operating system",
    a: "apple",
    b: "google",
    c: "meta",
    d: "x",
    correct: "b",
  },
  {
    question: "Which programming language is commonly used for building web applications and dynamic websites",
    a: "typescript",
    b: "java",
    c: "c++",
    d: "php",
    correct: "a",
  },
];

console.log(quizData);

let currentQuestion = 0;
let correctAnswers = new Array(quizData.length).fill(0);

loadQuiz();

function loadQuiz() {
  const currentQuiz = quizData[currentQuestion];

  questionResult.innerHTML = `${currentQuiz.question}?`;
  a.innerHTML = `${currentQuiz.a}`;
  b.innerHTML = `${currentQuiz.b}`;
  c.innerHTML = `${currentQuiz.c}`;
  d.innerHTML = `${currentQuiz.d}`;

  selectedAnswer();
}

function selectedAnswer() {
  const liEl = document.querySelectorAll("li");

  liEl.forEach((li) => {
    li.removeEventListener("click", clickListener); // Remove previous event listeners
    li.addEventListener("click", clickListener); // Add a new event listener
  });
}

function clickListener() {
  const li = this; // 'this' refers to the clicked <li> element
  const liEl = document.querySelectorAll("li");

  liEl.forEach((el) => {
    if (el !== li) {
      el.classList.remove("active");
    }
  });
  li.classList.add("active");
  isCorrect(li.id);
}

function removeSelectedAnswer() {
  const liEl = document.querySelectorAll("li");

  liEl.forEach((li) => {
    li.classList.remove("active");
  });
}

function isCorrect(selected) {
  const currentQuiz = quizData[currentQuestion];
  const correctAnswer = currentQuiz.correct;
  if (selected === correctAnswer) {
    correctAnswers[currentQuestion] = 1;
    console.log(correctAnswers);
    console.log("you correct");
  } else {
    console.log("salah");
    correctAnswers[currentQuestion] = 0;
  }
}

submitBtn.addEventListener("click", () => {
  currentQuestion++;

  if (currentQuestion < quizData.length) {
    loadQuiz();
    removeSelectedAnswer();
  } else {
    questionContainer.classList.add("hide");
    answerContainer.classList.add("hide");
    const result = document.createElement("div");
    const wrapper = document.querySelector(".wrapper");
    result.style.textAlign = "center";

    const totalCorrectAnswers = correctAnswers.reduce(
      (total, answer) => total + answer,
      0
    );

    result.innerHTML = `kamu menjawab ${quizData.length} pertanyaan<br>
     ${totalCorrectAnswers} jawaban yang benar`;

    wrapper.appendChild(result);

    let count = 5;

    setInterval(() => {
      count--;
      console.log(`reset dalam waktu ${count}`);
      if (count === 0) {
        setTimeout(() => {
          window.location.reload();
          clearInterval();
        }, 200);
      }
    }, 800);
  }
});
