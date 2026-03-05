"""
Flask server that exposes face verification for the online exam.
The Next.js app sends base64 images to POST /verify; this service uses
the same verification logic as the desktop proctoring (verification.py + register.py).
"""
import base64
import os
import sys

import cv2
import numpy as np
from flask import Flask, request, jsonify
from flask_cors import CORS

# Import from same directory
from register import StudentRegistration
from verification import IdentityVerifier

app = Flask(__name__)
CORS(app)

# Load registered student encoding once at startup (or on first request)
_verifier: IdentityVerifier | None = None


def get_verifier() -> IdentityVerifier | None:
    global _verifier
    if _verifier is not None:
        return _verifier
    registration = StudentRegistration()
    student_data = registration.load_student_encoding()
    if not student_data or "encoding" not in student_data:
        return None
    enc = student_data["encoding"]
    _verifier = IdentityVerifier(registered_encoding=np.array(enc), tolerance=0.6)
    return _verifier


def base64_to_frame(image_b64: str) -> np.ndarray | None:
    """Decode base64 image (data URL or raw) to OpenCV BGR frame."""
    try:
        if "," in image_b64:
            image_b64 = image_b64.split(",", 1)[1]
        raw = base64.b64decode(image_b64)
        arr = np.frombuffer(raw, dtype=np.uint8)
        frame = cv2.imdecode(arr, cv2.IMREAD_COLOR)
        return frame
    except Exception:
        return None


@app.route("/verify", methods=["POST"])
def verify():
    """
    POST body: { "image": "<base64 string>" }
    Returns: { "success": bool, "verified": bool, "message"?: string }
    """
    data = request.get_json(force=True, silent=True) or {}
    image_b64 = data.get("image")
    if not image_b64:
        return jsonify(success=False, verified=False, message="Missing image"), 400

    frame = base64_to_frame(image_b64)
    if frame is None:
        return jsonify(success=False, verified=False, message="Invalid image"), 400

    verifier = get_verifier()
    if verifier is None:
        return jsonify(
            success=False,
            verified=False,
            message="No student face registered. Run registration first.",
        ), 503

    try:
        is_match, face_info = verifier.verify_frame(frame)
        return jsonify(success=True, verified=bool(is_match))
    except Exception as e:
        return jsonify(success=False, verified=False, message=str(e)), 500


@app.route("/health", methods=["GET"])
def health():
    """Health check and registration status."""
    verifier = get_verifier()
    return jsonify(ok=True, registered=verifier is not None)


if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port, debug=os.environ.get("FLASK_DEBUG", "0") == "1")
