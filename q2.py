import requests


def get_related_tags(tag):
    url = f"https://api.stackexchange.com/2.3/tags/{tag}/related"
    params = {"site": "stackoverflow", "pagesize": 20}
    response = requests.get(url, params=params).json()
    return response.get("items", [])


def find_common_tag(tag1, tag2):
    tags1 = get_related_tags(tag1)
    tags2 = get_related_tags(tag2)

    tag_counts = {}
    for tag in tags1 + tags2:
        tag_counts[tag["name"]] = tag_counts.get(tag["name"], 0) + tag["count"]

    # Remove the original tags from the result
    tag_counts.pop(tag1, None)
    tag_counts.pop(tag2, None)

    if not tag_counts:
        return "No common tags found."

    return max(tag_counts, key=tag_counts.get)


if __name__ == "__main__":
    tag1 = "swift"
    tag2 = "sql"
    result = find_common_tag(tag1, tag2)
    print(f"The tag most associated with both '{tag1}' and '{tag2}' is: {result}")
