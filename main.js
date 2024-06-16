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

setTimeout(function() {
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
      addLine("cafe_bustelo2020@nc_direct.com:~$ " + command.innerHTML, "no-animation", 0);
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
      addLine("<br>", "", 0);
      loopLines(commands, "color2", 80);
      addLine("<br>", "command", 80 * commands.length + 50);
      break;
    case "clear":
      setTimeout(function() {
        terminal.innerHTML = '<a id="before"></a>';
        before = document.getElementById("before");
      }, 1);
      break;
    case "banner":
      loopLines(banner, "", 80);
      break;
    case "github":
      addLine("Opening GitHub...", "color2", 0);
      newTab(github);
      break;
    default:
      addLine("<span class=\"inherit\">Command not found. For a list of commands, type <span class=\"command\">'help'</span>.</span>", "error", 100);
      break;
  }
}

// opens new tab
function newTab(link) {
  setTimeout(function() {
    window.open(link, "_blank");
  }, 500);
}

// adds line when called 
function addLine(text, style, time) {
  var t = "";
  for (let i = 0; i < text.length; i++) {
    if (text.charAt(i) == " " && text.charAt(i + 1) == " ") {
      t += "&nbsp;&nbsp;";
      i++;
    } else {
      t += text.charAt(i);
    }
  }
  setTimeout(function() {
    var next = document.createElement("p");
    next.innerHTML = t;
    next.className = style;

    before.parentNode.insertBefore(next, before);

    window.scrollTo(0, document.body.offsetHeight);
  }, time);
}

function loopLines(name, style, time) {
  name.forEach(function(item, index) {
    addLine(item, style, index * time);
  });
}
