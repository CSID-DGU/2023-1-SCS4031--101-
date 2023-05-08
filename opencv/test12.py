import cv2
import numpy as np

def adjust_saturation(img, h_range, target_s):
    hsv = cv2.cvtColor(img, cv2.COLOR_BGR2HSV)
    
    lower_hsv, upper_hsv = h_range

    mask = cv2.inRange(hsv, lower_hsv, upper_hsv)

    # S값 변경
    hsv[:, :, 1] = np.where(mask == 255, target_s, hsv[:, :, 1])
    
    return cv2.cvtColor(hsv, cv2.COLOR_HSV2BGR)

# 핑크색 범위 설정 (H값 범위를 넓게 조절)
h_range = (
    np.array([140, 5, 15]),
    np.array([180, 255, 255])
)

capture = cv2.VideoCapture(0)
capture.set(cv2.CAP_PROP_FRAME_WIDTH, 640)
capture.set(cv2.CAP_PROP_FRAME_HEIGHT, 480)

while True:
    ret, frame = capture.read()
    cv2.imshow("original", frame)

    adjusted = adjust_saturation(frame, h_range, 255) # 원본 영상에서 핑크색 영역의 S값을 255로 설정
    cv2.imshow("adjusted", adjusted)

    if cv2.waitKey(1) == ord('q'):
        break

capture.release()
cv2.destroyAllWindows()
