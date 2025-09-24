from flask import Blueprint, jsonify
import requests

category_bp = Blueprint("category", __name__)

COCKTAIL_API_KEY = "1"  # Free key from TheCocktailDB


# ✅ Get all categories
@category_bp.route("/api/categories", methods=["GET"])
def get_categories():
    url = f"https://www.thecocktaildb.com/api/json/v1/{COCKTAIL_API_KEY}/list.php?c=list"
    resp = requests.get(url)
    data = resp.json()

    categories = []
    for item in data.get("drinks", []):
        cat = item.get("strCategory")
        categories.append({
            "id": cat.replace(" ", "_"),   # safer for URLs
            "name": cat,
            "image": f"https://www.thecocktaildb.com/images/media/drink/vrwquq1478252802.jpg"  # fallback image
        })

    return jsonify(categories)


# ✅ Get products by category
@category_bp.route("/api/products/<category_id>", methods=["GET"])
def get_products_by_category(category_id):
    # category_id will be like "Ordinary_Drink"
    category_name = category_id.replace("_", " ")

    url = f"https://www.thecocktaildb.com/api/json/v1/{COCKTAIL_API_KEY}/filter.php?c={category_name}"
    resp = requests.get(url)
    data = resp.json()

    products = []
    for item in data.get("drinks", []):
        products.append({
            "id": item.get("idDrink"),
            "name": item.get("strDrink"),
            "image": item.get("strDrinkThumb"),
            "price": 10  # mock price since API has none
        })

    return jsonify(products)
