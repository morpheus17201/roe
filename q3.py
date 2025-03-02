import os
import zipfile
import pandas as pd


def find_least_subjects(zip_path):
    extract_folder = "extracted_files"

    # Extract the zip file
    with zipfile.ZipFile(zip_path, "r") as zip_ref:
        zip_ref.extractall(extract_folder)

    # Load the CSV files
    students_df = pd.read_csv(os.path.join(extract_folder, "students.csv"))
    subjects_df = pd.read_csv(os.path.join(extract_folder, "subjects.csv"))

    # Merge the two dataframes on studentId
    merged_df = pd.merge(students_df, subjects_df, on="studentId")

    # Count unique subjects per class
    class_subject_counts = merged_df.groupby("class")["subject"].nunique()

    # Get the three lowest unique subject counts, sorted in ascending order
    lowest_counts = sorted(class_subject_counts.unique())[:3]

    # Return as comma-separated values without spaces
    return ",".join(map(str, lowest_counts))


# Example usage
zip_path = "q-least-unique-subjects-from-csv.zip"  # Change to your actual ZIP file path
print(find_least_subjects(zip_path))
