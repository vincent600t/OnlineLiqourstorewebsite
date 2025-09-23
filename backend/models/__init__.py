from .user import User
from .product import Product
from .cart import CartItem
from .rating import Rating

def init_models(db):
    """
    Initialize all models with SQLAlchemy and return them
    """

    UserModel = User.create_model(db)
    ProductModel = Product.create_model(db)
    CartItemModel = CartItem.create_model(db, UserModel, ProductModel)
    RatingModel = Rating.create_model(db, UserModel, ProductModel)

    return UserModel, ProductModel, CartItemModel, RatingModel
