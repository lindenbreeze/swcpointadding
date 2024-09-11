function isNumeric(n) {
    if (n * 1 == n) {
      return true;
    }
    else {
      return false;
    }
  }
  let project_id = "551261201";
  let cabin_nicknames = JSON.parse(document.getElementById("cabin_nicknames").value);
  let point_adders = JSON.parse(document.getElementById("point_adders").value);
  function go() {
    let output_data = "";
    console.log("hi");
    let inputBox = document.getElementById("input");
    try {
      let input = JSON.parse(inputBox.value);
      console.log(input[0]);
      for (comment in input) {
        console.log(input[comment]);
        let author = input[comment].author.username;
        let comment_content = input[comment].content;
        if (point_adders.includes(author) && comment_content[0] != "/") {
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
          if (parseCommentContent[1][0] == "@") {
            username = parseCommentContent[1];
          }
          if (parseCommentContent[2][0] == "@") {
            username = parseCommentContent[2];
          }
          if (isNumeric(parseCommentContent[0])) {
            points = parseCommentContent[0];
          }
          if (isNumeric(parseCommentContent[1])) {
            points = parseCommentContent[1];
          }
          if (isNumeric(parseCommentContent[2])) {
            points = parseCommentContent[2];
          }
          if (cabin_nicknames.hasOwnProperty(parseCommentContent[0])) {
            cabin = parseCommentContent[0];
            cabin = cabin_nicknames[cabin];
          }
          if (cabin_nicknames.hasOwnProperty(parseCommentContent[1])) {
            cabin = parseCommentContent[1];
            cabin = cabin_nicknames[cabin];
          }
          if (cabin_nicknames.hasOwnProperty(parseCommentContent[2])) {
            cabin = parseCommentContent[2];
            cabin = cabin_nicknames[cabin];
          }
          console.log(username);
          console.log(points);
          console.log(cabin);
          console.log(reason);
          let error_message = " ";
          if (points == "" || username == "" || cabin == "") {
            error_message = "missing parameter";
          }
          let save = comment_id + "	" + comment_time + "	" + author + "	" + username + "	" + cabin + "	" + points + "	" + reason + "	" + comment_content + "	" + error_message + "	" + comment_link + "\n";
          output_data += save;
          console.log(output_data);
        }
      }

      let outputBox = document.getElementById("output")
      outputBox.value = output_data;
    }
    catch {
    let input = JSON.parse(inputBox.value);
      window.alert("Error occured - check JSON formatting.")
    }
  }
  function copy() {
    button = document.getElementById("copy");
    button.innerText = "COPY";
    textarea = document.getElementById("output");
    textarea.select();
    textarea.setSelectionRange(0, 99999);
    navigator.clipboard.writeText(textarea.value);
    button.innerText = "COPIED";
  }
