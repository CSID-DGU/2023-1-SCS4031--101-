import cv2

# 웹캠 열기
cap = cv2.VideoCapture(0)

while True:
    # 영상 프레임 캡처
    ret, frame = cap.read()

    if not ret: # 프레임이 존재하지 않을 경우, 예외 처리
        continue

    # 각 픽셀의 R, G, B 값을 추출하여 R 값을 0으로대체
    transformed_frame = frame.copy()
    for i in range(frame.shape[0]):
        for j in range(frame.shape[1]):
            r, g, b = frame[i, j]
            transformed_frame[i, j] = [0, g, b]

    # 변환된 영상 출력
    cv2.imshow('frame', transformed_frame)

    # 종료키(q) 입력 시, 반복문 탈출
    if cv2.waitKey(1) == ord('q'):
        break

# 웹캠과 창 닫기
cap.release()
cv2.destroyAllWindows()

