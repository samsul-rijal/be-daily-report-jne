const { report, user } = require('../../models')
const joi = require('joi')

exports.addReport = async (req, res) => {
    try {
        const data = req.body
        const { idUser } = req

        const schema = joi.object({
            // idUser: joi.number().required(),
            tglKirim: joi.string().required(),
            noPaket: joi.number().required(),
            namaPenerima: joi.string().required(),
            alamat: joi.string().required()
        })

        const { error } = schema.validate(data)

        if (error) {
            return res.status(400).send({
                status: 'failed',
                message: error.details[0].message
            })
        }

        const dataReport = await report.create({ ...data, userId: idUser })
        const findReport = await report.findOne({
            where: {
                id: dataReport.id
            },
            attributes: {
                exclude: ['createdAt', 'updatedAt']
            },
            include: {
                model: user,
                as: 'user',
                attributes: {
                    exclude: ['createdAt', 'updatedAt', 'id', 'password',]
                }
            }
        })

        res.send({
            data: {
                findReport
            }
        })

    } catch (error) {
        console.log(error)
        res.status(500).send({
            status: 'failed',
            message: 'server error'
        })
    }
}

exports.reportById = async (req, res) => {
    try {
        const { userId } = req.params

        const checkId = await report.findOne({
            where: {
                userId
            }
        })

        if (!checkId) {
            res.status(404)
            return res.send({
                status: 'failed',
                message: `Data not found`
            })
        }

        const getReport = await report.findAll({
            where: {
                userId: userId,
            },
            attributes: {
                exclude: ['createdAt', 'updatedAt']
            },
            include: {
                model: user,
                as: 'user',
                attributes: ['nik', 'nama']
            }
        })

        res.send({
            status: 'success',
            message: 'get report successfull',
            data: {
                report: getReport
            }
        })

    } catch (error) {
        console.log(error)
        res.send({
            status: 'failed',
            message: 'server error'
        })
    }
}

exports.reportAll = async (req, res) => {
    try {
        const findReport = await report.findAll({
            attributes: {
                exclude: ['createdAt', 'updatedAt']
            },
            include: {
                model: user,
                as: 'user',
                attributes: ['nik', 'nama']
            }
        })

        res.send({
            data: {
                reports: findReport
            }
        })

    } catch (error) {
        console.log(error)
        res.status(500).send({
            status: 'failed',
            message: 'server error'
        })

    }
}

exports.updateReport = async (req, res) => {
    try {
        const { id } = req.params
        const { body } = req

        const checkId = await report.findOne({
            where: {
                id
            }
        })

        if (!checkId) {
            res.status(404)
            return res.send({
                status: 'failed',
                message: `Data not found`
            })
        }

        await report.update(body,
            {
                where: {
                    id
                }
            })

        const dataUpdate = await report.findOne({
            where: {
                id
            },
            attributes: {
                exclude: ['createdAt', 'updatedAt']
            }
        })

        res.send({
            status: 'success',
            message: 'Report successfully updated',
            data: {
                report: dataUpdate
            }
        })

    } catch (error) {
        console.log(error)
        res.send({
            status: 'failed',
            message: 'server error'
        })
    }
}

exports.deleteReport = async (req, res) => {
    try {
        const { id } = req.params

        await report.destroy({
            where: {
                id
            }
        })

        res.send({
            status: 'success',
            message: 'Report successfully deleted',
            where: {
                id
            }
        })

    } catch (error) {
        res.status({
            status: 'failed',
            message: 'server error'
        })

    }
}