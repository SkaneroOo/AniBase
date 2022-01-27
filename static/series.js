let default_search_query = "query ($Page: Int) {Page(page: $Page perPage: 10) {media(status: RELEASING type: ANIME sort: SCORE_DESC) {id title {userPreferred}coverImage {large}nextAiringEpisode {timeUntilAiring episode}}}}";
let query_options = {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    },
    body: JSON.stringify({
        query: default_search_query,
        variables: {
            page: 1
        }
    })
}
let series_query_results;
let series_template = document.getElementById("series_template");
let series = document.getElementById("items");
let new_series;
let item;

function timer(e) {
    let t = parseInt(e.innerText);
    setInterval( () => {
        let str, d, h, m, s;
        if (t > 0) {
            str = "";
            d = parseInt(t/(24*60*60));
            h = parseInt(t/(60*60)) % 24;
            m = parseInt(t/60) % 60;
            s = t % 60;
            str += d ? `${d} days ` : "";
            str += h ? `${h} hours ` : "";
            str += m ? `${m} minutes ` : "";
            str += `${s} seconds`;
            t--;
        } else {
            str = "Currently airing"
        }
        this.innerText = str;
    }, 1000);
}

function query_series(query, page) {
    fetch("https://graphql.anilist.co", query_options).then(async (data) => {
        series_query_results = await data.json();
        series_query_results.data.Page.media.forEach((e) => {
            new_series = document.createElement("div");
            item = document.createElement("img");
            item.src = e.coverImage.large;
            new_series.appendChild(item);
            item = document.createElement("h1");
            item.innerText = e.title.userPreferred;
            new_series.appendChild(item);
            if (e.nextAiringEpisode) {
                item = document.createElement("h3");
                item.innerText = `Episode ${e.nextAiringEpisode.episode} in:`;
                new_series.appendChild(item);
                item = document.createElement("h3");
                item.innerText = e.nextAiringEpisode.timeUntilAiring;
                item.onload = timer;
                new_series.appendChild(item);
            }
            item = document.createElement("br");
            new_series.appendChild(item);
            new_series.appendChild(item);
            series.appendChild(new_series);
        })
    })
}

query_series(default_search_query, 1);