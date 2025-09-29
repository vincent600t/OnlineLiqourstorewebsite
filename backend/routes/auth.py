from flask import Blueprint, request, jsonify
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity

def create_auth_routes(db, UserModel, bcrypt):
    auth_bp = Blueprint("auth", __name__, url_prefix="/api/auth")

    # -------------------------------------------------------------------------
    # Register new user
    # -------------------------------------------------------------------------
    @auth_bp.route("/register", methods=["POST"])
    def register():
        data = request.get_json() or {}
        name = data.get("name")
        email = data.get("email")
        password = data.get("password")

        if not name or not email or not password:
            return jsonify({"error": "Name, email, and password are required"}), 400

        if UserModel.query.filter_by(email=email).first():
            return jsonify({"error": "Email already registered"}), 400

        hashed_pw = bcrypt.generate_password_hash(password).decode("utf-8")
        new_user = UserModel(name=name, email=email, password_hash=hashed_pw)
        db.session.add(new_user)
        db.session.commit()

        user_data = new_user.to_dict()
        user_data.pop("password_hash", None)

        return jsonify({
            "message": "User registered successfully",
            "user": user_data
        }), 201

    # -------------------------------------------------------------------------
    # Login user
    # -------------------------------------------------------------------------
    @auth_bp.route("/login", methods=["POST"])
    def login():
        data = request.get_json() or {}
        email = data.get("email")
        password = data.get("password")

        user = UserModel.query.filter_by(email=email).first()
        if not user or not bcrypt.check_password_hash(user.password_hash, password):
            return jsonify({"error": "Invalid email or password"}), 401

        access_token = create_access_token(identity=user.id)
        user_data = user.to_dict()
        user_data.pop("password_hash", None)

        return jsonify({
            "message": "Login successful",
            "access_token": access_token,
            "user": user_data
        }), 200

    # -------------------------------------------------------------------------
    # Protected route: get current user
    # -------------------------------------------------------------------------
    @auth_bp.route("/me", methods=["GET"])
    @jwt_required()
    def get_current_user():
        user_id = get_jwt_identity()
        user = UserModel.query.get(user_id)
        if not user:
            return jsonify({"error": "User not found"}), 404
        user_data = user.to_dict()
        user_data.pop("password_hash", None)
        return jsonify(user_data), 200

    return auth_bp