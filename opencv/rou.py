@application.route("/upload", methods=["POST"])
def upload():
    file = request.files["file"]
    video_path = "backend/videofiles/video.mp4"  # videofiles 폴더에 저장될 파일 경로 설정
    file.save(video_path)

    return "File uploaded successfully"


@app.route("/process", methods=["POST"])
def process():
    video_path = "backend/videofiles/video.mp4"  # 업로드된 파일 경로
    processed_path = "backend/videofiles/processed_video.mp4"  # 변환된 파일 저장 경로

    adjust_saturation(video_path, processed_path, red1, red2, red3, red4, cyan1, cyan2, saturation1, saturation2)

    return "Video processing complete"


@app.route("/download", methods=["GET"])
def download():
    processed_path = "backend/videofiles/processed_video.mp4"  # 변환된 파일 경로
    return send_file(processed_path, as_attachment=True, attachment_filename="output.mp4")

#위의 코드에서 upload 함수는 업로드된 파일을 backend/videofiles 폴더에 
# 저장하도록 변경되었습니다. 
# 마찬가지로 process 함수에서는 adjust_saturation 함수에 
# 새로운 인수들을 추가하여 빨간색과 파란색의 S값을 전달합니다. 
# 마지막으로 download 함수는 변환된 파일을 다운로드할 수 있도록 
# 파일 경로를 수정하였습니다.