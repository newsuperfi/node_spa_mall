const express = require('express');
const router = express.Router();
const Goods = require("../schemas/goods");


const Cart = require('../schemas/cart.js');
router.post("/goods/:goodsId/cart", async (req, res) => {
  const { goodsId } = req.params;
  const { quantity } = req.body;

  const existCarts = await Cart.find({ goodsId });
  if (existCarts.length) {
    return res.status(400).json({
      success: false,
      errorMessage: '이미 장바구니에 해당하는 상품이 존재합니다.'
    });
  }

  await Cart.create({ goodsId, quantity });

  res.json({ result: "success" })
})

router.put("/goods/:goodsId/cart", async (req, res) => {
  const { goodsId } = req.params;
  const { quantity } = req.body;

  const existsCarts = await Cart.find({ goodsId });
  if (existsCarts.length) {
    await Cart.updateOne(
      { goodsId: goodsId },
      { $set: { quantity: quantity } }
      )
  }
  res.status(200).json({success:true});
})

router.delete("/goods/:goodsId/cart", async(req, res) => {
  const {goodsId} = req.params;

  const existCarts = await Cart.find({goodsId});
  if(existCarts.length){
    await Cart.deleteOne({goodsId});
  }

  res.json({result:"success"});
})

router.post("/goods", async (req, res) => {
  const { goodsId, name, thumbnailUrl, category, price } = req.body;

  const goods = await Goods.find({ goodsId });
  if (goods.length) {
    return res.status(400).json({ success: false, errorMessage: "이미 있는 데이터 입니다." })
  }

  const createGoods = await Goods.create({ goodsId, name, thumbnailUrl, category, price })

  res.json({ goods: createGoods });
});



module.exports = router;