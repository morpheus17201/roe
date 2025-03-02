from haversine import haversine
import networkx as nx
import pandas as pd
import matplotlib.pyplot as plt


start_city = "Casablanca"
end_city = "Warsaw"

df1 = pd.read_csv("roe_sept_24_paths.csv")
df2 = pd.read_csv("roe_sep_24_lat_long.csv")


def get_loc(df, city):
    return tuple(df2.loc[df2.City == city, ["latitude", "longitude"]].iloc[0])


df1["dist"] = df1.apply(
    lambda x: haversine(get_loc(df2, x["From"]), get_loc(df2, x["To"])), axis=1
)

print(df1)

G = nx.from_pandas_edgelist(df1, source="From", target="To", edge_attr="dist")
shortest_path = nx.shortest_path(G, source=start_city, target=end_city, weight="dist")
print(shortest_path)

nx.draw(G, with_labels=True)
plt.show()
