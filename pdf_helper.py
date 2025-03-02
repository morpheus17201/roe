import os
import pandas as pd
import tabula
import fitz  # PyMuPDF
import json

# from google.colab import files

# 📌 Upload PDF File
# uploaded = files.upload()
# pdf_filename = list(uploaded.keys())[0]  # Get uploaded file name


def pdf_to_dataframe(pdf_filename):
    try:
        tables = tabula.read_pdf(pdf_filename, pages="all", multiple_tables=True)
        return tables

    except Exception as e:
        print(f"❌ Error extracting tables: {e}")


# 🔄 Function to extract tables from PDF to Excel
def pdf_to_excel(pdf_filename, excel_filename="output.xlsx"):
    try:
        # Extract tables from PDF
        tables = tabula.read_pdf(pdf_filename, pages="all", multiple_tables=True)

        if tables:
            with pd.ExcelWriter(excel_filename, engine="openpyxl") as writer:
                for i, table in enumerate(tables):
                    table.to_excel(writer, sheet_name=f"Table_{i+1}", index=False)
            print(f"✅ Tables successfully saved to {excel_filename}")
        else:
            print("❌ No tables found in PDF.")
    except Exception as e:
        print(f"❌ Error extracting tables: {e}")


# 🔄 Function to extract text from PDF and save as JSON
def pdf_to_json(pdf_filename, json_filename="output.json"):
    try:
        # Open PDF file
        doc = fitz.open(pdf_filename)
        text_data = {"pages": []}

        for page_num in range(len(doc)):
            text = doc[page_num].get_text("text")
            text_data["pages"].append({"page": page_num + 1, "content": text})

        # Save to JSON
        with open(json_filename, "w", encoding="utf-8") as json_file:
            json.dump(text_data, json_file, indent=4, ensure_ascii=False)
        print(f"✅ Text successfully saved to {json_filename}")
    except Exception as e:
        print(f"❌ Error extracting text: {e}")


# 📌 Run both functions

# pdf_to_excel(pdf_filename)
# pdf_to_json(pdf_filename)
