from flask import Blueprint, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity


def create_order_routes(db, OrderModel, OrderItemModel):
    order_bp = Blueprint("orders", __name__, url_prefix="/api/orders")

    # -------------------------------------------------------------------------
    # List all orders for current user
    # -------------------------------------------------------------------------
    @order_bp.route("/", methods=["GET"])
    @jwt_required()
    def get_orders():
        user_id = get_jwt_identity()
        orders = OrderModel.query.filter_by(user_id=user_id).all()
        return jsonify([order.to_dict() for order in orders])

    # -------------------------------------------------------------------------
    # Get single order details
    # -------------------------------------------------------------------------
    @order_bp.route("/<int:order_id>", methods=["GET"])
    @jwt_required()
    def get_order(order_id):
        user_id = get_jwt_identity()
        order = OrderModel.query.filter_by(id=order_id, user_id=user_id).first()

        if not order:
            return jsonify({"error": "Order not found"}), 404

        return jsonify(order.to_dict())

    return order_bp
