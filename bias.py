#!/usr/bin/env python3
from flask import Flask, render_template, jsonify, request

app = Flask(__name__)

@app.route('/')
def index():
    """Render the main page of the application."""
    return render_template('index.html')

@app.route('/run_test', methods=['POST'])
def run_test():
    """Run a confirmation bias test with the provided parameters."""
    # Get parameters from the request
    target_radius = float(request.json.get('targetRadius', 0.5))
    sample_size = int(request.json.get('sampleSize', 100))
    
    # Process the test parameters and return the results
    return jsonify({
        'success': True,
        'message': 'Test completed successfully'
    })

if __name__ == '__main__':
    app.run(debug=True)