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
    WITH distinct_map AS (
        (SELECT cbsa_name, state_abbr, Max(fips) as fips FROM Map m GROUP BY cbsa_name, state_abbr)
        UNION
        (SELECT cbsa_name, state_abbr, fips FROM Map m WHERE cbsa_name IS NULL)
    )
    SELECT m.fips
    FROM distinct_map m
    JOIN City c ON m.cbsa_name = c.cbsaname
    JOIN Housing h ON m.fips = h.fips
    WHERE c.precipitation IS NOT NULL
    AND h.year = 2019 AND h.fmr2 < 1000 AND ROWNUM < 4
    ORDER BY c.precipitation
    """
    cur.execute(query)
    set_to_return = []
    for result in cur:
        set_to_return.append(result)

    return format_result(set_to_return)

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
        WHERE ROWNUM < 4
        ORDER BY c.crime_suburb
    """
    cur.execute(query)
    set_to_return = []
    for result in cur:
        set_to_return.append(result)

    return format_result(set_to_return)

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
        WHERE ROWNUM < 4
        ORDER BY lp.poverty_percent
    """
    cur.execute(query)
    set_to_return = []
    for result in cur:
        set_to_return.append(result)

    return format_result(set_to_return)

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
        WHERE ROWNUM < 4
        ORDER BY lc.crime_city
    """
    cur.execute(query)
    set_to_return = []
    for result in cur:
        set_to_return.append(result)

    return format_result(set_to_return)

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
        WHERE ROWNUM < 4
        ORDER BY hc.crime_city, hp.poverty_percent DESC
    """
    cur.execute(query)
    set_to_return = []
    for result in cur:
        set_to_return.append(result)

    return format_result(set_to_return)

def format_result(set_to_return):
    formatted_result = []
    i = 0
    for i in range(len(set_to_return)):
        formatted_result.append({
            'rank': i + 1,
            'fips': set_to_return[i][0],
        })
    return jsonify(formatted_result)

@app.route('/advanced', methods=['GET'])
def get_advanced():
    # poverty, unemployment - county, crime - city, housing - housing, education - state
    values = {
        "crime": float(request.args.get("Public Safety")),
        "employment": float(request.args.get("Good Job Prospects")),
        "poverty": float(request.args.get("Affluent Neighbors")),
        "housing": float(request.args.get("Affordable Housing")),
        "education": float(request.args.get("Good Education"))
    }

    print(values)

    housing_filter_direction = request.args.get("housing_filter_direction")
    housing_filter_value = request.args.get("housing_filter_value")
    group_by_state = request.args.get("return_by_state") == 'true'

    housing_only = all(v == 0 for v in values.values())
    query = ""
    if housing_only:
        query = get_housing_query(housing_filter_direction, housing_filter_value)
    else:
        query = get_optimal_query(values, housing_filter_direction, housing_filter_value, group_by_state)

    print(query)

    cur = connect_to_database()

    cur.execute(query)
    set_to_return = []
    for result in cur:
        set_to_return.append(result)

    formatted_result = []
    if housing_only:
        for i in range(len(set_to_return)):
            formatted_result.append({
                'fips': set_to_return[i][0],
            })
    elif group_by_state:
        for i in range(len(set_to_return)):
            formatted_result.append({
                'rank': 1,
                'fips': set_to_return[i][0],
                'cbsaname': set_to_return[i][1],
                'state': set_to_return[i][2],
                'top_attribute': set_to_return[i][3]
            })
    else:
        for i in range(len(set_to_return)):
            formatted_result.append({
                'rank': i + 1,
                'fips': set_to_return[i][0],
                'cbsaname': set_to_return[i][1],
                'state': set_to_return[i][2],
                'top_attribute': set_to_return[i][3]
            })

    return jsonify({'housing_only': housing_only, 'results': formatted_result})


def get_optimal_query(values, direction, housing_value, group_by_state):
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

    asc_map = {
        "crime": "ASC",
        "employment": "ASC",
        "poverty": "ASC",
        "housing": "ASC",
        "education": "DESC"
    }

    # Select and order, select and order, at end order by them all
    index = [101, 76, 51, 25, 6]
    isHousingFilter = int(direction) != 0

    # Iterate through sorted_values, for each value, find table in table_map correspond to number. If act - add DESC
    base_query = get_base_query(sorted_values)
    inner_query = get_inner_function(base_query, sorted_values, len(sorted_values), table_map, asc_map, index, direction, housing_value, group_by_state);
    attribute = table_map[sorted_values[0]]
    sort = asc_map[sorted_values[0]]
    if group_by_state:
        return """
            WITH distinct_map AS (
                (SELECT cbsa_name, state_abbr, Max(fips) as fips FROM Map m GROUP BY cbsa_name, state_abbr)
                UNION
                (SELECT cbsa_name, state_abbr, fips FROM Map m WHERE cbsa_name IS NULL)
            )
            SELECT fips, cbsa_name, state_name, {attribute} FROM (
                SELECT final.*, ROW_NUMBER() OVER (PARTITION BY state_name ORDER BY {attribute} {sort}) AS rFinal
                FROM ({inner_query}) final
            ) WHERE rFinal = 1 AND fips IS NOT NULL
            """.format(inner_query=inner_query, attribute=attribute, sort=sort)
    else:
        return """
            WITH distinct_map AS (
                (SELECT cbsa_name, state_abbr, Max(fips) as fips FROM Map m GROUP BY cbsa_name, state_abbr)
                UNION
                (SELECT cbsa_name, state_abbr, fips FROM Map m WHERE cbsa_name IS NULL)
            )
            SELECT fips, cbsa_name, state_name, {attribute}
            FROM ({inner_query})
            WHERE ROWNUM < 4 AND {attribute} IS NOT NULL
            ORDER BY {attribute} {sort}
            """.format(inner_query=inner_query, attribute=attribute, sort=sort)

def get_base_query(sorted_values):
    query = "SELECT * FROM distinct_map m "
    if 'crime' in sorted_values:
        query = query + """
            LEFT JOIN (SELECT cbsaname, crime_metro FROM City) c ON c.cbsaname=m.cbsa_name
            """
    if 'employment' in sorted_values or 'poverty' in sorted_values:
        query = query + """
            LEFT JOIN (SELECT fips, unemployment_rate, poverty_percent FROM County) co ON m.fips=co.fips
            """
    if "education" in sorted_values:
        query = query + """
            LEFT JOIN (SELECT state_name, state_abbr, act_score FROM State) s ON s.state_abbr=m.state_abbr
            """
    if "housing" in sorted_values:
        query = query + "LEFT JOIN Housing h ON h.fips=m.fips AND h.year = 2019 "
    return query

def get_inner_function(base, sorted_values, i, table_map, asc_map, index, direction, value, group_by_state):
    i = i - 1;
    if i < 0:
        housing_clause = ""
        if int(direction) != 0:
            housing_query = get_housing_query(direction, value)
            housing_clause = "WHERE m.fips IN ({housing_query})".format(housing_query=housing_query)
        return base + housing_clause
    else:
        attribute = table_map[sorted_values[i]]
        sort = asc_map[sorted_values[i]]
        inner_query = get_inner_function(base, sorted_values, i, table_map, asc_map, index, direction, value, group_by_state)
        null_clause = ""
        if group_by_state:
            if i == 0:
                null_clause = "WHERE {attribute} IS NOT NULL".format(attribute=attribute)
            return """
                SELECT * FROM (
                    SELECT a{i}.*, RANK() OVER (PARTITION BY state_name ORDER BY {attribute} {sort}) AS rank{i}
                    FROM ({inner}) a{i} {null_clause}
                ) WHERE rank{i} < {num_value}
                """.format(attribute=attribute, num_value=index[i], i=i, inner=inner_query, sort=sort, null_clause=null_clause)
        else:
            if i == 0:
                null_clause = "AND {attribute} IS NOT NULL".format(attribute=attribute)
            return """
                SELECT * FROM ({inner}) WHERE ROWNUM < {num_value} {null_clause} ORDER BY {attribute} {sort}
                """.format(attribute=attribute, num_value=index[i], inner=inner_query, sort=sort, null_clause=null_clause)

def get_housing_query(direction, value):
    value = int(value)
    if value == 1:
        return """
            SELECT H2.fips
            FROM Housing H1 JOIN Housing H2
            ON H1.fips = H2.fips AND (H1.year + 1) = H2.year
            WHERE {change} * H2.fmr2 > {change} * H1.fmr2
            AND H2.year = 2019
        """.format(change=direction)
    elif value == 2:
        return """
            SELECT H3.fips
            FROM Housing H1
            JOIN Housing H2
            ON H1.fips = H2.fips AND (H1.year + 1) = H2.year
            JOIN Housing H3
            ON H2.fips = H3.fips AND (H2.year + 1) = H3.year
            WHERE {change} * H2.fmr2 >= {change} * H1.fmr2
            AND {change} * H3.fmr2 >= {change} * H2.fmr2
            AND H3.year = 2019
        """.format(change=direction)
    elif value == 3:
        return """
            SELECT H4.fips
            FROM Housing H1
            JOIN Housing H2
            ON H1.fips = H2.fips AND (H1.year + 1) = H2.year
            JOIN Housing H3
            ON H2.fips = H3.fips AND (H2.year + 1) = H3.year
            JOIN Housing H4
            ON H3.fips = H4.fips AND (H3.year + 1) = H4.year
            WHERE {change} * H2.fmr2 >= {change} * H1.fmr2
            AND {change} * H3.fmr2 >= {change} * H2.fmr2
            AND {change} * H4.fmr2 >= {change} * H3.fmr2
            AND H4.year = 2019
        """.format(change=direction)

@app.route('/result', methods=['GET'])
def get_result():
    fips = int(request.args.get("fips"))
    query = """
        SELECT * FROM (
        SELECT m.fips,
        RANK() OVER (ORDER BY c.crime_metro) as crime,
        RANK() OVER (ORDER BY co.unemployment_rate) as employment,
        RANK() OVER (ORDER BY s.act_score DESC) as education,
        RANK() OVER (ORDER BY h.fmr2) as housing,
        RANK() OVER (ORDER BY co.poverty_percent) as poverty
        FROM MAP m LEFT JOIN City c ON c.cbsaname=m.cbsa_name
        LEFT JOIN County co ON m.fips=co.fips
        LEFT JOIN State s ON s.state_abbr=m.state_abbr
        LEFT JOIN Housing h ON h.fips=m.fips AND h.year = 2019
        )
        WHERE fips = {fips}
        """.format(fips=fips)

    print(query)

    cur = connect_to_database()
    cur.execute(query)
    set_to_return = []
    for result in cur:
        set_to_return.append(result)

    return jsonify(
        crime=set_to_return[0][1],
        employment=set_to_return[0][2],
        education=set_to_return[0][3],
        housing=set_to_return[0][4],
        poverty=set_to_return[0][5],
        )

def convert_tuples(list, di):
    for i in range(len(list)):
    # for a, b, c in tup:
        di.setdefault('state_abbr', list[i])
        di.setdefault('state_name', list[i])
        di.setdefault('act_score', list[i])
    return di

if __name__ == "__main__":
    app.run(debug=True)
