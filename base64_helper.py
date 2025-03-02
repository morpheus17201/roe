import base64

# Basic encoding/decoding
text = "Hello, World!"


# Convert text to base64
def encode_string(text):
    url_safe = base64.urlsafe_b64encode(text.encode()).decode()  # SGVsbG8sIFdvcmxkIQ==
    return url_safe


def decode_string(encoded):
    decoded = base64.b64decode(encoded).decode()  # Hello, World!
    return decoded


# Working with binary files (e.g., images)
def encode_file(file_path):
    with open(file_path, "rb") as f:
        binary_data = f.read()
    image_b64 = base64.b64encode(binary_data).decode()

    # Data URI example (embed images in HTML/CSS)
    data_uri = f"data:image/png;base64,{image_b64}"
    return data_uri


def main():
    encoded = encode_string("Hello, World")
    print(encoded)

    decoded = decode_string(encoded)
    print(decoded)

    encoded_image = encode_file("IMG_8482.png")
    print(encoded_image)


if __name__ == "__main__":
    main()
