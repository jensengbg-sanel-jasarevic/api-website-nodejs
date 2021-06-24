const db = require('../model/database-functions');
const { Router } = require("express");

const router = new Router();

// GET products
router.get('/', async (req, res) => {
    const data = await db.getProducts();
    res.send(data);
});

module.exports = router;