const mongoose = require("mongoose");

const productSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide a name for this product."],
      trim: true,
      unique: [true, "Name must be unique."],
      minLength: [3, "Name must be at 3 characters."],
      maxLength: [100, "Name is too large."],
    },
    description: {
      type: String,
      required: [true, "Please provide a description for this product."],
    },
    price: {
      type: Number,
      required: [true, "Please provide a price for this product."],
      min: [0, "Price can't be negative"],
    },
    unit: {
      type: String,
      required: true,
      enum: {
        values: ["kg", "liter", "pcs"],
        message: "unit can't be {VALUE}, must be kg/liter/pcs",
      },
    },
    quantity: {
      type: Number,
      required: [true, "Please provide quantity for this product."],
      min: [0, "quantity can't be negative"],
      validate: {
        validator: (value) => {
          const isInteger = Number.isInteger(value);
          if (isInteger) {
            return true;
          } else {
            return false;
          }
        },
        message: "Quantity must be an integer",
      },
    },
    status: {
      type: String,
      required: true,
      enum: {
        values: ["in-stock", "out-of-stock", "discontinued"],
        message: "Status can't be {Value}",
      },
    },

    // createdAt: {
    //   type: Date,
    //   default: Date.now,
    // },
    // updatedAt: {
    //   type: Date,
    //   default: Date.now,
    // },

    // suppliers: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "Supplier",
    // },
    // chategories: [
    //   {
    //     name: {
    //       type: String,
    //       required: true,
    //     },
    //     _id: mongoose.Schema.Types.ObjectId,
    //   },
    // ],
  },
  {
    timestamps: true,
  }
);

//? mongoose middlewares for saving data:pre/post

productSchema.pre("save", function (next) {
  console.log("before saving data");
  if (this.quantity === 0) {
    this.status = "out-of-stock";
  }
  next();
});

productSchema.post("save", function (doc, next) {
  console.log("after saving data");

  next();
});

//? making functions which can be used directly on routes
productSchema.methods.logger = function () {
  console.log(`data saved for ${this.name}`);
};

//? schema=>model=>query

const Product = mongoose.model("product", productSchema);

module.exports = Product;
