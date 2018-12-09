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

@app.route('/test', methods=['GET'])
def get_test():
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

@app.route('/citygoer', methods=['GET'])
def get_citygoer():
    cur = connect_to_database()
    # high act, low suburb crime
    query = """
        WITH low_crime AS (
        SELECT cbsaname, crime_city
        FROM City
        WHERE cbsaname IS NOT NULL AND ROWNUM < 100
        ORDER BY crime_city),
        distinct_map AS (
        SELECT cbsa_name, Max(fips) as fips FROM Map GROUP BY cbsa_name)

        Select m.fips, lc.cbsaname
        FROM low_crime lc JOIN distinct_map m ON lc.cbsaname=m.cbsa_name
        WHERE ROWNUM < 6
        ORDER BY lc.crime_city;
    """
    cur.execute(query)
    set_to_return = []
    for result in cur:
        set_to_return.append(result)

    return jsonify(set_to_return)

@app.route('/crimelord', methods=['GET'])
def get_crimelord():
    cur = connect_to_database()
    # high act, low suburb crime
    query = """
        WITH high_crime AS (
        SELECT cbsaname, crime_city
        FROM City
        WHERE cbsaname IS NOT NULL AND ROWNUM < 100
        ORDER BY crime_city DESC),
        distinct_map AS (
        SELECT cbsa_name, Max(fips) as fips
        FROM Map GROUP BY cbsa_name),
        high_poverty AS (
        SELECT fips, poverty_percent
        FROM County
        WHERE poverty_percent > 20 AND unemployment_rate > 7)

        Select m.fips, hc.cbsaname
        FROM high_crime hc JOIN distinct_map m ON hc.cbsaname=m.cbsa_name JOIN high_poverty hp ON m.fips=hp.fips
        WHERE ROWNUM < 6
        ORDER BY hc.crime_city, hp.poverty_percent DESC;
    """
    cur.execute(query)
    set_to_return = []
    for result in cur:
        set_to_return.append(result)
        
    return jsonify(set_to_return)

@app.route('/advanced', methods=['GET'])
def get_advanced():
    # poverty, unemployment - county, crime - city, housing - housing, education - state
    values = {
        "crime": request.args.get("crime"),
        "employment": request.args.get("employment"),
        "poverty": request.args.get("poverty"),
        "housing": request.args.get("housing"),
        "education": request.args.get("education")
    }

    query = get_optimal_query(values)
    print(query)

    cur = connect_to_database()

    cur.execute(query)
    set_to_return = []
    for result in cur:
        set_to_return.append(result)

    formatted_result = []
    for i in range(len(set_to_return)):
        formatted_result.append({
            'rank': i + 1,
            'fips': set_to_return[i][0],
            'cbsaname': set_to_return[i][1],
            'top_attribute': set_to_return[i][2]
        })
    return jsonify(formatted_result)

def get_optimal_query(values):
    sorted_values = []
    for key, value in sorted(values.items(), key=lambda x: x[1]):
        if int(value) > 0:
            sorted_values.append(key)

    sorted_values = list(reversed(sorted_values))

    # poverty, unemployment - county, crime - city, housing - housing, education - state
    table_map = {
        "crime": "crime_metro",
        "employment": "unemployment_rate",
        "poverty": "poverty_percent",
        "housing": "fmr2",
        "education": "act_score"
    }

    # Select and order, select and order, at end order by them all
    index = [101, 76, 51, 25, 6]

    # Iterate through sorted_values, for each value, find table in table_map correspond to number. If act - add DESC
    inner_query = get_inner_function(sorted_values, len(sorted_values), table_map, index);
    sorted_query = "SELECT fips, cbsa_name, {attribute} FROM ({inner_query}) WHERE ROWNUM < 4 ORDER BY {attribute}".format(inner_query=inner_query, attribute=table_map[sorted_values[0]])
    return sorted_query

def get_inner_function(sorted_values, i, table_map, index):
    i = i - 1;
    if i < 0:
        return """
            SELECT *
            FROM Map m JOIN City c ON c.cbsaname=m.cbsa_name
            JOIN County co ON m.fips=co.fips
            JOIN State s ON s.state_abbr=m.state_abbr
            JOIN Housing h ON h.fips=m.fips AND h.year = 2019
            """
    else:
        return """
            SELECT * FROM ({inner}) WHERE ROWNUM < {num_value} ORDER BY {attribute}
            """.format(attribute=table_map[sorted_values[i]], num_value=index[i], inner=get_inner_function(sorted_values, i, table_map, index))

def get_housing_query(direction, value):
    if value == 1:
        return """
            WITH HousingTrend AS (
	            SELECT H2.fips
	            FROM Housing H1 JOIN Housing H2
	            ON H1.fips = H2.fips AND (H1.year + 1) = H2.year
	            WHERE change * H2.fmr2 > change * H1.fmr2
                AND H2.year = 2019
            )
        """.format(change=direction)
    elif value == 2:
        return """
            WITH HousingTrend AS (
            	SELECT H3.fips
            	FROM Housing H1
            	JOIN Housing H2
            	ON H1.fips = H2.fips AND (H1.year + 1) = H2.year
            	JOIN Housing H3
            	ON H2.fips = H3.fips AND (H2.year + 1) = H3.year
            	WHERE {change} * H2.fmr2 >= {change} * H1.fmr2
            	AND {change} * H3.fmr2 >= {change} * H2.fmr2
            	AND H3.year = 2019
            )
        """.format(change=direction)
    elif value == 3:
        return """
            WITH HousingTrend AS (
            	SELECT H4.fips
            	FROM Housing H1
            	JOIN Housing H2
            	ON H1.fips = H2.fips AND (H1.year + 1) = H2.year
            	JOIN Housing H3
            	ON H2.fips = H3.fips AND (H2.year + 1) = H3.year
            	JOIN Housing H4
            	ON H4.fips = H5.fips AND (H4.year + 1) = H5.year
            	WHERE {change} * H2.fmr2 >= {change} * H1.fmr2
            	AND {change} * H3.fmr2 >= {change} * H2.fmr2
            	AND {change} * H4.fmr2 >= {change} * H3.fmr2
            	AND H4.year = 2019
            )
        """.format(change=direction)
    elif value == 4:
        return """
            WITH HousingTrend AS (
            	SELECT H5.fips, H5.fmr2
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
            	AND H5.year = 2019
            )
        """.format(change=direction)

def convert_tuples(list, di):
    for i in range(len(list)):
    # for a, b, c in tup:
        di.setdefault('state_abbr', list[i])
        di.setdefault('state_name', list[i])
        di.setdefault('act_score', list[i])
    return di

if __name__ == "__main__":
    app.run(debug=True)
