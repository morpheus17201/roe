def get_files(folder_path, file_type):
    import os

    files = []
    for file in os.listdir(folder_path):
        if file.endswith(file_type):
            files.append(os.path.join(folder_path, file))
    return files
