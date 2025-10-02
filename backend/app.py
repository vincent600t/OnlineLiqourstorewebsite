from flask import Flask, jsonify, send_from_directory
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager
from datetime import timedelta
import os

from models import init_models
from utils.data_initializer import initialize_data
from routes.auth import create_auth_routes
from routes import register_routes
from routes.category_api import category_bp  # ✅ existing category blueprint

app = Flask(
    __name__,
    static_folder="../frontend/build",   # ✅ React build folder
    static_url_path="/"
)

# ------------------- Config -------------------
app.config['SECRET_KEY'] = os.getenv("APP_SECRET_KEY", "dev-secret-key")
app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv("DATABASE_URL", "sqlite:///blackwhite_spirits.db")
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['JWT_SECRET_KEY'] = os.getenv("JWT_SECRET_KEY", "jwt-secret-string-change-this")
app.config['JWT_ACCESS_TOKEN_EXPIRES'] = timedelta(hours=24)

db = SQLAlchemy(app)
bcrypt = Bcrypt(app)
jwt = JWTManager(app)
CORS(app)

# ------------------- Models -------------------
UserModel, ProductModel, CartItemModel, RatingModel = init_models(db)

# ------------------- Routes -------------------
register_routes(app, db, UserModel, ProductModel, CartItemModel, RatingModel)

auth_bp = create_auth_routes(db, UserModel, bcrypt)
app.register_blueprint(auth_bp)
app.register_blueprint(category_bp)

@app.route("/api/health")
def health_check():
    try:
        db.session.execute("SELECT 1")
        db_status = "connected"
    except Exception:
        db_status = "disconnected"
    return jsonify({"status": "healthy", "database": db_status})

# ------------------- React Frontend -------------------
@app.route("/", defaults={"path": ""})
@app.route("/<path:path>")
def serve_react(path):
    """
    Serves the React build (frontend/build).
    If path doesn't exist, fall back to index.html (React Router support).
    """
    if path != "" and os.path.exists(os.path.join(app.static_folder, path)):
        return send_from_directory(app.static_folder, path)
    else:
        return send_from_directory(app.static_folder, "index.html")

# ------------------- Main -------------------
if __name__ == "__main__":
    with app.app_context():
        db.create_all()
        if ProductModel.query.count() == 0:
            initialize_data(db, ProductModel)

    app.run(debug=True, host="0.0.0.0", port=5000)
