const router = require('express').Router();

router.get('/', (req, res) => {
    // Example products data
    const products = [
       [
  {"id":"p1","title":"Signature Truffles","price":1299.00,"image":"/assets/products/p1.jpg","description":"A curated box of handcrafted truffles."},
  {"id":"p2","title":"Dark Chocolate Bar","price":499.00,"image":"/assets/products/p2.jpg","description":"72% cocoa dark chocolate bar."},
  {"id":"p3","title":"Milk Chocolate Squares","price":599.00,"image":"/assets/products/p3.jpg","description":"Silky milk chocolate squares."},
  {"id":"p4","title":"Assorted Collection","price":2499.00,"image":"/assets/products/p4.jpg","description":"Large assorted gift box."},
  {"id":"p5","title":"Gift Tin","price":799.00,"image":"/assets/products/p5.jpg","description":"Elegant tin with bite-sized chocolates."},
  {"id":"p6","title":"Hazelnut Praline Box","price":899.00,"image":"/assets/products/p6.jpg","description":"Crunchy hazelnut praline selection."},
  {"id":"p7","title":"Sea Salt Caramels","price":349.00,"image":"/assets/products/p7.jpg","description":"Soft caramels with sea salt."},
  {"id":"p8","title":"Chocolate Bark","price":249.00,"image":"/assets/products/p8.jpg","description":"Thin crunchy chocolate bark."},
  {"id":"p9","title":"Mini Truffle Pack","price":299.00,"image":"/assets/products/p9.jpg","description":"Personal sized truffle pack."},
  {"id":"p10","title":"Dark Ganache Collection","price":1099.00,"image":"/assets/products/p10.jpg","description":"Rich dark ganache flavours."},
  {"id":"p11","title":"Chocolate Covered Nuts","price":399.00,"image":"/assets/products/p11.jpg","description":"Roasted nuts covered in chocolate."},
  {"id":"p12","title":"Fruit & Nut Bar","price":299.00,"image":"/assets/products/p12.jpg","description":"Fruit and nut studded bar."},
  {"id":"p13","title":"Assorted Miniatures","price":699.00,"image":"/assets/products/p13.jpg","description":"Miniature bites in mixed flavours."},
  {"id":"p14","title":"Luxury Gift Box","price":3299.00,"image":"/assets/products/p14.jpg","description":"Premium selection for gifting."},
  {"id":"p15","title":"Single-Origin Bar","price":549.00,"image":"/assets/products/p15.jpg","description":"A single-origin chocolate experience."}
]

    ];
    
    res.json(products);
});

module.exports = router;