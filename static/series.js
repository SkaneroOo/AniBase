const default_search_query = `query ($Page: Int) {
    Page(page: $Page perPage: 10) {
        media(status: RELEASING type: ANIME sort: SCORE_DESC) {
            id
            title {
                userPreferred
            }
            coverImage {
                large
            }
            nextAiringEpisode {
                timeUntilAiring
                episode
            }
        }
    }
}`
let query_options = {
    method: 'POST',
    body: JSON.stringify({
        query: default_search_query,
        variables: {
            page: 1
        }
    })
}
let series_query_results;
let series_template;
let series = document.getElementById("series");
function query_series(query, page) {
    fetch("https://graphql.anilist.co/", query_options).then(async (data) => {
        series_query_results = await data.json();
        series_query_results.data.Page.media.forEach((e) => {
            series_template = document.getElementById("series_template").content;
            series_template.children[0].src = e.coverImage.large;
            series_template.children[1].innerText = e.title.userPrefered;
            series_template.children[2].innerText = `Episode ${e.nextAiringepisode.episode} in:`;
            series_template.children[3].innerText = e.nextAiringepisode.timeUntilAiring;
            series.appendChild(series_template);
        })
    })
}

query_series(default_search_query, 1);