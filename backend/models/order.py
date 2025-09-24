from datetime import datetime

class Order:
    """Factory for Order and OrderItem models"""

    @staticmethod
    def create_model(db, UserModel, ProductModel):
        class OrderModel(db.Model):
            __tablename__ = "orders"  # ✅ fixed

            id = db.Column(db.Integer, primary_key=True)
            user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
            total_price = db.Column(db.Float, nullable=False, default=0.0)
            status = db.Column(db.String(50), default="pending")  # pending, paid, shipped, completed, cancelled
            created_at = db.Column(db.DateTime, default=datetime.utcnow)

            # Relationships
            user = db.relationship(UserModel, backref="orders")  # ✅ use actual class
            items = db.relationship("OrderItemModel", backref="order", cascade="all, delete-orphan")

            def __repr__(self):  # ✅ fixed
                return f"<Order {self.id} - User {self.user_id}>"

            def to_dict(self):
                return {
                    "id": self.id,
                    "user_id": self.user_id,
                    "total_price": round(self.total_price, 2),
                    "status": self.status,
                    "created_at": self.created_at.isoformat(),
                    "items": [item.to_dict() for item in self.items],
                }

        class OrderItemModel(db.Model):
            __tablename__ = "order_items"  # ✅ fixed

            id = db.Column(db.Integer, primary_key=True)
            order_id = db.Column(db.Integer, db.ForeignKey("orders.id"), nullable=False)
            product_id = db.Column(db.Integer, db.ForeignKey("products.id"), nullable=False)
            quantity = db.Column(db.Integer, nullable=False, default=1)
            price = db.Column(db.Float, nullable=False)  # snapshot price at time of order

            # Relationship to Product
            product = db.relationship(ProductModel)  # ✅ use actual class

            def __repr__(self):  # ✅ fixed
                return f"<OrderItem {self.id} - Order {self.order_id}>"

            def to_dict(self):
                return {
                    "id": self.id,
                    "product_id": self.product_id,
                    "name": self.product.name if self.product else None,
                    "quantity": self.quantity,
                    "price": round(self.price, 2),
                }

        return OrderModel, OrderItemModel
