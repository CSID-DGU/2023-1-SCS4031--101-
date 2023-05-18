import cv2
import numpy as np

# HSV Saturation 조절 함수
def adjust_saturation(img, r_threshold, scale):
    hsv = cv2.cvtColor(img, cv2.COLOR_BGR2HSV)
    r_channel = img[:, :, 2]
    r_mask = r_channel >= r_threshold

    hsv[:, :, 1] = np.where(r_mask, cv2.multiply(hsv[:, :, 1], scale), hsv[:, :, 1])
    return cv2.cvtColor(hsv, cv2.COLOR_HSV2BGR)

# 카메라 영상을 받아올 객체 선언 및 설정(영상 소스, 해상도 설정)
capture = cv2.VideoCapture(0)
capture.set(cv2.CAP_PROP_FRAME_WIDTH, 640)
capture.set(cv2.CAP_PROP_FRAME_HEIGHT, 480)

while True:
    ret, frame = capture.read()     # 카메라로부터 영상을 받아 frame에 저장
    cv2.imshow("original", frame)   # 원본 영상 출력
    
    adjusted = adjust_saturation(frame, 120, 2)   # 원본 영상에서 R값이 120 이상인 픽셀의 S값을 2배로 조절
    cv2.imshow("adjusted", adjusted)      # HSV 조절된 영상 출력
    
    if cv2.waitKey(1) == ord('q'):
            break

capture.release()
cv2.destroyAllWindows()
