function GetRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

var rangeBound_left = GetRandomInt(0, 100);
document.getElementById("left-bound").innerText = rangeBound_left;

var rangeBound_right = GetRandomInt(rangeBound_left, 250);
document.getElementById("right-bound").innerText = rangeBound_right;

var attemptsQuantity = Math.ceil(Math.log2(rangeBound_right - rangeBound_left + 1));
const maxAttempts = attemptsQuantity;
var valueToGuess = GetRandomInt(rangeBound_left, rangeBound_right)

var guesserHistory = document.querySelector(".guesser__history");

var attemptButton = document.getElementById("btn-attempt");
var restartButton = document.getElementById("btn-restart");

attemptButton.addEventListener("click", (e) => {
    e.preventDefault();
    var attemptValue = Number(document.querySelector("#guesser__input-field").value);
    if (attemptValue < rangeBound_left || attemptValue > rangeBound_right)
        var result = "Число " + attemptValue + " выходит за границы указанного диапазона.";
    else if (attemptValue != valueToGuess && attemptsQuantity > 0) {
        attemptsQuantity -= 1;
        var result = (valueToGuess > attemptValue ? "Нет, загаданное число больше " + attemptValue + "." : "Нет, загаданное число меньше " + attemptValue + ".");
    }
    else if (attemptValue === valueToGuess && attemptsQuantity > 0) {
        var result = "Совершенно верно, было загадано число " + attemptValue + "!";
        document.getElementById('guesser__input-field').disabled = true;
        document.getElementById('guesser__input-field').style.backgroundColor = '#33FF99';
        document.getElementById("btn-restart").focus();
    }
    if (attemptsQuantity === 0)
    {
        document.getElementById('guesser__input-field').style.backgroundColor = '#FF034F';
        document.getElementById('guesser__input-field').disabled = true;
        var result = "Ваши попытки кончились, Вы проиграли… Желаете сыграть вновь?";
        document.getElementById("btn-restart").focus();

    }
    
    var newRecord = document.createElement("p");
    newRecord.className = "guesser__history-record";
    newRecord.innerText = result;
    guesserHistory.appendChild(newRecord);
    document.getElementById('guesser__input-field').value = "";

    var remainingPercentage = Math.floor((maxAttempts - attemptsQuantity) / maxAttempts * 100);
    var progressBar = document.querySelector('.progress-bar');
    progressBar.style.width = remainingPercentage + '%';
    progressBar.innerText = attemptsQuantity;
})