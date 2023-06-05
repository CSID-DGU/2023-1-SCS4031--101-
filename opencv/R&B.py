import cv2
import numpy as np

def adjust_saturation(img, h_ranges, scales):
    hsv = cv2.cvtColor(img, cv2.COLOR_BGR2HSV)
    res = np.copy(img)
    
    for i in range(len(h_ranges)):
        lower_hsv1, upper_hsv1, lower_hsv2, upper_hsv2 = h_ranges[i]
        scale = scales[i]
        
        mask1 = cv2.inRange(hsv, lower_hsv1, upper_hsv1)
        mask2 = cv2.inRange(hsv, lower_hsv2, upper_hsv2)
        mask = cv2.bitwise_or(mask1, mask2)
        
        temp = np.copy(hsv)
        temp[:, :, 1] = np.where(mask == 255, np.clip(temp[:, :, 1] * scale, 0, 255), temp[:, :, 1])
        
        res = np.where(mask[:, :, np.newaxis] == 255, cv2.cvtColor(temp, cv2.COLOR_HSV2BGR), res)
    
    return res

# 청록색 범위 설정 (H값 범위를 넓게 조절)
cyan_range = (
    np.array([85, 0, 0]),  # 청록색 범위의 시작(HSV)
    np.array([115, 255, 255]),  # 청록색 범위의 끝(HSV)
    np.array([0, 0, 0]), # 빈 배열로 설정 (청록색은 하나의 범위로 충분함)
    np.array([0, 0, 0])  # 빈 배열로 설정
)

# 핑크색에 가까운 빨간색 범위 설정
red_range = (
    np.array([145, 5, 0]),   
    np.array([179, 255, 255]),
    np.array([0, 5, 0]),     
    np.array([40, 255, 255])
)

h_ranges = [cyan_range, red_range]
scales = [2, 2]  # 청록색과 빨간색 범위의 채도 조정값

capture = cv2.VideoCapture(0)
capture.set(cv2.CAP_PROP_FRAME_WIDTH, 640)
capture.set(cv2.CAP_PROP_FRAME_HEIGHT, 480)

while True:
    ret, frame = capture.read()
    cv2.imshow("original", frame)

    adjusted = adjust_saturation(frame, h_ranges, scales) 
    cv2.imshow("adjusted", adjusted)

    if cv2.waitKey(1) == ord('q'):
        break

capture.release()
cv2.destroyAllWindows()
