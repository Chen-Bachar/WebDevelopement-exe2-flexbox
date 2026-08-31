//QUERY SELECTORS
const board = document.getElementById("game-board");
const nextArrow = document.getElementById("left-arrow");
const prevArrow = document.getElementById("right-arrow");
const currentLevel = document.getElementById("current-level"); 
const totalLevels = document.getElementById("total-levels"); 
const levelInstructions = document.getElementById("level-instructions");
const userCode = document.getElementById("user-code");
const nextButton = document.getElementById("next");


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
            levelInstructions.textContent = "סדרו את הפריטים בשורות. כאשר אין מספיק מקום בשורה, העבירו את הפריטים לשורה הבאה. מרכזו את הפריטים הן לאורך השורות והן לאורך הלוח.";
            break;
        }
        case(6):
        {
            levelInstructions.textContent = "סדרו את הפריטים בעמודה, עם מרווח שווה ביניהם, מרכזו אותם לרוחב, והעבירו את הפריטים לשורות חדשות כאשר אין מספיק מקום.";
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

function checkLevelSolution(level)
{
    const code = userCode.value;
    const styles = parseCSS(code);
    switch(Number(level))
    {
        case(1):
        {
            if (styles["flex-direction"] === "row" && styles["justify-content"] === "center" && styles["align-items"] === "center") 
            {
                console.log("נכון!");
                setTimeout(resetBoard, 2000);
                setTimeout(getNextLevel, 2000);
            }
            else
            {
                console.log("טעות"); 
                setTimeout(resetBoard, 2000);              
            }
            break;
        }
        case(2):
        {
            if (styles["flex-direction"] === "column" && styles["justify-content"] === "flex-end" && styles["align-items"] === "center") 
            {
                console.log("נכון!");
                setTimeout(resetBoard, 2000);
                setTimeout(getNextLevel, 2000);
            }
            else
            {
                console.log("טעות");   
                setTimeout(resetBoard, 2000);            
            }
            break;
        }
        case(3):
        {
            if (styles["flex-direction"] === "row" && styles["justify-content"] === "space-between" && styles["align-items"] === "flex-end") 
            {
                console.log("נכון!");
                setTimeout(resetBoard, 2000);
                setTimeout(getNextLevel, 2000);
            }
            else
            {
                console.log("טעות");  
                setTimeout(resetBoard, 2000);             
            }
            break;
        }
        case(4):
        {
            if (styles["flex-direction"] === "column" && styles["justify-content"] === "space-around" && styles["align-items"] === "center") 
            {
                console.log("נכון!");
                setTimeout(resetBoard, 2000);
                setTimeout(getNextLevel, 2000);
            }
            else
            {
                console.log("טעות");  
                setTimeout(resetBoard, 2000);             
            }
            break;
        }
        case(5):
        {
            if (styles["flex-direction"] === "row" && styles["justify-content"] === "center" && styles["align-items"] === "center" && styles["flex-wrap"] === "wrap") 
            {
                console.log("נכון!");
                setTimeout(resetBoard, 2000);
                setTimeout(getNextLevel, 2000);
            }
            else
            {
                console.log("טעות");  
                setTimeout(resetBoard, 2000);             
            }
            break;
        }
        case(6):
        {
            if (styles["flex-direction"] === "column" && styles["justify-content"] === "space-around" && styles["align-items"] === "center" && styles["flex-wrap"] === "wrap") 
            {
                console.log("נכון!");
                setTimeout(resetBoard, 2000);
                setTimeout(getNextLevel, 2000);
            }
            else
            {
                console.log("טעות");  
                setTimeout(resetBoard, 2000);             
            }
            break;
        }
        case(7):
        {
            if (styles["flex-direction"] === "column" && styles["justify-content"] === "space-between" && styles["align-items"] === "center") 
            {
                console.log("נכון!");
                setTimeout(resetBoard, 2000);
                setTimeout(getNextLevel, 2000);
            }
            else
            {
                console.log("טעות"); 
                setTimeout(resetBoard, 2000);              
            }
            break;
        }
        default:
        {
            break;
        }
    }
}

function getNextLevel()
{
    if(Number(currentLevel.textContent) < Number(totalLevels.textContent))
        currentLevel.textContent = Number(currentLevel.textContent) + 1;
    getLevelInstructions(currentLevel.textContent);

}

function getPrevLevel()
{
    if(Number(currentLevel.textContent) > 1)
        currentLevel.textContent = Number(currentLevel.textContent) - 1;
    getLevelInstructions(currentLevel.textContent);

}

//EVENT LISTENERS
nextArrow.addEventListener("click", getNextLevel);
prevArrow.addEventListener("click",getPrevLevel);
nextButton.addEventListener("click", function() {
    board.style.cssText = userCode.value;
    checkLevelSolution(currentLevel.textContent);
});