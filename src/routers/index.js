const express = require('express')
const router = express.Router()

const { register } = require('../controllers/register')
const { login, checkAuth } = require('../controllers/login')

const { getUsers, updateUser, deleteUser } = require('../controllers/user')

const { addReport, reportAll, reportById, updateReport, deleteReport } = require('../controllers/report')

const auth = require('../middleware/auth')
const { uploadFile } = require('../middleware/uploadFile')

router.post('/register', register)
router.post('/login', login)
router.get('/check-auth',auth, checkAuth);

router.get('/users', getUsers)
router.patch('/user/:id', auth, uploadFile("imageFile"), updateUser)
router.delete('/user/:id', auth, deleteUser)

router.post('/report', auth, addReport)
router.get('/report/:userId', auth, reportById)
router.get('/reports', auth, reportAll)

router.patch('/edit-report/:id', auth, updateReport)
router.delete('/report/:id', auth, deleteReport)


module.exports = router