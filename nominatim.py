import requests
from urllib.parse import urlencode
from geopy.distance import geodesic


def get_location(query):
    url = "https://nominatim.openstreetmap.org/search?" + urlencode(
        {
            "q": query,
            "format": "json",
        }
    )
    return requests.get(url).json()


def get_distance(location_1, location_2):
    coords1 = (float(location_1["lat"]), float(location_1["lon"]))
    coords2 = (float(location_2["lat"]), float(location_2["lon"]))
    return geodesic(coords1, coords2).kilometers
