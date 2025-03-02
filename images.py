from pathlib import Path
from PIL import Image
import io


def compress_image(input_path: Path, output_path: Path, quality: int = 85) -> None:
    """Compress an image while maintaining reasonable quality."""
    with Image.open(input_path) as img:
        # Convert RGBA to RGB if needed
        if img.mode == "RGBA":
            img = img.convert("RGB")
        # Optimize for web
        img.save(output_path, "WEBP", quality=quality, optimize=True)


# Batch process images
paths = Path("images").glob("*.jpg")
for p in paths:
    compress_image(p, p.with_suffix(".webp"))
