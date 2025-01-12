from flask import Flask, render_template

app = Flask(__name__)


@app.route('/')
def admin_page():
    # 관리자 페이지를 렌더링
    return render_template('admin.html')


@app.route('/post_report')
def post_report():
    return render_template('post_report.html')


@app.route('/comment_report')
def comment_report():
    return render_template('comment_report.html')


@app.route('/edit_lecture')
def edit_lecture():
    return render_template('edit_lecture.html')


@app.route('/delete_lecture')
def delete_lecture():
    return "강의 시간 삭제 확인 페이지 준비 중..."


@app.route('/edit_room/<room_number>')
def edit_room(room_number):
    return render_template('edit_room_schedule.html', room_number=room_number)


if __name__ == '__main__':
    app.run(debug=True)
