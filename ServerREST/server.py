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

# METHODS

@app.route('/loginTest', methods=['POST'])
def login_test():
        request_dict = request.get_json()
        if request_dict == None:
            print("Invalid data", sys.stderr)
            return '{"status":"ERROR"}'
        # print(request_dict, sys.stderr)

        try:
            values = [request_dict['username'],
                    request_dict['password']]
        except KeyError:
            print("Invalid data", sys.stderr)
            return '{"status":"ERROR"}'

        print("[ INFO ] Test user login: {}").format(values[0])
        
        return '{"status":"OK"}'

@app.route('/login', methods=['POST'])
def login():
    request_dict = request.get_json()
    if request_dict == None:
        print("[ ERROR ] Invalid data", sys.stderr)
        return '{"status":"ERROR"}'
    
    try:
        if request_dict['email'] == "" or request_dict['password']== "":
            print("[ ERROR ] Invalid data", sys.stderr)
            return '{"status":"ERROR"}'
        values = [request_dict['email'],
        request_dict['password']]
    
    except KeyError:
        print("Invalid data", sys.stderr)
        return '{"status":"ERROR"}'

    try:
        db = get_db()
        
        query = 'select FirstName, LastName, Birthdate, Rating, Email, Description from Users where Email=\'' + values[0] + '\' and Password=\'' + values[1] + '\''
        query2 = 'select name, Rating, Email, Description from Organisations where Email=\'' + values[0] + '\' and Password=\'' + values[1] + '\''
        
        try:
            for row in db.execute(query):
                user = {
                    "firstName" : row[0],
                    "lastName" : row[1],
                    "birthdate" : row[2],
                    "rating" : row[3],
                    "email" : row[4],
                    "description" : row[5]
                }

            result = {
                "type" : "volunteer",
                "data" : user,
                "status" : "OK"
            }
                  
            res = jsonify(result)
            print(res)
            return res
        except:
            try:
                for row in db.execute(query2):
                    org = {
                        "name" : row[0],
                        "rating" : row[1],
                        "email" : row[2],
                        "description" : row[3]
                    }

                result2 = {
                    "type" : "organisation",
                    "data" : org,
                    "status" : "OK"
                }

                res2 = jsonify(result2)
                print(res2)
                return res2
            except:
                print("[ ERROR ] No organisation or user", sys.stderr)
                return '{"status":"ERROR"}'    

    except:
        print("[ ERROR ] No organisation or user", sys.stderr)
        return '{"status":"ERROR"}'    


@app.route('/registerUser', methods=['POST'])
def registerUser():
    request_dict = request.get_json()
    if request_dict == None:
        print("[ ERROR ] Invalid data", sys.stderr)
        return '{"status":"ERROR"}'
    
    try:
        values = [request_dict['email'],
        request_dict['password'],
        request_dict['firstname'],
        request_dict['lastname'],
        request_dict['birthdate'],
        request_dict['description'],
        "5.0"]

        #TO-DO description can be null
        for element in values:
            if element == "":
                print("[ ERROR ] Invalid data", sys.stderr)
                return '{"status":"ERROR"}'

    except KeyError:
        print("[ ERROR ] Invalid data", sys.stderr)
        return '{"status":"ERROR"}'
    try:
        db = get_db()
        db.execute('insert into Users (email, password, firstname, lastname, birthdate, description, rating) values (?,?,?,?,?,?,?)', values)
        db.commit()
        return '{"status":"OK"}'
    except:
        print("[ ERROR ] Can't insert data in db", sys.stderr)
        return '{"status":"ERROR"}'

    

@app.route('/registerOrganisation', methods=['POST'])
def registerOrganisation():
    request_dict = request.get_json()
    if request_dict == None:
        print("[ ERROR ] Invalid data", sys.stderr)
        return '{"status":"ERROR"}'
    
    try:
        values = [request_dict['email'],
        request_dict['password'],
        request_dict['name'],
        request_dict['description'],
        "5.0"]

        #TO-DO description can be null
        for element in values:
            if element == "":
                print("[ ERROR ] Invalid data", sys.stderr)
                return '{"status":"ERROR"}'

    except KeyError:
        print("Invalid data", sys.stderr)
        return '{"status":"ERROR"}'
    try:
        db = get_db()
        db.execute('insert into Organisations (email, password, name, description, rating) values (?,?,?,?,?)', values)
        db.commit()
        return '{"status":"OK"}'
    except:
        print("[ ERROR ] Can't insert data in db", sys.stderr)
        return '{"status":"ERROR"}'

@app.route('/createEvent', methods=['POST'])
def createEvent():
    request_dict = request.get_json()
    if request_dict == None:
        print("[ ERROR ] Invalid data", sys.stderr)
        return '{"status":"ERROR"}'
    
    #TO-DO return category
    try:
        values = [request_dict['name'],
        request_dict['date'],
        request_dict['description'],
        request_dict['organisation'],
        request_dict['category']]

        #TO-DO description can be null
        for element in values:
            if element == "":
                print("[ ERROR ] Invalid data", sys.stderr)
                return '{"status":"ERROR"}'

    except KeyError:
        print("Invalid data", sys.stderr)
        return '{"status":"ERROR"}'

    try:
        db = get_db()
        query = 'select organisationId from Organisations where name=\'' + values[3] + '\''
        query2 = 'select categoryId from Categories where name=\'' + values[4] + '\''
        query3 = 'select eventId from Events where name=\'' + values[0] + '\''
        
        
        event = [request_dict['name'],
        request_dict['description'],
        request_dict['date']]

        db.execute('insert into events (name, description, date) values (?,?,?)', event)
        db.commit()
        #TO-Do fix this mess. only one value expected!!
        
        for row in db.execute(query):
            organisationId = row[0]
            break

        for row2 in db.execute(query2):
            categoryId = row2[0]
            break

        for row2 in db.execute(query3):
            eventId = row2[0]
            break
        
        eventValues = [organisationId, eventId]

        db.execute('insert into OrganisationEvents (organisationid, eventid) values (?,?)', eventValues)
        db.commit()

        for row3 in db.execute(query3):
            eventId = row3[0]
            break

        eventCategories = [eventId, categoryId]
        
        db.execute('insert into eventCategories (eventid, categoryid) values (?,?)', eventCategories)

        db.commit()

        return '{"status":"OK"}'
    except:
        print("[ ERROR ] Can't insert data in db", sys.stderr)
        return '{"status":"ERROR"}'

@app.route('/createApplication', methods=['POST'])
def createApplication():
    request_dict = request.get_json()
    if request_dict == None:
        print("[ ERROR ] Invalid data", sys.stderr)
        return '{"status":"ERROR"}'
    
    try:
        values = [request_dict['email'],
        request_dict['event'],
        request_dict['type']]

        #type can be interested or pending if user applied

        for element in values:
            if element == "":
                print("[ ERROR ] Invalid data", sys.stderr)
                return '{"status":"ERROR"}'

    except KeyError:
        print("[ ERROR ] Invalid data", sys.stderr)
        return '{"status":"ERROR"}'

    try:
        db = get_db()
        query = 'select userId from Users where email=\'' + values[0] +'\''
        query2 = 'select eventId from Events where name=\'' + values[1] + '\''

        for row in db.execute(query):
            userId = row[0]
            break

        for row2 in db.execute(query2):
            eventId = row2[0]
            break
        
        if values[2] == "pending":
            appType = "2"
        else:
            appType = "1"
        applicationValues = [userId, eventId, appType]
        db.execute('insert into Applications (userid, eventid, statusid) values (?,?,?)', applicationValues)
        db.commit()
        return '{"status":"OK"}'

    except:
        print("[ ERROR ] Invalid data", sys.stderr)
        return '{"status":"ERROR"}'

@app.route('/modifyStatusForApplication', methods=['POST'])
def modifyStatusForApplication():
    request_dict = request.get_json()
    if request_dict == None:
        print("[ ERROR ] Invalid data", sys.stderr)
        return '{"status":"ERROR"}'
    
    try:
        values = [request_dict['email'],
        request_dict['event'],
        request_dict['status']]

        if values[2] == "accepted":
            statusId = 3
        else:
            statusId = -1

        for element in values:
            if element == "":
                print("[ ERROR ] Invalid data", sys.stderr)
                return '{"status":"ERROR"}'

    except KeyError:
        print("[ ERROR ] Invalid json", sys.stderr)
        return '{"status":"ERROR"}'

    try:
        db = get_db()
        query = 'select userId from Users where email=\'' + values[0] + '\''
        for row in db.execute(query):
            userId=row[0]
            break

        query4 = 'select eventId from Events where name=\'' + values[1] + '\''
        for row in db.execute(query4):
            eventId = row[0]
            break

        if statusId == 3:
            db.execute('update applications set statusId=? where userid=? and eventid=?', (statusId, userId, eventId))
            db.commit()
            return '{"status":"OK"}'
        else:
            print("hello")
            query3 = 'delete from applications where userId=\'' + userId + '\''
            db.execute(query3)
            db.commit()
            return '{"status":"OK"}' 

    except:
        print("[ ERROR ] Invalid data", sys.stderr)
        return '{"status":"ERROR"}'


@app.route('/getEvents', methods=['GET'])
def getEvents():
    try:
        db = get_db()
     
        query = 'select name, description, date from Events'
        events = []
        for row in db.execute(query):
            evt = {
                "name" : row[0],
                "description" : row[1],
                "date" : row[2]
            }
            events.append(evt)
        res = jsonify(events)
        print(res)
        return res
    except:
        print("[ ERROR ]Error at getting events")
        return '{"status":"ERROR"}'



@app.route('/getEventsForUser', methods=['GET'])
def getInterestedEventsUser():
    pass

@app.route('/getPendingEventsUser', methods=['GET'])
def getPendingEventsUser():
    pass

#for organisation
@app.route('/getUsersForEvent', methods=['POST'])
def getUsersForEvent():
    request_dict = request.get_json()
    if request_dict == None:
        print("[ ERROR ] Invalid json", sys.stderr)
        return '{"status":"ERROR"}'
    
    #TO-DO return category
    try:
        values = request_dict['name']

        #TO-DO description can be null
        if values == "":
            print("[ ERROR ] Invalid data", sys.stderr)
            return '{"status":"ERROR"}'

    except KeyError:
        print("Invalid data", sys.stderr)
        return '{"status":"ERROR"}'

    try:
        db = get_db()

        query = 'select eventid from Events where name=\'' + values + '\''
        for row in db.execute(query):
            eventId = row[0]
            break

        

        userIds = []
        
        #query1 = 'select userId from applications where eventId=\'' + eventId + '\''
        #print(query1)
        

        for row2 in db.execute('select userId from Applications where eventId=%s' %eventId):
            userIds.append(row2[0])
            
        users=[]
        for userId in userIds:
            #query2 = 'select firstname, lastname, email, birthdate, rating, description from Users where userid=3' 
            #query3 = 'select statusId from Applications where userId=?' + userId
            for row4 in db.execute('select statusId from Applications where userId=%s' %userId):
                statusId = row4[0]
                if statusId == 1:
                    continue
                else:
                    if statusId == 2:
                        status = "pending"
                    if statusId == 3:
                        status = "accepted"
                    for row3 in db.execute('select firstname, lastname, email, birthdate, rating, description from Users where userid=%s' %userId):
                    
                        tmp = {
                            "firstName" : row3[0],
                            "lastName" : row3[1],
                            "email" : row3[2],
                            "birthdate" : row3[3],
                            "rating" : row3[4],
                            "description" : row3[5],
                            "status" : status
                        }
                        users.append(tmp)
        result = {
            "users" : users,
            "status" : "OK"
        }
        res = jsonify(result)
        print(res)
        return res
    except:
        print("Invalid data", sys.stderr)
        return '{"status":"ERROR"}'
    
@app.route('/getAcceptedUsersForEvent', methods=['GET'])
def getAcceptedUsersForEvent():
    pass



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
