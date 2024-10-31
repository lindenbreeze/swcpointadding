function isNumeric(n) {
    if (n * 1 == n) {
      return true;
    }
    else {
      return false;
    }
  }
  let project_id = "551261201";
  function parseInput(str) {
    let input = str.toLowerCase();
    while (input.includes("  ")) {
        input = input.replace("  ", " ");
        };
    return input.replace('\\n', '').replace("] [", ",").replace("][", ",");

}

  function go() {
      let double_adding = [];
      const button = document.getElementById("copy");
    button.innerText = "COPY";
      let outputBox = document.getElementById("output")
      outputBox.value = "";
    let output_data = "";
    let inputBox = document.getElementById("input");
    try {
        let input = JSON.parse(parseInput(inputBox.value));
      for (comment in input) {
        let author = input[comment].author.username;
        let comment_content = input[comment].content;
        if (comment_content[0] != "/") {
          let comment_id = input[comment].id;
          let comment_link = "https://scratch.mit.edu/projects/" + project_id + "/#comments-" + comment_id;
          let comment_time = input[comment].datetime_created;
          let parseCommentContent = comment_content.split(" ");
                    let username = "";
          let points = "";
          let cabin = "";
          let reason = "";
          for (let i = 3; i < parseCommentContent.length; i++) {
            reason += parseCommentContent[i]+" ";
          }
          if (parseCommentContent[0][0] == "@") {
            username = parseCommentContent[0];
          }
          else if (isNumeric(parseCommentContent[0])) {
            points = parseCommentContent[0];
          }
          else {
              cabin = parseCommentContent[0];
          }
          if (parseCommentContent[1][0] == "@") {
            username = parseCommentContent[1];
          }
          else if (isNumeric(parseCommentContent[1])) {
            points = parseCommentContent[1];
          }
          else {
              cabin = parseCommentContent[1];
          }
          if (parseCommentContent[2][0] == "@") {
            username = parseCommentContent[2];
          }
          else if (isNumeric(parseCommentContent[2])) {
            points = parseCommentContent[2];
          }
          else {
              cabin = parseCommentContent[2];
          }
          let double_adding_output = username + " " + points;
          let error_message = " ";
          if (points == "" || username == "" || cabin == "") {
            error_message += "missing parameter ";
          };
          if (double_adding.includes(double_adding_output)) {
              error_message += "possible double adding ";
        };
          double_adding.push(double_adding_output);
          let save = comment_id + "	" + comment_time + "	" + author + "	" + username + "	" + cabin + "	" + points + "	" + reason + "	" + comment_content + "	" + error_message + "	" + comment_link + "\n";
          output_data += save;
        }
      }

      outputBox.value = output_data;
    }
    catch {
      window.alert("Error occured - check JSON formatting.")
      JSON.parse(parseInput(inputBox.value))
    }
  }
  function copy() {
    button = document.getElementById("copy");
    button.innerText = "COPY";
    textarea = document.getElementById("output");
    textarea.select();
    textarea.setSelectionRange(0, 99999999);
    navigator.clipboard.writeText(textarea.value);
    button.innerText = "COPIED";
  }
