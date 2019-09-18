import psycopg2
import urllib.parse as up

from psycopg2 import errors
from sqlalchemy import create_engine, MetaData, Column, Integer, String, text, exc
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from sqlalchemy.pool import NullPool
from sqlalchemy.sql import expression

DATABASE_URL = "postgres://cochltcv:w90CheA-A1dPIMNYqtqZ56b0xUEi3Df4@salt.db.elephantsql.com:5432/cochltcv"
up.uses_netloc.append("postgres")
url = up.urlparse(DATABASE_URL)

engine = create_engine(DATABASE_URL)
Base = declarative_base(engine)


class User(Base):
    __tablename__ = 'users'

    id = Column(Integer, primary_key=True)
    email = Column(String)
    password = Column(String)

    def __init__(self, email, password):
        self.email = email
        self.password = password


def loadSession():
    metadata = Base.metadata
    Session = sessionmaker(bind=engine)
    session = Session()
    return session


class ServerDatabase():

    def __init__(self):
        self.session = loadSession()
        self.connection = engine.connect()

    def login_user(self, user: User):
        print("running log in")
        select_user = text("select * from users where email = :email and password = crypt(:password1,password)"
                           )
        registered_user = self.connection.execute(select_user, email=user.email, password1=user.password).fetchone()
        if registered_user is None:
            print("user not registered")
            return (False,None)
        print("user registered")
        return (True,registered_user)

    def register_user(self, user: User):
        user_exist = False

        for registered_user in self.list_all_user():
            if user.email == registered_user.email:
                user_exist = True

                break
        if user_exist:
            print("User already exist")
        else:
            add_user = text("insert into users(email,password) values(:email,crypt(:password ,gen_salt(:bf)))"
                            )

            self.connection.execute(add_user, email=user.email, password=user.password, bf="bf")

    def list_all_user(self):
        res = self.session.query(User).all()

        return res

    def close(self):
        global engine
        self.session.close()
        engine= create_engine(DATABASE_URL,poolclass = NullPool)
