from flask import Flask, jsonify, request, url_for
# import os
import cx_Oracle
import json
from flask_cors import CORS, cross_origin

app = Flask(__name__)
CORS(app)

db_user = 'cis550project'
db_password = 'susandavidson'
db_connect = 'cis-550-project.ccgsmtzjingg.us-east-2.rds.amazonaws.com'

def connect_to_database():
    con = cx_Oracle.Connection(user='cis550project', password='susandavidson', dsn='cis-550-project.ccgsmtzjingg.us-east-2.rds.amazonaws.com/orcl')
    return con.cursor()

@app.route('/talk', methods=['GET'])
def get_tasks():
    cur = connect_to_database()
    cur.execute('select * from State')
    set_to_return = []
    for result in cur:
        # obj = json.dumps(result)
        set_to_return.append(result)
        # convert_tuples(obj, dict_to_return)

    return jsonify(set_to_return)
    # return jsonify(obj)
    # return jsonify({'tasks': 'tasks'})

@app.route('/explorer', methods=['GET'])
def get_explorer():
    cur = connect_to_database()
    # low precipitation, medium poverty, medium crime
    cur.execute('')
    set_to_return = []
    for result in cur:
        set_to_return.append(result)

    return jsonify(set_to_return)

def convert_tuples(list, di):
    for i in range(len(list)):
    # for a, b, c in tup:
        di.setdefault('state_abbr', list[i])
        di.setdefault('state_name', list[i])
        di.setdefault('act_score', list[i])
    return di

if __name__ == "__main__":
    app.run(debug=True)
