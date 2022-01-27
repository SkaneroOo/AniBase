import requests
import json
from constants import *

def get_series(series):
    gql_resp = requests.post(gql_url, json={
        "query": query_airing_series,
        "variables": {
            "page": 1, 
            "series": series
        }
    })
    return gql_resp.json()["data"]["Page"]["media"]

def search_series(title: str, page: int = 1, perPage: int = 10):
    gql_resp = requests.post(gql_url, json={
        "query": query_search_series,
        "variables": {
            "title": title,
            "page": page, 
            "perPage": perPage
        }
    })
    return gql_resp.json()["data"]["Page"]["media"]

def auth_user(code):
    headers = {
        "Content-Type": "application/json", 
        "Accept": "application/json"
    }
    json = {
        "grant_type": "authorization_code",
        "client_id": "7387",
        "client_secret": "o1fyetMmhZ4xNa3c816vJar7wrwga5oHVXt72ZAU",
        "redirect_uri": "http://143.47.184.161/api/login/auth",
        "code": code
    }
    response = requests.post(login_auth_url, headers = headers, json = json)
    if response.status_code == 200:
        return response.json()
    else:
        return None
