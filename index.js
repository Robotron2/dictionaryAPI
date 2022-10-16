let userInput = document.getElementById("inputWord");

let searchBtn = document.getElementById("search");

let shuffleBtn = document.getElementById("shuffle");

let errorDiv = document.getElementById("errorDiv");

let phoneticDiv = document.getElementById("phoneticDiv");

// console.log(wordList.length);

const clearError = () => {
	errorDiv.innerHTML;
};

searchBtn.addEventListener("click", () => {
	phoneticDiv.innerHTML = "";

	let searchWord = userInput.value;

	let searchUrl = `https://api.dictionaryapi.dev/api/v2/entries/en/${searchWord}`;

	// console.log(searchUrl)
	if (userInput.value == "") {
		console.log("Field cannot be empty");
		errorDiv.innerHTML = `<p>Field cannot be empty</p>`;
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
                    
                    <div class ="myclass"><h3 class="blue-text lighten-1">${returnedWordArray[wordBank].word}<span><em>${wordBank + 1}</em></span></h3></div>
                    
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

let randomWordIndex;

shuffleBtn.addEventListener("click", () => {
	randomWordIndex = Math.floor(Math.random() * 1952);
	console.log(randomWordIndex);
	console.log(wordList[randomWordIndex]);
	let randomWord = wordList[randomWordIndex];
	userInput.value = randomWord;

	phoneticDiv.innerHTML = "";
	let searchUrl = `https://api.dictionaryapi.dev/api/v2/entries/en/${randomWord}`;

	// let randomWordApi =
	fetch("https://random-word-api.herokuapp.com/word")
		.then((response) => {
			return response.json();
		})

		.then((data) => {
			let randomWordApi = data[0];
		})
		.then(
			fetch(searchUrl)
				.then((response) => {
					return response.json();
				})
				.then((data) => {
					console.log(data);
					let randomWordData = data;
					for (let wordBank = 0; wordBank < randomWordData.length; wordBank++) {
						phoneticDiv.innerHTML += `
                    <div class ="myclass"><h3 class="blue-text lighten-1">${randomWordData[wordBank].word}<span><em>${wordBank + 1}</em></span></h3></div>
                    `;

						let pathToPhonetics = randomWordData[wordBank].phonetics[0].text;
						if (pathToPhonetics == undefined) {
							pathToPhonetics = randomWordData[wordBank].phonetics[1].text;
						}
						phoneticDiv.innerHTML += `<div class = "myclass"><p>${pathToPhonetics}</p></div>`;
						let meaningsArray = randomWordData[wordBank].meanings;
						for (let meaning = 0; meaning < meaningsArray.length; meaning++) {
							phoneticDiv.innerHTML += `
                        
                        <div><h3 class = "flow-text">Part of speech: ${randomWordData[wordBank].meanings[meaning].partOfSpeech}</h3></div>
                        
                        `;

							let definitionsArray = randomWordData[wordBank].meanings[meaning].definitions;

							phoneticDiv.innerHTML += `<h4><em>definitions</em></h4>`;

							for (let definition = 0; definition < definitionsArray.length; definition++) {
								phoneticDiv.innerHTML += `
                            
                            <div><em>${definition + 1}.</em><h6>${definitionsArray[definition].definition}</h6></div><br>
                            
                            `;
							}

							let synonymsArray = randomWordData[wordBank].meanings[meaning].synonyms;

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
				})
		);
});

// fetch the URL, find the sound, play the sound

(function ($) {
	$(function () {
		$(".sidenav").sidenav();
	}); // end of document ready
})(jQuery); // end of jQuery name space

// Preloader;

const preloader = document.querySelector("#preloader");
if (preloader) {
	window.addEventListener("load", () => {
		preloader.remove();
	});
}
