import psycopg2
import urllib.parse as up
import crypt

DATABASE_URL = "postgres://cochltcv:w90CheA-A1dPIMNYqtqZ56b0xUEi3Df4@salt.db.elephantsql.com:5432/cochltcv"
up.uses_netloc.append("postgres")
url = up.urlparse(DATABASE_URL)



class ServerDatabase():


    def __init__(self):
        self.connection = psycopg2.connect(database=url.path[1:],
                                user=url.username,
                                password=url.password,
                                host=url.hostname,
                                port=url.port
                                )

        self.cursor = self.connection.cursor()


    def save_to_users(self, data_to_insert:tuple):


        postgres_insert_query = """ INSERT INTO users (username, fullname, email , avatar, status, password) VALUES (%s,%s,%s,%s,%s,%s)"""

        self.cursor.execute(postgres_insert_query, data_to_insert)

        self.connection.commit()


    def check_if_user_exist(self,email) -> bool:
        postgres_select_query = "select * from users"

        self.cursor.execute(postgres_select_query)
        all_users = self.cursor.fetchall()
        print(all_users)
        for user_row in all_users:
            print(user_row)
            if user_row[3] == email:
                print(email)
                return True
        print("new user")
        return False



base = ServerDatabase()
base.check_if_user_exist("codedcoder@gmail.com")
base.save_to_users(("win","win@gmail.com","winimage","modile dev","winnn"))