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
let series_template = document.getElementById("series_template").content;
let series = document.getElementById("items");
let new_series;
function query_series(query, page) {
    fetch("https://graphql.anilist.co", query_options).then(async (data) => {
        series_query_results = await data.json();
        series_query_results.data.Page.media.forEach((e) => {
            new_series = JSON.parse(JSON.stringify(series_template));
            new_series.children[0].src = e.coverImage.large;
            new_series.children[1].innerText = e.title.userPreferred;
            new_series.children[2].innerText = `Episode ${e.nextAiringEpisode.episode} in:`;
            new_series.children[3].innerText = e.nextAiringEpisode.timeUntilAiring;
            series.appendChild(new_series);
        })
    })
}

query_series(default_search_query, 1);