from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Fake product database
products = [
    {"id": 1, "name": "Johnnie Walker Black Label", "price": 35.99, "image": "https://via.placeholder.com/300x200", "category": "whiskey"},
    {"id": 2, "name": "Jack Daniel's Old No. 7", "price": 25.99, "image": "https://via.placeholder.com/300x200", "category": "whiskey"},
    {"id": 3, "name": "Jameson Irish Whiskey", "price": 29.99, "image": "https://via.placeholder.com/300x200", "category": "whiskey"},
    {"id": 4, "name": "Absolut Vodka", "price": 22.99, "image": "https://via.placeholder.com/300x200", "category": "vodka"},
    {"id": 5, "name": "Smirnoff Vodka", "price": 19.99, "image": "https://via.placeholder.com/300x200", "category": "vodka"},
    {"id": 6, "name": "Heineken", "price": 12.99, "image": "https://via.placeholder.com/300x200", "category": "beer"},
    {"id": 7, "name": "Guinness", "price": 14.99, "image": "https://via.placeholder.com/300x200", "category": "beer"},
    {"id": 8, "name": "Bacardi Rum", "price": 24.99, "image": "https://via.placeholder.com/300x200", "category": "rum"},
    {"id": 9, "name": "Captain Morgan Rum", "price": 26.99, "image": "https://via.placeholder.com/300x200", "category": "rum"},
    {"id": 10, "name": "Tanqueray Gin", "price": 27.99, "image": "https://via.placeholder.com/300x200", "category": "gin"},
]

@app.route("/api/products/<category>", methods=["GET"])
def get_products_by_category(category):
    category_products = [p for p in products if p["category"].lower() == category.lower()]
    return jsonify(category_products)

if __name__ == "__main__":
    app.run(debug=True)
