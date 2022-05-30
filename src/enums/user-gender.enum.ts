import { registerEnumType } from "@nestjs/graphql";

export enum UserGender {
    MALE = 'MALE',
    FEMALE = 'FEMALE',
    UNKNOWN = 'UNKNOWN'
}

registerEnumType(UserGender, {
    name: 'UserGender'
});
