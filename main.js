var before = document.getElementById("before");

// liner is the wrapper element for where we type
var liner = document.getElementById("liner");

// typer is the line where letters from the textarea go
var command = document.getElementById("typer");

// textarea is the textbox
var textarea = document.getElementById("texter");

// terminal is the wrapper for the terminal
var terminal = document.getElementById("terminal");

// index for commands array
var git = 0;

//I'm assuming commands is the list of commands
var commands = [];

setTimeout(function () {
  loopLines(banner, "", 80);
  textarea.focus();
}, 100);

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
    //add the new line here for the next xommand
    addLine(
      false,
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
  //str.substring(0, str.indexOf(' ')); // "72"
  //str.substring(str.indexOf(' ') + 1); // "tocirah sneab"

  if (cmd.substring(0, 4) === "info") {
    let handle = cmd.substring(cmd.indexOf(' ') + 1);
     url = "http://localhost:8081/handle/" + handle
     fetch(url, {method: "GET"})
     .then((response) => {
      if (response.ok){
        return response.text()
      } 
      //addLine(true, "No Edgerunner with that name exists", "color2", 0);
      return  "No Edgerunner with that name exists"
     })
     .then(function(text) {
      addLine(true, text, "color2", 0);
     })
      .catch((error) => console.error(error));

    // addLine(true, url, "color2", 0);
  } else if (cmd.substring(0, 6) === "create") {
    addLine(true, "I'm over here typing my shit coding my shit", "color2", 0);
  } else if (cmd.substring === "stuff") {
  } else {
    switch (cmd.toLowerCase()) {
      case "help":
        loopLines(help, "color2 margin", 80);
        break;
      case "whois":
        loopLines(whois, "color2 margin", 80);
        break;
      case "whoami":
        loopLines(whoami, "color2 margin", 80);
        break;
      case "history":
        addLine(false, "<br>", "", 0);
        loopLines(commands, "color2", 80);
        addLine(false, "<br>", "command", 80 * commands.length + 50);
        break;
      case "clear":
        setTimeout(function () {
          terminal.innerHTML = '<a id="before"></a>';
          before = document.getElementById("before");
        }, 1);
        break;
      case "banner":
        loopLines(banner, "", 80);
        break;
      case "github":
        addLine(false, "Opening GitHub...", "color2", 0);
        newTab(github);
        break;
      case "butts":
        url = "http://localhost:8081/handle/test_Harold";
        let username = "user";
        let password = "12345";
        let headers = new Headers();

        // headers.set('Authorization', 'Basic ' + btoa(username + ":" + password));

        fetch(url, {
          method: "GET",
          // headers: headers,
          // credentials: 'user:passwd'
        })
          .then(
            (response) => response.text()
            //butaddLine(response, "color2", 0)
          )
          .then((text) => {
            console.log(text);
            addLine(true, text, "color2", 0);
          })
          .catch((error) => console.error(error));
        break;

      case "toonnames":
        url = "http://localhost:8081/getAllToons";
        fetch(url, { method: "GET" })
          .then((response) => response.json())
          //.then((json) => console.log(json))
          .then((json) => {
            for (var i = 0; i < json.length; i++) {
              //document.write("<br><br>array index: " + i);
              var obj = json[i];
              let text = obj["handle"];
              addLine(true, text, "color2", 0);
            }
          })
          .catch((error) => console.error(error));

        break;
      default:
        addLine(
          false,
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

// adds line when called
function addLine(asIs, text, style, time) {
  var t = "";
  for (let i = 0; i < text.length; i++) {
    if (text.charAt(i) == "\t" && text.charAt(i + 1) === "\t") {
      // console.log("lets gooo");
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

function addForm() {

  setTimeout(function () {
    var form = document.createElement("form");
    next.innerHTML = t;
    next.className = style;

    before.parentNode.insertBefore(next, before);

    window.scrollTo(0, document.body.offsetHeight);
  }, time);

}

function loopLines(name, style, time) {
  name.forEach(function (item, index) {
    addLine(false, item, style, index * time);
  });
}
