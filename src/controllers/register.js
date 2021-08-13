const { user } = require('../../models')
const joi = require('joi')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

exports.register = async (req, res) => {
    try {

        const { nik, password } = req.body
        const data = req.body

        const schema = joi.object({
            nik: joi.number().min(8).required(),
            password: joi.string().min(6).required(),
            nama: joi.string().min(2).required(),
            jenisKelamin: joi.string().min(4).required(),
            noHp: joi.number().min(9).required(),
            alamat: joi.string().min(4).required(),
            levelId: joi.number().min(1).required(),
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

        if (checkNik) {
            return res.send({
                status: 'failed',
                message: 'NIK Sudah terdaftar!'
            })
        }

        const hashStrenght = 10
        const hashedPassword = await bcrypt.hash(password, hashStrenght)

        const dataUser = await user.create({
            ...data,
            password: hashedPassword
        })

        const secretKey = process.env.SECRET_KEY

        const token = jwt.sign({
            id: dataUser.id
        }, secretKey)

        res.send({
            message: 'success',
            token
        })

    } catch (error) {
        console.log(error)
        res.status({
            status: 'failed',
            message: 'server error'
        })
    }
}