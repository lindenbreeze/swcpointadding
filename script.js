function isNumeric(n) {
	if (n * 1 == n) {
		return true;
	} else {
		return false;
	}
}
let project_id = "551261201";

function parseInput(str) {
	let input = str.toLowerCase();
	// remove double spaces
	while (input.includes("  ")) {
		input = input.replace("  ", " ");
	};
	// allow fairy tales and magical realism to have a space in comments
	if (input.includes("fairy tale")) {
		input = input.replace("fairy tale", "fairytale");
	}
	if (input.includes("magical realism")) {
		input = input.replace("magical realism", "magicalrealism");
	}
	return input.replace('\\n', '').replace("] [", ",").replace("][", ",");

}

function go() {
	let double_adding = [];
	// get HTML elements
	const button = document.getElementById("copy");
	button.innerText = "COPY";
	let outputBox = document.getElementById("output")
	outputBox.value = "";
	let output_data = "";
	let inputBox = document.getElementById("input");

	try {
		// parse input as JSON
		let input = JSON.parse(parseInput(inputBox.value));

		// go through each comment
		for (comment in input) {
			//get data about comment
			let author = input[comment].author.username; //point adder username
			let comment_content = input[comment].content; //text of comment
			if (comment_content[0] != "/") { // don't read comment if it starts with /
				let comment_id = input[comment].id;
				let comment_link = "https://scratch.mit.edu/projects/" + project_id + "/#comments-" + comment_id;
				let comment_time = input[comment].datetime_created.toUpperCase();
				let parseCommentContent = comment_content.split(" "); //split comment by spaces
				let username = "";
				let points = "";
				let cabin = "";
				let reason = "";

				// set reason to last term of comment (if there are multiple words in the reason, put them together)
				for (let i = 3; i < parseCommentContent.length; i++) {
					reason += parseCommentContent[i] + " ";
				}

				// check first parameter of the comment
				// if it starts with @ it's the camper username
				if (parseCommentContent[0][0] == "@") {
					username = parseCommentContent[0];
				}
				// if it's a number it's the point value
				else if (isNumeric(parseCommentContent[0])) {
					points = parseCommentContent[0];
				}
				// otherwise it's a cabin name
				else {
					cabin = parseCommentContent[0];
				}
				//repeat for the next two parameters
				if (parseCommentContent[1][0] == "@") {
					username = parseCommentContent[1];
				} else if (isNumeric(parseCommentContent[1])) {
					points = parseCommentContent[1];
				} else {
					cabin = parseCommentContent[1];
				}
				if (parseCommentContent[2][0] == "@") {
					username = parseCommentContent[2];
				} else if (isNumeric(parseCommentContent[2])) {
					points = parseCommentContent[2];
				} else {
					cabin = parseCommentContent[2];
				}
				// use username and point value to check for possible double adding
				let double_adding_output = username + " " + points;
				let error_message = " ";
				// if it didn't find a point value or a username, give missing parameter error
				if (points == "" || username == "" || cabin == "") {
					error_message += "missing parameter ";
				};
				// if another comment that is included in the input has the same username & point value as this comment, give possible double adding error
				if (double_adding.includes(double_adding_output)) {
					error_message += "possible double adding ";
				};
				// add comment to list to check for double adding
				double_adding.push(double_adding_output);

				// create new line in output with the info from the comment so that it will paste into individual cells in the spreadsheet (spaces are tabs)
				let save = comment_id + "	" + comment_time + "	" + author + "	" + username + "	" + cabin + "	" + points + "	" + reason + "	" + comment_content + "	" + error_message + "	" + comment_link + "\n";
				// add to output
				output_data += save;
			}
		}
		// set output box value
		outputBox.value = output_data;
	} catch {
		// popup alert there is an error when parsing the input as JSON
		window.alert("Error occured - check JSON formatting.")
		// run function again so that the error message appears in the browser console
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
