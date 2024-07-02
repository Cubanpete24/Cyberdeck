var before = document.getElementById("before");

// liner is the wrapper element for where we type
var liner = document.getElementById("liner");
var linerB = document.getElementById("linerB");

// typer is the line where letters from the textarea go
var command = document.getElementById("typer");

// textarea is the textbox
var textarea = document.getElementById("texter");

// terminal is the wrapper for the terminal
var terminal = document.getElementById("terminal");

// html elements to be referenced by 
var submitToonButton = document.getElementById("submitToonButton");
var formDiv = document.getElementById("formFleft");

submitToonButton.onclick = function() {submitToon()};

// form values
var textHandle = document.getElementById("handle");
var textRole = document.getElementById("role");
var roleLevel = document.getElementById("roleLevel");
var hp = document.getElementById("hp");

//lifepath form values 

var culturalOrigin = document.getElementById("culturalOrigin");
var languages = document.getElementById("languages");
var personality = document.getElementById("personality");
var clothingStyle = document.getElementById("clothingStyle");
var hairstyle = document.getElementById("hairstyle");
var affectation = document.getElementById("affectation");
var valuedQualityPerson = document.getElementById("valuedQualityPerson");
var feelingsAboutPeople = document.getElementById("feelingsAboutPeople");
var mostValuedPerson = document.getElementById("mostValuedPerson");
var mostValuedPossession = document.getElementById("mostValuedPossession");
var originalBackground = document.getElementById("originalBackground");
var childhoodEnv = document.getElementById("childhoodEnv");
var familyCrisis = document.getElementById("familyCrisis");
var friendCount = document.getElementById("friendCount");
var friendsRelationshipToYou = document.getElementById("friendsRelationshipToYou");
var enemy = document.getElementById("enemy");
var fallout = document.getElementById("fallout");
var whatCanEnemyDo = document.getElementById("whatCanEnemyDo");
var sweetRevenge = document.getElementById("sweetRevenge");
var whatHappened = document.getElementById("whatHappened");
var lifeGoals = document.getElementById("lifeGoals");

var formDiv2 = document.getElementById("formFright");

var submitLifepathButton = document.getElementById("submitLifepathButton");
submitLifepathButton.onclick = function() {getIDByHandle("Clip")};






//flag determines if toon creator form is visible
let createFlag = false;
let createOriginFlag = false;

// index for commands array
var git = 0;

//list of commands for the history command
var commands = [];

// prints out banner
// setTimeout(function () {
//   loopLines(banner, "", 80);
//   textarea.focus();
// }, 100);

// we are telling javascript to listen to an event
window.addEventListener("keyup", enterKey);

//initialize stuff here
textarea.value = "";
command.innerHTML = textarea.value;

// command is equal to whatever is in the textbox.
function enterKey(e) {
  //13 == enter is pressed
  if (e.keyCode == 13) {
    // we push the current command onto the commands array
    commands.push(command.innerHTML);
    // git is the length of the commands stack, we get the most recent
    git = commands.length;
    //add the new line here for the next command
    addLine(
      "cafe_bustelo2020@nc_direct.com:~$ " + command.innerHTML,
      "no-animation",
      0
    );

    //commander is where we parse what's entered
    commander(command.innerHTML.toLowerCase());

    // reset values
    command.innerHTML = "";
    textarea.value = "";
  }
  //38 is up pressed
  // this is responsible for cycling thru past commands
  if (e.keyCode == 38 && git != 0) {
    git -= 1;
    textarea.value = commands[git];
    command.innerHTML = textarea.value;
  }
  //40 is down pressed
  // this is responsible for cycling thru past commands
  if (e.keyCode == 40 && git != commands.length) {
    git += 1;
    if (commands[git] === undefined) {
      textarea.value = "";
    } else {
      textarea.value = commands[git];
    }
    command.innerHTML = textarea.value;
  }
}

function commander(cmd) {
  let url = "";

  if (cmd.substring(0, 4) === "info") {
    let handle = cmd.substring(cmd.indexOf(" ") + 1);
    url = "http://localhost:8081/handle/" + handle;
    fetch(url, { method: "GET" })
      .then((response) => {
        if (response.ok) {
          return response.text();
        }
        return "No Edgerunner with that name exists";
      })
      .then(function (text) {
        addLine(text, "color2", 0);
      })
      .catch((error) => console.error(error));
  } else if (cmd.substring(0, 6) === "create" && createFlag === false) {
    createFlag = true;
    formDiv.hidden = !formDiv.hidden;
    linerB.innerHTML = "type 'exit' to close without saving:  ";
    //handle.focus();

  } else if (cmd.substring(0, 4) === "exit" && createFlag === true) {
    createFlag = false;
    formDiv.hidden = !formDiv.hidden;
    clearValuesToonCreationForm();
    linerB.innerHTML = "cafe_bustelo2020@nc_direct.com:~$";
  } else if (cmd.substring === "stuff") {
  } else {
    switch (cmd.toLowerCase()) {
      case "help":
        loopLines(help, "color2 margin", 80);
        break;
      case "whois":
        loopLines(whois, "color2 margin", 80);
        break;
      case "history":
        addLine("<br>", "", 0);
        loopLines(commands, "color2", 80);
        addLine("<br>", "command", 80 * commands.length + 50);
        break;
      case "clear":
        setTimeout(function () {
          terminal.innerHTML = '<a id="before"></a>';
          before = document.getElementById("before");
        }, 1);
        break;
      case "ls":
      case "gettoons":
        url = "http://localhost:8081/getAllToons";
        fetch(url, { method: "GET" })
          .then((response) => response.json())
          //.then((json) => console.log(json))
          .then((json) => {
            for (var i = 0; i < json.length; i++) {
              //document.write("<br><br>array index: " + i);
              var obj = json[i];
              let text = obj["handle"];
              addLine(text, "color2", 0);
            }
          })
          .catch((error) => console.error(error));

        break;
      default:
        addLine(
          '<span class="inherit">Command not found. For a list of commands, type <span class="command">\'help\'</span>.</span>',
          "error",
          100
        );
        break;
    }
  }
}

// opens new tab
function newTab(link) {
  setTimeout(function () {
    window.open(link, "_blank");
  }, 500);
}
// adds line to terminal window when command is entered
function addLine(text, style, time) {
  var t = "";
  for (let i = 0; i < text.length; i++) {
    if (text.charAt(i) == "\t" && text.charAt(i + 1) === "\t") {
      // responsible for parsing tab characters from API call and putting them 
      t += "&emsp;&emsp;";
      i++;
    } else {
      t += text.charAt(i);
    }
  }
  setTimeout(function () {
    var next = document.createElement("p");
    next.innerHTML = t;
    next.className = style;

    before.parentNode.insertBefore(next, before);

    window.scrollTo(0, document.body.offsetHeight);
  }, time);
}
// calls addLine, for big data guys
function loopLines(name, style, time) {
  name.forEach(function (item, index) {
    addLine(item, style, index * time);
  });
}
// initializes form for user
function clearValuesToonCreationForm() {
  handle.value = '';
  hp.value = '';
  role.value = '';
  roleLevel.value = '';
}
// function handles form processing for creating new toon, player, or NPC, and persisting it to db
async function submitToon() {
  const formData = new FormData();
  formData.append("hp", hp.value);
  formData.append("handle", handle.value);
  formData.append("role", role.value);
  formData.append("role_level", roleLevel.value);
  formData.append("max_hp", hp.value);

  let jsonBody = JSON.stringify(Object.fromEntries(formData));
  console.log(jsonBody);
  url = "http://localhost:8081/addToon";

  fetch(url, {
    method: "POST",
    headers: {
      'Accept': 'application/json',
      "Content-Type": "application/json"
    },
    mode: "cors",
    body: jsonBody,
  })
    .then((response) => {
      if (response.ok) {
        return handle.value + " successfully added to database";
      }
      return "Failed to add edgerunner";
    })
    .then(function (text) {
      clearValuesToonCreationForm();
      createFlag = false;
      formDiv.hidden = !formDiv.hidden;
      linerB.innerHTML = "cafe_bustelo2020@nc_direct.com:~$";
      textarea.focus();
      addLine(text, "color2", 0);
    })
    .catch((error) => console.error(error));

  console.log(textHandle.value);
};

async function getIDByHandle(handle) {
  url = "http://localhost:8081/IdByHandle/" + handle;
  console.log("we're trying")
  fetch(url, { method: "GET" })
  .then((response) => response.text())
  //.then((json) => console.log(json))
  .then(function (text) {
      console.log(text);
      return Number(text)
    
  })
  .catch((error) => console.error(error));
}

async function submitLifepath() {
  const formData = new FormData();
  let handle = "Lizzard";
  let id = getIDByHandle(handle);
  formData.append("handle", handle);
  formData.append("toonId", id);
  formData.append("cultural_origins", hp.value);
  formData.append("cultural_origins", hp.value);
  formData.append("languages", handle.value);
  formData.append("personality", role.value);
  formData.append("clothing_style", roleLevel.value);
  formData.append("affectation", hp.value);
  formData.append("most_valued_quality", hp.value);
  formData.append("feelings_about_people", hp.value);
  formData.append("most_valued_person", hp.value);
  formData.append("most_valued_possession", hp.value);
  formData.append("original_background", hp.value);
  formData.append("original_background_desc", hp.value);
  formData.append("childhood_environment", hp.value);
  formData.append("family_crisis", hp.value);
  formData.append("friends_relationship_to_you", hp.value);
  formData.append("enemy", hp.value);
  formData.append("what_caused_it", hp.value);
  formData.append("what_can_enemy_do", hp.value);
  formData.append("sweet_revenge", hp.value);
  formData.append("what_happened", hp.value);
  formData.append("life_goals", hp.value);


  let jsonBody = JSON.stringify(Object.fromEntries(formData));
  console.log(jsonBody);
  url = "http://localhost:8081/addLifepath";

  fetch(url, {
    method: "POST",
    headers: {
      'Accept': 'application/json',
      "Content-Type": "application/json"
    },
    mode: "cors",
    body: jsonBody,
  })
    .then((response) => {
      if (response.ok) {
        return handle.value + " lifepath successfully added to database";
      }
      return "Failed to add edgerunner lifepath";
    })
    .then(function (text) {
      //learValuesToonCreationForm();
      //createFlag = false;
      //formDiv.hidden = !formDiv.hidden;
      linerB.innerHTML = "cafe_bustelo2020@nc_direct.com:~$";
      textarea.focus();
      addLine(text, "color2", 0);
    })
    .catch((error) => console.error(error));

  console.log(textHandle.value);
};

async function testFunc() {
  console.log(life_goals[0]);
};
