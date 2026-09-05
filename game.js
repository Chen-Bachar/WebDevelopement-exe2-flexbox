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
const resetButton = document.getElementById("reset");


const successMessage = "כל הכבוד! עברת את השלב!";
const errorMessage = "לא עברת את השלב, נסה שוב";
const trials = [0, 0, 0, 0, 0, 0, 0];
const levelButtons = [document.getElementById("level1"),
                      document.getElementById("level2"), 
                      document.getElementById("level3"),
                      document.getElementById("level4"),
                      document.getElementById("level5"),
                      document.getElementById("level6"),
                      document.getElementById("level7")
                    ]


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

function parseCSS(code) 
{
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
    if (Number(currentLevel.textContent) == 5 || Number(currentLevel.textContent) == 6)
    {
        board.style.cssText += "justify-content: center";
    }
    userCode.value = "";   
}

function updateIcons(numberOfIcons) 
{
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
            success = (styles["flex-direction"] === "row" && styles["justify-content"] === "center" && styles["align-content"] === "center" && styles["flex-wrap"] === "wrap");
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
        levelButtons[level-1].style.cssText = "background-color: greenyellow";
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
    countTrials.textContent = trials[level-1];
}

function getNumOfIcons()
{
    updateIcons(1); 
    const icon = document.querySelector("#game-board i");
    return Math.floor(board.clientWidth/icon.getBoundingClientRect().width) + 2;
}

function getLevel(level)
{
    resetBoard();
    currentLevel.textContent = level;
    getLevelInstructions(level);
    if (level == 5 || level == 6)
    {
        updateIcons(getNumOfIcons());
        board.style.cssText += "justify-content: center";
    }
    else
        updateIcons(3);
}

function getNextLevel()
{
    let currentLevelNum = Number(currentLevel.textContent);
    if(currentLevelNum < Number(totalLevels.textContent))
    {
        currentLevelNum++;
        getLevel(currentLevelNum);
    }
}

function getPrevLevel()
{
    let currentLevelNum = Number(currentLevel.textContent);
    if(currentLevelNum > 1)
    {
        currentLevelNum--;
        getLevel(currentLevelNum);
    }
}

function nextButtonClick()
{
    adaptUserCode();
    checkLevelSolution(currentLevel.textContent);
}

function adaptUserCode()
{
    const styles = parseCSS(userCode.value);
    for (const property in styles) {
        board.style.setProperty(property, styles[property]);
    }
}

//EVENT LISTENERS
nextArrow.addEventListener("click", getNextLevel);
prevArrow.addEventListener("click",getPrevLevel);
nextButton.addEventListener("click", nextButtonClick);
resetButton.addEventListener("click", resetBoard);
userCode.addEventListener("input", adaptUserCode);
levelButtons[0].addEventListener("click", function(){getLevel(1)});
levelButtons[1].addEventListener("click", function(){getLevel(2)});
levelButtons[2].addEventListener("click", function(){getLevel(3)});
levelButtons[3].addEventListener("click", function(){getLevel(4)});
levelButtons[4].addEventListener("click", function(){getLevel(5)});
levelButtons[5].addEventListener("click", function(){getLevel(6)});
levelButtons[6].addEventListener("click", function(){getLevel(7)});