let userInput = document.getElementById("inputWord");
let searchBtn = document.getElementById("search");
// let wordDiv = document.getElementById("wordDiv");
let phoneticDiv = document.getElementById("phoneticDiv");

console.log(wordList.length);

searchBtn.addEventListener("click", () => {
	phoneticDiv.innerHTML = "";
	let searchWord = userInput.value;
	let searchUrl = `https://api.dictionaryapi.dev/api/v2/entries/en/${searchWord}`;

	// console.log(searchUrl)
	if (userInput.value == "") {
		console.log("Field cannot be empty");
	} else {
		fetch(searchUrl)
			.then((response) => {
				if (response.ok) {
					return response.json();
				} else {
					phoneticDiv.innerHTML = "Enter English words only";
				}
			})
			.then((data) => {
				// console.log(data)
				let returnedWordArray = data;
				for (let wordBank = 0; wordBank < returnedWordArray.length; wordBank++) {
					phoneticDiv.innerHTML += `
                    <div class ="myclass"><h1 class="blue-text lighten-1">${returnedWordArray[wordBank].word}<span><em>${wordBank + 1}</em></span></h1></div>
                    `;

					let pathToPhonetics = returnedWordArray[wordBank].phonetics[0].text;
					if (pathToPhonetics == undefined) {
						pathToPhonetics = returnedWordArray[wordBank].phonetics[1].text;
					}
					phoneticDiv.innerHTML += `<div class = "myclass"><p>${pathToPhonetics}</p></div>`;

					let meaningsArray = returnedWordArray[wordBank].meanings;

					for (let meaning = 0; meaning < meaningsArray.length; meaning++) {
						phoneticDiv.innerHTML += `
                        <div><h3 class = "flow-text">Part of speech: ${returnedWordArray[wordBank].meanings[meaning].partOfSpeech}</h3></div>
                        `;
						let definitionsArray = returnedWordArray[wordBank].meanings[meaning].definitions;
						phoneticDiv.innerHTML += `<h4><em>definitions</em></h4>`;
						for (let definition = 0; definition < definitionsArray.length; definition++) {
							phoneticDiv.innerHTML += `
                            <div><em>${definition + 1}.</em><h6>${definitionsArray[definition].definition}</h6></div><br>
                            `;
						}
						let synonymsArray = returnedWordArray[wordBank].meanings[meaning].synonyms;
						if (synonymsArray == []) {
							phoneticDiv.innerHTML += "";
						} else {
							phoneticDiv.innerHTML += `<h4><em>Synonyms</em></h4>`;
							for (let synonym = 0; synonym < synonymsArray.length; synonym++) {
								phoneticDiv.innerHTML += `<div>${synonymsArray[synonym]}</div>
                                `;
							}
						}
					}
				}
			});
	}
	userInput.value = "";
});

//Navbar

// fetch the URL, find the sound, play the sound

(function ($) {
	$(function () {
		$(".sidenav").sidenav();
	}); // end of document ready
})(jQuery); // end of jQuery name space

//Preloader

const preloader = document.querySelector("#preloader");
if (preloader) {
	window.addEventListener("load", () => {
		preloader.remove();
	});
}
