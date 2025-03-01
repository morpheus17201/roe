# /// script
# requires-python = ">=3.11"
# dependencies = [
#   "pandas",
# ]
# ///

import pandas as pd


df = pd.read_csv("some_path", sep=";", encoding="utf-8")

piv_tab = pd.pivot_table(
    data=df,
    values="Sales",
    index="Region",
    columns="Category",
    aggfunc="sum",
    fill_value=0,
)

piv_tab.round(0).astype(int)
html_table = piv_tab.to_html(classes="pivot_table", border=1)

html_content = f"""
<html>
<head>
<title>Pivot Table</title>
</head>
<body> + {html_table} + </body>
</html>
"""
