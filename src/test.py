from flask import Flask, jsonify, request
from gevent.pywsgi import WSGIServer
from flask_cors import CORS
import json
import mysql.connector
app = Flask(__name__)
CORS(app)

# Tạo một danh sách đối tượng (mock data)
todos = [
    {'id': 1, 'title': 'Buy groceries', 'completed': False},
    {'id': 2, 'title': 'Learn Python', 'completed': False}
]
employees=[
        { 'id': 1, 'name': 'Nguyễn Văn A', 'level': 3, 'project_join': 1, 'status': 0 },
        { 'id': 2, 'name': 'Nguyễn Văn B', 'level': 2, 'project_join': 0, 'status': 0 },
        { 'id': 3, 'name': 'Nguyễn Văn C', 'level': 2, 'project_join': 10, 'status': 0 },
        { 'id': 4, 'name': 'Nguyễn Văn D', 'level': 4, 'project_join': 31, 'status': 0 },
        { 'id': 5, 'name': 'Nguyễn Văn E', 'level': 4, 'project_join': 1, 'status': 0 },
        { 'id': 6, 'name': 'Nguyễn Văn F', 'level': 1, 'project_join': 2, 'status': 0 },
        { 'id': 7, 'name': 'Nguyễn Văn G', 'level': 1, 'project_join': 3, 'status': 0 },
        { 'id': 8, 'name': 'Nguyễn Văn H', 'level': 1, 'project_join': 1, 'status': 0 },
        { 'id': 9, 'name': 'Nguyễn Văn I', 'level': 2, 'project_join': 1, 'status': 0 },
        { 'id': 10, 'name': 'Nguyễn Văn J', 'level': 1, 'project_join': 2, 'status': 0 },
        { 'id': 11, 'name': 'Nguyễn Văn A', 'level': 3, 'project_join': 1, 'status': 0 },
        { 'id': 12, 'name': 'Nguyễn Văn B', 'level': 2, 'project_join': 0, 'status': 1 },
        { 'id': 13, 'name': 'Nguyễn Văn C', 'level': 2, 'project_join': 10, 'status': 0 },
        { 'id': 14, 'name': 'Nguyễn Văn D', 'level': 4, 'project_join': 31, 'status': 0 },
        { 'id': 15, 'name': 'Nguyễn Văn E', 'level': 4, 'project_join': 1, 'status': 1 },
        { 'id': 16, 'name': 'Nguyễn Văn F', 'level': 1, 'project_join': 2, 'status': 0 },
        { 'id': 17, 'name': 'Nguyễn Văn G', 'level': 1, 'project_join': 3, 'status': 1 },
        { 'id': 18, 'name': 'Nguyễn Văn H', 'level': 1, 'project_join': 1, 'status': 0 },
        { 'id': 19, 'name': 'Nguyễn Văn I', 'level': 2, 'project_join': 1, 'status': 1 },
        { 'id': 20, 'name': 'Nguyễn Văn J', 'level': 1, 'project_join': 2, 'status': 0 }
    ]
list_project=[
    {
        "id": "1",
        "nameProject": "Gán nhãn",
        "type": {
            "type": "3",
            "listNhan": [
                "nhãn 1",
                "nhãn 2",
                "nhãn 3"
            ],
            "language":{
                "input":"Vietnamses",
                "output":"English"
            }
        },
        "listEmployee": [
            "2",
            "8",
            "12"
        ],
        "time": "12/02/2023",
        "timeEnd": "",
        "dataSequence": [
            [
                "Câu 1",
                "câu 2"
            ],
            [
                "câu 3",
                "câu 4"
            ]
        ],
        "maxEmployees": "30",
        "status": 0
    },
    {
        "id": "2",
        "nameProject": "Gán nhãn",
        "type": {
            "type": "6",
            "listNhan": [
                "nhãn 1",
                "nhãn 2",
                "nhãn 3"
            ],
            "language":{
                "input":"Vietnamses",
                "output":"English"
            }
        },
        "listEmployee": [
            "2",
            "8",
            "12"
        ],
        "time": "",
        "timeEnd": "",
        "dataSequence": [
            [
                "Câu 1",
                "câu 2"
            ],
            [
                "câu 3",
                "câu 4"
            ]
        ],
        "maxEmployees": "30",
        "status": 1
    }
]
project={
        "id": "1",
        "nameProject": "Gán nhãn",
        "type": {
            "type": "3",
            "listNhan": [
                "nhãn 1",
                "nhãn 2",
                "nhãn 3"
            ],
            "language":{
                "input":"Vietnamses",
                "output":"English"
            }
        },
        "listEmployee": [
           { 'id': 1, 'name': 'Nguyễn Văn A', 'level': 3, 'project_join': 1, 'status': 0 },
        { 'id': 2, 'name': 'Nguyễn Văn B', 'level': 2, 'project_join': 0, 'status': 0 },
        { 'id': 3, 'name': 'Nguyễn Văn C', 'level': 2, 'project_join': 10, 'status': 0 }
        ],
        "time": "12/02/2023",
        "timeEnd": "",
        "dataSequence": [
            [
                "Câu 1",
                "câu 2"
            ],
            [
                "câu 3",
                "câu 4"
            ]
        ],
        "maxEmployees": "30",
        "status": 0
    }
# Kết nối cơ sở dữ liệu
mydb = mysql.connector.connect(
    host="localhost",
    user="root",
    password="",
    database="connecting"
)

@app.route("/t", methods=['GET'])
def index():
    # Xử lý và truy vấn dữ liệu từ cơ sở dữ liệu
    mycursor = mydb.cursor()
    mycursor.execute("SELECT * FROM account")
    result = mycursor.fetchall()

    # Trả lại dữ liệu dưới dạng JSON
    return jsonify(result)
# API endpoint để lấy danh sách tất cả các công việc
@app.route('/', methods=['GET'])
def get_todos():
    return jsonify(todos)

# API endpoint để lấy một công việc cụ thể
@app.route('/todos/<int:todo_id>', methods=['GET'])
def get_todo_by_id(todo_id):
    todo = [todo for todo in todos if todo['id'] == todo_id]
    if len(todo) == 0:
        return jsonify({'error': 'Todo not found'})
    return jsonify(todo[0])

# API endpoint để tạo một công việc mới
@app.route('/todos', methods=['POST'])
def create_todo():
    new_todo = {
        'id': todos[-1]['id'] + 1,
        'title': request.json['title'],
        'completed': False
    }
    todos.append(new_todo)
    return jsonify(new_todo), 201, 1

# API endpoint để cập nhật một công việc
@app.route('/todos/<int:todo_id>', methods=['PUT'])
def update_todo(todo_id):
    todo = [todo for todo in todos if todo['id'] == todo_id]
    if len(todo) == 0:
        return jsonify({'error': 'Todo not found'})
    todo[0]['title'] = request.json.get('title', todo[0]['title'])
    todo[0]['completed'] = request.json.get('completed', todo[0]['completed'])
    return jsonify(todo[0])

# API endpoint để xóa một công việc
@app.route('/todos/<int:todo_id>', methods=['DELETE'])
def delete_todo(todo_id):
    todo = [todo for todo in todos if todo['id'] == todo_id]
    if len(todo) == 0:
        return jsonify({'error': 'Todo not found'})
    todos.remove(todo[0])
    return jsonify({'result': True})

@app.route('/danh-sach-project', methods=['GET'])
def getDSProject():
    data = [{'ProjectName': 'Thêm nhãn', "type":2,"data":[['Câu 1','Câu 2'],['Câu 1','Câu 2'],['Câu 1','Câu 2']],"employees":['1','9','12','23'],"limitEmp":'30',"status":0, "time":'',"last_time":""}]
    json_data = json.dumps({'result': 1, 'message':'Thành công','data': data }, ensure_ascii=False).encode('utf-8')

    response = app.response_class(
        response=json_data,
        status=200,
        mimetype='application/json'
    )
    return response
@app.route('/login', methods=['POST'])
def login():
    raw_data = request.get_data()  # Lấy dữ liệu raw từ yêu cầu
    user = json.loads(raw_data)
    # print(user)
    real_un = ""
    real_pw=""
    
    if real_un == user['username'] and real_pw==user['password']:
        json_data = json.dumps({'result': 1, 'message':'Thành công','data': {'username':user['username'],'password':user['password']} }, ensure_ascii=False).encode('utf-8')
        response = app.response_class(
            response=json_data,
            status=200,
            mimetype='application/json'
        )
    else:
        json_data = json.dumps({'result': 0, 'message':'Sai tên tài khoản hoặc mật khẩu','data': {'username':user['username'],'password':user['password']} }, ensure_ascii=False).encode('utf-8')
        response = app.response_class(
            response=json_data,
            status=400,
            mimetype='application/json'
        )
    return response
@app.route('/list-project', methods=['GET'])
def listProject():
    json_data = json.dumps({'result': 1, 'message':'Thành công','data': list_project}, ensure_ascii=False).encode('utf-8')
    response = app.response_class(
    response=json_data,
    status=200,
    mimetype='application/json')
    return response
@app.route('/project/<int:id>', methods=['GET'])
def getProject(id):
    json_data = json.dumps({'result': 1, 'message':'Thành công','data': project}, ensure_ascii=False).encode('utf-8')
    response = app.response_class(
    response=json_data,
    status=200,
    mimetype='application/json')
    return response
@app.route('/list-employees', methods=['GET'])
def listEmployees():
    json_data = json.dumps({'result': 1, 'message':'Thành công','data': employees}, ensure_ascii=False).encode('utf-8')
    response = app.response_class(
    response=json_data,
    status=200,
    mimetype='application/json')
    return response

if __name__ == '__main__':
    http_server = WSGIServer(('127.0.0.1', 5000), app)
    http_server.serve_forever()