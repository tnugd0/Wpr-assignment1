// TODO(you): Write the JavaScript necessary to complete the assignment.
let introduction = document.querySelector("#introduction");
let attempQuiz = document.querySelector("#attempt-quiz");
let reviewQuiz = document.querySelector("#review-quiz");
let container = document.querySelector(".container");
let submitBtn = document.querySelector("#btn-submit");
let buttonStart = document.querySelector("#btn-start");
let tryAgainBtn = document.querySelector("#btn-tryagain");
attempQuiz.style.display = "none";
reviewQuiz.style.display = "none";


let attempQuizId = 0;

let userAnswer = {};


var questionIdList = [];
var answersList = [];
var TextList = [];


const submitApi = async (url, data) => {
    return await fetch(url, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: { "Content-type": "application/json" }

    }).then(async (res) => {
        return await res.json();
    }).then(data => {

        // console.log(data);
        console.log("post data successful");
        return data;
    })
};


const HttpRequest = async (url) => {
    return await fetch(url, {
        method: 'POST',
        // body : JSON.stringify(data),
        headers: { "Content-type": "application/json" }
    }).then(reponse => {
        return reponse.json();
    }).then(data => {
        data.questions.forEach(element => {
            questionIdList.push(element._id);
            answersList.push(element.answers);
            TextList.push(element.text);

        });
        attempQuizId = data._id;
    }).catch(error => {
        console.log(error);
    })
}


let appendOption = (answerlist) => {
    let position;

    let numberOfQuestion = answerlist.length;
    let questionContainer = document.querySelector(".Question-box");
    for (let index = 0; index < numberOfQuestion; index++) {
        // console.log(123);
        let answerContainer = document.createElement("div");
        questionContainer.appendChild(answerContainer);
        let h2Tag = document.createElement("h2");
        h2Tag.classList = "question-index";
        h2Tag.innerText = `Question ${index + 1} of ${numberOfQuestion}`;
        let pTag = document.createElement("p");
        pTag.classList = ("question-text");
        pTag.innerText = `${TextList[index]}`;

        answerContainer.appendChild(h2Tag);
        answerContainer.appendChild(pTag);
        for (const element of answerlist[index]) {
            position = answerlist[index].indexOf(element);

            let divAnswerTag = document.createElement("div");

            divAnswerTag.classList = ("option");

            let answerLabelTag = document.createElement("label");
            answerLabelTag.classList = "question_label";
            answerLabelTag.for = `option${index}${position}`;
            answerLabelTag.id = questionIdList[index];


            let inputTag = document.createElement("input");
            let spanTag = document.createElement("span");

            spanTag.innerText = element;
            spanTag.classList = "optionChoice";
            inputTag.type = "radio";
            inputTag.name = `option${index}`;
            inputTag.id = `option${position}`;

            answerContainer.appendChild(divAnswerTag);
            divAnswerTag.appendChild(answerLabelTag);
            answerLabelTag.appendChild(inputTag);
            answerLabelTag.appendChild(spanTag);
            position += 1;
        }

    }
}


let displayResultBox =  (score, percentage, text) => {
    let scoreText = document.querySelector("#score");
    scoreText.innerText = `${score}/10`;
    let percentText = document.querySelector('#percent');
    percentText.innerText = `${percentage}%`;
    let resultText = document.querySelector('#finalText');
    resultText.innerText = text;
}

let displayUserChoice = async (answerlist, res) => {

    let numberOfQuestion = answerlist.length;
    let questionContainer = document.querySelector(".Review-box");
    let que = res.questions;
    let correct_ans = res.correctAnswers
    for (let index = 0; index < que.length; index++) {
        let answerContainer = document.createElement("div");
        questionContainer.appendChild(answerContainer);
        let h2Tag = document.createElement("h2");
        h2Tag.classList = "question-index";
        h2Tag.innerText = `Question ${index + 1} of ${numberOfQuestion}`;
        let pTag = document.createElement("p");
        pTag.classList = ("question-text");
        pTag.innerText = `${TextList[index]}`;


        answerContainer.appendChild(h2Tag);
        answerContainer.appendChild(pTag);
        let id_question = que[index]._id;
        let ans = que[index].answers;
        for (let j = 0; j < ans.length; j++) {
            const element = answerlist[index][j];
            let position = answerlist[index].indexOf(element);
            let divAnswerTag = document.createElement("div");

            divAnswerTag.classList = ("option");
            let answerLabelTag = document.createElement("label");
            answerLabelTag.classList = "question_label";
            answerLabelTag.for = `option${index}${position}`;
            answerLabelTag.id = questionIdList[index];

            let inputTag = document.createElement("input");
            let spanTag = document.createElement("span");

            spanTag.innerText = element;
            spanTag.classList = "option";
            inputTag.type = "radio";
            inputTag.name = `option${index}`;
            inputTag.id = `option${position}`;
            inputTag.disabled = true;
            answerContainer.appendChild(divAnswerTag);
            divAnswerTag.appendChild(answerLabelTag);
            answerLabelTag.appendChild(inputTag);
            answerLabelTag.appendChild(spanTag);
            if (userAnswer[id_question] == j) {
                inputTag.checked = true;
            }

            if (userAnswer[id_question] == j && correct_ans[id_question] == j) {
                // console.log("true1");
                answerLabelTag.classList.add("correct-answer");
                console.log(answerLabelTag.classList);
                let yourTrueAnswer = document.createElement('div');
                yourTrueAnswer.classList = "correct-answer-label";
                let yourTrueAnswerText = document.createElement('div');
                yourTrueAnswer.innerText = "Correct Answer";
                answerLabelTag.appendChild(yourTrueAnswer);
                yourTrueAnswer.appendChild(yourTrueAnswerText);


            }

            if (userAnswer[id_question] != j && correct_ans[id_question] == j) {
                // option.classList.add('gray=')
                // console.log("grey");
                answerLabelTag.classList.add("option-correct");
                let yourTrueAnswer = document.createElement('div');
                yourTrueAnswer.classList = "correct-answer-label";
                let yourTrueAnswerText = document.createElement('div');
                yourTrueAnswer.innerText = "Correct Answer";
                answerLabelTag.appendChild(yourTrueAnswer);
                yourTrueAnswer.appendChild(yourTrueAnswerText);
                
            }
            if (userAnswer[id_question] == j && correct_ans[id_question] != j) {
                // option.classList.add('user-red');
                // console.log("wrong-answer");
                answerLabelTag.classList.add("wrong-answer");
                let yourTrueAnswer = document.createElement('div');
                yourTrueAnswer.classList = "correct-answer-label";
                let yourTrueAnswerText = document.createElement('div');
                yourTrueAnswer.innerText = "Your Answer";
                console.log(userAnswer[id_question]);
                answerLabelTag.appendChild(yourTrueAnswer);
                yourTrueAnswer.appendChild(yourTrueAnswerText);

            }
        }

    }
}


let changeBackground = () => {
    // let allAnswerChoice = document.querySelectorAll("input[type=radio]");
    // let a = document.querySelectorAll("span");
    let userChoice = document.querySelectorAll("label");
    userChoice.forEach(c => c.addEventListener('change', event => {
        let currentChoice = event.currentTarget;
        let userChoiceFor = currentChoice['for'];
        // console.log(userChoiceFor);
        currentChoice.classList.toggle('question_label');
        currentChoice.classList.toggle('checked');

    }))

}
buttonStart.addEventListener("click", async () => {
    await HttpRequest("https://wpr-quiz-api.herokuapp.com/attempts");
    attempQuiz.style.display = "block";
    introduction.style.display = "none";
    // console.log(123);
    appendOption(this.answersList);
    container.scrollIntoView();
});

submitBtn.addEventListener('click', async () => {
    let answer = confirm("Do you really want to submit?");
    if (answer) {
        reviewQuiz.style.display = "block";
        attempQuiz.style.display = "none";
        container.scrollIntoView();
    }
    const submitURL = `https://wpr-quiz-api.herokuapp.com/attempts/${attempQuizId}/submit`;
    let allLabel = document.querySelectorAll('label');
    for (let question of allLabel) {
        const checkedOption = question.querySelector("input:checked");
        // console.log(question.for);
        if (checkedOption) {
            userAnswer[question.id] = checkedOption.id.slice(-1);
            // console.log(question.for);

        }
    }
    const dataAPI = { userAnswers: userAnswer };
    let responseApi = await submitApi(submitURL, dataAPI);
    await displayUserChoice(this.answersList, responseApi);

    let score = responseApi.score;
    let text = responseApi.scoreText;
    console.log(text);
    let percentage = (score / 10) * 100;
    displayResultBox(score, percentage, text);

});


tryAgainBtn.addEventListener("click",  () => {
    reviewQuiz.style.display = "none";
    introduction.style.display = "block";
    window.scrollTo(0, 0);
    location.reload();
});


