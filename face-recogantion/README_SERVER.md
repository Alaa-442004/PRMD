# Face Verification Server (for Online Exam)

This Flask server exposes the same face verification logic used by the desktop proctoring app. The **PRMD** Next.js app uses it during online exams to verify the test-taker's identity.

## How it works

1. **Registration (one-time):** Run the desktop proctoring app and register a student (name, ID, face capture). That creates `encodings/student.pkl`.
2. **Exam:** When a student takes an exam in the browser, the exam page captures frames from the webcam and sends them to the Next.js API, which forwards them to this server.
3. **Verification:** This server loads the registered encoding from `encodings/student.pkl`, compares the received frame with it using `verification.py`, and returns `{ "verified": true/false }`.

## Run the server

From this directory (`face-recogantion`):

```bash
# Install dependencies (includes flask, flask-cors)
pip install -r requirements.txt

# Start the server (default port 5000)
python server.py
```

Or with a custom port:

```bash
PORT=5001 python server.py
```

## Endpoints

- **POST /verify**  
  Body: `{ "image": "<base64 image or data URL>" }`  
  Response: `{ "success": true, "verified": true }` or `{ "success": false, "verified": false, "message": "..." }`

- **GET /health**  
  Returns `{ "ok": true, "registered": true/false }` (whether a face is registered).

## Link with PRMD

In the PRMD project `.env` set:

```env
FACE_SERVICE_URL=http://127.0.0.1:5000/verify
```

Then start this server before taking an exam. The exam page will call `/api/face-verify`, which forwards to this service.
