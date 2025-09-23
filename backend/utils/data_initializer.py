import requests
from datetime import datetime

# RapidAPI Configuration
RAPIDAPI_KEY = "b5b47d106dmsha17c36fb6f54fb6p1c40e2jsn9067272e16a1"
RAPIDAPI_HOST = "beer9.p.rapidapi.com"
RAPIDAPI_BASE_URL = "https://beer9.p.rapidapi.com"


def fetch_beer_data(brewery=None):
    """Fetch beer data from RapidAPI"""
    headers = {
        "X-RapidAPI-Key": RAPIDAPI_KEY,
        "X-RapidAPI-Host": RAPIDAPI_HOST,
    }

    params = {}
    if brewery:
        params["brewery"] = brewery

    try:
        response = requests.get(
            f"{RAPIDAPI_BASE_URL}/search",
            headers=headers,
            params=params,
            timeout=10,
        )
        response.raise_for_status()
        return response.json()
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

    count = 0
    for item in beer_data.get("data", []):
        if not ProductModel.query.filter_by(name=item.get("name")).first():
            product = ProductModel(
                name=item.get("name", "Unnamed"),
                description=item.get("description", ""),
                price=round(float(item.get("price", 10.0)), 2),  # fallback price
                category="Beer",
                image_url=item.get("image", None),
                stock_quantity=50,
                abv=float(item.get("abv", 0)) if item.get("abv") else None,
                origin=item.get("country", None),
                brewery=item.get("brewery", None),
                style=item.get("style", None),
                created_at=datetime.utcnow(),
            )
            db.session.add(product)
            count += 1

    db.session.commit()
    print(f"✅ Database initialized with {count} products.")
