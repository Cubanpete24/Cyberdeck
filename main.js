var story = document.getElementById("story");

// liner is the wrapper element for where we type
var liner = document.getElementById("liner");
var linerB = document.getElementById("linerB");

// typer is the line where letters from the terminal_text_area go
var command = document.getElementById("typer");

// terminal_text_area is the textbox
var terminal_text_area = document.getElementById("terminal_text_area");

// terminal is the wrapper for the terminal
var story = document.getElementById("story");

// display containers
var display_20 = document.getElementById("display_20");
var display_70 = document.getElementById("display_70");
var display_10 = document.getElementById("display_10");

//buttons
var characterButton = document.getElementById("character_button");
var databaseButton = document.getElementById("database_button");
var settingsButton = document.getElementById("settings_button");


characterButton.addEventListener('click', function() {
  console.log('huh');
});



liner.addEventListener('click', function() {
    terminal_text_area.focus();
});

terminal_text_area.addEventListener('keypress', function (e) {
  if (e.key === 'Enter') {
    console.log('enter pressed')
  }
});

// html elements to be referenced by 
//var submitToonButton = document.getElementById("submitToonButton");
//var formDiv = document.getElementById("formFleft");

//submitToonButton.onclick = function() {submitToon()};

// form values
//var textHandle = document.getElementById("handle");
//var textRole = document.getElementById("role");
var roleLevel = document.getElementById("roleLevel");
var hp = document.getElementById("hp");

//lifepath form values 
// var culturalOrigin = document.getElementById("cultural_origin");
// var languages = document.getElementById("languages");
// var personality = document.getElementById("personality");
// var clothingStyle = document.getElementById("clothing_style");
// var hairstyle = document.getElementById("hairstyle");
// var affectation = document.getElementById("affectation");
// var valuedQualityPerson = document.getElementById("most_valued_quality");
// var feelingsAboutPeople = document.getElementById("feelings_about_people");
// var mostValuedPerson = document.getElementById("most_valued_person");
// var mostValuedPossession = document.getElementById("most_valued_possession");
// var originalBackground = document.getElementById("original_background");
// var childhoodEnv = document.getElementById("childhood_environment");
// var familyCrisis = document.getElementById("family_crisis");
// var friendCount = document.getElementById("friend_count");
// var friendsRelationshipToYou = document.getElementById("friends_relationship_to_you");
// var enemy = document.getElementById("enemy");
// var fallout = document.getElementById("what_caused_it");
// var whatCanEnemyDo = document.getElementById("what_can_enemy_do");
// var sweetRevenge = document.getElementById("sweet_revenge");
// var whatHappened = document.getElementById("what_happened");
// var lifeGoals = document.getElementById("life_goals");

//var formDiv2 = document.getElementById("formFright");

//var submitLifepathButton = document.getElementById("submitLifepathButton");
//submitLifepathButton.onclick = function() {submitLifepath()};
//submitLifepathButton.onclick = function() {populateLifepathFieldsForEditing("Lizzard")};







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
//   terminal_text_area.focus();
// }, 100);

// we are telling javascript to listen to an event
window.addEventListener("keyup", enterKey);

//initialize stuff here
terminal_text_area.value = "";
//command.innerHTML = terminal_text_area.value;

// command is equal to whatever is in the textbox.
function enterKey(e) {
  // e is equal to a key, any key
  //13 == enter is pressed
  if (e.keyCode == 13) {
    // we push the current command onto the commands array
    // git is the length of the commands stack, we get the most recent
    git = commands.length;
    commander(terminal_text_area.textContent)


    // reset values
    //command.innerHTML = "";
    terminal_text_area.textContent = "";
  }
  //38 is up pressed
  // this is responsible for cycling thru past commands
  if (e.keyCode == 38 && git != 0) {
    git -= 1;
    terminal_text_area.value = commands[git];
    command.innerHTML = terminal_text_area.value;
  }
  //40 is down pressed
  // this is responsible for cycling thru past commands
  if (e.keyCode == 40 && git != commands.length) {
    git += 1;
    if (commands[git] === undefined) {
      terminal_text_area.value = "";
    } else {
      terminal_text_area.value = commands[git];
    }
    command.innerHTML = terminal_text_area.value;
  }
}

function commander(cmd) {
  cmd = cmd.replace(/(\r\n|\n|\r)/gm, "");
    const swtchStr = new String(cmd);
  let url = "";

  if (cmd.substring(0, 4).toLowerCase() === "info") {
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
  } else if(cmd.substring(0, 4).toLowerCase() === "edit"){
      let handle = cmd.substring(cmd.indexOf(" ") + 1);
      console.log(handle);
      populateLifepathFieldsForEditing(handle);

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
   // console.log(swtchStr.valueOf())
   // console.log(swtchStr.valueOf() === "help")
    switch (cmd.valueOf()) {
      case "clear":
        setTimeout(function () {
          story.innerHTML = '';
        }, 1);
        break;
      case "help":
        console.log("In Help")
        loopLines(help, "color2 margin", 80);
        break;
      case "whois":
        //loopLines(whois, "color2 margin", 80);
        break;
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
    //var text = document.createTextNode("This just got added");
    story.appendChild(next);

    //window.scrollTo(0, document.body.offsetHeight);
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
  // const formData = new FormData();
  // formData.append("hp", hp.value);
  // formData.append("handle", handle.value);
  // formData.append("role", role.value);
  // formData.append("role_level", roleLevel.value);
  // formData.append("max_hp", hp.value);

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
      terminal_text_area.focus();
      addLine(text, "color2", 0);
    })
    .catch((error) => console.error(error));

  console.log(textHandle.value);
};

function getIDByHandle(handle) {
  url = "http://localhost:8081/IdByHandle/" + handle;
  fetch(url, { method: "GET" })
  .then((response) => response.text())
  .then(function (text) {
      return text;
  })
  .catch((error) => console.error(error));
}



 function submitLifepath() {
  
  const formData = new FormData();
  let handle = "CLip";
  formData.append("handle", handle);
  var ancestor = document.getElementById("formFright");
  const descendants = [...ancestor.getElementsByTagName('terminal_text_area')];
  descendants.forEach((element) => iterateFormData(element, formData));
  console.log(JSON.stringify(Object.fromEntries(formData)));

  urlForID = "http://localhost:8081/IdByHandle/" + handle;
  fetch(urlForID, { method: "GET" })
  .then((response) => response.text())
  .then(function (text) {
    let jsonBody = JSON.stringify(Object.fromEntries(formData));
      //console.log("about to return text " + text);
      id = Number(text);
      formData.append("toonId", id);
      let url = "http://localhost:8081/addLifepath";

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
      linerB.innerHTML = "cafe_bustelo2020@nc_direct.com:~$";
      terminal_text_area.focus();
      addLine(text, "color2", 0);
    })
    .catch((error) => console.error(error));
  })
  .catch((error) => console.error(error));
};

function populateLifepathFieldsForEditing(handle){
  url = "http://localhost:8081/getLifepathByHandle/" + handle;
  fetch(url, { method: "GET" })
  .then((response) => {
    if (response.ok) {
      console.log(response)
      return response.json();
    }
    return "No Edgerunner with that name exists";
  })
  .then(function (data) {

     var ancestor = document.getElementById("formFright");
     const descendants = [...ancestor.getElementsByTagName('terminal_text_area')];
     descendants.forEach((element) => iterateDataForFillingLifepathForm(element,data));

    //console.log(data['toonId']);
  })
  .catch((error) => console.error(error));


}

function iterateFormData(element, formData){
  formData.append(element.id, element.value);
  return formData;
}

function iterateDataForFillingLifepathForm(element,data) {
  element.value = data[element.id]
}
