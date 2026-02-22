import { DataTypes, Model, Sequelize } from 'sequelize'

export class PostPayload extends Model {
    declare title: string
    declare slug: string
    declare excerpt: string
    declare content: string
    declare published: boolean
}

export class PostModel extends PostPayload {

}

let initialized = false

export function initPostModel(sequelize: Sequelize) {
  if (initialized) {
    return PostModel
  }

  PostModel.init(
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      title: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      slug: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: true,
      },
      excerpt: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      content: {
        type: DataTypes.TEXT('long'),
        allowNull: false,
      },
      published: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: 'posts',
    }
  )

  initialized = true
  return PostModel
}
