from http.server import BaseHTTPRequestHandler, HTTPServer

class RequestHandler(BaseHTTPRequestHandler):
    def do_GET(self):
        #send responce status code
        self.send_response(200)

        #send headers
        if self.path == "/":
            mimetype = "text/html"
            file = "index.html"
        if "css" in self.path:
            mimetype = "text/css"
            file = "style.css"
        if "ico" in self.path:
            mimetype = "image/x-icon"
            file = "favicon.ico"
        
        print(self.path)
        self.send_header("Content-type", mimetype)
        self.end_headers()

        #send page back to client
        if "ico" not in self.path:
            f = open("static\\" + file, "r")
            self.wfile.write(bytes(f.read(), "utf-8"))
        else:
            f = open("static\\" + file, "rb")
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
