from flask import Blueprint, request, jsonify
from sqlalchemy import or_


def create_product_routes(db, ProductModel):
    # ✅ fixed _name_ → __name__
    product_bp = Blueprint("products", __name__, url_prefix="/api/products")

    # -------------------------------------------------------------------------
    # Get all products or filter by category
    # -------------------------------------------------------------------------
    @product_bp.route("/", methods=["GET"])
    def get_products():
        category = request.args.get("category")

        if category:
            products = ProductModel.query.filter_by(category=category).all()
        else:
            products = ProductModel.query.all()

        return jsonify({
            "products": [p.to_dict() for p in products],
            "total": len(products)
        })


    # -------------------------------------------------------------------------
    # Search products
    # -------------------------------------------------------------------------
    @product_bp.route("/search", methods=["GET"])
    def search_products():
        query = request.args.get("q", "")
        if not query:
            return jsonify({"error": "Search query required"}), 400

        search_term = f"%{query}%"
        products = ProductModel.query.filter(
            or_(
                ProductModel.name.ilike(search_term),
                ProductModel.description.ilike(search_term),
                ProductModel.brewery.ilike(search_term),
                ProductModel.category.ilike(search_term)
            )
        ).all()

        return jsonify({
            "products": [p.to_dict() for p in products],
            "query": query,
            "total": len(products)
        })

    # -------------------------------------------------------------------------
    # Get all categories
    # -------------------------------------------------------------------------
    @product_bp.route("/categories", methods=["GET"])
    def get_categories():
        categories = db.session.query(ProductModel.category).distinct().all()
        category_list = [c[0] for c in categories]

        return jsonify({
            "categories": category_list,
            "total": len(category_list)
        })

    return product_bp
