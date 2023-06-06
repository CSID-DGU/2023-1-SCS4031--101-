from moviepy.editor import VideoFileClip
import cv2
import numpy as np

def adjust_saturation(image):
    # 이미지를 HSV 포맷으로 변환
    hsv = cv2.cvtColor(image, cv2.COLOR_RGB2HSV)

    # 파랑색 범위 설정
    lower_blue = np.array([100, 50, 50])
    upper_blue = np.array([140, 255, 255])

    # HSV 이미지에서 파랑색 범위만 마스킹
    mask = cv2.inRange(hsv, lower_blue, upper_blue)
    
    # 마스킹된 영역의 S 채널 값을 절반으로 줄임
    hsv[:, :, 1] = np.where(mask == 255, hsv[:, :, 1] // 2, hsv[:, :, 1])

    return cv2.cvtColor(hsv, cv2.COLOR_HSV2RGB)

# 동영상 파일 로드
video = VideoFileClip("C:/Users/frans/OneDrive/바탕 화면/동국대/2023_1학기/ETF/sample.mp4")  # 변경하고 싶은 동영상 파일 경로

# 동영상의 각 프레임에 adjust_saturation 함수 적용
new_video = video.fl_image(adjust_saturation)

# 변경된 동영상 파일 저장
new_video.write_videofile("C:/Users/frans/OneDrive/바탕 화면/동국대/2023_1학기/ETF/output.mp4")  # 저장할 동영상 파일 경로