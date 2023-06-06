from flask import Flask, request, Response, render_template
from flask_cors import CORS
import cv2
import numpy as np

application = Flask(__name__)
CORS(application)

capture = None

@application.route("/")
def index():
    return render_template("index.html")

@application.route("/beforeopencv")
def bo_response_video():
    return Response(bo_gen_frames(),
                    mimetype="multipart/x-mixed-replace; boundary=frame")

def bo_gen_frames():
    global capture
    capture = cv2.VideoCapture(0)
    
    capture.set(cv2.CAP_PROP_FRAME_WIDTH, 640)
    capture.set(cv2.CAP_PROP_FRAME_HEIGHT, 480)

    while True:
        ret, frame = capture.read()
        if not ret:
            break
        else:
            ret, buffer = cv2.imencode('.jpg', frame)
            frame = buffer.tobytes()
            yield (b'--frame\r\n'
                   b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n')

    capture.release()

@application.route("/afteropencv_weak")
def aow_response_video():
    r1 = float(request.args.get('r1', 1))
    r2 = float(request.args.get('r2', 11))
    r3 = float(request.args.get('r3', 304))
    r4 = float(request.args.get('r4', 359))
    c1 = float(request.args.get('c1', 181))
    c2 = float(request.args.get('c2', 231))
    s1 = float(request.args.get('s1', 1.0)) * 0.5
    s2 = float(request.args.get('s2', 1.0)) * 0.5
    print(f'r1: {r1}, r2: {r2}, r3: {r3}, r4: {r4}, c1: {c1}, c2: {c2}, s1: {s1}, s2: {s2}')

    return Response(aow_gen_frames(r1, r2, r3, r4, c1, c2, s1, s2),
                    mimetype="multipart/x-mixed-replace; boundary=frame")

def aow_color_filter(img, r1, r2, r3, r4, c1, c2, s1, s2):
    hsv = cv2.cvtColor(img, cv2.COLOR_BGR2HSV)

    lower_red1 = np.array([r1, 0, 0])
    upper_red1 = np.array([r2, 100, 100])
    lower_red2 = np.array([r3, 0, 0])
    upper_red2 = np.array([r4, 100, 100])

    mask_red1 = cv2.inRange(hsv, lower_red1, upper_red1)
    mask_red2 = cv2.inRange(hsv, lower_red2, upper_red2)

    hsv[mask_red1 == 255, 1] = np.clip(hsv[mask_red1 == 255, 1] * s1, 0, 100)
    hsv[mask_red2 == 255, 1] = np.clip(hsv[mask_red2 == 255, 1] * s1, 0, 100)

    lower_cyan = np.array([c1, 0, 0])
    upper_cyan = np.array([c2, 100, 100])

    mask_cyan = cv2.inRange(hsv, lower_cyan, upper_cyan)

    hsv[mask_cyan == 255, 1] = np.clip(hsv[mask_cyan == 255, 1] * s2, 0, 100)

    return cv2.cvtColor(hsv, cv2.COLOR_HSV2BGR)

def aow_gen_frames(r1, r2, r3, r4, c1, c2, s1, s2):
    global capture
    capture = cv2.VideoCapture(0)
    
    capture.set(cv2.CAP_PROP_FRAME_WIDTH, 640)
    capture.set(cv2.CAP_PROP_FRAME_HEIGHT, 480)

    while True:
        ret, frame = capture.read()
        if not ret:
            break
        else:
            filtered = aow_color_filter(frame, r1, r2, r3, r4, c1, c2, s1, s2)
            ret, buffer = cv2.imencode('.jpg', filtered)
            frame = buffer.tobytes()
            yield (b'--frame\r\n'
                   b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n')

    capture.release()

@application.route("/afteropencv_user")
def aou_response_video():
    r1 = float(request.args.get('r1', 1))
    r2 = float(request.args.get('r2', 11))
    r3 = float(request.args.get('r3', 304))
    r4 = float(request.args.get('r4', 359))
    c1 = float(request.args.get('c1', 181))
    c2 = float(request.args.get('c2', 231))
    s1 = float(request.args.get('s1', 1.0))
    s2 = float(request.args.get('s2', 1.0))
    print(f'r1: {r1}, r2: {r2}, r3: {r3}, r4: {r4}, c1: {c1}, c2: {c2}, s1: {s1}, s2: {s2}')

    return Response(aou_gen_frames(r1, r2, r3, r4, c1, c2, s1, s2),
                    mimetype="multipart/x-mixed-replace; boundary=frame")

def aou_color_filter(img, r1, r2, r3, r4, c1, c2, s1, s2):
    hsv = cv2.cvtColor(img, cv2.COLOR_BGR2HSV)

    lower_red1 = np.array([r1, 0, 0])
    upper_red1 = np.array([r2, 100, 100])
    lower_red2 = np.array([r3, 0, 0])
    upper_red2 = np.array([r4, 100, 100])

    mask_red1 = cv2.inRange(hsv, lower_red1, upper_red1)
    mask_red2 = cv2.inRange(hsv, lower_red2, upper_red2)

    hsv[mask_red1 == 255, 1] = np.clip(hsv[mask_red1 == 255, 1] * s1, 0, 100)
    hsv[mask_red2 == 255, 1] = np.clip(hsv[mask_red2 == 255, 1] * s1, 0, 100)

    lower_cyan = np.array([c1, 0, 0])
    upper_cyan = np.array([c2, 100, 100])

    mask_cyan = cv2.inRange(hsv, lower_cyan, upper_cyan)

    hsv[mask_cyan == 255, 1] = np.clip(hsv[mask_cyan == 255, 1] * s2, 0, 100)

    return cv2.cvtColor(hsv, cv2.COLOR_HSV2BGR)

def aou_gen_frames(r1, r2, r3, r4, c1, c2, s1, s2):
    global capture
    capture = cv2.VideoCapture(0)
    
    capture.set(cv2.CAP_PROP_FRAME_WIDTH, 640)
    capture.set(cv2.CAP_PROP_FRAME_HEIGHT, 480)

    while True:
        ret, frame = capture.read()
        if not ret:
            break
        else:
            filtered = aou_color_filter(frame, r1, r2, r3, r4, c1, c2, s1, s2)
            ret, buffer = cv2.imencode('.jpg', filtered)
            frame = buffer.tobytes()
            yield (b'--frame\r\n'
                   b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n')

    capture.release()

if __name__ == '__main__':
    application.run()