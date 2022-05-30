import { DataType } from "sequelize-typescript";

export const uniquePK: object = {
    defaultValue: DataType.UUIDV4,
    type: DataType.UUID,
    primaryKey: true,
    allowNull: false,
    unique: true
}
