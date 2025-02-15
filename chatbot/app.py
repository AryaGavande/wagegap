from flask import Flask, request, jsonify
import google.generativeai as genai
from flask_cors import CORS
import os
from dotenv import load_dotenv

# Load API Key
load_dotenv()
api_key = os.getenv("GOOGLE_API_KEY")
print(f"API Key", api_key)
genai.configure(api_key=api_key)

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
        user_input = data.get("message", "")
        if not user_input:
            return jsonify({"error": "No input received"}), 400

        print(f"User Input: {user_input}")

        model = genai.GenerativeModel("gemini-1.5-flash")
        response = model.generate_content(user_input)

        print(f"AI Response: {response}")

        return jsonify({"response": response.text})

    except Exception as e:
        print(f"ERROR: {str(e)}")
        return jsonify({"error": str(e)}), 500


if __name__ == "__main__":
    print("🚀 Flask is running on http://127.0.0.1:5001/")
    app.run(debug=True, port=5001)
