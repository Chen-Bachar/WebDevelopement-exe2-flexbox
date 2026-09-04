//QUERY SELECTORS
const board = document.getElementById("game-board");
const nextArrow = document.getElementById("left-arrow");
const prevArrow = document.getElementById("right-arrow");
const currentLevel = document.getElementById("current-level"); 
const totalLevels = document.getElementById("total-levels"); 
const levelInstructions = document.getElementById("level-instructions");
const userCode = document.getElementById("user-code");
const nextButton = document.getElementById("next");
const message = document.getElementById("message");
const countTrials = document.getElementById("count-trials");
const successMessage = "כל הכבוד! עברת את השלב!";
const errorMessage = "לא עברת את השלב, נסה שוב";
const trials = [0, 0, 0, 0, 0, 0, 0];


updateIcons(3);

//FUNCTIONS
function getLevelInstructions(level)
{
    switch(Number(level))
    {
        case(1):
        {
            levelInstructions.textContent =" סדרו את כל הפריטים בשורה, כך שיהיו ממורכזים במרכז הלוח.";
            break;
        }
        case(2):
        {
            levelInstructions.textContent =" סדרו את הפריטים אחד מתחת לשני, הצמידו אותם לתחתית הלוח ומרכזו אותם לרוחב.";
            break;
        }
        case(3):
        {
            levelInstructions.textContent = "סדרו את הפריטים בשורה. הפריט הראשון צריך להיות בתחילת השורה והאחרון בסופה, כאשר כולם מוצמדים לתחתית הלוח.";
            break;
        }
        case(4):
        {
            levelInstructions.textContent = "סדרו את הפריטים מלמעלה למטה, עם מרווח שווה סביב כל פריט, ומרכזו אותם לרוחב הלוח.";
            break;
        }
        case(5):
        {
            levelInstructions.textContent = "סדרו את הפריטים בשורות. כאשר אין מספיק מקום בשורה, העבירו את הפריטים לשורה הבאה. מרכזו את הפריטים למרכז הלוח.";
            break;
        }
        case(6):
        {
            levelInstructions.textContent = "סדרו את הפריטים בעמודה, עם מרווח שווה ביניהם, מרכזו אותם לרוחב, והעבירו את הפריטים לעמודות חדשות כאשר אין מספיק מקום.";
            break;
        }
        case(7):
        {
            levelInstructions.textContent =" סדרו את הפריטים מלמעלה למטה, פזרו אותם באופן שווה לאורך הלוח, ומרכזו אותם לרוחב.";
        }
        default:
        {
            break;
        }
    }
    countTrials.textContent = trials[level-1];

}

function parseCSS(code) {
    const styles = {};
    const rules = code.split(";");
    rules.forEach(rule => {
        const parts = rule.split(":");
        if (parts.length === 2) {
            const property = parts[0].trim();
            const value = parts[1].trim();
            styles[property] = value;
        }
    });
    return styles;
}

function resetBoard()
{
    board.style.cssText = "display: flex;";
    userCode.value = "";   
}

function updateIcons(numberOfIcons) {

    board.innerHTML = "";
    for (let i = 0; i < numberOfIcons; i++) {
        const icon = document.createElement("i");
        icon.classList.add("bi", "bi-emoji-smile");
        board.appendChild(icon);
    }
}

function checkLevelSolution(level)
{
    const code = userCode.value;
    const styles = parseCSS(code);
    let success = false;
    switch(Number(level))
    {
        case(1):
        {
            success = (styles["flex-direction"] === "row" && styles["justify-content"] === "center" && styles["align-items"] === "center");
            break;
        }
        case(2):
        {
            success = (styles["flex-direction"] === "column" && styles["justify-content"] === "flex-end" && styles["align-items"] === "center");
            break;
        }
        case(3):
        {
            success = (styles["flex-direction"] === "row" && styles["justify-content"] === "space-between" && styles["align-items"] === "flex-end");
            break;
        }
        case(4):
        {
            success = (styles["flex-direction"] === "column" && styles["justify-content"] === "space-around" && styles["align-items"] === "center");
            break;
        }
        case(5):
        {
            success = (styles["flex-direction"] === "row" && styles["justify-content"] === "center" && styles["align-"] === "center" && styles["flex-wrap"] === "wrap");
            break;
        }
        case(6):
        {
            success = (styles["flex-direction"] === "column" && styles["justify-content"] === "space-around" && styles["align-items"] === "center" && styles["flex-wrap"] === "wrap");
            break;
        }
        case(7):
        {
            success = (styles["flex-direction"] === "column" && styles["justify-content"] === "space-between" && styles["align-items"] === "center");
            break;
        }
        default:
        {
            setTimeout(resetBoard, 2000); 
            break;
        }
    }
    if (success)
    {
        message.textContent = successMessage;
        setTimeout(function() {
            message.textContent = "";
        }, 2000);
        setTimeout(getNextLevel, 2000);
    }
    else
    {
        message.textContent = errorMessage;
        setTimeout(function() {
            message.textContent = "";
        }, 2000);
        setTimeout(resetBoard, 2000);
    }
    trials[level-1]++;
    countTrials.textContent=trials[level-1];
}

function getNextLevel()
{
    resetBoard();
    let currentLevelNum = Number(currentLevel.textContent);
    if(currentLevelNum < Number(totalLevels.textContent))
    {
        currentLevel.textContent = currentLevelNum + 1;
        currentLevelNum++;
    }
    getLevelInstructions(currentLevelNum);
    if (currentLevelNum == 5 || currentLevelNum == 6)
        updateIcons(13);
    else
        updateIcons(3);
}

function getPrevLevel()
{
    resetBoard();
    let currentLevelNum = Number(currentLevel.textContent);
    if(currentLevelNum > 1)
    {
        currentLevel.textContent = currentLevelNum - 1;
        currentLevelNum--;
    }
    getLevelInstructions(currentLevelNum);
    if (currentLevelNum == 5 || currentLevelNum == 6)
        updateIcons(13);
    else
        updateIcons(3);
}

//EVENT LISTENERS
nextArrow.addEventListener("click", getNextLevel);
prevArrow.addEventListener("click",getPrevLevel);
nextButton.addEventListener("click", function() {
    board.style.cssText = userCode.value;
    checkLevelSolution(currentLevel.textContent);
});