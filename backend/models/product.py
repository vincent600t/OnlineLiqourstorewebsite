from datetime import datetime

class Product:
    """Factory for Product model"""

    @staticmethod
    def create_model(db):
        class ProductModel(db.Model):
            __tablename__ = 'products'  # ✅ fixed

            id = db.Column(db.Integer, primary_key=True)
            name = db.Column(db.String(100), nullable=False)
            description = db.Column(db.Text, nullable=True)
            price = db.Column(db.Float, nullable=False)
            category = db.Column(db.String(50), nullable=False)

            # Media
            image_url = db.Column(db.String(200), nullable=True)

            # Inventory
            stock_quantity = db.Column(db.Integer, default=0)

            # Beer-specific details
            abv = db.Column(db.Float, nullable=True)
            origin = db.Column(db.String(100), nullable=True)
            brewery = db.Column(db.String(100), nullable=True)
            style = db.Column(db.String(100), nullable=True)

            # Ratings
            rating = db.Column(db.Float, default=0.0)
            total_ratings = db.Column(db.Integer, default=0)
            rating_sum = db.Column(db.Integer, default=0)

            # Timestamps
            created_at = db.Column(db.DateTime, default=datetime.utcnow)
            updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

            # Relationships (cart_items backref will attach here)
            # product.cart_items will be accessible

            def __repr__(self):  # ✅ fixed
                return f"<Product {self.name}>"

            def to_dict(self):
                return {
                    'id': self.id,
                    'name': self.name,
                    'description': self.description,
                    'price': self.price,
                    'category': self.category,
                    'image_url': self.image_url,
                    'stock_quantity': self.stock_quantity,
                    'abv': self.abv,
                    'origin': self.origin,
                    'brewery': self.brewery,
                    'style': self.style,
                    'rating': round(self.rating, 1),
                    'total_ratings': self.total_ratings,
                    'in_stock': self.stock_quantity > 0
                }

            def update_rating(self, new_rating):
                if new_rating < 1 or new_rating > 5:
                    raise ValueError("Rating must be between 1 and 5")

                self.rating_sum += new_rating
                self.total_ratings += 1
                self.rating = self.rating_sum / self.total_ratings
                self.updated_at = datetime.utcnow()
                return self.rating

            def is_in_stock(self):
                return self.stock_quantity > 0

        return ProductModel
