# import pandas as pd
# import numpy as np
# import tabula
# import re
# import matplotlib.pyplot as plt

# # from google.colab import files

# # # Step 1: Upload the PDF file
# # print("Please upload the PDF file (q-extract-tables-from-pdf.pdf)")
# # uploaded = files.upload()

# # pdf_path = list(uploaded.keys())[0]
# # print(f"Successfully uploaded: {pdf_path}")

# # # Step 2: Extract tables from the PDF
# # print("Extracting tables from PDF...")
# pdf_path = "q-extract-tables-from-pdf.pdf"
# try:
#     # Try to extract tables using tabula (works best for structured tables)
#     tables = tabula.read_pdf(pdf_path, pages="all", multiple_tables=True)
#     print(f"Successfully extracted {len(tables)} tables from the PDF")

#     if len(tables) == 0:
#         raise Exception("No tables found using tabula")

#     # Display the first few rows of each table
#     for i, table in enumerate(tables):
#         print(f"\nTable {i+1} preview:")
#         print(table.head())

#     # Determine which table contains the student marks
#     # Usually, we'd use the first table or ask the user to select one
#     marks_df = tables[0]  # Assuming the first table is the one we need

# except Exception as e:
#     print(f"Error extracting tables with tabula: {e}")
#     print("Trying alternative method...")
#     # Alternative methods could be implemented here
#     # For example, using PyPDF2 or pdfplumber

# # Step 3: Clean and prepare the data
# print("\nCleaning and preparing the data...")

# # Check column names to identify relevant columns
# print("Original columns:", marks_df.columns.tolist())

# # Rename columns if needed or fix column names if they're unclear
# # This is a common step as PDF extraction might lead to unclear column names
# # Assuming columns include Group, Maths, Physics, English, Economics, Biology

# # Check for missing values
# print("\nMissing values in the dataset:")
# print(marks_df.isnull().sum())

# # Convert marks columns to numeric values, handling potential errors
# numeric_columns = ["Maths", "Physics", "English", "Economics", "Biology"]

# # Adjust column names if they don't match exactly with the expected names
# for col in marks_df.columns:
#     if "math" in col.lower():
#         marks_df.rename(columns={col: "Maths"}, inplace=True)
#     elif "econ" in col.lower():
#         marks_df.rename(columns={col: "Economics"}, inplace=True)
#     elif "group" in col.lower():
#         marks_df.rename(columns={col: "Group"}, inplace=True)

# # Try to identify the Group column
# group_col = None
# for col in marks_df.columns:
#     if "group" in col.lower():
#         group_col = col
#         break

# # Display updated columns
# print("\nUpdated columns:", marks_df.columns.tolist())

# # Convert marks to numeric and handle non-numeric values
# for col in marks_df.columns:
#     if (
#         col in numeric_columns
#         or "mark" in col.lower()
#         or any(subject.lower() in col.lower() for subject in numeric_columns)
#     ):
#         marks_df[col] = pd.to_numeric(marks_df[col], errors="coerce")

# # Check the datatypes after conversion
# print("\nData types after conversion:")
# print(marks_df.dtypes)

# # Step 4: Filter data based on criteria
# print("\nFiltering data based on criteria...")

# # Extract group numbers if the Group column contains text like "Group 38"
# if group_col:
#     # If groups are in format "Group 38", extract the numeric part
#     if marks_df[group_col].dtype == "object":
#         marks_df["Group_Num"] = marks_df[group_col].str.extract(r"(\d+)").astype(float)
#     else:
#         marks_df["Group_Num"] = marks_df[group_col]
# else:
#     # If no clear Group column is found, look for a column that might contain group info
#     for col in marks_df.columns:
#         if marks_df[col].dtype == "object":
#             # Try to extract numbers from this column
#             marks_df["Group_Num"] = marks_df[col].str.extract(r"(\d+)").astype(float)
#             if not marks_df["Group_Num"].isna().all():
#                 print(f"Using column '{col}' for group information")
#                 break

# # Print group range found in data
# print(
#     f"Group range in data: {marks_df['Group_Num'].min()} to {marks_df['Group_Num'].max()}"
# )

# # Identify the Maths column
# maths_col = "Maths"
# for col in marks_df.columns:
#     if "math" in col.lower():
#         maths_col = col
#         break

# # Identify the Economics column
# econ_col = "Economics"
# for col in marks_df.columns:
#     if "econ" in col.lower():
#         econ_col = col
#         break

# print(f"Using '{maths_col}' for Maths marks and '{econ_col}' for Economics marks")

# # Apply the filter: Students with Maths >= 25 and in groups 38-66
# filtered_df = marks_df[
#     (marks_df["Group_Num"] >= 38)
#     & (marks_df["Group_Num"] <= 66)
#     & (marks_df[maths_col] >= 25)
# ]

# # Step 5: Calculate the total Economics marks
# total_economics_marks = filtered_df[econ_col].sum()

# print("\n----- RESULTS -----")
# print(f"Number of students who meet the criteria: {len(filtered_df)}")
# print(
#     f"Total Economics marks for students who scored 25 or more in Maths from groups 38-66: {total_economics_marks}"
# )

# # Display the filtered data
# print("\nStudents who meet the criteria:")
# print(filtered_df[[group_col, maths_col, econ_col]])

# # Optional: Visualize the results
# plt.figure(figsize=(10, 6))
# plt.bar(filtered_df[group_col].astype(str), filtered_df[econ_col])
# plt.title("Economics Marks by Group (Filtered Students)")
# plt.xlabel("Group")
# plt.ylabel("Economics Marks")
# plt.xticks(rotation=90)
# plt.tight_layout()
# plt.show()

# # Save the filtered data to CSV
# filtered_df.to_csv("filtered_students.csv", index=False)
# print("\nFiltered data saved to 'filtered_students.csv'")


import pandas as pd

# Load the data from the CSV file
df = pd.read_csv("extracted_table.csv")

# Ensure that Maths and Economics columns are numeric
df["Maths"] = pd.to_numeric(df["Maths"], errors="coerce")
df["Economics"] = pd.to_numeric(df["Economics"], errors="coerce")

# Define groups based on row ranges (0-indexed in pandas)
# Group 1: Row 1-31 (index 0-30)
# Group 2: Row 32-61 (index 31-60)
# Group 3: Row 62-91 (index 61-90)
# And so on...

# Create a group column
df["Group"] = 0  # Initialize with 0
group_size = 30  # Each group has 30 rows (except maybe the last one)

for i in range(len(df)):
    df.at[i, "Group"] = (i // group_size) + 1  # Integer division to assign group number

# Filter based on criteria: Maths >= 54 and Group between 66-100
maths_filter = df["Physics"] >= 54
group_filter = (df["Group"] >= 66) & (df["Group"] <= 100)
final_filter = maths_filter & group_filter

# Apply the filter
filtered_df = df[final_filter]

# Calculate the total Economics marks for the filtered students
total_economics_marks = filtered_df["Economics"].sum()

# Print only the total Economics marks
print(total_economics_marks)
