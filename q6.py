import os
import shutil

# Step 1: Extract files and move them to an empty folder
source_directory = "q6"  # Replace with actual source folder path
destination_directory = "./q6/all_files"  # Replace with actual destination folder path

os.makedirs(destination_directory, exist_ok=True)

for root, dirs, files in os.walk(source_directory):
    for file in files:
        file_path = os.path.join(root, file)
        shutil.move(file_path, destination_directory)

print(f"All files have been moved to {destination_directory}")

# destination_directory = "./q6/all_files"


# Step 2: Rename files by replacing each digit with the next
def replace_digits(filename):
    new_name = ""
    for char in filename:
        if char.isdigit():
            new_name += str((int(char) + 1) % 10)
        else:
            new_name += char
    return new_name


for file in os.listdir(destination_directory):
    old_file_path = os.path.join(destination_directory, file)
    if os.path.isfile(old_file_path):
        new_file_name = replace_digits(file)
        new_file_path = os.path.join(destination_directory, new_file_name)
        os.rename(old_file_path, new_file_path)

print("All files have been renamed.")
