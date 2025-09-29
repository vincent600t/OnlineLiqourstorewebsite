from .products import products_bp        # ✅ import blueprint directly
from .cart import create_cart_routes
from .ratings import create_rating_routes

def register_routes(app, db, UserModel, ProductModel, CartItemModel, RatingModel):
    """
    Register all route blueprints with the Flask app.
    """
    # ❌ remove auth here — auth stays in app.py

    # Product routes
    app.register_blueprint(products_bp)   # ✅ use the imported blueprint directly

    # Cart routes
    app.register_blueprint(create_cart_routes(db, UserModel, ProductModel, CartItemModel))

    # Rating routes
    app.register_blueprint(create_rating_routes(db, UserModel, ProductModel, RatingModel))
