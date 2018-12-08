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
    # low precipitation, low housing cost
    query = """
    WITH rain_check AS (
    SELECT cbsaname FROM City WHERE precipitation IS NOT NULL)
    SELECT h.fips, AVG(fmr2)
    FROM rain_check r JOIN Map m ON r.cbsaname=m.cbsa_name JOIN Housing h ON h.fips=m.fips
    GROUP BY h.fips HAVING AVG(fmr2) < 800
    """
    cur.execute(query)
    set_to_return = []
    for result in cur:
        set_to_return.append(result)

    return jsonify(set_to_return)

@app.route('/family', methods=['GET'])
def get_family():
    cur = connect_to_database()
    # high act, low suburb crime
    query = """
        WITH smart_state AS (
        SELECT state_abbr
        FROM State
        WHERE ROWNUM < 15
        ORDER BY act_score DESC),
        distinct_map AS (
        SELECT cbsa_name, state_abbr, Max(fips) as fips FROM Map GROUP BY cbsa_name, state_abbr)

        Select m.fips
        FROM City c JOIN distinct_map m ON c.cbsaname=m.cbsa_name JOIN smart_state s ON s.state_abbr=m.state_abbr
        WHERE ROWNUM < 6
        ORDER BY c.crime_suburb
    """
    cur.execute(query)
    set_to_return = []
    for result in cur:
        set_to_return.append(result)

    return jsonify(set_to_return)

@app.route('/boujee', methods=['GET'])
def get_boujee():
    cur = connect_to_database()
    # high act, low suburb crime
    query = """
        WITH low_crime AS (
        SELECT cbsaname
        FROM City
        WHERE ROWNUM < 100
        ORDER BY crime_metro ASC),
        low_poverty AS (
        SELECT c.fips, c.poverty_percent FROM County c JOIN Housing h ON c.fips=h.fips WHERE h.year = 2015 AND h.fmr2 > 1000 AND ROWNUM < 100)

        Select m.fips
        FROM low_crime lc JOIN Map m ON lc.cbsaname=m.cbsa_name JOIN low_poverty lp ON lp.fips=m.fips
        WHERE ROWNUM < 6
        ORDER BY lp.poverty_percent
    """
    cur.execute(query)
    set_to_return = []
    for result in cur:
        set_to_return.append(result)

    return jsonify(set_to_return)

@app.route('/advanced', methods=['GET'])
def get_advanced():
    crime = request.args.get("crime")
    employment = request.args.get("employment")
    poverty = request.args.get("poverty")
    housing = request.args.get("housing")
    housing_filter_direction = request.args.get("housing_filter_direction")
    housing_filter_value = request.args.get("housing_filter_value")
    return_by_state = request.args.get("return_by_state")

    cur = connect_to_database()
    query = """
        WITH HousingTrend AS (
        	SELECT H3.fips
        	FROM Housing H1
        	JOIN Housing H2
        	ON H1.fips = H2.fips AND (H1.year + 1) = H2.year
        	JOIN Housing H3
        	ON H2.fips = H3.fips AND (H2.year + 1) = H3.year
        	JOIN Housing H4
        	ON H3.fips = H4.fips AND (H3.year + 1) = H4.year
        	JOIN Housing H5
        	ON H4.fips = H5.fips AND (H4.year + 1) = H5.year
        	WHERE {change} * H2.fmr2 >= {change} * H1.fmr2
        	AND {change} * H3.fmr2 >= {change} * H2.fmr2
        	AND {change} * H4.fmr2 >= {change} * H3.fmr2
        	AND {change} * H5.fmr2 >= {change} * H4.fmr2
        	AND H5.year = ‘2019’
        )
        SELECT fips FROM HousingTrend
    """.format(change=housing_filter_value)

    cur.execute(query)
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
