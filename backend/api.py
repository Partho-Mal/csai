from flask import Flask, request, jsonify
import pickle
import numpy as np
import pandas as pd
from flask_cors import CORS

# Load the trained models and label encoder
with open("random_forest.pkl", "rb") as rf_file:
    random_forest = pickle.load(rf_file)

with open("logistic_regression.pkl", "rb") as lr_file:
    logistic_regression = pickle.load(lr_file)

with open("label_encoder.pkl", "rb") as le_file:
    label_encoder = pickle.load(le_file)

# Initialize Flask app
app = Flask(__name__)
CORS(app)  # Enable CORS

@app.route("/predict", methods=["GET", "POST"])  # Add "GET" for testing
def predict():
    if request.method == "GET":
        return jsonify({"message": "Use POST to send data."}), 200

    try:
        data = request.json
        if not data:
            return jsonify({"error": "No JSON data received"}), 400

        transaction_type = label_encoder.transform([data["type"]])[0]
        features = np.array([
            data["amount"],
            transaction_type,
            data["oldbalanceOrg"],
            data["newbalanceOrig"],
            data["oldbalanceDest"],
            data["newbalanceDest"]
        ]).reshape(1, -1)

        rf_prediction = random_forest.predict(features)[0]
        lr_prediction = logistic_regression.predict(features)[0]

        return jsonify({
            "random_forest_prediction": int(rf_prediction),
            "logistic_regression_prediction": int(lr_prediction)
        })

    except Exception as e:
        return jsonify({"error": str(e)}), 500


if __name__ == "__main__":
    app.run(debug=True, port=5000)


