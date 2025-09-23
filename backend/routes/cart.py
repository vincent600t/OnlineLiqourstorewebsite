from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from models.order import Order


def create_cart_routes(db, UserModel, ProductModel, CartItemModel):
    cart_bp = Blueprint("cart", _name_, url_prefix="/api/cart")

    # Import Order + OrderItem models
    OrderModel, OrderItemModel = Order.create_model(db, UserModel, ProductModel)

    # -------------------------------------------------------------------------
    # Get all cart items for current user
    # -------------------------------------------------------------------------
    @cart_bp.route("/", methods=["GET"])
    @jwt_required()
    def get_cart():
        user_id = get_jwt_identity()
        items = CartItemModel.query.filter_by(user_id=user_id).all()
        return jsonify([item.to_dict() for item in items])

    # -------------------------------------------------------------------------
    # Add item to cart
    # -------------------------------------------------------------------------
    @cart_bp.route("/add", methods=["POST"])
    @jwt_required()
    def add_to_cart():
        user_id = get_jwt_identity()
        data = request.get_json()
        product_id = data.get("product_id")
        quantity = int(data.get("quantity", 1))

        product = ProductModel.query.get(product_id)
        if not product:
            return jsonify({"error": "Product not found"}), 404

        if product.stock_quantity < quantity:
            return jsonify({"error": "Not enough stock available"}), 400

        cart_item = CartItemModel.query.filter_by(user_id=user_id, product_id=product_id).first()
        if cart_item:
            cart_item.quantity += quantity
        else:
            cart_item = CartItemModel(user_id=user_id, product_id=product_id, quantity=quantity)
            db.session.add(cart_item)

        db.session.commit()
        return jsonify({"message": "Item added to cart", "cart_item": cart_item.to_dict()})

    # -------------------------------------------------------------------------
    # Update item quantity
    # -------------------------------------------------------------------------
    @cart_bp.route("/update/<int:cart_item_id>", methods=["PUT"])
    @jwt_required()
    def update_cart_item(cart_item_id):
        user_id = get_jwt_identity()
        data = request.get_json()
        quantity = int(data.get("quantity", 1))

        cart_item = CartItemModel.query.filter_by(id=cart_item_id, user_id=user_id).first()
        if not cart_item:
            return jsonify({"error": "Cart item not found"}), 404

        if cart_item.product.stock_quantity < quantity:
            return jsonify({"error": "Not enough stock available"}), 400

        cart_item.quantity = quantity
        db.session.commit()
        return jsonify({"message": "Cart item updated", "cart_item": cart_item.to_dict()})

    # -------------------------------------------------------------------------
    # Remove item from cart
    # -------------------------------------------------------------------------
    @cart_bp.route("/remove/<int:cart_item_id>", methods=["DELETE"])
    @jwt_required()
    def remove_cart_item(cart_item_id):
        user_id = get_jwt_identity()
        cart_item = CartItemModel.query.filter_by(id=cart_item_id, user_id=user_id).first()

        if not cart_item:
            return jsonify({"error": "Cart item not found"}), 404

        db.session.delete(cart_item)
        db.session.commit()
        return jsonify({"message": "Item removed from cart"})

    # -------------------------------------------------------------------------
    # Checkout (convert cart → order)
    # -------------------------------------------------------------------------
    @cart_bp.route("/checkout", methods=["POST"])
    @jwt_required()
    def checkout():
        user_id = get_jwt_identity()
        cart_items = CartItemModel.query.filter_by(user_id=user_id).all()

        if not cart_items:
            return jsonify({"error": "Cart is empty"}), 400

        # Create new order
        new_order = OrderModel(user_id=user_id, total_price=0.0, status="paid")
        db.session.add(new_order)

        total_price = 0
        for item in cart_items:
            product = item.product
            if product.stock_quantity < item.quantity:
                return jsonify({
                    "error": f"Not enough stock for {product.name}. Available: {product.stock_quantity}"
                }), 400

            # Deduct stock
            product.stock_quantity -= item.quantity

            # Create order item
            order_item = OrderItemModel(
                order=new_order,
                product_id=product.id,
                quantity=item.quantity,
                price=product.price
            )
            db.session.add(order_item)

            total_price += product.price * item.quantity

        # Update order total
        new_order.total_price = total_price

        # Clear cart
        for item in cart_items:
            db.session.delete(item)

        db.session.commit()

        return jsonify({
            "message": "Checkout successful",
            "order": new_order.to_dict()
        })

    return cart_bp