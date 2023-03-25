#!/bin/bash

if [[ ! -d ".venv" ]]; then
    python3 -m venv ".venv"
    source ".venv/bin/activate"
    pip install -r requirements.txt 'uvicorn[standard]'
else
    source ".venv/bin/activate"
fi


uvicorn "main:app" --port "${PORT:-8000}"
