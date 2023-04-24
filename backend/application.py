from flask import Flask, render_template, Response
import cv2
import numpy as np

""""""

application = Flask(__name__)

""""""

@application.route("/")
def home():
    return render_template("index.html")

""""""

@application.route("/test")
def test():
    return render_template("/test/test.html")

""""""

@application.route("/video")
def video():
    return render_template("/video/video.html")

@application.route("/opencv")
def opencv():
    return Response(gen_frames(),
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

"""

# 밝기 변경 함수
def set_brightness(img, scale):         
    return cv2.add(img, scale)          

# 대비 변경 함수
def set_contrast(img, scale):           
    return np.uint8(np.clip((1 + scale) * img - 128 * scale, 0, 255))   

def set_size(img, scale):
    return cv2.resize(img, dsize=(int(img.shape[1]*scale), int(img.shape[0]*scale)), interpolation=cv2.INTER_AREA)

"""

# Flask 애플리케이션 라우팅 함수
def gen_frames():
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

""""""

if __name__ == '__main__':
    application.run(host='0.0.0.0', port=int("1234"))