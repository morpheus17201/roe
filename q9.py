import networkx as nx
from haversine import haversine
import pandas as pd

from_to_df = pd.read_csv("from_to_locations.csv")
location_df = pd.read_csv("location_lat_long.csv")

# Convert city coordinates into a dictionary for quick lookup
city_coords = location_df.set_index("City")[["Latitude", "Longitude"]].to_dict("index")

# Create a directed graph
G = nx.Graph()

# Add edges based on direct connections with Haversine distances
for _, row in from_to_df.iterrows():
    city1, city2 = row["From"], row["To"]
    if city1 in city_coords and city2 in city_coords:
        coord1, coord2 = city_coords[city1], city_coords[city2]
        distance = haversine(
            (coord1["Latitude"], coord1["Longitude"]),
            (coord2["Latitude"], coord2["Longitude"]),
        )
        G.add_edge(city1, city2, weight=distance)

# Compute the shortest path from Brisbane to Casablanca
try:
    shortest_path = nx.shortest_path(G, source="Rome", target="Boston", weight="weight")
    shortest_distance = nx.shortest_path_length(
        G, source="Rome", target="Boston", weight="weight"
    )
    shortest_path, shortest_distance
except nx.NetworkXNoPath:
    "No available path between Brisbane and Casablanca"
except nx.NodeNotFound as e:
    str(e)
shortest_path, shortest_distance

print(f"The shortest path from Rome to Boston is: {','.join(shortest_path)}")
