from datetime import datetime

class User:
    """Factory for User model"""

    @staticmethod
    def create_model(db):
        class UserModel(db.Model):
            __tablename__ = 'users'

            id = db.Column(db.Integer, primary_key=True)
            name = db.Column(db.String(100), nullable=False)
            email = db.Column(db.String(120), unique=True, nullable=False)
            password_hash = db.Column(db.String(128), nullable=False)
            created_at = db.Column(db.DateTime, default=datetime.utcnow)

            # Relationships (only CartItem backref will handle this)
            # user.cart_items will be accessible automatically

            def __repr__(self):
                return f"<User {self.email}>"

            def to_dict(self):
                return {
                    'id': self.id,
                    'name': self.name,
                    'email': self.email,
                    'created_at': self.created_at.isoformat() if self.created_at else None
                }

        return UserModel
