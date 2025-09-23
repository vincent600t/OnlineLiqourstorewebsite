from .auth import create_auth_routes
from .products import create_product_routes
from .cart import create_cart_routes
from .ratings import create_rating_routes


def register_routes(app, db, UserModel, ProductModel, CartItemModel, RatingModel):
    """
    Register all route blueprints with the Flask app.
    """
    # Auth routes
    app.register_blueprint(create_auth_routes(db, UserModel))

    # Product routes
    app.register_blueprint(create_product_routes(db, ProductModel))

    # Cart routes
    app.register_blueprint(create_cart_routes(db, UserModel, ProductModel, CartItemModel))

    # Rating routes
    app.register_blueprint(create_rating_routes(db, UserModel, ProductModel, RatingModel))