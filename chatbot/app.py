from flask import Flask, request, jsonify
import google.generativeai as genai
from flask_cors import CORS
import os
from dotenv import load_dotenv
import pdfplumber

load_dotenv()
api_key = os.getenv("GOOGLE_API_KEY")
genai.configure(api_key=api_key)

model = genai.GenerativeModel("gemini-1.5-pro")

app = Flask(__name__)
CORS(app)


@app.route("/", methods=["GET"])
def home():
    return jsonify({"message": "Flask API is running!"})


@app.route("/chat", methods=["POST"])
def chat():
    try:
        if not request.is_json:
            return jsonify({"error": "Invalid JSON format"}), 400

        data = request.get_json()
        user_input = data.get("message", "").strip()

        if not user_input:
            return jsonify({"error": "No input received"}), 400

        print(f"User Input: {user_input}")

        response = model.generate_content(user_input)
        bot_reply = response.text

        print(f"AI Response: {bot_reply}")

        return jsonify({"response": bot_reply})

    except Exception as e:
        print(f"ERROR: {str(e)}")
        return jsonify({"error": str(e)}), 500


@app.route("/analyze-resume", methods=["POST"])
def analyze_resume_api():
    try:
        if "file" not in request.files:
            print("No file received!")  
            return jsonify({"error": "No file uploaded"}), 400

        file = request.files["file"]
        if file.filename == "":
            print("Empty file uploaded!")  
            return jsonify({"error": "Empty file uploaded"}), 400

        print(f"Received file: {file.filename}")  

        resume_text = extract_text_from_pdf(file)
        print(f"Extracted Text: {resume_text[:500]}...")  

        result = analyze_resume(resume_text)

        return jsonify({"analysis": result})

    except Exception as e:
        print(f"ERROR: {str(e)}")  
        return jsonify({"error": str(e)}), 500

def extract_text_from_pdf(file):
    """Extract text from a PDF file."""
    with pdfplumber.open(file) as pdf:
        text = "\n".join(page.extract_text() for page in pdf.pages if page.extract_text())
    return text

@app.route("/analyze-wage", methods=["POST"])
def analyze_wage():
    if "file" not in request.files:
        return jsonify({"error": "No file uploaded"}), 400

    file = request.files["file"]
    resume_text = extract_text_from_pdf(file)

    prompt = f"""
    Analyze the following job offer or pay stub for gender-based wage discrimination.
    Provide:
    1. Key salary details.
    2. Potential wage disparities.
    3. Legal recommendations for fair pay.

    Document:
    {resume_text}
    """
    response = model.generate_content(prompt)
    return jsonify({"analysis": response.text})

if __name__ == "__main__":
    app.run(debug=True, port=5002)

@app.route("/generate-negotiation-script", methods=["POST"])
def generate_negotiation_script_api():
    try:
        data = request.get_json()
        job_title = data.get("job_title", "")
        industry = data.get("industry", "")

        if not job_title or not industry:
            return jsonify({"error": "Job title and industry are required"}), 400

        script = generate_negotiation_script(job_title, industry)
        return jsonify({"script": script})

    except Exception as e:
        return jsonify({"error": str(e)}), 500


def extract_text_from_pdf(file):
    """Extract text from a PDF file."""
    with pdfplumber.open(file) as pdf:
        text = "\n".join(
            page.extract_text() for page in pdf.pages if page.extract_text()
        )
    return text


def analyze_resume(resume_text):
    """Analyze resume for ATS optimization."""
    prompt = f"""
    Analyze the following resume for ATS optimization. Provide:
    1. Key strengths.
    2. Areas to improve.
    3. Missing skills based on common job descriptions.
    
    Resume:
    {resume_text}
    """
    response = model.generate_content(prompt)
    return response.text


def generate_negotiation_script(job_title, industry):
    """Generate a salary negotiation script based on job title & industry."""
    prompt = f"""
    Generate a salary negotiation script for a {job_title} in the {industry} industry.
    1. Start with gratitude.
    2. Mention market data (if available).
    3. Make a strong counteroffer.
    4. Use polite but firm language.
    """
    response = model.generate_content(prompt)
    return response.text


if __name__ == "__main__":
    print("🚀 Flask is running on http://127.0.0.1:5001/")
    app.run(debug=True, port=5001)
