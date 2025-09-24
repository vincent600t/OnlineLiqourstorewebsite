from flask import Blueprint, jsonify
import requests, random

category_bp = Blueprint("category", __name__)

COCKTAIL_API_KEY = "1"  # Free key from TheCocktailDB


# ✅ Get all categories
@category_bp.route("/api/categories", methods=["GET"])
def get_categories():
    url = f"https://www.thecocktaildb.com/api/json/v1/{COCKTAIL_API_KEY}/list.php?c=list"

    try:
        resp = requests.get(url, timeout=5)
        resp.raise_for_status()
        data = resp.json()
    except requests.RequestException as e:
        print("Error fetching categories:", e)
        return jsonify([])  # Always return an array

    categories = []
    for item in data.get("drinks", []) or []:
        cat = item.get("strCategory")
        categories.append({
            "id": cat.replace(" ", "_"),   # safer for URLs
            "name": cat,
            # could randomize or map to category images later
            "image": "https://www.thecocktaildb.com/images/media/drink/vrwquq1478252802.jpg"
        })

    return jsonify(categories)


# ✅ Get products by category
@category_bp.route("/api/products/<category_id>", methods=["GET"])
def get_products_by_category(category_id):
    category_name = category_id.replace("_", " ")
    url = f"https://www.thecocktaildb.com/api/json/v1/{COCKTAIL_API_KEY}/filter.php?c={category_name}"

    try:
        resp = requests.get(url, timeout=5)
        resp.raise_for_status()
        data = resp.json()
    except requests.RequestException as e:
        print("Error fetching products:", e)
        return jsonify([])

    products = []
    for item in data.get("drinks", []) or []:
        products.append({
            "id": item.get("idDrink"),
            "name": item.get("strDrink"),
            "image": item.get("strDrinkThumb"),
            "price": round(random.uniform(8, 25), 2)  # mock random price
        })

    return jsonify(products)  # Always return an array
