import os
import base64
import requests
from datetime import datetime
from dotenv import load_dotenv
from flask import Flask, request, jsonify

# Load environment variables
load_dotenv()

# M-Pesa credentials
MPESA_CONSUMER_KEY = os.getenv("MPESA_CONSUMER_KEY")
MPESA_CONSUMER_SECRET = os.getenv("MPESA_CONSUMER_SECRET")
MPESA_SHORTCODE = os.getenv("MPESA_SHORTCODE", "174379")
MPESA_PASSKEY = os.getenv("MPESA_PASSKEY")
MPESA_BASE_URL = os.getenv("MPESA_BASE_URL", "https://sandbox.safaricom.co.ke")
CALLBACK_URL = os.getenv("CALLBACK_URL", "https://mydomain.com/pat")

# Flask app (for handling callbacks)
app = Flask(_name_)


def get_access_token():
    """Generate access token using consumer key and secret"""
    url = f"{MPESA_BASE_URL}/oauth/v1/generate?grant_type=client_credentials"
    response = requests.get(url, auth=(MPESA_CONSUMER_KEY, MPESA_CONSUMER_SECRET))
    response.raise_for_status()
    return response.json().get("access_token")


def lipa_na_mpesa(phone_number, amount, account_reference="OnlineOrder", transaction_desc="Payment"):
    """Initiate Lipa Na M-Pesa STK Push"""
    access_token = get_access_token()

    # Timestamp
    timestamp = datetime.now().strftime("%Y%m%d%H%M%S")

    # Password (Shortcode + Passkey + Timestamp → Base64)
    password = base64.b64encode((MPESA_SHORTCODE + MPESA_PASSKEY + timestamp).encode()).decode("utf-8")

    payload = {
        "BusinessShortCode": int(MPESA_SHORTCODE),
        "Password": password,
        "Timestamp": timestamp,
        "TransactionType": "CustomerPayBillOnline",
        "Amount": amount,
        "PartyA": phone_number,  # customer phone number
        "PartyB": int(MPESA_SHORTCODE),
        "PhoneNumber": phone_number,
        "CallBackURL": CALLBACK_URL,
        "AccountReference": account_reference,
        "TransactionDesc": transaction_desc
    }

    headers = {"Authorization": f"Bearer {access_token}"}
    stk_url = f"{MPESA_BASE_URL}/mpesa/stkpush/v1/processrequest"

    response = requests.post(stk_url, json=payload, headers=headers)
    response.raise_for_status()
    return response.json()


@app.route("/pat", methods=["POST"])
def mpesa_callback():
    """Handle M-Pesa STK Push callback"""
    data = request.get_json()
    print("Callback received:", data)

    # Example: you can store this in a database for transaction tracking
    result_code = data.get("Body", {}).get("stkCallback", {}).get("ResultCode")
    result_desc = data.get("Body", {}).get("stkCallback", {}).get("ResultDesc")

    return jsonify({
        "ResultCode": result_code,
        "ResultDesc": result_desc
    })


if _name_ == "_main_":
    # Example test call (replace with real phone number in format 2547XXXXXXXX)
    # print(lipa_na_mpesa("254712345678", 10))

    app.run(port=5000, debug=True)