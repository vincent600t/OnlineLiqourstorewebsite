from datetime import datetime

class Rating:
    """Factory for Rating model"""

    @staticmethod
    def create_model(db, UserModel, ProductModel):
        class RatingModel(db.Model):
            __tablename__ = "ratings"  # ✅ fixed

            id = db.Column(db.Integer, primary_key=True)

            # Foreign keys
            user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
            product_id = db.Column(db.Integer, db.ForeignKey("products.id"), nullable=False)

            # Fields
            rating = db.Column(db.Integer, nullable=False)  # 1–5 stars
            comment = db.Column(db.Text, nullable=True)
            created_at = db.Column(db.DateTime, default=datetime.utcnow)

            # Relationships
            user = db.relationship(UserModel, backref="ratings")
            product = db.relationship(ProductModel, backref="ratings")

            def __repr__(self):  # ✅ fixed
                return f"<Rating {self.rating} stars by User {self.user_id} on Product {self.product_id}>"

            def to_dict(self):
                """Return rating info for API"""
                return {
                    "id": self.id,
                    "user_id": self.user_id,
                    "user_name": self.user.name if self.user else None,
                    "product_id": self.product_id,
                    "rating": self.rating,
                    "comment": self.comment,
                    "created_at": self.created_at.isoformat() if self.created_at else None,
                }

        return RatingModel
