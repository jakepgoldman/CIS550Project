from flask import request, url_for
from flask_api import FlaskAPI, status, exceptions
# import os
import cx_Oracle

app = FlaskAPI(__name__)

db_user = 'cis550project'
db_password = 'susandavidson'
db_connect = 'cis-550-project.ccgsmtzjingg.us-east-2.rds.amazonaws.com'

notes = {
    'one': 'do the shopping',
    'two': 'build the codez',
    'three': 'paint the door',
}

def note_repr(key):
    return {
        'url': request.host_url.rstrip('/') + url_for('notes_detail', key=key),
        'text': notes[key]
    }


@app.route("/", methods=['GET', 'POST'])
def notes_list():
    """
    List or create notes.
    """
    con = cx_Oracle.Connection(user='cis550project', password='susandavidson', dsn='cis-550-project.ccgsmtzjingg.us-east-2.rds.amazonaws.com/orcl')
    cur = con.cursor()
    cur.execute('select * from City')
    for result in cur:
        print(result)

    return notes

# @app.route("/<int:key>/", methods=['GET', 'PUT', 'DELETE'])
# def notes_detail(key):
#     """
#     Retrieve, update or delete note instances.
#     """
#     if request.method == 'PUT':
#         note = str(request.data.get('text', ''))
#         notes[key] = note
#         return note_repr(key)
#
#     elif request.method == 'DELETE':
#         notes.pop(key, None)
#         return '', status.HTTP_204_NO_CONTENT
#
#     # request.method == 'GET'
#     if key not in notes:
#         raise exceptions.NotFound()
#     return note_repr(key)


if __name__ == "__main__":
    app.run(debug=True)
