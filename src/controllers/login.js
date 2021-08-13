const { user } = require('../../models')
const joi = require('joi')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

exports.login = async (req, res) => {
    try {
        const { nik, password } = req.body
        const data = req.body

        const schema = joi.object({
            nik: joi.string().min(8).required(),
            password: joi.string().min(6).required()
        })

        const { error } = schema.validate(data)

        if (error) {
            return res.send({
                status: 'validation failed',
                message: error.details[0].message
            })
        }

        const checkNik = await user.findOne({
            where: {
                nik
            }
        })

        if (!checkNik) {
            return res.status(401).send({
                status: 'failed',
                message: 'NIK atau password salah!'
            })
        }

        const isValidPassword = await bcrypt.compare(password, checkNik.password)

        if (!isValidPassword) {
            return res.status(401).send({
                status: 'failed',
                message: 'NIK atau password salah!'
            })
        }

        const secretKey = process.env.SECRET_KEY

        const token = jwt.sign({
            id: checkNik.id
        }, secretKey)

        res.status(200).send({
            status: 'success',
            id: checkNik.id,
            nik: checkNik.nik,
            nama: checkNik.nama,
            foto: checkNik.foto,
            levelId: checkNik.levelId,
            token
        })

    } catch (error) {
        console.log(error)
        res.status(500).send({
            status: 'failed',
            message: 'Server Error'
        })
    }
}

exports.checkAuth = async (req,res) => {
    try {

        const id = req.idUser

        const dataUser = await user.findOne({
            where: {
                id
            },
            attributes: {
                exclude: ['createdAt', 'updatedAt', 'password']
            }
        })
    
        if(!dataUser){
            return res.status(404).send({
                status: 'failed'
            })
        }


        res.send({
            status: 'success',
            user: dataUser
        })
        
    } catch (error) {
        console.log(error)
        res.status({
            status: 'failed',
            message: 'Server Error',
        })
    }
}