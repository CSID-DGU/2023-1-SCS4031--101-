from flask import Flask, request, Response, send_file
from flask_cors import CORS
import cv2
import numpy as np

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
    r1 = float(request.args.get('r1', 4 * 0.5))
    r2 = float(request.args.get('r2', 14 * 0.5))
    p1 = float(request.args.get('p1', 304 * 0.5))
    p2 = float(request.args.get('p2', 354 * 0.5))
    c1 = float(request.args.get('c1', 184 * 0.5))
    c2 = float(request.args.get('c2', 234 * 0.5))
    s1 = float(request.args.get('s1', 1.0 * 0.5)) * 0.7
    s2 = float(request.args.get('s2', 1.0 * 0.5)) * 0.7
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
    r1 = float(request.args.get('r1', 4 * 0.5))
    r2 = float(request.args.get('r2', 14 * 0.5))
    p1 = float(request.args.get('p1', 304 * 0.5))
    p2 = float(request.args.get('p2', 354 * 0.5))
    c1 = float(request.args.get('c1', 184 * 0.5))
    c2 = float(request.args.get('c2', 234 * 0.5))
    s1 = float(request.args.get('s1', 1.0 * 0.5))
    s2 = float(request.args.get('s2', 1.0 * 0.5))
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
    r1 = float(request.args.get('r1', 4 * 0.5))
    r2 = float(request.args.get('r2', 14 * 0.5))
    p1 = float(request.args.get('p1', 304 * 0.5))
    p2 = float(request.args.get('p2', 354 * 0.5))
    c1 = float(request.args.get('c1', 184 * 0.5))
    c2 = float(request.args.get('c2', 234 * 0.5))
    s1 = float(request.args.get('s1', 1.0 * 0.5)) * 1.3
    s2 = float(request.args.get('s2', 1.0 * 0.5)) * 1.3
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

@application.route("/upload", methods=["POST"])
def upload():
    file = request.files["file"]
    video_path = "backend/videofiles/video.mp4"  # videofiles 폴더에 저장될 파일 경로 설정
    file.save(video_path)

    return "File uploaded successfully"


@application.route("/process", methods=["POST"])
def process():
    video_path = "backend/videofiles/video.mp4"  # 업로드된 파일 경로
    processed_path = "backend/videofiles/processed_video.mp4"  # 변환된 파일 저장 경로

    r1 = float(request.form.get('r1', 4 * 0.5))
    r2 = float(request.form.get('r2', 14 * 0.5))
    p1 = float(request.form.get('p1', 304 * 0.5))
    p2 = float(request.form.get('p2', 354 * 0.5))
    c1 = float(request.form.get('c1', 184 * 0.5))
    c2 = float(request.form.get('c2', 234 * 0.5))
    s1 = float(request.form.get('s1', 1.0 * 0.5))
    s2 = float(request.form.get('s2', 1.0 * 0.5))
    print(f'Process: {r1}~{r2}, {p1}~{p2}, {c1}~{c2}, {s1}, {s2}')

    capture = cv2.VideoCapture(video_path)
    frame_width = int(capture.get(cv2.CAP_PROP_FRAME_WIDTH))
    frame_height = int(capture.get(cv2.CAP_PROP_FRAME_HEIGHT))
    fps = capture.get(cv2.CAP_PROP_FPS)

    fourcc = cv2.VideoWriter_fourcc(*'mp4v')
    writer = cv2.VideoWriter(processed_path, fourcc, fps, (frame_width, frame_height))

    while True:
        ret, frame = capture.read()
        if not ret:
            break

        filtered = aou_color_filter(frame, r1, r2, p1, p2, c1, c2, s1, s2)
        writer.write(filtered)

    writer.release()
    capture.release()

    return "Video processing complete"



@application.route("/download", methods=["GET"])
def download():
    processed_path = "backend/videofiles/processed_video.mp4"  # 변환된 파일 경로
    return send_file(processed_path, as_attachment=True, attachment_filename="output.mp4")
if __name__ == '__main__':
    application.run(debug=True)
