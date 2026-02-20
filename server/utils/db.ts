import { Sequelize } from 'sequelize'
import { useRuntimeConfig } from '#imports'

let sequelizeInstance: Sequelize | null = null

export function getSequelize() {
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
