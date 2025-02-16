from flask import Flask, request, jsonify
import requests
from flask_cors import CORS
import os
from dotenv import load_dotenv
import genai

load_dotenv()
api_key = os.getenv("GOOGLE_API_KEY")
genai.configure(api_key=api_key)

model = genai.GenerativeModel("gemini-1.5-pro")

app = Flask(__name__)
CORS(app)

# Extended occupation series mapping
occupation_series = {
    'software developer': 'OEUN000000000000015125213',
    'nurse': 'OEUN000000000000029117113',
    'doctor': 'OEUN000000000000029000004',
    'data scientist': 'OEUN000000000000015205113',
    'construction worker': 'OEUN000000000000047000013',
    'lawyer': 'OEUN000000000000023101013',
    'postsecondary teacher': 'OEUN000000000000025108113',
}

@app.route("/salary", methods=["POST"])
def get_salary_data():
    data = request.get_json()
    occupation = data.get("occupation", "").lower()
    
    if occupation not in occupation_series:
        return jsonify({"error": "Occupation not found"}), 404
    
    series_id = occupation_series[occupation]
    url = f"https://api.bls.gov/publicAPI/v2/timeseries/data/{series_id}"
    params = {
        'seriesid': series_id,
        'startyear': '2020',
        'endyear': '2023'
    }
    
    response = requests.get(url, params=params)
    
    if response.status_code == 200:
        data = response.json()
        if 'Results' in data and 'series' in data['Results']:
            salary_data = data['Results']['series'][0]['data']
            return jsonify(salary_data)
        else:
            return jsonify({"error": "No salary data available"}), 404
    else:
        return jsonify({"error": "Failed to fetch data"}), 500

if __name__ == "__main__":
    app.run(debug=True)