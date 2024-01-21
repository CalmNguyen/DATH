from flask import Flask, jsonify, request
from gevent.pywsgi import WSGIServer
from flask_cors import CORS
import json
import mysql.connector
app = Flask(__name__)
CORS(app)
#api gọi: login, projects, projectn/id, edit-project/id, post projects/id
#các api trên là lấy dữ liệu từ sql
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
    database="udpt"
)
# Tạo đối tượng cursor để thực hiện truy vấn SQL
cursor = mydb.cursor(dictionary=True)
#api thống kê
@app.route('/api/thong-ke', methods=['GET'])
def statistics():
    try:
        # Tính tổng số dòng trong bảng data_list
        query = "SELECT COUNT(*) FROM data_list"
        cursor.execute(query)
        data_list_count = cursor.fetchone()['COUNT(*)']
        # Tính tổng số dòng trong bảng employee
        query = "SELECT COUNT(*) FROM employee"
        cursor.execute(query)
        employee_count = cursor.fetchone()['COUNT(*)']

        # Tính tổng số dòng trong bảng project
        query = "SELECT COUNT(*) FROM project"
        cursor.execute(query)
        project_count = cursor.fetchone()['COUNT(*)']

        # Tính tổng số người dùng level 3 trong bảng employee
        query = "SELECT COUNT(*) FROM employee WHERE level = 'Level 3'"
        cursor.execute(query)
        level_3_count = cursor.fetchone()['COUNT(*)']
        # Tính tổng số project đã hoàn thành
        query = "SELECT COUNT(*) FROM project where status=1"
        cursor.execute(query)
        project_finished = cursor.fetchone()['COUNT(*)']
        response = {
            'result': 1,
            'message': 'Statistics retrieved successfully',
            'dataListCount': data_list_count,
            'employeeCount': employee_count,
            'projectCount': project_count,
            'projectFinished': project_finished,
            'level3Count': level_3_count
        }
        
        return jsonify(response)

    except Exception as e:
        # Xảy ra lỗi trong quá trình thực hiện truy vấn
        response = {
            'result': 0,
            'message': 'Failed to retrieve statistics'
        }
        return jsonify(response), 500

#import data
@app.route('/api/add-data-list', methods=['POST'])
def add_data_list():
    data_list_data = request.json
    try:
        # Lưu dữ liệu vào bảng data
        query = "INSERT INTO data (name) VALUES (%s)"
        cursor.execute(query, (data_list_data['name'],))

        # Lấy id của dữ liệu vừa tạo
        data_id = cursor.lastrowid

        # Lưu dữ liệu từ dataSequence vào bảng data_list
        data_sequence = data_list_data['dataSequence']

        for sequence in data_sequence:
            if len(sequence) >= 2:
                col1 = sequence[0]
                col2 = sequence[1]
                col3 = sequence[2] if len(sequence) >= 3 else None

                # Lưu dữ liệu vào bảng data_list
                query = "INSERT INTO data_list (col1, col2, col3, data_id) VALUES (%s, %s, %s, %s)"
                cursor.execute(query, (col1, col2, col3, data_id))

        # Lưu thay đổi vào cơ sở dữ liệu
        mydb.commit()

        response = {'result': 1, 'message': 'Data added to data_list successfully'}
    except Exception as e:
        # Xảy ra lỗi, không thể thêm dữ liệu
        response = {'result': 0, 'message': 'Failed to add data to data_list'}

    return jsonify(response)

#lấy tất cả các thống kê theo nhãn
#thống kê theo nhãn
@app.route('/api/statistics/<int:project_id>', methods=['GET'])
def get_statistics(project_id):
    query = """
    SELECT de.col1, de.nhan
    FROM data_employee de
    JOIN employee_project ep ON de.employee_project_id = ep.id
    JOIN project p ON p.id = ep.projectID
    WHERE p.type='Type 1' AND p.id=%s
    """

    cursor.execute(query, (project_id,))
    results = cursor.fetchall()

    # Thực hiện thống kê
    statistics = {}
    list_nhan = []

    for row in results:
        col1 = row['col1']
        nhan = row['nhan']

        if nhan not in statistics:
            statistics[nhan] = 1
            list_nhan.append(nhan)
        else:
            statistics[nhan] += 1

    # Chỉnh lại định dạng của kết quả
    formatted_results = []
    for row in results:
        formatted_row = {'col1': row['col1'], 'nhan': row['nhan']}
        formatted_results.append(formatted_row)

    # Tạo đối tượng JSON response
    response = {
        'result': 1,
        'message': 'Statistics retrieved successfully',
        'results': formatted_results,
        'statistics': statistics,
        'list_nhan': list_nhan
    }

    return jsonify(response)

#đăng ký

@app.route('/api/register', methods=['POST'])
def register():
    # Lấy dữ liệu từ request
    data = request.json
    email = data['email']
    password = data['password']
    admin_type = data['type']
    name = data['name']
    fullname = data['fullname']

    try:
        # Tạo tài khoản trong bảng admin
        query = "INSERT INTO admin (email, password, type,fullname) VALUES (%s, %s, %s,%s)"
        values = (email, password, admin_type,fullname)
        cursor.execute(query, values)
        admin_id = cursor.lastrowid

        # Thêm tài khoản tương ứng vào bảng employee
        query = "INSERT INTO employee (id, name, level, status) VALUES (%s, %s, %s, %s)"
        values = (admin_id, name, 'Level 1', 'Active')
        cursor.execute(query, values)

        # Lưu thay đổi vào cơ sở dữ liệu
        mydb.commit()

        return jsonify({'result': 1, 'message': 'Tạo tài khoản thành công'})
    except Exception as e:
        mydb.rollback()
        return jsonify({'result': 0, 'message': 'Lỗi: ' + str(e)}), 500
#cập nhật nhân viên
@app.route('/api/employees/<int:employee_id>', methods=['POST'])
def update_employee(employee_id):
    # Lấy dữ liệu từ request
    data = request.get_json()

    # Kiểm tra xem nhân viên có tồn tại trong CSDL không
    query = "SELECT * FROM employee WHERE id = %s"
    cursor.execute(query, (employee_id,))
    employee = cursor.fetchone()

    if employee:
        # Cập nhật thông tin của nhân viên
        query = "UPDATE employee SET name = %s, level = %s, status = %s WHERE id = %s"
        cursor.execute(query, (data['name'], data['level'], data['status'], employee_id))
        mydb.commit()

        # Trả về JSON response cho biết cập nhật thành công
        json_data = jsonify({'result': 1, 'message': 'Cập nhật nhân viên thành công'})
        return json_data
    else:
        json_data = jsonify({'result': 0, 'message': 'Không tìm thấy nhân viên'})
        return json_data, 404
#lấy 1 nhân viên
@app.route('/api/employees/<int:employee_id>', methods=['GET'])
def get_employee(employee_id):
    # Truy vấn nhân viên dựa trên ID
    query = "SELECT * FROM employee WHERE id = %s"
    cursor.execute(query, (employee_id,))
    employee = cursor.fetchone()
    print(employee)
    if employee:
        # Trả về JSON response chứa thông tin của nhân viên
        employee_data = employee
        # {
        #     'id': employee['id'],
        #     'name': employee[1],
        #     'level': employee[2],
        #     'status': employee[3]
        # }

        json_data = jsonify({'result': 1, 'message': 'Thành công', 'data': employee_data})
        return json_data
    else:
        json_data = jsonify({'result': 0, 'message': 'Không tìm thấy nhân viên'})
        return json_data, 404

@app.route('/projectn/<int:id>', methods=['GET'])
def getProject(id):
    # Truy vấn dự án theo ID
    query = "SELECT * FROM project WHERE id = %s"
    cursor.execute(query, (id,))
    project = cursor.fetchone()

    if project:
        # Xử lý dữ liệu và trả về JSON response
        project_data = {
            "id": project['id'],
            "nameProject": project['nameProject'],
            "type": {
                "type": project['type'],
                "listNhan": project['listNhan'].split(', '),
                "language": {
                    "input": project['input'],
                    "output": project['output']
                }
            },
            "listEmployee": getListEmployee(id),  # Hàm truy vấn danh sách nhân viên từ bảng employee_project
            "time": str(project['time']),
            "timeEnd": str(project['timeEnd']),
            "dataSequence": getDataSequence(id),  # Hàm truy vấn dữ liệu chuỗi từ bảng data_list
            "maxEmployees": project['maxEmployees'],
            "status": project['status']
        }

        json_data = jsonify({'result': 1, 'message': 'Thành công', 'data': project_data})
        return json_data
    else:
        json_data = jsonify({'result': 0, 'message': 'Không tìm thấy dự án'})
        return json_data, 404

def getListEmployee(project_id):
    # Truy vấn danh sách nhân viên từ bảng employee_project
    query = "SELECT * FROM employee_project JOIN employee ON employee_project.employeeID = employee.id WHERE employee_project.projectID = %s"
    cursor.execute(query, (project_id,))
    employees = cursor.fetchall()

    list_employee = []
    for employee in employees:
        list_employee.append({
            'id': employee['id'],
            'name': employee['name'],
            'level': employee['level'],
            # 'project_join': employee['project_join'],
            'status': employee['status']
        })

    return list_employee

def getDataSequence(project_id):
    # Truy vấn dữ liệu chuỗi từ bảng data_list
    query = "SELECT col1, col2 FROM data_list WHERE data_id = %s"
    cursor.execute(query, (project_id,))
    data_rows = cursor.fetchall()

    data_sequence = []
    for row in data_rows:
        data_sequence.append([row['col1'], row['col2']])

    return data_sequence

@app.route('/api/create-project', methods=['POST'])
def create_project():
    # Lấy dữ liệu từ request
    project_data = request.json

    # Lưu dữ liệu từ project vào bảng project
    query = "INSERT INTO project (adminID, nameProject, type, listNhan, time, timeEnd, maxEmployees, status, input, output, dataID) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)"
    values = (
        project_data['adminID'],
        project_data['nameProject'],
        project_data['type']['type'],
        ','.join(project_data['type']['listNhan']),
        project_data['time'],
        project_data['timeEnd'],
        project_data['maxEmployees'],
        project_data['status'],
        project_data['type']['language']['input'],
        project_data['type']['language']['output'],
        None  # Id dữ liệu sẽ được cập nhật sau khi thêm dòng vào bảng data
    )
    cursor.execute(query, values)

    # Lấy id của dự án vừa tạo
    project_id = cursor.lastrowid

    # Thêm dữ liệu vào bảng data
    query = "INSERT INTO data (name) VALUES (%s)"
    cursor.execute(query, ('New Data',))

    # Lấy id của dữ liệu mới
    data_id = cursor.lastrowid

    # Cập nhật id dữ liệu trong bảng project
    query = "UPDATE project SET dataID = %s WHERE id = %s"
    cursor.execute(query, (data_id, project_id))

    # Lưu dữ liệu từ dataSequence vào bảng data_list
    data_sequence = project_data['dataSequence']

    for sequence in data_sequence:
        if len(sequence) >= 2:
            col1 = sequence[0]
            col2 = sequence[1]
            col3 = sequence[2] if len(sequence) >= 3 else None

            # Lưu dữ liệu vào bảng data_list
            query = "INSERT INTO data_list (col1, col2, col3, data_id) VALUES (%s, %s, %s, %s)"
            cursor.execute(query, (col1, col2, col3, data_id))

    # Lưu danh sách employee vào bảng employee_project
    employee_list = project_data['listEmployee']

    for employee in employee_list:
        employee_id = employee['id']

        # Lưu dữ liệu vào bảng employee_project
        query = "INSERT INTO employee_project (projectID, employeeID) VALUES (%s, %s)"
        cursor.execute(query, (project_id, employee_id))

    # Lưu thay đổi vào cơ sở dữ liệu
    mydb.commit()

    return jsonify({'message': 'Project created successfully'})

@app.route('/api/edit-project/<int:project_id>', methods=['POST'])
def edit_project(project_id):
    project_data = request.json
    # Cập nhật dữ liệu của dự án trong bảng project
    query = "UPDATE project SET adminID = %s, nameProject = %s, type = %s, listNhan = %s, time = %s, timeEnd = %s, maxEmployees = %s, status = %s, input = %s, output = %s WHERE id = %s"
    values = (
        project_data['adminID'],
        project_data['nameProject'],
        project_data['type']['type'],
        ','.join(project_data['type']['listNhan']),
        project_data['time'],
        project_data['timeEnd'],
        project_data['maxEmployees'],
        project_data['status'],
        project_data['type']['language']['input'],
        project_data['type']['language']['output'],
        project_id
    )
    cursor.execute(query, values)

    # Xóa các dữ liệu cũ trong bảng data_list liên quan đến dự án
    query = "DELETE FROM data_list WHERE data_id IN (SELECT dataID FROM project WHERE id = %s)"
    cursor.execute(query, (project_id,))

    # Lưu dữ liệu từ dataSequence vào bảng data_list
    data_sequence = project_data['dataSequence']

    for sequence in data_sequence:
        if len(sequence) >= 2:
            col1 = sequence[0]
            col2 = sequence[1]
            col3 = sequence[2] if len(sequence) >= 3 else None

            # Lưu dữ liệu vào bảng data_list
            query = "INSERT INTO data_list (col1, col2, col3, data_id) VALUES (%s, %s, %s, (SELECT dataID FROM project WHERE id = %s))"
            cursor.execute(query, (col1, col2, col3, project_id))

    # Xóa các dữ liệu cũ trong bảng employee_project liên quan đến dự án
    query = "DELETE FROM employee_project WHERE projectID = %s"
    cursor.execute(query, (project_id,))

    # Lưu danh sách employee vào bảng employee_project
    employee_list = project_data['listEmployee']

    for employee in employee_list:
        employee_id = employee['id']
        # Lưu dữ liệu vào bảng employee_project
        query = "INSERT INTO employee_project (projectID, employeeID) VALUES (%s, %s)"
        cursor.execute(query, (project_id, employee_id))

    # Lưu thay đổi vào cơ sở dữ liệu
    mydb.commit()
    # Trả về JSON response với thuộc tính "result"
    return jsonify({'result': 1, 'message': 'Project updated successfully'})

@app.route('/login', methods=['POST'])
def check_login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')
    type = 'admin'
    query = "SELECT * FROM admin WHERE email = %s AND password = %s and type = %s"
    values = (email, password, type)
    cursor.execute(query, values)
    admin = cursor.fetchone()

    if admin:
        result = {"result": 1, "message": "Đăng nhập thành công"}
    else:
        result = {"result": 0, "message": "Sai thông tin hoặc vai trò không phải admin"}

    return jsonify(result)

@app.route('/employees', methods=['GET'])
def get_employees():
    query = "SELECT * FROM employee"
    cursor.execute(query)
    employees = cursor.fetchall()

    employee_list = []
    for employee in employees:
        employee_object = {
            'id': employee['id'],
            'name': employee['name'],
            'level': employee['level'],
            'status': employee['status']
        }
        employee_list.append(employee_object)

    if employee_list:
        result = {"result": 1, "message": "Lấy danh sách nhân viên thành công", "data": employee_list}
    else:
        result = {"result": 0, "message": "Không có nhân viên", "data": []}

    return jsonify(result)

@app.route('/projects', methods=['GET'])
def getProjects():
    # Truy vấn danh sách dự án
    query = "SELECT * FROM project"
    cursor.execute(query)
    projects = cursor.fetchall()

    project_list = []
    for project in projects:
        project_data = {
            "id": project['id'],
            "nameProject": project['nameProject'],
            "type": {
                "type": project['type'],
                "listNhan": project['listNhan'].split(', '),
                "language": {
                    "input": project['input'],
                    "output": project['output']
                }
            },
            "listEmployee": getListEmployee(project['id']),  # Hàm truy vấn danh sách nhân viên từ bảng employee_project
            "time": str(project['time']),
            "timeEnd": str(project['timeEnd']),
            "dataSequence": getDataSequence(project['id']),  # Hàm truy vấn dữ liệu chuỗi từ bảng data_list
            "maxEmployees": project['maxEmployees'],
            "status": project['status']
        }
        project_list.append(project_data)

    json_data = jsonify({'result': 1, 'message': 'Thành công', 'data': project_list})
    return json_data


@app.route('/update-employee/<int:id>', methods=['POST'])
def updateEmployee(id):
    # Kiểm tra xem người dùng có tồn tại không
    query = "SELECT * FROM employee WHERE id = %s"
    cursor.execute(query, (id,))
    employee = cursor.fetchone()

    if employee:
        # Lấy dữ liệu mới từ request body
        updated_data = request.get_json()

        # Cập nhật thông tin người dùng
        update_query = "UPDATE employee SET name = %s, level = %s, project_join = %s, status = %s WHERE id = %s"
        cursor.execute(update_query, (
            updated_data.get('name', employee['name']),
            updated_data.get('level', employee['level']),
            updated_data.get('project_join', employee['project_join']),
            updated_data.get('status', employee['status']),
            id
        ))
        mydb.commit()

        json_data = jsonify({'result': 1, 'message': 'Cập nhật thông tin người dùng thành công'})
        return json_data
    else:
        json_data = jsonify({'result': 0, 'message': 'Không tìm thấy người dùng'})
        return json_data, 404



@app.route("/t", methods=['GET'])
def index():
    # Xử lý và truy vấn dữ liệu từ cơ sở dữ liệu
    mymydb = mydb.mydb()
    mymydb.execute("SELECT * FROM account")
    result = mymydb.fetchall()

    # Trả lại dữ liệu dưới dạng JSON
    return jsonify(result)
# API endpoint để lấy danh sách tất cả các công việc
@app.route('/', methods=['GET'])
def get_todos():
    return jsonify(todos)

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