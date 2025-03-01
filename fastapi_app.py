# /// script
# requires-python = ">=3.11"
# dependencies = [
#   "httpx",
#   "fastapi",
#   "uvicorn",
#   "requests",
#   "python-dateutil",
#   "numpy",
#   "markdown",
# ]
# ///

import httpx
from typing import Dict, Any
from fastapi import FastAPI, HTTPException
from fastapi.responses import JSONResponse, PlainTextResponse, HTMLResponse
from fastapi.middleware.cors import CORSMiddleware
from fastapi.params import Query
import datetime
import os
import json

# import logging

# from common import query_gpt

from base_logger import logger

from llm_helper import query_gpt
from llm_helper import OPENAI_API_URL, OPENAI_API_KEY

now = datetime.datetime.now()

# USE_PERSONAL_TOKEN = True

# if USE_PERSONAL_TOKEN:
#     OPENAI_API_KEY = os.environ["OPENAI_API_MYKEY"]
#     OPENAI_API_URL = "https://api.openai.com/v1/chat/completions"

# else:
#     OPENAI_API_KEY = os.environ["AIPROXY_TOKEN"]
#     OPENAI_API_URL = "http://aiproxy.sanand.workers.dev/openai/v1/chat/completions"


# Initialize the FastAPI app
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["GET", "POST"],
    allow_headers=["*"],
)


@app.post("/run")
async def run_task(task: str):
    return JSONResponse({"task": task})


@app.get("/tricky")
def tricky(class_: str = Query(..., alias="class")):
    data = {"class": class_}
    return JSONResponse(content=data)


@app.get("/read", response_class=PlainTextResponse)
async def read_file(path: str):
    print("-" * 80)
    from pathlib import Path

    file_path = Path(path)

    # Check if the file exists and is a file
    if not file_path.is_file():
        logger.error(f"File not found: {file_path}")
        raise HTTPException(status_code=404, detail="File not found")

    # Open the file and read its content
    try:
        with open(file_path, "r") as file:
            content = file.read()
        return content
    except Exception as e:
        logger.error(f"Exception from inside app.get('/read')")
        raise HTTPException(status_code=500, detail=f"An error occurred: {str(e)}")


if __name__ == "__main__":
    import uvicorn

    levels = ["DEBUG", "INFO", "WARNING", "ERROR", "CRITICAL"]
    # logger.basicConfig(level="INFO", format="%(message)s\n")
    logger.debug(f"{OPENAI_API_KEY=}")

    uvicorn.run(app, host="0.0.0.0", port=8000, reload=True)
