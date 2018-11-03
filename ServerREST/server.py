import os 
import sys
import sqlite3
import time

from flask import jsonify
from flask import Flask, request, session, g, redirect, url_for, abort, \
    render_template, flash

#create app instance
app = Flask(__name__)


app.config.update(dict(
    FLASK_DEBUG = True,
    SECRET_KEY = 'development key',
    USERNAME = 'admin',
    PASSWORD = 'default'
))

app.config.from_envvar('FLASKR_SETTINGS', silent = True)

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
    except IndexError:
        print("[ ERROR ] Usage: python ./scriptname init/run")
