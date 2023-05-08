import cv2
import numpy as np

def set_saturation(img, h_range, target_s):
    hsv = cv2.cvtColor(img, cv2.COLOR_BGR2HSV)
    
    lower_red1, upper_red1, lower_red2, upper_red2 = h_range
    
    mask1 = cv2.inRange(hsv, lower_red1, upper_red1)
    mask2 = cv2.inRange(hsv, lower_red2, upper_red2)
    mask = cv2.bitwise_or(mask1, mask2)
    
    hsv[:, :, 1] = np.where(mask == 255, target_s, hsv[:, :, 1])
    
    return cv2.cvtColor(hsv, cv2.COLOR_HSV2BGR)

# 핑크색에 가까운 빨간색 범위 설정
h_range = (
    np.array([145, 5, 0]),   
    np.array([179, 255, 255]),
    np.array([0, 5, 0]),    
    np.array([40, 255, 255])
)

capture = cv2.VideoCapture(0)
capture.set(cv2.CAP_PROP_FRAME_WIDTH, 640)
capture.set(cv2.CAP_PROP_FRAME_HEIGHT, 480)

while True:
    ret, frame = capture.read()
    cv2.imshow("original", frame)
    
    adjusted = set_saturation(frame, h_range, 180) #S값을 180으로 고정
    cv2.imshow("adjusted", adjusted)
    
    if cv2.waitKey(1) == ord('q'):
        break

capture.release()
cv2.destroyAllWindows()
