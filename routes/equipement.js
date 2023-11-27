const express = require('express')
const {
    getEquipements,
    getEquipement,
    createEquipement,
    deleteEquipement,
    updateEquipement,
    countEquipements
} = require('../controllers/equipementController')

const router = express.Router()

router.get('/', getEquipements)

// GET a single rec
router.get('/id/:id', getEquipement)

// POST rec
router.post('/', createEquipement)

// DELETE Equipement
router.delete('/:id', deleteEquipement)

// UPDATE Equipement
router.patch('/:id', updateEquipement )
//count equipement
router.get('/number',countEquipements)
module.exports = router

