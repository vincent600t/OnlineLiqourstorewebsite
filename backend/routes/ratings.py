from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity


def create_rating_routes(db, UserModel, ProductModel, RatingModel):
    rating_bp = Blueprint("ratings", __name__, url_prefix="/api/ratings")

    # -------------------------------------------------------------------------
    # Add a rating to a product
    # -------------------------------------------------------------------------
    @rating_bp.route("/<int:product_id>", methods=["POST"])
    @jwt_required()
    def add_rating(product_id):
        user_id = get_jwt_identity()
        data = request.get_json()
        rating_value = data.get("rating")
        comment = data.get("comment", "")

        if not rating_value or not (1 <= rating_value <= 5):
            return jsonify({"error": "Rating must be between 1 and 5"}), 400

        product = ProductModel.query.get(product_id)
        if not product:
            return jsonify({"error": "Product not found"}), 404

        # Check if user already rated this product
        existing = RatingModel.query.filter_by(user_id=user_id, product_id=product_id).first()
        if existing:
            return jsonify({"error": "You have already rated this product"}), 400

        new_rating = RatingModel(
            user_id=user_id,
            product_id=product_id,
            rating=rating_value,
            comment=comment
        )
        db.session.add(new_rating)

        # Update product's rating stats
        product.rating_sum += rating_value
        product.total_ratings += 1
        product.rating = product.rating_sum / product.total_ratings

        db.session.commit()

        return jsonify({
            "message": "Rating added successfully",
            "rating": new_rating.to_dict(),
            "product": product.to_dict()
        }), 201

    # -------------------------------------------------------------------------
    # Get ratings for a product
    # -------------------------------------------------------------------------
    @rating_bp.route("/<int:product_id>", methods=["GET"])
    def get_product_ratings(product_id):
        product = ProductModel.query.get(product_id)
        if not product:
            return jsonify({"error": "Product not found"}), 404

        ratings = RatingModel.query.filter_by(product_id=product_id).all()
        return jsonify({
            "product": product.to_dict(),
            "ratings": [r.to_dict() for r in ratings],
            "total": len(ratings)
        })

    return rating_bp
