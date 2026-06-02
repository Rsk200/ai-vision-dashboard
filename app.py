import os
import base64
from pathlib import Path
from flask import Flask, request, jsonify, render_template
from flask_cors import CORS
from dotenv import load_dotenv
from openai import OpenAI

app = Flask(__name__)
CORS(app)

# Load environment variables
load_dotenv()

system_message = "You are an AI assistant in a grocery store that sells fruit. You provide detailed answers to questions about produce."

def get_client():
    openai_endpoint = os.getenv("ENDPOINT")
    model_deployment = os.getenv("MODEL_DEPLOYMENT")
    github_token = os.getenv("GITHUB_TOKEN")
    
    if not github_token:
        raise ValueError("GitHub Token is not set in the environment variables.")
        
    return OpenAI(
        base_url=openai_endpoint,
        api_key=github_token
    ), model_deployment


@app.route('/')
def index():
    return render_template('index.html')

@app.route('/api/chat', methods=['POST'])
def chat():
    try:
        data = request.json
        prompt = data.get('prompt')
        image_base64 = data.get('image') # format: data:image/jpeg;base64,.....

        if not prompt:
            return jsonify({'error': 'Please provide a prompt.'}), 400

        messages = [
            {"role": "system", "content": system_message},
            {
                "role": "user",
                "content": [
                    {"type": "text", "text": prompt}
                ]
            }
        ]

        if image_base64:
            messages[1]["content"].append({
                "type": "image_url",
                "image_url": {"url": image_base64}
            })

        client, model_deployment = get_client()

        response = client.chat.completions.create(
            model=model_deployment,
            messages=messages
        )
        
        answer = response.choices[0].message.content
        return jsonify({'answer': answer})

    except Exception as e:
        print("Error:", e)
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5000)
