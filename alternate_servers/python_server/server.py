from http.server import HTTPServer, BaseHTTPRequestHandler
import re
import os
import json

two_up = os.path.abspath(os.path.join(__file__ ,"../../../"))

PORT = 9000

with open(os.path.join(two_up,'./auth.json')) as f:
    user_data = json.load(f)


class SimpleHTTPRequestHandler(BaseHTTPRequestHandler):

    data = {'authenticated': False, 'user': None}

    def _set_headers(self,success:bool = True,code:int = 200):

        if success:
            assert code == 200 or code == 201

        self.send_response(code)
        self.send_header('Content-type', 'application/json')
        self.end_headers()

    def login(self,user_details):
        if user_details["email"]=="" or user_details["password"]=="":
            self.data["error"] = "Input fields can't be empty"
            raise Exception
        user_found = False
        password_match_found = False
        user: dict
        for user in user_data["users"]:
            if user["email"] == user_details["email"]:
                user_found = True
                if user["password"] == user_details["password"]:
                    password_match_found = True
                    self.data['authenticated'] = True
                    self.data['user'] = {"id": user["id"], "name": user["name"], "username": user["username"],
                                         "email": user["email"]}
                    self._set_headers()
                else:
                    break
        if user_found == False or password_match_found == False:
            self._set_headers(False, 401)
            self.data["error"] = "Invalid Credentials"
            self._set_headers(False, 401)

    def do_GET(self):
        self.data = {'authenticated': False, 'user': None}
        self._set_headers(False,501)
        self.data["error"] = "Unsupported Method GET"
        self.wfile.write(json.dumps(self.data).encode(encoding='utf_8'))

    def do_POST(self):
        print("handling POST request")
        self.data = {'authenticated': False, 'user': None}
        try:
            if re.search('/api/auth/login*',self.path)!= None:
                if self.headers['Content-Length'] is None:
                    self.data['user'] = None
                    self.data['error'] = ""
                    self._set_headers(False,400)
                else:
                    content_length = int(self.headers['Content-Length'])
                    content_type = self.headers['Content-Type']
                    request_raw = self.rfile.read(content_length).decode('utf-8') # <--- received data
                    if content_length is None:
                        self.data["error"] = "Empty Request"
                        raise Exception
                    if content_type == "multipart/form-data":
                        self.data["error"] = "Expects a application/x-www-form-urlencoded"
                        raise Exception
                    else:
                        try:
                            request_data = json.loads(request_raw)
                        except json.decoder.JSONDecodeError:
                            self.data["error"] = "Invalid request"
                        try:
                            self.login(request_data)

                        except Exception as e:
                            raise e
        except:
            self._set_headers(False, 401)

        self.wfile.write(json.dumps(self.data).encode(encoding='utf_8'))


def run(server_class = HTTPServer, handler_class = SimpleHTTPRequestHandler):
    server_address = ('',PORT)
    httpd = server_class(server_address,handler_class)
    print("Starting server on HOST {} on PORT {}".format(server_address[0],server_address[1]))
    httpd.serve_forever()


run()







