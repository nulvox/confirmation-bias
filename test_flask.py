#!/usr/bin/env python3
import sys
print(f"Python version: {sys.version}")

try:
    import flask
    print(f"Flask version: {flask.__version__}")
    print("Flask imported successfully!")
except ImportError as e:
    print(f"Error importing Flask: {e}")
except Exception as e:
    print(f"Unexpected error: {e}")