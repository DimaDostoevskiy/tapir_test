import {DataTypes, Model, Sequelize, InferAttributes, InferCreationAttributes, CreationOptional} from 'sequelize'

export class PostModel extends Model<InferAttributes<PostModel>, InferCreationAttributes<PostModel>> {
    declare id: CreationOptional<number>
    declare createdAt: CreationOptional<Date>
    declare updatedAt: CreationOptional<Date>
    declare slug: string
    declare title: string
    declare description: string | null
    declare content: string
    declare published: boolean
    declare image: string | null
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
            description: {  // Изменено с description на excerpt
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
            image: {
                type: DataTypes.STRING(512),
                allowNull: true,
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
