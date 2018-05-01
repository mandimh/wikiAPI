const results = document.querySelector('#results');
const searchButton = document.querySelector("#searchButton");
let searchText = document.querySelector("#searchText");



searchText.addEventListener("keyup", event => {
    if (event.keyCode === 13) {
        search();
        minimizeContainer();
    }
})
searchButton.onclick = () => {
    search();
    minimizeContainer();
}
expandContainer();

var search = function () {
    var url;
    //clear out any previous search results in the ul
    while (results.firstChild) {
        results.removeChild(results.firstChild);
    }
    let searchRequest = searchText.value;
    let h2Span = document.querySelector('h2 span');
    h2Span.innerHTML = searchRequest;
    url = 'https://en.wikipedia.org/w/api.php?&origin=*&action=query&format=json&list=search&srwhat=text&srsearch='
    url += searchRequest;
    console.log(url);
    fetch(url)
        .then((resp) => resp.json())
        .then(resp => {
            let searchResults = Array.from(resp.query.search);
            console.log(searchResults);
            searchResults.forEach(result => {
                let div = createNode('div'),
                    h3 = createNode('h3'),
                    a = createNode('a'),
                    span = createNode('span');
                //console.log(result.title)
                a.setAttribute('href', 'https://en.wikipedia.org/?curid=' + result.pageid);
                a.setAttribute('target', '=blank');
                a.innerHTML = `${result.title}`;
                span.innerHTML = `${result.snippet}`;

                append(h3, a);
                append(div, h3);
                append(div, span);
                console.log(div);
                results.appendChild(div);
            })
        })
        .catch(err => console.log('Request failed', err))
}

function createNode(element) {
    return document.createElement(element);
}

function append(parent, el) {
    return parent.appendChild(el);
}

function minimizeContainer() {
    const searchArea = document.querySelector("#searchItems");
    const h1 = document.querySelector('h1');
    const h2 = document.querySelector('h2');
    h2.classList.remove('minimized');
    h1.classList.add('minimized');
    searchArea.classList.add('minimized');
    searchArea.classList.remove('expanded');
}

function expandContainer() {
    const searchArea = document.querySelector("#searchItems");
    const h1 = document.querySelector('h1');
    const h2 = document.querySelector('h2');
    h2.classList.add('minimized');
    searchArea.classList.add('expanded');
    h1.classList.remove('minimized');
    searchArea.classList.remove('minimized');
}
