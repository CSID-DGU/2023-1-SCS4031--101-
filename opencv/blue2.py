import cv2
import numpy as np

def adjust_saturation(img, h_range):
    hsv = cv2.cvtColor(img, cv2.COLOR_BGR2HSV)
    
    lower_hsv, upper_hsv = h_range

    mask = cv2.inRange(hsv, lower_hsv, upper_hsv)
    cv2.imshow("mask", mask)  # 마스크 확인

    hsv[:, :, 1] = np.where(mask == 255, hsv[:, :, 1], hsv[:, :, 1] * 2)
    hsv[:, :, 1] = np.clip(hsv[:, :, 1], 0, 255)  # S값 범위를 0~255로 제한

    return cv2.cvtColor(hsv, cv2.COLOR_HSV2BGR)

# 청록색 범위 설정 (H값 범위를 넓게 조절)
h_range = (
    np.array([85, 0, 0]),  # 청록색 범위의 시작(HSV)
    np.array([115, 255, 255])  # 청록색 범위의 끝(HSV)
)

capture = cv2.VideoCapture(0)
capture.set(cv2.CAP_PROP_FRAME_WIDTH, 640)
capture.set(cv2.CAP_PROP_FRAME_HEIGHT, 480)

while True:
    ret, frame = capture.read()
    cv2.imshow("original", frame)

    adjusted = adjust_saturation(frame, h_range) # 원본 영상에서 청록색 영역의 S값을 2배로 높임
    cv2.imshow("adjusted", adjusted)

    if cv2.waitKey(1) == ord('q'):
        break

capture.release()
cv2.destroyAllWindows()
