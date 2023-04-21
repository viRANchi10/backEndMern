const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const secratekey = "yashxyzdarji";

const useSchema = new mongoose.Schema({
  fname: {
    type: String,
  },
  lname: {
    type: String,
  },
  email: {
    type: String,
    unique: true,
  },
  phone: {
    type: String,
    unique: true,
  },
  city: {
    type: String,
  },
  age: {
    type: String,
  },
  password: {
    type: String,
  },
  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
});

//password hasing

useSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 12);
  }
  next();
});

// token genrate
useSchema.methods.genrateAuthtoken = async function (req, res) {
  try {
    let Token = jwt.sign({ _id: this._id }, secratekey, {
      expiresIn: "1d",
    });

    this.tokens = this.tokens.concat({
      token: Token,
    });

    await this.save();
    return Token;
  } catch (error) {
    res.status(404).json(error);
  }
};

const collection = new mongoose.model("trys", useSchema);
module.exports = collection;
