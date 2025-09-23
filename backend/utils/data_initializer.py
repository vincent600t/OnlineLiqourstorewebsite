import requests
from datetime import datetime

# RapidAPI Configuration
RAPIDAPI_KEY = "b5b47d106dmsha17c36fb6f54fb6p1c40e2jsn9067272e16a1"
RAPIDAPI_HOST = "beer9.p.rapidapi.com"
RAPIDAPI_BASE_URL = "https://beer9.p.rapidapi.com"

def fetch_beer_data(brewery=None, name=None):
    """Fetch beer data from RapidAPI"""
    headers = {
        "X-RapidAPI-Key": RAPIDAPI_KEY,
        "X-RapidAPI-Host": RAPIDAPI_HOST,
    }

    params = {}
    if brewery:
        params["brewery"] = brewery
    if name:
        params["name"] = name

    # Adjust endpoint path as per docs
    endpoint = "/search"  # maybe this should be "/beers" or "/beers/search" etc.

    url = f"{RAPIDAPI_BASE_URL}{endpoint}"
    try:
        resp = requests.get(url, headers=headers, params=params, timeout=10)
        print("🔎 Request URL:", resp.url)
        print("🔎 Status Code:", resp.status_code)
        print("🔎 Response:", resp.text[:500])  # print first 500 chars for debugging

        resp.raise_for_status()
        return resp.json()
    except requests.exceptions.RequestException as e:
        print(f"❌ Error fetching beer data: {e}")
        return None

def initialize_data(db, ProductModel):
    """Populate database with sample products from RapidAPI"""
    print("🚀 Initializing product data from RapidAPI...")

    beer_data = fetch_beer_data()
    if not beer_data:
        print("⚠️ No beer data fetched.")
        return

    # Determine where actual items are in the API response
    items = beer_data.get("data") or beer_data.get("beers") or beer_data.get("results")
    if items is None:
        print("⚠️ Beer data structure didn't match: no 'data', 'beers' or 'results'.")
        return

    count = 0
    for item in items:
        name = item.get("name") or item.get("title")
        if not name:
            continue

        # Avoid duplicates
        if ProductModel.query.filter_by(name=name).first():
            continue

        price = 10.0
        try:
            price = float(item.get("price", price))
        except (TypeError, ValueError):
            pass

        abv = None
        try:
            abv = float(item.get("abv")) if item.get("abv") is not None else None
        except (TypeError, ValueError):
            abv = None

        product = ProductModel(
            name=name,
            description=item.get("description", ""),
            price=round(price, 2),
            category=item.get("category", "Beer"),
            image_url=item.get("image", None),
            stock_quantity=50,
            abv=abv,
            origin=item.get("country", None),
            brewery=item.get("brewery", None),
            style=item.get("style", None),
            created_at=datetime.utcnow(),
        )
        db.session.add(product)
        count += 1

    db.session.commit()
    print(f"✅ Database initialized with {count} products.")
