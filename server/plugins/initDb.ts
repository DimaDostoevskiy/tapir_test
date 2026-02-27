import {defineNitroPlugin} from '#imports'
import {initPostModel} from '../models/Post'
import {Sequelize} from 'sequelize'
import {useRuntimeConfig} from '#imports'

let sequelizeInstance: Sequelize | null = null
let initPromise: Promise<void> | null = null

const  getSequelize = () => {
    if (sequelizeInstance) {
        return sequelizeInstance
    }

    const config = useRuntimeConfig()

    sequelizeInstance = new Sequelize(
        config.mysql.database,
        config.mysql.user,
        config.mysql.password,
        {
            host: config.mysql.host,
            port: config.mysql.port,
            dialect: 'mysql',
            logging: false,
            define: {
                freezeTableName: true,
                timestamps: true,
            },
        }
    )

    return sequelizeInstance
}

export default defineNitroPlugin(async () => {
    if (!initPromise) {
        initPromise = (async () => {
            const sequelize = getSequelize()
            initPostModel(sequelize)

            await sequelize.authenticate()
            await sequelize.sync(
                {alter: true, force: false}
            )

        })()
    }

    await initPromise
})

