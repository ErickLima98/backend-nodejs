const router = require('express').Router()

router.get('/', (req, res) => {
    res.json({
        error: null,
        data: {
            title: "Protected Rute",
            user: req.user
        }
    })
})

module.exports = router