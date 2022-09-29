let userInput = document.getElementById("inputWord")
let searchBtn = document.getElementById("search")
let wordDiv = document.getElementById("wordDiv")
let phoneticDiv = document.getElementById("phoneticDiv")
    // let phoneticSoundBtn = document.getElementById("sounds")
searchBtn.addEventListener("click", () => {

    phoneticDiv.innerHTML = ""
    let searchWord = userInput.value
    let searchUrl = `https://api.dictionaryapi.dev/api/v2/entries/en/${searchWord}`

    // console.log(searchUrl)
    if (userInput.value == "") {
        console.log("Field cannot be empty")
    } else {
        fetch(searchUrl)
            .then((response) => response.json())
            .then((data) => {
                // console.log(data)
                let returnedWordArray = data
                for (let wordBank = 0; wordBank < returnedWordArray.length; wordBank++) {
                    phoneticDiv.innerHTML += `
                    <div><h1>${returnedWordArray[wordBank].word}<span>${wordBank + 1}</span></h1></div>
                    <div><h1>${returnedWordArray[wordBank].phonetic}</h1></div>
                    `
                    let meaningsArray = returnedWordArray[wordBank].meanings

                    for (let meaning = 0; meaning < meaningsArray.length; meaning++) {
                        phoneticDiv.innerHTML += `
                        <div><h3>Part of speech: ${returnedWordArray[wordBank].meanings[meaning].partOfSpeech}</h3></div>
                        `
                        let definitionsArray = returnedWordArray[wordBank].meanings[meaning].definitions
                        for (let definition = 0; definition < definitionsArray.length; definition++) {
                            phoneticDiv.innerHTML += `
                            <div><em>definition</em>: ${definitionsArray[definition].definition}</div>
                            `
                        }
                        let synonymsArray = returnedWordArray[wordBank].meanings[meaning].synonyms
                        if (synonymsArray == []) {
                            phoneticDiv.innerHTML += ""
                        } else {
                            phoneticDiv.innerHTML += `<h4>Synonyms</h4>`
                            for (let synonym = 0; synonym < synonymsArray.length; synonym++) {
                                phoneticDiv.innerHTML += `<div>${synonymsArray[synonym]}</div>
                                `
                            }
                        }
                    }
                }
            })
    }
    userInput.value = ""



})


// fetch the URL, find the sound, play the sound