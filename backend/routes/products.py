from flask import Blueprint, jsonify

products_bp = Blueprint("products", __name__)

products = [
    # 🥃 Whiskey (IDs 1–15)
    {"id": 1,  "name": "Johnnie Walker Black Label",        "price": 35.99, "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSbmT7m3Qcphztbpx87SSCLKppcdhnmcrcbaA&s", "category": "whiskey"},
    {"id": 2,  "name": "Jack Daniel's Old No. 7",            "price": 25.99, "image": "https://www.shutterstock.com/shutterstock/videos/1063352956/thumb/5.jpg?ip=x480", "category": "whiskey"},
    {"id": 3,  "name": "Jameson Irish Whiskey",              "price": 29.99, "image": "https://static.vecteezy.com/system/resources/previews/031/234/548/large_2x/kharkov-ukraine-december-3-2020-jameson-triple-distilled-irish-whiskey-bottle-on-dark-black-background-elite-alcohol-free-photo.JPG", "category": "whiskey"},
    {"id": 4,  "name": "Chivas Regal 12",                     "price": 32.99, "image": "https://mamasbistro.rs/wp-content/uploads/2020/02/40_Whisky-Chivas-Regal-12YO.jpg", "category": "whiskey"},
    {"id": 5,  "name": "Glenfiddich 12",                      "price": 39.99, "image": "https://www.shutterstock.com/image-photo/bottle-glenfiddich-12-year-old-260nw-2589648111.jpg", "category": "whiskey"},
    {"id": 6,  "name": "Macallan 12 Double Cask",             "price": 64.99, "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxTUYlaJx8kxSe7KRuaZCDDfLUJmOc4553lyygxaBkVEi5sNmGNVAijW-r3zBq1cZFS1M&usqp=CAU", "category": "whiskey"},
    {"id": 7,  "name": "Jim Beam Bourbon",                    "price": 22.99, "image": "https://images.unsplash.com/photo-1671704178304-3fc374f63566?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8amltJTIwYmVhbXxlbnwwfHwwfHx8MA%3D%3D", "category": "whiskey"},
    {"id": 8,  "name": "Woodford Reserve",                    "price": 44.99, "image": "https://dewinespot.co/cdn/shop/products/woodford-reserve-kentucky-bourbon-whiskey-black.jpg?v=1607507144&width=1214", "category": "whiskey"},
    {"id": 9,  "name": "Bushmills Original",                  "price": 27.99, "image": "https://www.shutterstock.com/image-photo/kiev-ukraine-02-november-2018-260nw-1247696158.jpg", "category": "whiskey"},
    {"id": 10, "name": "Crown Royal",                          "price": 31.99, "image": "https://mir-s3-cdn-cf.behance.net/project_modules/1400/03fa5b22615661.560466722c394.jpg", "category": "whiskey"},
    {"id": 11, "name": "Aberlour 12",                          "price": 42.99, "image": "https://r.testifier.nl/Acbs8526SDKI/resizing_type:fit/watermark:Whisky%20Monkeys/width:3840/height:2560/plain/https://s3-newsifier.ams3.digitaloceanspaces.com/whiskymonkeys.com/images/2025-08/aberlour12-review.jpg@webp", "category": "whiskey"},
    {"id": 12, "name": "Lagavulin 16",                         "price": 89.99, "image": "https://vyno.ca/cdn/shop/products/lagavulin-16-year-old-islay-single-malt-scotch-whisky-278463.jpg?v=1700495265&width=2048", "category": "whiskey"},
    {"id": 13, "name": "Ardbeg 10",                            "price": 59.99, "image": "https://cove27.co.nz/cdn/shop/files/Ardbeg-10-Years-Old-Islay-Scotch-Single-Malt-Whisky-700mL-smoke_1024x1024@2x.jpg?v=1758009537", "category": "whiskey"},
    {"id": 14, "name": "Laphroaig 10",                         "price": 54.99, "image": "https://manofmany.com/_next/image?url=https%3A%2F%2Fapi.manofmany.com%2Fwp-content%2Fuploads%2F2024%2F07%2FFeature.jpg&w=1200&q=75", "category": "whiskey"},
    {"id": 15, "name": "Balvenie DoubleWood 12",               "price": 67.99, "image": "https://images.unsplash.com/photo-1631348675908-6b335e3dc28c?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", "category": "whiskey"},

    # 🍸 Vodka (IDs 16–30)
    {"id": 16, "name": "Absolut Vodka",                       "price": 22.99, "image": "https://i.pinimg.com/736x/92/ae/65/92ae65073aabb67cdec147b22c41f21c.jpg", "category": "vodka"},
    {"id": 17, "name": "Smirnoff Vodka",                       "price": 19.99, "image": "https://c0.wallpaperflare.com/preview/677/548/899/smirnoff-vodka-bottle-besides-shot-glass.jpg", "category": "vodka"},
    {"id": 18, "name": "Grey Goose Vodka",                     "price": 45.99, "image": "https://i.pinimg.com/736x/1c/91/de/1c91de25164eeb0f51e792f725c0217b.jpg", "category": "vodka"},
    {"id": 19, "name": "Belvedere Vodka",                      "price": 49.99, "image": "https://m.media-amazon.com/images/I/41FaR6z+bYL._UF1000,1000_QL80_.jpg", "category": "vodka"},
    {"id": 20, "name": "Ciroc Vodka",                          "price": 39.99, "image": "https://cdn.luxe.digital/media/20230119115731/ciroc-vodka-bottle-price-size-luxe-digital.jpg", "category": "vodka"},
    {"id": 21, "name": "Ketel One Vodka",                      "price": 34.99, "image": "https://drinkland.co.nz/wp-content/uploads/2021/02/Ketel-One-Dutch-Vodka-700mL-05.jpg", "category": "vodka"},
    {"id": 22, "name": "Skyy Vodka",                           "price": 21.99, "image": "https://www.singlemalt.ph/cdn/shop/products/KetelOneVodka70clLemonSliceIce_480x480.png?v=1679983727", "category": "vodka"},
    {"id": 23, "name": "Stolichnaya Vodka",                    "price": 28.99, "image": "https://images.pexels.com/photos/19589632/pexels-photo-19589632.jpeg?cs=srgb&dl=pexels-wwarby-19589632.jpg&fm=jpg", "category": "vodka"},
    {"id": 24, "name": "Tito’s Handmade Vodka",                "price": 29.99, "image": "https://titos-next.transforms.svdcdn.com/production/images/recipes/titos-smoky-spirit.jpg?w=1920&h=1080&q=90&auto=format&fit=min&dm=1738698407&s=bba501128b2a9f9894b12205dc205dff", "category": "vodka"},
    {"id": 25, "name": "Russian Standard Vodka",               "price": 31.99, "image": "https://drinkland.co.nz/wp-content/uploads/2020/03/Russian-Standard-Original-Vodka-1-Litre-03.jpg", "category": "vodka"},
    {"id": 26, "name": "Finlandia Vodka",                      "price": 27.99, "image": "https://www.shutterstock.com/image-photo/bottle-vodka-finlandia-finland-on-260nw-2549161479.jpg", "category": "vodka"},
    {"id": 27, "name": "42 Below Vodka",                       "price": 26.99, "image": "https://www.strangerandstranger.com/fileadmin/_processed_/4/c/csm_42below_3_38e1539c3b.jpg", "category": "vodka"},
    {"id": 28, "name": "Crystal Head Vodka",                   "price": 52.99, "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLKUPZtKkrUAm1FKInLC73DsxAJCMxoo5ET6PLbBxXVI4k6DGIRAh4nzB6hJVP6da75OY&usqp=CAU", "category": "vodka"},
    {"id": 29, "name": "Chopin Vodka",                         "price": 47.99, "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRVw4_zQBdYGmAC9KLK0OFdUnKtzpvETYgCVR0WuJ6IApO4BYSYj7dwT1AECxDM9qLl-mQ&usqp=CAU", "category": "vodka"},
    {"id": 30, "name": "Wyborowa Vodka",                       "price": 23.99, "image": "https://i.pinimg.com/736x/4f/a4/f3/4fa4f3dc565641f65c2beb5b95a04cbb.jpg", "category": "vodka"},

    # 🍺 Beer (IDs 31–45)
    {"id": 31, "name": "Heineken",                            "price": 12.99, "image": "https://images.unsplash.com/photo-1599419685838-28e405ea05b9?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8aGVpbmVrZW58ZW58MHx8MHx8fDA%3D", "category": "beer"},
    {"id": 32, "name": "Guinness",                            "price": 14.99, "image": "https://www.shutterstock.com/image-photo/yerevan-armenia-june-10-2023-260nw-2317333177.jpg", "category": "beer"},
    {"id": 33, "name": "Budweiser",                           "price": 11.99, "image": "https://live.staticflickr.com/1554/25951986653_b85cb79e5d_b.jpg", "category": "beer"},
    {"id": 34, "name": "Corona Extra",                        "price": 13.99, "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRMiQdEieane-Um0QuXwSSYMsTm9yxZx9JOew&s", "category": "beer"},
    {"id": 35, "name": "Carlsberg",                           "price": 12.49, "image": "https://thumbs.dreamstime.com/b/bottle-beer-carlsberg-black-background-studio-shooting-vertical-172735141.jpg", "category": "beer"},
    {"id": 36, "name": "Stella Artois",                       "price": 13.49, "image": "https://png.pngtree.com/thumb_back/fh260/background/20220315/pngtree-stella-artois-beer-can-on-dark-barrel-8-words-photo-image_35735000.jpg", "category": "beer"},
    {"id": 37, "name": "Coors Light",                         "price": 11.49, "image": "https://www.shutterstock.com/image-photo/monterreymexico-april-14-2019-bottle-260nw-1369236128.jpg", "category": "beer"},
    {"id": 38, "name": "Pabst Blue Ribbon",                    "price": 10.99, "image": "https://i.pinimg.com/236x/ed/2f/eb/ed2feb532965f4b6ee05d95023c71d0f.jpg", "category": "beer"},
    {"id": 39, "name": "Miller Lite",                         "price": 12.99, "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7NaEnF-tSZPfDUBW9uta9dIXvSqz2eZML8A&s", "category": "beer"},
    {"id": 40, "name": "Asahi Super Dry",                     "price": 14.49, "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcScR9nO9hItJapnMKqif3a8V0dgGNC5zRih5w&s", "category": "beer"},
    {"id": 41, "name": "Bud Light",                           "price": 11.29, "image": "https://thumbs.dreamstime.com/b/sandhurst-united-kingdom-february-th-open-bottle-bud-light-isolated-black-background-alcholic-budweiser-beer-210974526.jpg", "category": "beer"},
    {"id": 42, "name": "Becks",                              "price": 13.19, "image": "https://www.shutterstock.com/image-photo/galati-romania-15062020-bottle-beks-600nw-1756623098.jpg", "category": "beer"},
    {"id": 43, "name": "Guinness Draught (can)",             "price": 13.79, "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8baXpT11wpRvfEytQjCSm-1dEbeNlm1IdNQ&s", "category": "beer"},
    {"id": 44, "name": "Sapporo Premium",                    "price": 14.09, "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS7KrwOcQqGlKhrUVxYBnDsS7-no_fzytDfCg&s", "category": "beer"},
    {"id": 45, "name": "Tiger Beer",                         "price": 13.59, "image": "https://www.shutterstock.com/image-photo/kuala-lumpur-malaysia-may-26-600w-1408216787.jpg", "category": "beer"},

    # 🍹 Rum (IDs 46–60)
    {"id": 46, "name": "Bacardi Rum",                         "price": 24.99, "image": "https://www.shutterstock.com/image-photo/bottle-bacardi-carta-blanca-superior-260nw-2546329719.jpg", "category": "rum"},
    {"id": 47, "name": "Captain Morgan Rum",                  "price": 26.99, "image": "https://static.vecteezy.com/system/resources/previews/031/232/601/large_2x/kharkov-ukraine-december-3-2020-captain-morgan-original-spiced-gold-spirit-drink-bottle-on-dark-black-background-elite-alcohol-free-photo.JPG", "category": "rum"},
    {"id": 48, "name": "Malibu Coconut Rum",                  "price": 21.99, "image": "https://thumbs.dreamstime.com/b/bottle-malibu-206274758.jpg", "category": "rum"},
    {"id": 49, "name": "Mount Gay Rum",                       "price": 29.99, "image": "https://i.pinimg.com/736x/b9/2d/6d/b92d6d3e84143ef45ceeef17757c120a.jpg", "category": "rum"},
    {"id": 50, "name": "Appleton Estate",                     "price": 32.99, "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTmpMPWzRK37-ZBe27GmlLjD-AFd8qDv7eTnA&s", "category": "rum"},
    {"id": 51, "name": "Havana Club 7",                       "price": 28.99, "image": "https://www.shutterstock.com/image-photo/slavsk-ukraine-07222019-bottles-gold-600nw-1494053921.jpg", "category": "rum"},
    {"id": 52, "name": "Ron Zacapa 23",                       "price": 54.99, "image": "https://www.shutterstock.com/image-photo/bottle-guatemala-rum-zacapa-centenario-260nw-2404347297.jpg", "category": "rum"},
    {"id": 53, "name": "Diplomatico Rum",                     "price": 49.99, "image": "https://www.shutterstock.com/image-photo/helsinki-finland-march-032025-rum-260nw-2594733919.jpg", "category": "rum"},
    {"id": 54, "name": "Flor de Caña 12",                     "price": 39.99, "image": "https://images.pexels.com/photos/4940833/pexels-photo-4940833.jpeg", "category": "rum"},
    {"id": 55, "name": "Brugal Rum",                          "price": 24.99, "image": "https://images-svetnapojov-cdn.rshop.sk/gallery-big/products/62a98c2f7dd7b61e149f306b89a487b2.jpg", "category": "rum"},
    {"id": 56, "name": "Doorly’s 12",                         "price": 35.99, "image": "https://www.lokiwine.co.uk/wp-content/uploads/2024/10/Doorlys-rum.png", "category": "rum"},
    {"id": 57, "name": "El Dorado 15",                        "price": 48.99, "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS82Q4AW-mzevpNc_u6c7SlU4hy0o27F08iiw&s", "category": "rum"},
    {"id": 58, "name": "Pusser’s Rum",                        "price": 46.99, "image": "https://cdn.shopify.com/s/files/1/0163/4514/files/nye_bottle_border_1024x1024.png?v=1638896140", "category": "rum"},
    {"id": 59, "name": "Blackwell Rum",                       "price": 29.49, "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTRhu_EnjZxsgg3TZuBWZb6qJmy2Q0UTCz6UQ&s", "category": "rum"},
    {"id": 60, "name": "Stroh 80 Rum",                        "price": 22.99, "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQim6v1MV__81_RpPVSVJ3yPgpNyrRgOhqM1A&s", "category": "rum"},

    # 🍸 Gin (IDs 61–75)
    {"id": 61, "name": "Tanqueray London Dry Gin",            "price": 27.99, "image": "https://images.pexels.com/photos/9142626/pexels-photo-9142626.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500", "category": "gin"},
    {"id": 62, "name": "Bombay Sapphire",                     "price": 30.99, "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRKdxmu1QZ8knonNMfHZN0o2ie2Htd29VluCw&s", "category": "gin"},
    {"id": 63, "name": "Hendrick’s Gin",                      "price": 34.99, "image": "https://as2.ftcdn.net/jpg/03/07/55/41/1000_F_307554176_YgiBDqzYxrMFIVyj73J9BSwBIyBov9CJ.jpg", "category": "gin"},
    {"id": 64, "name": "Beefeater London Dry Gin",             "price": 28.49, "image": "https://thumbs.dreamstime.com/b/bottle-beefeater-dry-gin-black-background-illustrative-editorial-241875546.jpg", "category": "gin"},
    {"id": 65, "name": "Gordon's London Dry Gin",              "price": 25.99, "image": "https://www.shutterstock.com/image-photo/bottle-london-dry-gin-showcased-260nw-2598181847.jpg", "category": "gin"},
    {"id": 66, "name": "Plymouth Gin",                         "price": 29.99, "image": "https://theabsolutgroup.com/wp-content/uploads/2025/05/d191641c-f92b-4cf1-ad10-c9e2ce7a1e75-1-1220x755.jpg", "category": "gin"},
    {"id": 67, "name": "Monkey 47 Schwarzwald Dry Gin",        "price": 41.99, "image": "https://platform-ps-files.s3.us-east-2.amazonaws.com/images/origin/Passion_Spirits_Monkey_47_Distillers_Cut_Beige_2_9ef0d7c5f0.jpg", "category": "gin"},
    {"id": 68, "name": "Sipsmith London Dry Gin",               "price": 35.99, "image": "https://ginfling.nl/pub/media/catalog/product/cache/8981f8e3f39dfdcfb5ae82d173e66caa/s/i/sipsmith-london-dry-gin-70cl-lifestyle-2_r6v2gyw7rwqxg2k2.jpg", "category": "gin"},
    {"id": 69, "name": "Gin Mare",                             "price": 32.99, "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTCj7ah8G2vzN-u8lrFyG3LBhigaYJEru-wVw&s", "category": "gin"},
    {"id": 70, "name": "The Botanist Islay Dry Gin",           "price": 38.99, "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSoO83lec8oEjR6pswLiQ-R4sCwIOsEfXzD1w&s", "category": "gin"},
    {"id": 71, "name": "Roku Gin",                             "price": 33.99, "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTgbpK29GgszVJAsBwW0zU55qDma-jdAK33sw&s", "category": "gin"},
    {"id": 72, "name": "Citadelle Gin",                        "price": 31.99, "image": "https://i.pinimg.com/736x/21/a0/4a/21a04a93191475e377e165e62b7a116d.jpg", "category": "gin"},
    {"id": 73, "name": "Elephant Gin",                         "price": 42.99, "image": "https://drykkur.is/cdn/shop/products/SLoeGin_2000x.jpg?v=1637330397", "category": "gin"},
    {"id": 74, "name": "Nolet’s Silver Gin",                   "price": 37.99, "image": "https://www.drinkspirits.com/wp-content/uploads/2013/07/NOLETS-Reserve-with-glass-500x500.jpg", "category": "gin"},
    {"id": 75, "name": "Tanqueray Rangpur Gin",                 "price": 29.49, "image": "https://www.oaks.delivery/wp-content/uploads/tanqueray-rangpur-gallery.png", "category": "gin"},

   
    # 🍷 Wine (IDs 91–105)
    {"id": 76, "name": "Cabernet Sauvignon",                   "price": 18.99, "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEVXAd-NzRwDxjewHl8-4QTEYCLdpxKy6X4w&s", "category": "wine"},
    {"id": 77, "name": "Pinot Noir",                           "price": 22.99, "image": "https://images.squarespace-cdn.com/content/v1/5e30bd29b0017835b6acda95/1652868568047-FVWVQYLSA4P3DGSA61IG/clyde-village-pinot-mixed-two-pack.jpg", "category": "wine"},
    {"id": 78, "name": "Chardonnay",                           "price": 20.99, "image": "https://www.caldwellvineyard.com/cdn/shop/files/2023Chardonnay.png?v=1727038475", "category": "wine"},
    {"id": 79, "name": "Merlot",                               "price": 19.99, "image": "https://png.pngtree.com/background/20230709/original/pngtree-red-wine-glass-silhouette-black-background-degustation-merlot-drop-photo-picture-image_4184432.jpg", "category": "wine"},
    {"id": 80, "name": "Sauvignon Blanc",                      "price": 21.99, "image": "https://www.kleinconstantia.com/wp-content/uploads/2021/12/NewsPost_SB2021.jpg", "category": "wine"},
    {"id": 81, "name": "Riesling",                             "price": 17.99, "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSDBiolh1PdhWntPoz6UBWFKYYQ2CcyMUBdzQ&s", "category": "wine"},
    {"id": 82, "name": "Malbec",                               "price": 23.99, "image": "https://vinomondo.co.uk/wp-content/uploads/2025/01/Unique_Dona_Paula_Malbec-1.webp", "category": "wine"},
    {"id": 83, "name": "Zinfandel",                            "price": 24.49, "image": "https://cwspirits.com/cdn/shop/collections/Zinfandel_2x_4ae640eb-3546-4ce1-a43f-67922e0ec093.png?v=1759227345", "category": "wine"},
    {"id": 84, "name": "Syrah / Shiraz",                       "price": 25.49, "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDf0xFMjYInrpfkrHi9d0FLZ_szzj4II6Spw&s", "category": "wine"},
    {"id": 85, "name": "Chianti",                            "price": 19.49, "image": "https://thumbs.dreamstime.com/b/burgundy-wine-bottle-shape-burgundy-wine-bottle-shape-illustration-alsace-champagne-chianti-claret-magnum-jeroboam-burgundy-wine-374253075.jpg", "category": "wine"},
    {"id": 86, "name": "Champagne",                          "price": 29.99, "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRIJqHSTJIuj0UcGkaX2TrKTCcSUd7h-fK_3g&s", "category": "wine"},
    {"id": 87, "name": "Sparkling Rosé",                     "price": 28.99, "image": "https://zerodrinks.co.za/cdn/shop/products/DCRoseNon-AlcoholicSparklingWine_4472x.jpg?v=1651654066", "category": "wine"},
    {"id": 88, "name": "Port Wine",                          "price": 31.99, "image": "https://quintadeceis.com/wp-content/uploads/quinta-de-ceis_vinhos-porto_lbv.jpg", "category": "wine"},
    {"id": 89, "name": "Shiraz",                             "price": 25.99, "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQOxNSTDeaimuACjSgqkvPh-LUkZNgGAkFQmQ&s", "category": "wine"},
    {"id": 90, "name": "Grenache",                           "price": 22.49, "image": "https://tonic-wines.com/cdn/shop/products/2-tonicdirtydeeds_1024x.jpg?v=1630645487", "category": "wine"},
]

@products_bp.route("/api/products/<category>", methods=["GET"])
def get_products_by_category(category):
    category_products = [p for p in products if p["category"].lower() == category.lower()]
    return jsonify(category_products)
