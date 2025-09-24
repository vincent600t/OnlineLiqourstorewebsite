import requests
from datetime import datetime

# CocktailDB API Base URL
COCKTAILDB_BASE_URL = "https://www.thecocktaildb.com/api/json/v1/1"


def fetch_cocktail_data(name=None):
    """Fetch cocktail data from TheCocktailDB API"""
    params = {"s": name or ""}  # search by cocktail name (empty returns many)

    endpoint = "/search.php"
    url = f"{COCKTAILDB_BASE_URL}{endpoint}"

    try:
        resp = requests.get(url, params=params, timeout=10)
        print("🔎 Request URL:", resp.url)
        print("🔎 Status Code:", resp.status_code)
        print("🔎 Response:", resp.text[:500])  # preview response

        resp.raise_for_status()
        return resp.json()
    except requests.exceptions.RequestException as e:
        print(f"❌ Error fetching cocktail data: {e}")
        return None


def initialize_data(db, ProductModel):
    """Populate database with sample cocktails from TheCocktailDB"""
    print("🚀 Initializing product data from TheCocktailDB...")

    cocktail_data = fetch_cocktail_data("margarita")
    if not cocktail_data:
        print("⚠️ No cocktail data fetched.")
        return

    items = cocktail_data.get("drinks")
    if items is None:
        print("⚠️ Cocktail data structure didn't match: no 'drinks' key.")
        return

    count = 0
    for item in items:
        name = item.get("strDrink")
        if not name:
            continue

        # Avoid duplicates
        if ProductModel.query.filter_by(name=name).first():
            continue

        # CocktailDB doesn’t provide price → set default or random
        price = 12.0  

        product = ProductModel(
            name=name,
            description=item.get("strInstructions", ""),
            price=round(price, 2),
            category="Cocktail",
            image_url=item.get("strDrinkThumb"),
            stock_quantity=50,
            abv=None,  # CocktailDB doesn’t usually provide ABV
            origin=item.get("strArea", None),  # Not usually available
            brewery=None,
            style=item.get("strCategory", "Mixed Drink"),
            created_at=datetime.utcnow(),
        )
        db.session.add(product)
        count += 1

    db.session.commit()
    print(f"✅ Database initialized with {count} cocktails.")
