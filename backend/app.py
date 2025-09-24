from flask import Flask, jsonify
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager
from datetime import timedelta
import os

# Import local modules
from models import init_models
from routes import register_routes
from utils.data_initializer import initialize_data

# ✅ Import the new categories blueprint
from routes.category_ap import category_bp  

# -----------------------------------------------------------------------------
# Flask App Initialization
# -----------------------------------------------------------------------------
app = Flask(__name__)

# Configuration (use env vars if available)
app.config['SECRET_KEY'] = os.getenv("APP_SECRET_KEY", "dev-secret-key")
app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv("DATABASE_URL", "sqlite:///blackwhite_spirits.db")
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['JWT_SECRET_KEY'] = os.getenv("JWT_SECRET_KEY", "jwt-secret-string-change-this")
app.config['JWT_ACCESS_TOKEN_EXPIRES'] = timedelta(hours=24)

# Extensions
db = SQLAlchemy(app)
bcrypt = Bcrypt(app)
jwt = JWTManager(app)
CORS(app)

# -----------------------------------------------------------------------------
# Models Initialization
# -----------------------------------------------------------------------------
UserModel, ProductModel, CartItemModel, RatingModel = init_models(db)

# -----------------------------------------------------------------------------
# Routes Initialization
# -----------------------------------------------------------------------------
register_routes(app, db, UserModel, ProductModel, CartItemModel, RatingModel)

# ✅ Register category API routes
app.register_blueprint(category_bp)

# -----------------------------------------------------------------------------
# Health & Root Endpoints
# -----------------------------------------------------------------------------
@app.route("/")
def home():
    return jsonify({
        "message": "Welcome to Black & White Spirits API",
        "status": "success",
        "version": "1.0.0"
    })

@app.route("/health")
def health_check():
    return jsonify({
        "status": "healthy",
        "database": "connected"
    })

# -----------------------------------------------------------------------------
# Main Entrypoint
# -----------------------------------------------------------------------------
if __name__ == "__main__":
    with app.app_context():
        db.create_all()

        # Initialize products only if DB is empty
        if ProductModel.query.count() == 0:
            initialize_data(db, ProductModel)

    app.run(debug=True, host="0.0.0.0", port=5000)
