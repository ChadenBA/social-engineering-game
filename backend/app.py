from flask import Flask, jsonify
from flask_cors import CORS
import json
import os

static_folder_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'static')
app = Flask(__name__, static_folder=static_folder_path)

CORS(app, origins=["https://social-engineering-game.onrender.com"])



@app.route("/api/questions", methods=["GET"])
def get_questions():
    with open("questions.json") as f:
        questions = json.load(f)
    return jsonify(questions)

@app.route("/api/phishing-emails", methods=["GET"])
def get_phishing_emails():
    with open("phishing_emails.json") as f:
        data = json.load(f)
    return jsonify(data)

@app.route("/api/roleplay-scenarios", methods=["GET"])
def get_roleplay_scenarios():
    with open("roleplay_scenarios.json") as f:
        scenarios = json.load(f)
    return jsonify(scenarios)


if __name__ == "__main__":
    app.run(debug=True)
