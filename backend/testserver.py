from flask import Flask, request, Response, render_template
from flask_cors import CORS
import cv2
import numpy as np

application = Flask(__name__)
CORS(application)

# 동영상 /videofiles로 이동
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

@application.route("/upload", methods=["POST"])
def upload():
    file = request.files["file"]
    video_path = "backend/videofiles/video.mp4"  # videofiles 폴더에 저장될 파일 경로 설정
    file.save(video_path)

    return "File uploaded successfully"

@application.route("/process", methods=["POST"])
def process():
    r1 = float(request.args.get('r1', 4 * 0.5)) * 0.5
    r2 = float(request.args.get('r2', 14 * 0.5)) * 0.5
    p1 = float(request.args.get('p1', 304 * 0.5)) * 0.5
    p2 = float(request.args.get('p2', 354 * 0.5)) * 0.5
    c1 = float(request.args.get('c1', 184 * 0.5)) * 0.5
    c2 = float(request.args.get('c2', 234 * 0.5)) * 0.5
    s1 = float(request.args.get('s1', 1.0))
    s2 = float(request.args.get('s2', 1.0))
    print(f'PRC: {r1}~{r2}, {p1}~{p2}, {c1}~{c2}, {s1}, {s2}')

    video_path = "backend/videofiles/video.mp4"  # 업로드된 파일 경로
    processed_path = "backend/videofiles/processed_video.mp4"  # 변환된 파일 저장 경로

    adjust_saturation(video_path, processed_path, r1, r2, p1, p2, c1, c2, s1, s2)

    return "Video processing complete"
def adjust_saturation(video_path, processed_path, r1, r2, p1, p2, c1, c2, s1, s2):
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

@application.route("/download", methods=["GET"])
def download():
    processed_path = "backend/videofiles/processed_video.mp4"  # 변환된 파일 경로

    return send_file(processed_path, as_attachment=True, attachment_filename="output.mp4") # ?????

# 위의 코드에서 upload 함수는 업로드된 파일을 backend/videofiles 폴더에 
# 저장하도록 변경되었습니다. 
# 마찬가지로 process 함수에서는 adjust_saturation 함수에 
# 새로운 인수들을 추가하여 빨간색과 파란색의 S값을 전달합니다. 
# 마지막으로 download 함수는 변환된 파일을 다운로드할 수 있도록 
# 파일 경로를 수정하였습니다.

if __name__ == '__main__':
    application.run()
