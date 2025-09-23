# models/__init__.py
from .user import User
from .product import Product
from .cart import CartItem  # ✅ match your actual file name
from .rating import Rating

def init_models(db):
    """
    Initialize all models with SQLAlchemy and return them
    """
    # ⚠️ Order matters so FKs can resolve correctly
    UserModel = User.create_model(db)
    ProductModel = Product.create_model(db)
    CartItemModel = CartItem.create_model(db, UserModel, ProductModel)
    RatingModel = Rating.create_model(db, UserModel, ProductModel)

    return UserModel, ProductModel, CartItemModel, RatingModel
