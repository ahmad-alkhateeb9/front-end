// get inupt
const input = document.querySelector(".search-box input");
const searchBox = document.querySelector(".search-box");
const searchButton = document.querySelector(".main .search-box .shorten");
const urlContainer = document.querySelector(".url-content");//adding shorten url to the madin div
const notValidMessege = "please add a link";
const notValidSpan = document.querySelector('.search-box .not-valid-input');
const url = document.querySelector(".url-box .url");
const shorterUrl = document.querySelector(".url-box .url");
const copied = "Copied!";


let generated = 1;
//focus on input
searchButton.onclick = function () {
    // SendvalidInput();

    // if the input not valid
    if (input.value == '') {
        SendnotValidInput();
    }
    //valid input

    else {
        SendvalidInput();
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

                    //clicked copy function
                    theCopyButton.addEventListener("click", function (event) {
                        console.log('it pressed me');
                        event.target.classList.add('copied');
                        event.target.innerHTML = "Copied";
                        let url = document.querySelectorAll(".url-content .shorten-url");
                        url.forEach(element => {
                            if (element.getAttribute('data-index') == event.target.getAttribute('data-index')) {
                                console.log(element.innerHTML);
                                navigator.permissions.query({ name: "clipboard-write" }).then((result) => {
                                    if (result.state === "granted" || result.state === "prompt") {
                                        navigator.clipboard.writeText(element.innerHTML);
                                    }
                                });
                            }
                        })
                    })

                    // span for copy button
                    let spanShortenUrl = document.createElement('span');
                    let theUrlShorter = document.createTextNode(data.result.short_link);
                    spanShortenUrl.setAttribute('data-index', generated++);
                    spanShortenUrl.appendChild(theUrlShorter);
                    spanShortenUrl.classList.add('shorten-url');

                    //add div for shorten url and copybutton
                    let divContainer = document.createElement('div');
                    divContainer.classList.add('shorten-controller');

                    //add them to the div
                    divContainer.appendChild(spanShortenUrl)
                    divContainer.appendChild(theCopyButton)

                    //add them to the container
                    spanMain.appendChild(spanUrl);
                    spanMain.appendChild(divContainer);

                    //add main span to the box
                    urlContainer.appendChild(spanMain);
                }
                catch (e) {
                    console.log(e)
                    SendnotValidInput();
                }
            }
                // getLinks();
            )
    }

    //valid the design
    function SendvalidInput() {
        notValidSpan.classList.remove('hidden')
        input.classList.remove('not-valid');
    }

    //not valid design
    function SendnotValidInput() {
        notValidSpan.classList.add('hidden');
        input.classList.add('not-valid');
    }
}
