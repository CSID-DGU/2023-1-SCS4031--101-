from flask import Flask, render_template, Response
import cv2
import numpy as np
import time
import datetime
import sys

"""

faceCascade = cv2.CascadeClassifier("haarcascade_frontalface_default.xml")
num = 3
app = Flask(__name__)

@app.route('/')
def index():
    """Video streaming home page."""
    now = datetime.datetime.now()
    timeString = now.strftime("%Y-%m-%d %H:%M")
    templateData = {
            'title':'Image Streaming',
            'time': timeString
            }
    return render_template('home2.html', **templateData)

def gen_frames():
    camera = cv2.VideoCapture(0)
    time.sleep(0.2)
    lastTime = time.time()*1000.0

    while True:
        ret, image = camera.read()
        gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
       
        faces = faceCascade.detectMultiScale(gray,scaleFactor=1.1,minNeighbors=6)
        delt = time.time()*1000.0-lastTime
        s = str(int(delt))
        #print (delt," Found {0} faces!".format(len(faces)) )
        lastTime = time.time()*1000.0
        # Draw a rectangle around the faces
        for (x, y, w, h) in faces:
            cv2.circle(image, (int(x+w/2), int(y+h/2)), int((w+h)/3), (255, 255, 255), 3)
        cv2.putText(image, s, (10, 25),cv2.FONT_HERSHEY_SIMPLEX, 0.7, (0, 255, 0), 2)
        now = datetime.datetime.now()
        timeString = now.strftime("%Y-%m-%d %H:%M")
        cv2.putText(image, timeString, (10, 45),cv2.FONT_HERSHEY_SIMPLEX, 0.7, (255, 0, 0), 2)
        cv2.imshow("Frame", image)
        key = cv2.waitKey(1) & 0xFF
     # if the `q` key was pressed, break from the loop
        if key == ord("q"):
            break
   
        ret, buffer = cv2.imencode('.jpg', image)
        frame = buffer.tobytes()
        yield (b'--frame\r\n'
               b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n')
       
 
@app.route('/video_feed')

def video_feed():
    """Video streaming route. Put this in the src attribute of an img tag."""
    return Response(gen_frames(),
                    mimetype='multipart/x-mixed-replace; boundary=frame')

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=int("8537")) 


"""




"""
from flask import Flask, render_template, request, Response
import cv2
"""
application = Flask(__name__)








@application.route("/")
def home2():
    return render_template("home2.html")

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








def video_feed():
    return Response(gen_frames(),
                    mimetype='multipart/x-mixed-replace; boundary=frame')

if __name__ == '__main__':
    application.run(debug=True)
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

""""""
"""

@application.route("/test")
def test():
    return render_template("test.html")

@application.route("/result")
def result():
    aaa = request.args.get("aaa")
    bbb = request.args.get("bbb")
    return render_template("result.html")

@application.route("/opencv")
def opencv():
    return render_template("opencv.html")

if __name__ == "__main__":
    application.run(host='0.0.0.0', port=int(""))

"""