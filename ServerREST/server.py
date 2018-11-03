import os 
import sys
import sqlite3
import time

from flask import jsonify
from flask import Flask, request, session, g, redirect, url_for, abort, \
    render_template, flash

#create app instance
app = Flask(__name__)
app.config.from_object(__name__)


app.config.update(dict(
    FLASK_DEBUG = True,
    SECRET_KEY = 'development key',
    USERNAME = 'admin',
    DATABASE=os.path.join(app.root_path, 'history.db'),
    PASSWORD = 'default'
))

app.config.from_envvar('FLASKR_SETTINGS', silent = True)

def init_db():
    db = get_db()
    with app.open_resource('schema.sql',mode = 'r') as f:
        db.cursor().executescript(f.read())
    db.commit()

def connect_db():
    rv = sqlite3.connect(app.config['DATABASE'])
    rv.row_factory = sqlite3.Row
    return rv


def get_db():
    if not hasattr(g, 'sqlite_db'):
        g.sqlite_db = connect_db()
    return g.sqlite_db

@app.teardown_appcontext
def close_db(error):
    if hasattr(g, 'sqlite_db'):
        g.sqlite_db.close()

@app.route('/loginTest', methods=['POST'])
def login_test():
        request_dict = request.get_json()
        if request_dict == None:
            print("Invalid data", sys.stderr)
            return 'ERROR'
        # print(request_dict, sys.stderr)

        try:
            values = [request_dict['username'],
                    request_dict['password']]
        except KeyError:
            print("Invalid data", sys.stderr)
            return 'ERROR'

        print("[ INFO ] Test user login: {}").format(values[0])
        
        return 'OK'

if __name__ == '__main__':
    
    try:
        if sys.argv[1] == 'run':
            print('[ INFO ] Running app...')
            app.run()
        elif sys.argv[1] == 'init':
            print('[ INFO ] Database init...')
            with app.app_context():
                init_db()
    except IndexError:
        print("[ ERROR ] Usage: python ./scriptname init/run")
