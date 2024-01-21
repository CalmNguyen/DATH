import cv2
import pytesseract
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

def process_image(image_path):
    # Đọc ảnh từ đường dẫn
    img = cv2.imread(image_path)

    # Chuyển đổi ảnh sang đen trắng
    gray_img = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)

    # Áp dụng bộ lọc Gaussian để giảm nhiễu
    blurred_img = cv2.GaussianBlur(gray_img, (5, 5), 0)

    # Sử dụng thư viện Tesseract OCR để nhận diện chữ số
    custom_config = r'--oem 3 --psm 6 outputbase digits'
    result = pytesseract.image_to_string(blurred_img, config=custom_config)

    return result.strip()

@app.route('/analyze_image', methods=['POST'])
def analyze_image():
    # Kiểm tra xem có dữ liệu image trong form data không
    if 'image' not in request.files:
        return jsonify({'error': 'No image provided'})

    image = request.files['image']

    # Lưu ảnh tạm thời
    image_path = 'temp_image.png'
    image.save(image_path)

    # Phân tích ảnh và nhận dãy chữ số
    result = process_image(image_path)

    # Xóa ảnh tạm thời sau khi đã xử lý
    import os
    os.remove(image_path)

    return jsonify({'result': result})

if __name__ == '__main__':
    app.run(debug=True)
