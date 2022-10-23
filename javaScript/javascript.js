// get inupt 
let input = document.querySelector(".search-box input");
let searchBox = document.querySelector(".search-box");
let searchButton = document.querySelector(".main .search-box .shorten");
let urlContainer = document.querySelector(".url-content");//adding shorten url to the madin div
let notValidMessege = "please add a link";
let notValidSpan = document.querySelector('.not-valied-input');
let url = document.querySelector(".url-box .url");
let shorterUrl = document.querySelector(".url-box .url");
let copied = "Copied!";

let face = "www.facebook.com";

let generated = 1;
//focus on input
searchButton.onclick = function () {
    validInput();

    // if the input not valid
    if (input.value == '') {
        notValidInput();
    }
    //valid input

    else {
        fetch(`https://api.shrtco.de/v2/shorten?url=${input.value}`, {
            // mode: 'no-cors',
        })
            .then((response) => response.json())
            .then((data) => {
                try {
                    //add the main span
                    let spanMain = document.createElement('span');
                    spanMain.classList.add('url-box');
                    //add first span
                    let spanUrl = document.createElement('span');
                    let thrUrl = document.createTextNode(input.value);
                    spanUrl.appendChild(thrUrl);
                    spanUrl.classList.add('url');

                    //add the second span for shorted span
                    let theCopyButton = document.createElement('span');
                    let theCopyButtonText = document.createTextNode('Copy');
                    theCopyButton.setAttribute('data-index', generated);
                    theCopyButton.appendChild(theCopyButtonText);
                    theCopyButton.classList.add('copy-url');

                    // span for copy button
                    let spanShortenUrl = document.createElement('span');
                    let theUrlShorter = document.createTextNode(data.result.short_link);
                    spanShortenUrl.setAttribute('data-index', generated++);
                    spanShortenUrl.appendChild(theUrlShorter);
                    spanShortenUrl.classList.add('shorten-url');

                    //add them to the container
                    spanMain.appendChild(spanUrl);
                    spanMain.appendChild(theCopyButton);
                    spanMain.appendChild(spanShortenUrl);

                    //add main span to the box
                    urlContainer.appendChild(spanMain);
                }
                catch {
                    notValidInput();
                }
            }

                // getLinks();
            )
    }



    //valid the design
    function validInput() {
        notValidSpan.textContent = "";
        input.classList.remove('not-valid');
    }
//test delete span not valid
    document.addEventListener("click", function (event) {
        if (event.target.className === "shorten") {
            //TODO
           //i must delete the span element here
            spanElement.innerHTML = "";
        }
    })

    //not valid design
    function notValidInput() {
        let notValid = document.createElement('span');
        let notValidText = document.createTextNode("please add a link");
        notValid.appendChild(notValidText);
        notValid.classList.add('not-valied-input');
        searchBox.appendChild(notValid);
        input.classList.add('not-valid');
    }

    //get links
    function getLinks() {
        console.log('function get links');
    }

}
//get all copied numbers
let copyButton = document.querySelectorAll(".url-content .copy-url");


//clicked copy function
document.addEventListener("click", function (event) {
    if (event.target.className === "copy-url") {
        console.log('it pressed me');
        event.target.classList.add('copied');
        event.target.innerHTML = "Copied";
        let url = document.querySelectorAll(".url-content .shorten-url");
        url.forEach(element => {
            if (element.getAttribute('data-index') == event.target.getAttribute('data-index')) {
                console.log(element.innerHTML);
            }
        })
    }
})
//facebook.com
//twitter.com
// click on copy button
