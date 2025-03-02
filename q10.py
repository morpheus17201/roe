import pandas as pd
import json

with open("q-calculate-correlation.json", "r") as file:
    data = json.load(file)

df = pd.DataFrame(data)

correlation = df["A"].corr(df["B"])
print(f"The Pearson correlation coefficient between A and B is: {correlation:.3f}")
