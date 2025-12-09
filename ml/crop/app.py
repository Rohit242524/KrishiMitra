from flask import Flask, request, jsonify
from flask_cors import CORS
import pickle
import numpy as np
import os

HERE = os.path.dirname(os.path.abspath(__file__))
MODEL_PATH = os.path.join(HERE, "crop_model.pkl")

app = Flask(__name__)
CORS(app)

# load model
with open(MODEL_PATH, "rb") as f:
    model = pickle.load(f)

@app.route("/health", methods=["GET"])
def health():
    return jsonify({"status":"ok", "model": os.path.basename(MODEL_PATH)})

@app.route("/predict_crop", methods=["POST"])
def predict_crop():
    data = request.get_json(force=True)
    required = ["N","P","K","temperature","humidity","ph","rainfall"]
    try:
        features = [float(data[k]) for k in required]
    except Exception as e:
        return jsonify({"error":"invalid input", "details": str(e), "required": required}), 400

    features = np.array(features).reshape(1, -1)
    pred = model.predict(features)[0]

    proba = None
    try:
        if hasattr(model, "predict_proba"):
            probs = model.predict_proba(features)[0]
            classes = model.classes_
            top = sorted(zip(classes, probs), key=lambda x: x[1], reverse=True)[:3]
            proba = [{"crop": str(c), "prob": float(p)} for c, p in top]
    except Exception:
        proba = None

    return jsonify({"crop": str(pred), "top": proba})

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
