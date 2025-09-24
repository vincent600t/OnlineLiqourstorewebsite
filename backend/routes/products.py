from flask import Blueprint, jsonify

# Create a blueprint for products
products_bp = Blueprint("products", __name__)

# Expanded fake product database
products = [
    # 🥃 Whiskey
    {"id": 1, "name": "Johnnie Walker Black Label", "price": 35.99, "image": "https://d2kf98xxopvf3m.cloudfront.net/sites/files/zicom/images/products/202405/800x900/jwblacklabel12-1.jpeg", "category": "whiskey"},
    {"id": 2, "name": "Jack Daniel's Old No. 7", "price": 25.99, "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_pf4Ur-b3jjIRVcV12n0VOP_OXuVE9afK_g&s", "category": "whiskey"},
    {"id": 3, "name": "Jameson Irish Whiskey", "price": 29.99, "image": "https://images.squarespace-cdn.com/content/v1/55c6cad0e4b01634e0cf48d8/1508649336523-C5WTQMMPXTPFQGO14ZYW/WS-Jamesonoriginal.jpg", "category": "whiskey"},
    {"id": 4, "name": "Chivas Regal 12", "price": 32.99, "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_-PfpS2dzzqFv7YDjbWXfMSX1JVQem92ggg&s", "category": "whiskey"},
    {"id": 5, "name": "Glenfiddich 12", "price": 39.99, "image": "https://www.shutterstock.com/image-photo/bottle-glenfiddich-15-year-old-260nw-2589650989.jpg", "category": "whiskey"},

    # 🍸 Vodka
    {"id": 6, "name": "Absolut Vodka", "price": 22.99, "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS1AKV12BwdPDc46iFh6NHQy3CXTxlcYrzyi66eVtUKL0B4PYeY5Z-uiTPI9onWCMBclog&usqp=CAU", "category": "vodka"},
    {"id": 7, "name": "Smirnoff Vodka", "price": 19.99, "image": "https://images.pexels.com/photos/19589632/pexels-photo-19589632/free-photo-of-bottle-of-vodka-in-the-shadow.jpeg", "category": "vodka"},
    {"id": 8, "name": "Grey Goose Vodka", "price": 45.99, "image": "https://i.pinimg.com/736x/1c/91/de/1c91de25164eeb0f51e792f725c0217b.jpg", "category": "vodka"},
    {"id": 9, "name": "Belvedere Vodka", "price": 49.99, "image": "https://thewineprovidore.com.au/cdn/shop/files/BelvedereVividLightsEditionTheWineProvidore.jpg?v=1716007722&width=1080", "category": "vodka"},

    # 🍺 Beer
    {"id": 10, "name": "Heineken", "price": 12.99, "image": "https://preview.redd.it/njv0rpd2fg851.png?width=640&crop=smart&auto=webp&s=6e5bc24266cbf2375d0ef4f9db834e7caa6f8bd4", "category": "beer"},
    {"id": 11, "name": "Guinness", "price": 14.99, "image": "https://www.packshotfactory.co.uk/black-background-explorer/guinness-glass-beer-pour_001083_p.jpg", "category": "beer"},
    {"id": 12, "name": "Budweiser", "price": 11.99, "image": "https://live.staticflickr.com/1554/25951986653_b85cb79e5d_b.jpg", "category": "beer"},
    {"id": 13, "name": "Corona Extra", "price": 13.99, "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRMiQdEieane-Um0QuXwSSYMsTm9yxZx9JOew&s", "category": "beer"},

    # 🍹 Rum
    {"id": 14, "name": "Bacardi Rum", "price": 24.99, "image": "https://is.zobj.net/image-server/v1/images?r=sxxY_Ny_lsZ7qSDuIVtFGkAUIF2Mi1pjBEPSENjLeFWq0ynwoYIwHvAdthsw4IoC2O5ERCbGRmR8UvLOu7mwzd4IFqxw_XRDWUbrXELruiVbesnsL6GrmLGD2j1jjwSaJJkWqIX-nzcvia3m6QY7-2XBmGPulD6GFcVdi2EyJZ1kVhPZRbZUNx6RgUCi9tmFKgsU2Nk0L8rb1IpEnTii6tt5MEDg62winr1PDw", "category": "rum"},
    {"id": 15, "name": "Captain Morgan Rum", "price": 26.99, "image": "https://static.vecteezy.com/system/resources/previews/031/232/601/large_2x/kharkov-ukraine-december-3-2020-captain-morgan-original-spiced-gold-spirit-drink-bottle-on-dark-black-background-elite-alcohol-free-photo.JPG", "category": "rum"},
    {"id": 16, "name": "Malibu Coconut Rum", "price": 21.99, "image": "https://t3.ftcdn.net/jpg/02/79/97/98/360_F_279979865_JoaUeCMlwLZmrceXe5TtqJXBoUD02TsC.jpg", "category": "rum"},

    # 🍸 Gin
    {"id": 17, "name": "Tanqueray Gin", "price": 27.99, "image": "https://images.pexels.com/photos/9142626/pexels-photo-9142626.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500", "category": "gin"},
    {"id": 18, "name": "Bombay Sapphire", "price": 30.99, "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRKdxmu1QZ8knonNMfHZN0o2ie2Htd29VluCw&s", "category": "gin"},
    {"id": 19, "name": "Hendrick’s Gin", "price": 34.99, "image": "https://as2.ftcdn.net/jpg/03/07/55/41/1000_F_307554176_YgiBDqzYxrMFIVyj73J9BSwBIyBov9CJ.jpg", "category": "gin"},

    # 🥂 Tequila
    {"id": 20, "name": "Jose Cuervo", "price": 28.99, "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBFXZh3kZRFMEXQ3h22WJRhjZBnZhD-ZdJLw&s", "category": "tequila"},
    {"id": 21, "name": "Patrón Silver", "price": 55.99, "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTd0jbtSoC8C7yWtNgEqSzdn3zGBmHvnx-iAw&s", "category": "tequila"},
    {"id": 22, "name": "Don Julio Blanco", "price": 59.99, "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSaTO4OTUVMaVR51otraKlORUc_yIwl1jX3Q&s", "category": "tequila"},

    # 🍷 Wine
    {"id": 23, "name": "Cabernet Sauvignon", "price": 18.99, "image": "https://media.livewallpapers.com/images/high/elegant-cabernet-wine-wallpaper.webp", "category": "wine"},
    {"id": 24, "name": "Pinot Noir", "price": 22.99, "image": "https://images.squarespace-cdn.com/content/v1/5e30bd29b0017835b6acda95/1652868568047-FVWVQYLSA4P3DGSA61IG/clyde-village-pinot-mixed-two-pack.jpg", "category": "wine"},
    {"id": 25, "name": "Chardonnay", "price": 20.99, "image": "https://shop.foleyfoodandwinesociety.com/on/demandware.static/-/Library-Sites-FoleySharedLibrary/default/dw540f8f6e/images/Redesign/pdp/editorial/BN_1.png?sh=375", "category": "wine"},
    {"id": 26, "name": "Merlot", "price": 19.99, "image": "https://monteko.mk/wp-content/uploads/2024/11/Merlot-min.jpg", "category": "wine"},
]

# Route: Get products by category
@products_bp.route("/api/products/<category>", methods=["GET"])
def get_products_by_category(category):
    category_products = [p for p in products if p["category"].lower() == category.lower()]
    return jsonify(category_products)
