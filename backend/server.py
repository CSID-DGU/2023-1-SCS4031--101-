from flask import Flask, request, Response
from moviepy.editor import VideoFileClip
from flask_cors import CORS
import cv2
import numpy as np
import os

application = Flask(__name__)

CORS(application)

# Initialize and set the webcam as a global variable
capture = cv2.VideoCapture(0)
capture.set(cv2.CAP_PROP_FRAME_WIDTH, 640)
capture.set(cv2.CAP_PROP_FRAME_HEIGHT, 480)

@application.route("/beforeopencv")
def bo_response_video():
    return Response(bo_gen_frames(),
                    mimetype="multipart/x-mixed-replace; boundary=frame")
def bo_gen_frames():
    global capture

    while True:
        ret, frame = capture.read()
        if not ret:
            break
        else:
            ret, buffer = cv2.imencode('.jpg', frame)
            frame = buffer.tobytes()
            yield (b'--frame\r\n'
                   b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n')

@application.route("/afteropencv_weak")
def aow_response_video():
    r1 = float(request.args.get('r1', 8)) * 0.5
    r2 = float(request.args.get('r2', 48)) * 0.5
    p1 = float(request.args.get('p1', 298)) * 0.5
    p2 = float(request.args.get('p2', 358)) * 0.5
    c1 = float(request.args.get('c1', 98)) * 0.5
    c2 = float(request.args.get('c2', 238)) * 0.5
    s1 = float(request.args.get('s1', 1.0)) * 0.7
    s2 = float(request.args.get('s2', 1.0)) * 0.7
    print(f'AOW: {r1}~{r2}, {p1}~{p2}, {c1}~{c2}, {s1}, {s2}')

    return Response(aow_gen_frames(r1, r2, p1, p2, c1, c2, s1, s2),
                    mimetype="multipart/x-mixed-replace; boundary=frame")
def aow_color_filter(img, r1, r2, p1, p2, c1, c2, s1, s2):
    hsv = cv2.cvtColor(img, cv2.COLOR_BGR2HSV)

    lower_red = np.array([r1, 0, 0])
    upper_red = np.array([r2, 255, 255])
    mask_red = cv2.inRange(hsv, lower_red, upper_red)
    hsv[mask_red == 255, 1] = np.clip(hsv[mask_red == 255, 1] * s1, 0, 255)

    lower_pink = np.array([p1, 0, 0])
    upper_pink = np.array([p2, 255, 255])
    mask_pink = cv2.inRange(hsv, lower_pink, upper_pink)
    hsv[mask_pink == 255, 1] = np.clip(hsv[mask_pink == 255, 1] * s1, 0, 255)

    lower_cyan = np.array([c1, 0, 0])
    upper_cyan = np.array([c2, 255, 255])
    mask_cyan = cv2.inRange(hsv, lower_cyan, upper_cyan)
    hsv[mask_cyan == 255, 1] = np.clip(hsv[mask_cyan == 255, 1] * s2, 0, 255)

    return cv2.cvtColor(hsv, cv2.COLOR_HSV2BGR)
def aow_gen_frames(r1, r2, p1, p2, c1, c2, s1, s2):
    global capture

    while True:
        ret, frame = capture.read()
        if not ret:
            break
        else:
            filtered = aow_color_filter(frame, r1, r2, p1, p2, c1, c2, s1, s2)
            ret, buffer = cv2.imencode('.jpg', filtered)
            frame = buffer.tobytes()
            yield (b'--frame\r\n'
                   b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n')

@application.route("/afteropencv_user")
def aou_response_video():
    r1 = float(request.args.get('r1', 8)) * 0.5
    r2 = float(request.args.get('r2', 48)) * 0.5
    p1 = float(request.args.get('p1', 298)) * 0.5
    p2 = float(request.args.get('p2', 358)) * 0.5
    c1 = float(request.args.get('c1', 98)) * 0.5
    c2 = float(request.args.get('c2', 238)) * 0.5
    s1 = float(request.args.get('s1', 1.0))
    s2 = float(request.args.get('s2', 1.0))
    print(f'AOU: {r1}~{r2}, {p1}~{p2}, {c1}~{c2}, {s1}, {s2}')

    return Response(aou_gen_frames(r1, r2, p1, p2, c1, c2, s1, s2),
                    mimetype="multipart/x-mixed-replace; boundary=frame")
def aou_color_filter(img, r1, r2, p1, p2, c1, c2, s1, s2):
    hsv = cv2.cvtColor(img, cv2.COLOR_BGR2HSV)

    lower_red = np.array([r1, 0, 0])
    upper_red = np.array([r2, 255, 255])
    mask_red = cv2.inRange(hsv, lower_red, upper_red)
    hsv[mask_red == 255, 1] = np.clip(hsv[mask_red == 255, 1] * s1, 0, 255)

    lower_pink = np.array([p1, 0, 0])
    upper_pink = np.array([p2, 255, 255])
    mask_pink = cv2.inRange(hsv, lower_pink, upper_pink)
    hsv[mask_pink == 255, 1] = np.clip(hsv[mask_pink == 255, 1] * s1, 0, 255)

    lower_cyan = np.array([c1, 0, 0])
    upper_cyan = np.array([c2, 255, 255])
    mask_cyan = cv2.inRange(hsv, lower_cyan, upper_cyan)
    hsv[mask_cyan == 255, 1] = np.clip(hsv[mask_cyan == 255, 1] * s2, 0, 255)

    return cv2.cvtColor(hsv, cv2.COLOR_HSV2BGR)
def aou_gen_frames(r1, r2, p1, p2, c1, c2, s1, s2):
    global capture

    while True:
        ret, frame = capture.read()
        if not ret:
            break
        else:
            filtered = aou_color_filter(frame, r1, r2, p1, p2, c1, c2, s1, s2)
            ret, buffer = cv2.imencode('.jpg', filtered)
            frame = buffer.tobytes()
            yield (b'--frame\r\n'
                   b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n')

@application.route("/afteropencv_strong")
def aos_response_video():
    r1 = float(request.args.get('r1', 8)) * 0.5
    r2 = float(request.args.get('r2', 48)) * 0.5
    p1 = float(request.args.get('p1', 298)) * 0.5
    p2 = float(request.args.get('p2', 358)) * 0.5
    c1 = float(request.args.get('c1', 98)) * 0.5
    c2 = float(request.args.get('c2', 238)) * 0.5
    s1 = float(request.args.get('s1', 1.0)) * 1.3
    s2 = float(request.args.get('s2', 1.0)) * 1.3
    print(f'AOS: {r1}~{r2}, {p1}~{p2}, {c1}~{c2}, {s1}, {s2}')

    return Response(aos_gen_frames(r1, r2, p1, p2, c1, c2, s1, s2),
                    mimetype="multipart/x-mixed-replace; boundary=frame")
def aos_color_filter(img, r1, r2, p1, p2, c1, c2, s1, s2):
    hsv = cv2.cvtColor(img, cv2.COLOR_BGR2HSV)

    lower_red = np.array([r1, 0, 0])
    upper_red = np.array([r2, 255, 255])
    mask_red = cv2.inRange(hsv, lower_red, upper_red)
    hsv[mask_red == 255, 1] = np.clip(hsv[mask_red == 255, 1] * s1, 0, 255)

    lower_pink = np.array([p1, 0, 0])
    upper_pink = np.array([p2, 255, 255])
    mask_pink = cv2.inRange(hsv, lower_pink, upper_pink)
    hsv[mask_pink == 255, 1] = np.clip(hsv[mask_pink == 255, 1] * s1, 0, 255)

    lower_cyan = np.array([c1, 0, 0])
    upper_cyan = np.array([c2, 255, 255])
    mask_cyan = cv2.inRange(hsv, lower_cyan, upper_cyan)
    hsv[mask_cyan == 255, 1] = np.clip(hsv[mask_cyan == 255, 1] * s2, 0, 255)

    return cv2.cvtColor(hsv, cv2.COLOR_HSV2BGR)
def aos_gen_frames(r1, r2, p1, p2, c1, c2, s1, s2):
    global capture

    while True:
        ret, frame = capture.read()
        if not ret:
            break
        else:
            filtered = aos_color_filter(frame, r1, r2, p1, p2, c1, c2, s1, s2)
            ret, buffer = cv2.imencode('.jpg', filtered)
            frame = buffer.tobytes()
            yield (b'--frame\r\n'
                   b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n')

# @application.route("/stop")
# def stop_video():
#     global capture
#     if capture is not None:
#         capture.release()
#         capture = None
#     return "Camera stopped"

@application.route("/upload_video", methods=["POST"])
def upload_video():
    if "file" not in request.files:
        return "No file part", 400

    file = request.files["file"]

    if file.filename == '':
        return "No selected file", 400

    if file:
        filename = os.path.join("videofiles/", file.filename)
        file.save(filename)
        return "Upload successful!", 200
    
@application.route("/convert_video", methods=["POST"])
def convert_video():
    if not request.json or 'filename' not in request.json:
        return "No filename provided", 400

    filename = request.json['filename']
    input_file_path = os.path.join("videofiles/", filename)
    output_file_path = os.path.join("videofiles/", "converted_" + filename)

    color_settings = request.json.get('colorSettings', {})

    params = {
        'r1': color_settings.get('r1', 8),
        'r2': color_settings.get('r2', 48),
        'p1': color_settings.get('p1', 298),
        'p2': color_settings.get('p2', 358),
        'c1': color_settings.get('c1', 98),
        'c2': color_settings.get('c2', 238),
        's1': color_settings.get('s1', 1.0),
        's2': color_settings.get('s2', 1.0)
    }

    video = VideoFileClip(input_file_path)
    new_video = video.fl_image(lambda img: adjust_saturation(img, params))
    new_video.write_videofile(output_file_path)
    
    return "Conversion successful!", 200
def adjust_saturation(img, params):
    r1 = float(params['r1']) * 0.5
    r2 = float(params['r2']) * 0.5
    p1 = float(params['p1']) * 0.5
    p2 = float(params['p2']) * 0.5
    c1 = float(params['c1']) * 0.5
    c2 = float(params['c2']) * 0.5
    s1 = float(params['s1'])
    s2 = float(params['s2'])
    print(f'CONVERTVIDEO: {r1}~{r2}, {p1}~{p2}, {c1}~{c2}, {s1}, {s2}')

    hsv = cv2.cvtColor(img, cv2.COLOR_BGR2HSV)

    lower_red = np.array([r1, 0, 0])
    upper_red = np.array([r2, 255, 255])
    mask_red = cv2.inRange(hsv, lower_red, upper_red)
    hsv[mask_red == 255, 1] = np.clip(hsv[mask_red == 255, 1] * s1, 0, 255)

    lower_pink = np.array([p1, 0, 0])
    upper_pink = np.array([p2, 255, 255])
    mask_pink = cv2.inRange(hsv, lower_pink, upper_pink)
    hsv[mask_pink == 255, 1] = np.clip(hsv[mask_pink == 255, 1] * s1, 0, 255)

    lower_cyan = np.array([c1, 0, 0])
    upper_cyan = np.array([c2, 255, 255])
    mask_cyan = cv2.inRange(hsv, lower_cyan, upper_cyan)
    hsv[mask_cyan == 255, 1] = np.clip(hsv[mask_cyan == 255, 1] * s2, 0, 255)

    return cv2.cvtColor(hsv, cv2.COLOR_HSV2BGR)

if __name__ == '__main__':
    application.run(debug=True)