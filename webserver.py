from http.server import BaseHTTPRequestHandler, HTTPServer
import os
from apiclient.discovery import build
from apiclient.errors import HttpError
from oauth2client.tools import argparser

DEVELOPER_KEY = os.environ['youtubeAPIKey']
YOUTUBE_API_SERVICE_NAME = "youtube"
YOUTUBE_API_VERSION = "v3"
def fetch_all_youtube_videos(playlistId):
    youtube = build(YOUTUBE_API_SERVICE_NAME, YOUTUBE_API_VERSION, developerKey=DEVELOPER_KEY)
    res = youtube.playlistItems().list(
    part="snippet",
    playlistId=playlistId,
    maxResults="50"
    ).execute()

    nextPageToken = res.get('nextPageToken')
    while ('nextPageToken' in res):
        nextPage = youtube.playlistItems().list(
        part="snippet",
        playlistId=playlistId,
        maxResults="50",
        pageToken=nextPageToken
        ).execute()
        res['items'] = res['items'] + nextPage['items']

        if 'nextPageToken' not in nextPage:
            res.pop('nextPageToken', None)
        else:
            nextPageToken = nextPage['nextPageToken']

    return res

os.system("cls")

class RequestHandler(BaseHTTPRequestHandler):
    def do_GET(self):
        #send responce status code
        self.send_response(200)

        #send headers
        file = self.path.replace("/", "\\")
        suffix = "/"
        mimetype = "text/html"
        if self.path.endswith(suffix):
            mimetype = "text/html"
            file = file + "\\index.html"
        if "css" in self.path:
            mimetype = "text/css"
        if "js" in self.path:
            mimetype = "application/javascript"
        if "ico" in self.path:
            mimetype = "image/x-icon"
        if "png" in self.path:
            mimetype = "image/png"
        if "jpg" in self.path:
            mimetype = "image/jpeg"
        if "svg" in self.path:
            mimetype = "image/svg+xml"
        if "ttf" in self.path or "otf" in self.path:
            mimetype = "font/truetype"
        if "otf" in self.path or "otf" in self.path:
            mimetype = "font/opentype"
        if "json" in self.path:
            mimetype = "application/json"
        if "get_videos?playlist=" in self.path:
            mimetype = "text/plain"

        print(self.path)
        self.send_header("Content-type", mimetype)
        self.end_headers()

        #send page back to client
        if "get_videos?playlist=" in self.path:
            playlistURL = self.path.replace("&", "?").split("?")
            while "list=PL" not in playlistURL[len(playlistURL) - 1]:
                playlistURL.pop()

            playlistID = playlistURL[len(playlistURL) - 1].replace("list=", "")
            videoInfo = ""

            try:
                if __name__ == '__main__':
                    videos = fetch_all_youtube_videos(playlistID)
                    for i in range(len(videos["items"])):
                        videoInfo = videoInfo + str(videos["items"][i]["snippet"]["resourceId"]["videoId"]) + "SPLITIDSANDTITLE" + str(videos["items"][i]["snippet"]["title"]) + "SPLITINTOIDANDTITLE"
                    self.wfile.write(bytes(videoInfo, "utf-8"))
            except:
                self.wfile.write(b"ERR: PLAYLIST NOT FOUND")
        elif "font" in mimetype:
            f = open("static" + file, "r", encoding = "utf-8")

            self.wfile.write(bytes(f.read(), "utf-8"))
        elif "image" not in mimetype:
            try:
                f = open("static" + file, "r", encoding = "utf-8")
            except:
                f = open("static\\404\\not_found.html")

            self.wfile.write(bytes(f.read(), "utf-8"))
        else:
            f = open("static" + file, "rb")
            image = (f.read())
            self.wfile.write(image)
        return


def run():
    print("Sarting server...")

    #Server settings
    PORT = 8000
    server_address = ("127.0.0.1", PORT)
    httpd = HTTPServer(server_address, RequestHandler)
    print("running server...")
    httpd.serve_forever()

run()
