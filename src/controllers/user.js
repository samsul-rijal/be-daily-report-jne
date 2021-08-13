const { user } = require('../../models')

exports.getUsers = async (req, res) => {
    try {
        const users = await user.findAll({
            attributes: {
                exclude: ['createdAt', 'updatedAt', 'id', 'password']
            }
        })

        res.send({
            status: 'success',
            message: 'get user successfully',
            data: {
                users
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

exports.updateUser = async (req, res) => {
    try {
        const { id } = req.params
        const { body } = req

        const checkId = await user.findOne({
            where: {
                id
            }
        })

        if (!checkId) {
            res.status(404)
            return res.send({
                status: 'failed',
                message: `User with id: ${id} not found`
            })
        }

        let image = null;

        if (req.files.imageFile) {
            image = req.files.imageFile[0].filename;
        } else if (!image) {
            const result = await user.findOne({
                where: {
                    id
                },
                attributes: ['id', 'foto'],
            });

            image = result.image
        }

        const joinData = {
            ...body,
            foto: image,
        };

        await user.update(joinData,
            {
                where: {
                    id
                }
            })

        const dataUpdate = await user.findOne({
            where: {
                id
            },
            attributes: {
                exclude: ['createdAt', 'updatedAt', 'password']
            }
        })

        res.send({
            status: 'success',
            message: 'User successfully updated',
            data: {
                user: dataUpdate
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

exports.deleteUser = async (req, res) => {
    try {
        const { id } = req.params

        await user.destroy({
            where: {
                id
            }
        })

        res.send({
            status: 'success',
            message: 'User successfully deleted',
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