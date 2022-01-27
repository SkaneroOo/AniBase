from re import A
import falcon
try:
    from bjoern import run # type: ignore
except:
    pass
import json
from functions import get_series, search_series, auth_user
from jinja2 import Environment, PackageLoader, select_autoescape
from falcon.response import Response
from falcon.request import Request
from dotenv import load_dotenv
from os import environ, path
import mysql.connector


load_dotenv()
DBHOST = environ["DBHOST"]
DBPORT = environ["DBPORT"]
DBUSER = environ["DBUSER"]
DBPASS = environ["DBPASS"]
DBNAME = environ["DBNAME"]
db = mysql.connector.connect(autocommit=True, host=DBHOST, user=DBUSER, password=DBPASS, database=DBNAME, port=DBPORT)
cur = db.cursor()

jenv = Environment(loader=PackageLoader("main"), autoescape=select_autoescape(['html']))
main_template = jenv.get_template("main.html")



app = falcon.App()

class Main:

    def on_get_series(self, req, resp, series_id):
        resp.content_type = falcon.MEDIA_HTML
        resp.text = main_template.render(series=get_series([series_id]))

    def on_get(self, req: Request, resp: Response):
        #print(req.get_cookie_values("access_token"))
        resp.content_type = falcon.MEDIA_HTML
        cur.execute("""select (anime_id) from watching where user_id = 1""")
        series_ids = [e[0] for e in cur.fetchall()]
        series = get_series(series_ids)
        series.sort(key=lambda x: x["nextAiringEpisode"]["timeUntilAiring"])
        resp.text = main_template.render(series=series)

class API:

    def on_get(self, req: Request, resp: Response): # endpoint just for testing
        try:
            data = req.get_param("code")
            print(data)
        except:
            resp.status = falcon.HTTP_400
            return
        resp.text = json.dumps(get_series(data["series"]))

    def on_get_auth(self, req: Request, resp: Response):
        code = req.get_param("code")
        auth = auth_user(code)
        for k, v in auth.items():
            if k != "access_token":
                print(f"{k}\n{v}")
        if auth:
            resp.set_cookie(
                "access_token", 
                auth["access_token"], 
                max_age=auth["expires_in"], 
                path="/",
                http_only=False, 
                secure=False
            )
            raise falcon.HTTPFound("http://143.47.184.161/")


    def on_get_search(self, req: Request, resp: Response):
        try:
            #data = json.loads(req.get_media())
            data = req.get_param("title")
            print(data)
        except:
            resp.status = falcon.HTTP_400
            return
        resp.text = json.dumps(search_series(title=data))

    def on_get_static(self, req: Request, resp: Response, filename: str):
        with open(f"./static/{filename}", "r") as f:
            resp.text = f.read()
            resp.content_type = falcon.MEDIA_JS

app.add_route("/", Main())
app.add_route("/series/{series_id:int}", Main(), suffix="series")
app.add_route("/api", API())
app.add_route("/api/search", API(), suffix="search")
app.add_route("/api/login/auth", API(), suffix="auth")
app.add_route("/static/{filename}", API(), suffix="static")

try:
    run(app, host="127.0.0.1", port=8899)
except:
    pass