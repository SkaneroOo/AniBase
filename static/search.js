let search_url = "http://127.0.0.1:8899/api/search";
let text;
let search_bar = document.getElementById("search_bar");
search_bar.value = "";
let results = document.getElementById("results");
let query_results;
let result;
search_bar.onblur = () => {
    results.innerHTML = "";
    text = "";
}
setInterval(() => {
    if (search_bar.value && search_bar.value != text) {
        text = search_bar.value;
        fetch(`${search_url}?title=${text}`).then(async (data) => {
            query_results = await data.json();
            results.innerHTML = "";
            query_results.forEach( res => {
                result = document.createElement("div");
                result.setAttribute("class", "result");
                result.appendChild(document.createElement("img"))
                result.appendChild(document.createElement("h6"))
                result.firstChild.src = res.coverImage.medium;
                result.lastChild.innerHTML = res.title.romaji;
                results.appendChild(result);
            })
        })
    }
}, 2500)