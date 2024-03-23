const productsService = require("../services/product.services");

exports.getProducts = async (req, res) => {
  try {
    // const products = await Product.find({
    //   $or: [{ _id: "65f5deecf835a81cb8546353" }, { name: "dskjsahfkj" }],
    // });
    // const products = await Product.find({
    //   name: { $in: ["Chal", "Pen"] },
    // });
    const products = await productsService.getProductsService();
    res.status(200).json({
      status: "Success",
      data: products,
    });
  } catch (error) {
    req.status(400).json({
      status: "failed",
      message: "can't get the data",
      error: error.message,
    });
  }
};

exports.createProduct = async (req, res) => {
  try {
    // ? if there is no conditions or logics have to be use then this
    const result = await productsService.createProductService(req.body);
    result.logger();

    //? if there has logics before save then this
    // const product = new Product(req.body);

    // const result = await product.save();

    res.status(200).json({
      status: "successful",
      message: "data inserted successfully",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: "data failed to insert",
      error: error.message,
    });
  }
};
