from flask import Flask, render_template, Response
import cv2
import numpy as np

app = Flask(__name__)

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

# 밝기 변경 함수
def set_brightness(img, scale):         
    return cv2.add(img, scale)          

# 대비 변경 함수
def set_contrast(img, scale):           
    return np.uint8(np.clip((1 + scale) * img - 128 * scale, 0, 255))   

def set_size(img, scale):
    return cv2.resize(img, dsize=(int(img.shape[1]*scale), int(img.shape[0]*scale)), interpolation=cv2.INTER_AREA)

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

@app.route("/")
def home2():
    return render_template("home2.html")

""""""

@app.route('/video_feed')
def video_feed():
    return Response(gen_frames(),
                    mimetype='multipart/x-mixed-replace; boundary=frame')

if __name__ == '__main__':
    app.run(debug=True)
# 카메라 영상을 받아올 객체 선언 및 설정(영상 소스, 해상도 설정)
capture = cv2.VideoCapture(0)
capture.set(cv2.CAP_PROP_FRAME_WIDTH, 640)
capture.set(cv2.CAP_PROP_FRAME_HEIGHT, 480)

while True:
    ret, frame = capture.read()     # 카메라로부터 영상을 받아 frame에 저장
    cv2.imshow("original", frame)   # 원본 영상 출력
    filered = color_filter(frame, 'red', 1)   # 원본영상에서 빨간색을 강조
    cv2.imshow("red", filered)      # 색감을 바꾼 영상 출력
    # brightness = set_brightness(frame, 20)  # 밝기를 전체적으로 20픽셀 밝게 해줌
    # cv2.imshow("brightness", brightness)    # 밝기를 바꾼 영상 출력
    # constrast = set_contrast(frame, 0.9)    # 대비를 0.9만큼 변경
    # cv2.imshow("constrast", constrast)      # 대비를 바꾼 영상 출력
    # big_size = set_size(frame, 2)    # 대비를 0.9만큼 변경
    # cv2.imshow("big_size", big_size)      # 대비를 바꾼 영상 출력
    if cv2.waitKey(1) == ord('q'):
            break

capture.release()
cv2.destroyAllWindows()
