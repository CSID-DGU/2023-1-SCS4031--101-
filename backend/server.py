from flask import Flask, render_template, request, Response, jsonify
from flask_cors import CORS
import cv2
import numpy as np

application = Flask(__name__)
CORS(application) #비동기처리

@application.route("/")
def home():
    return render_template("index.html")

@application.route("/test", methods=['POST'])
def test():

    # 이미지 파일 읽어오기
    img = cv2.imread('test.jpg')

    # 이미지 파일을 HSV 색공간으로 변환하기
    hsv = cv2.cvtColor(img, cv2.COLOR_BGR2HSV)

    # 픽셀의 HSV값 읽어오기
    h, s, v = cv2.split(hsv)

    # 조건에 맞는 픽셀의 인덱스 찾기
    indices = (h <= 30) & (v >= 50) & (v <= 100)
    indices = indices.nonzero()

    # 조건에 맞는 픽셀의 색상 변경하기
    s[indices] = request.form['s']

    # 변경된 이미지 파일 반환하기
    hsv = cv2.merge([h, s, v])
    img = cv2.cvtColor(hsv, cv2.COLOR_HSV2BGR)
    cv2.imwrite('test.jpg', img)

    return jsonify({'result': 'success'})

@application.route("/video")
def video():
    s1 = int(request.args.get('s1', 100))
    s2 = int(request.args.get('s2', 100))
    return render_template('video/video.html', s1=s1, s2=s2) # 여기에서 s1,s2이 의미하는 것은?

@application.route("/opencv")
def opencv():
    return Response(hg_gen_frames(),
                    mimetype="multipart/x-mixed-replace; boundary=frame")

# 색감 변경 함수 (수정)
def color_filter(img, color, scale):
    dst = np.array(img, np.uint8)
    if color == 'blue' or color == 0:
        dst[:, :, 0] = cv2.multiply(dst[:, :, 0], scale)
    elif color == 'green' or color == 1:
        dst[:, :, 1] = cv2.multiply(dst[:, :, 1], scale)
    if color == 'red' or color == 2:
        r_channel = dst[:, :, 2]
        g_b_mask = r_channel >= 200  # R값이 150 이상인 픽셀에 대해 G,B값 변경
        dst[:, :, 1] = np.where(g_b_mask, cv2.multiply(dst[:, :, 1], 0.8), dst[:, :, 1])
        dst[:, :, 0] = np.where(g_b_mask, cv2.multiply(dst[:, :, 0], 0.8), dst[:, :, 0])
        dst[:, :, 2] = cv2.multiply(r_channel, scale)
    return dst

# Flask 애플리케이션 라우팅 함수
def hg_gen_frames():
    capture = cv2.VideoCapture(0)
    capture.set(cv2.CAP_PROP_FRAME_WIDTH, 640)
    capture.set(cv2.CAP_PROP_FRAME_HEIGHT, 480)

    while True:
        ret, frame = capture.read()
        if not ret:
            break
        else:
            filered = color_filter(frame, 'red', 1)   
            ret, buffer = cv2.imencode('.jpg', filered)
            frame = buffer.tobytes()
            yield (b'--frame\r\n'
                   b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n')
    
    capture.release()

@application.route("/yhvideo")
def yhvideo():
    return render_template('yhvideo/yhvideo.html')

@application.route("/yhopencv")
def yhopencv():
    return Response(yh_gen_frames(),
                    mimetype="multipart/x-mixed-replace; boundary=frame")

def color_filter2(img, scale):
    hsv = cv2.cvtColor(img, cv2.COLOR_BGR2HSV)
    
    lower_hsv = np.array([130, 0, 0])
    upper_hsv = np.array([180, 255, 255])

    mask = cv2.inRange(hsv, lower_hsv, upper_hsv)
    hsv[mask == 255, 1] = scale

    return cv2.cvtColor(hsv, cv2.COLOR_HSV2BGR)

def yh_gen_frames():
    capture = cv2.VideoCapture(0)
    capture.set(cv2.CAP_PROP_FRAME_WIDTH, 640)
    capture.set(cv2.CAP_PROP_FRAME_HEIGHT, 480)

    while True:
        ret, frame = capture.read()
        if not ret:
            break
        else:
            filtered = color_filter2(frame, 180)   
            ret, buffer = cv2.imencode('.jpg', filtered)
            frame = buffer.tobytes()
            yield (b'--frame\r\n'
                   b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n')
    
    capture.release()


if __name__ == '__main__':
    application.run(debug=True)
