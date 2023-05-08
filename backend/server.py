from flask import Flask, request, Response
from flask_cors import CORS
import cv2
import numpy as np

application = Flask(__name__)
CORS(application)

"""

@application.route("/")
def home():
    return render_template("index.html")

@application.route("/video")
def video():
    return render_template('video/video.html')

"""

capture = None

@application.route("/opencv")
def response_video():
    r1 = int(request.args.get('r1', 100))
    r2 = int(request.args.get('r2', 100))
    r3 = int(request.args.get('r3', 100))
    r4 = int(request.args.get('r4', 100))
    c1 = int(request.args.get('c1', 100))
    c2 = int(request.args.get('c2', 100))
    s1 = int(request.args.get('s1', 100))
    s2 = int(request.args.get('s2', 100))
    print(f'r1: {r1}, r2: {r2}, r3: {r3}, r4: {r4}, c1: {c1}, c2: {c2}, s1: {s1}, s2: {s2}')

    return Response(gen_frames(r1, r2, r3, r4, c1, c2, s1, s2),
                    mimetype="multipart/x-mixed-replace; boundary=frame")

def color_filter(img, r1, r2, r3, r4, c1, c2, s1, s2):
    hsv = cv2.cvtColor(img, cv2.COLOR_BGR2HSV)

    # Convert HSV range from (0-180, 0-255, 0-255) to (0-360, 0-100, 0-100)
    hsv = np.array([hsv[..., 0] * 2, hsv[..., 1] / 2.55, hsv[..., 2] / 2.55], dtype=np.float32)
    hsv = np.transpose(hsv, [1, 2, 0])

    lower_red1 = np.array([r1, 0, 0])
    upper_red1 = np.array([r2, 100, 100])
    lower_red2 = np.array([r3, 0, 0])
    upper_red2 = np.array([r4, 100, 100])

    mask_red1 = cv2.inRange(hsv, lower_red1, upper_red1)
    mask_red2 = cv2.inRange(hsv, lower_red2, upper_red2)

    hsv[mask_red1 == 255, 1] = np.clip(hsv[mask_red1 == 255, 1] * s1 / 100, 0, 100)
    hsv[mask_red2 == 255, 1] = np.clip(hsv[mask_red2 == 255, 1] * s1 / 100, 0, 100)

    lower_cyan = np.array([c1, 0, 0])
    upper_cyan = np.array([c2, 100, 100])

    mask_cyan = cv2.inRange(hsv, lower_cyan, upper_cyan)

    hsv[mask_cyan == 255, 1] = np.clip(hsv[mask_cyan == 255, 1] * s2 / 100, 0, 100)

    # Convert HSV range back to (0-180, 0-255, 0-255)
    hsv = np.transpose(hsv, [2, 0, 1])
    hsv = np.array([hsv[0] / 2, hsv[1] * 2.55, hsv[2] * 2.55], dtype=np.uint8)
    hsv = np.transpose(hsv, [1, 2, 0])
    return cv2.cvtColor(hsv, cv2.COLOR_HSV2BGR)

def gen_frames(r1, r2, r3, r4, c1, c2, s1, s2):
    global capture
    capture = cv2.VideoCapture(0)
    capture.set(cv2.CAP_PROP_FRAME_WIDTH, 640)
    capture.set(cv2.CAP_PROP_FRAME_HEIGHT, 480)

    while True:
        ret, frame = capture.read()
        if not ret:
            break
        else:
            filtered = color_filter(frame, r1, r2, r3, r4, c1, c2, s1, s2)
            # print(f'r1: {r1}, r2: {r2}, r3: {r3}, r4: {r4}, c1: {c1}, c2: {c2}, s1: {s1}, s2: {s2}')
            ret, buffer = cv2.imencode('.jpg', filtered)
            frame = buffer.tobytes()
            yield (b'--frame\r\n'
                   b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n')

    capture.release()

@application.route("/stop")
def stop_video():
    global capture
    if capture is not None:
        capture.release()
        capture = None
    return "Camera stopped"

if __name__ == '__main__':
    application.run(debug=True)
