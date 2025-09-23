from datetime import datetime

class CartItem:
    """Factory for CartItem model"""

    @staticmethod
    def create_model(db, UserModel, ProductModel):
        class CartItemModel(db.Model):
            _tablename_ = 'cart_items'

            id = db.Column(db.Integer, primary_key=True)
            user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
            product_id = db.Column(db.Integer, db.ForeignKey('products.id'), nullable=False)
            quantity = db.Column(db.Integer, default=1, nullable=False)
            added_at = db.Column(db.DateTime, default=datetime.utcnow)

            # ✅ Relationships with backrefs
            user = db.relationship('UserModel', backref='cart_items')
            product = db.relationship('ProductModel', backref='cart_items')

            def _repr_(self):
                return f"<CartItem user={self.user_id} product={self.product_id} qty={self.quantity}>"

            def to_dict(self):
                return {
                    'id': self.id,
                    'user_id': self.user_id,
                    'product_id': self.product_id,
                    'quantity': self.quantity,
                    'added_at': self.added_at.isoformat() if self.added_at else None,
                    'product': self.product.to_dict() if self.product else None
                }

        return CartItemModel