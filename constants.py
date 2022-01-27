query_airing_series = """query ($page: Int $series: [Int]) {
  Page(page: $page, perPage: 50) {
    media(id_in: $series) {
      title {
        romaji
        english
      }
      coverImage {
        large
      }
      nextAiringEpisode {
        airingAt
        episode
        timeUntilAiring
      }
    }
  }
}"""

query_search_series = """query ($title: String $page: Int $perPage: Int) {
  Page (page: $page perPage: $perPage) {
    media (search: $title sort: POPULARITY_DESC type: ANIME) {
      id
      title {
        romaji english
      }
      coverImage {
        medium
      }
      status
    }
  }
}
"""

gql_url = 'https://graphql.anilist.co'
login_auth_url = "https://anilist.co/api/v2/oauth/token"