import os

from flask import Flask, request, render_template, session
from flask_socketio import SocketIO, send, emit, join_room, leave_room

app = Flask(__name__, template_folder='public')
app.config['SECRET_KEY'] = '7mqNw5nEpgMT24zleTzfwtkz'
app.config['DEBUG'] = 'True'
users = {}
socketio = SocketIO(app)


@app.route('/')
def handle_index():
    all_js = os.listdir(os.path.join(app.static_folder, "js"))
    all_css = os.listdir(os.path.join(app.static_folder, "css"))
    return render_template("index.html", all_js=all_js, all_css=all_css)

@socketio.on('join')
def handle_join(data):
    username = data['username']
    room = data['arg']
    join_room(room)
    emit('joined', room)
    send({'type': 'message', 'username': 'system', 'message': username + ' вошёл в комнату.'}, room=room)

@socketio.on('leave')
def handle_leave(data):
    room = data['arg']
    leave_room(room)

@socketio.on('disconnect')
def handle_disconnect():
    if request.sid in users:
        users.pop(request.sid)

@socketio.on('auth')
def handle_authed(data):
    username = data['username']
    if username in users.values():
        emit('auth', False)
    else:
        users[request.sid] = username
        join_room(data['room'])
        emit('auth', True)

@socketio.on('message')
def handle_message(data):
    message_type = data['type']
    username = data['username']
    message = data['message']
    room = data['room']
    send({'type': message_type, 'username': username, 'message': message}, room=room, broadcast=True)


if __name__ == '__main__':
    socketio.run(app)
