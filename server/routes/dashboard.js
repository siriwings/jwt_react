/**
 * Created by siri on 2017-01-11.
 */
const express = require('express');

const router = new express.Router();

/*
 * /api/dashboard/dashboard
 */
router.get('/dashboard', (req, res) => {
    console.log(req.headers);
    res.status(200).json({
        message: "You're authorized to see this secret message."
    });
});

//module.exports = router;

export default router;