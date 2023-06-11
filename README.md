# 2023-1-OSSProj-Team 101
<img alt="BSD-2-Clause" src ="https://img.shields.io/badge/BSD%202--Clause-license-lightgrey"> <img alt="" src ="https://img.shields.io/badge/OpenCV-library-brightgreen"> <img alt="" src ="https://img.shields.io/badge/Windows-OS-yellowgreen"> <img alt="" src ="https://img.shields.io/badge/IDE-VSCode-indianred"><br>

<br>

 🤖 [임지훈](https://github.com/MontaKr) zhoon95@naver.com
 
 👾 [정한길](https://github.com/arnudora) arnudora@naver.com
 
 👿 [윤영훈](https://github.com/yoon1217) fransisco12@naver.com 

<br>

# INTRODUCE
주제 : 색각 이상자의 교육 접근성을 개선하는 실시간 영상 보정 서비스

내용 : 영상의 HSV 값을 인식 및 변환하여 색각이상자가 영보기 편하도록 수정한 영상을 .

### [주요 기능 및 코드]

#### - 서버 코드
"backend\server.py"
#### - 사용자 맞춤 HSV 색변환 및 테스트

![image](https://github.com/CSID-DGU/2023-1-SCS4031--101-/assets/37091694/2580e8cb-600d-4ee7-9c19-21043ecf40e8)
![image2](https://github.com/CSID-DGU/2023-1-SCS4031--101-/assets/37091694/c193cd9b-2771-48fe-9312-f4cec1fea63b)

테스트 관련 코드 "frontend\src\components\Test.jsx"
<br>색 변환 코드     "frontend\src\components\Setting.jsx"
#### - 테스트 결과 기반 근사 수치 선택 및 실시간 영상 변환

![image3](https://github.com/CSID-DGU/2023-1-SCS4031--101-/assets/37091694/c054ae2b-81bc-4b8a-bc2b-45a49dc217c1)
![image4](https://github.com/CSID-DGU/2023-1-SCS4031--101-/assets/37091694/36636f8e-2510-45de-8eda-b37638fe7551)
변환 수치 선택   "frontend\src\components\VideoSelect.jsx"
#### - PC 저장 영상 변환

![image5](https://github.com/CSID-DGU/2023-1-SCS4031--101-/assets/37091694/b48f0c73-5cb4-4e33-bf1c-f28b8da64d33)
![image6](https://github.com/CSID-DGU/2023-1-SCS4031--101-/assets/37091694/5fe7fcce-2636-4dec-b6c6-e85b9c2209d0)

저장 영상 변환   "frontend\src\components\SavedVideo.jsx"

## STRUCTURE



## TO RUN THIS Program
```
apt install python3-pip
pip install opencv-python
pip install moviepy
npm install

git clone https://github.com/CSID-DGU/2023-1-SCS4031--101-

cd backend 
python3 server.py

cd frontend
npm run dev
```
<br>

## Development Environment
- Linux/Window
- Visual studio code
- Version Control : Git/Github

<br>

## References: 
- https://docs.opencv.org/
- https://github.com/topics/opencv
- https://www.charlezz.com/?p=44958
- https://github.com/Lewis-Ho/ishihara

## Video Link:
- (데모영상 링크)
