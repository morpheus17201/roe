from fastapi import FastAPI, HTTPException, Request, Response
from fastapi.middleware.cors import CORSMiddleware
import httpx
import uvicorn
from urllib.parse import unquote

app = FastAPI(title="CORS Proxy Server")

# Add CORS middleware to allow all origins
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/api")
async def proxy(url: str):
    if not url:
        raise HTTPException(status_code=400, detail="URL parameter is required")

    try:
        # Ensure URL is properly decoded
        decoded_url = unquote(url)

        # Create async HTTP client
        async with httpx.AsyncClient() as client:
            # Forward the request to the target URL
            response = await client.get(decoded_url, follow_redirects=True)

            # Create a new response
            proxy_response = Response(
                content=response.content,
                status_code=response.status_code,
                headers=dict(response.headers),
            )

            # Add CORS header
            proxy_response.headers["Access-Control-Allow-Origin"] = "*"

            return proxy_response

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Proxy error: {str(e)}")


if __name__ == "__main__":
    uvicorn.run("fastapi_server:app", host="127.0.0.1", port=8000, reload=True)
