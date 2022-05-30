import { registerEnumType } from "@nestjs/graphql";

export enum UserStatus {
    ACTIVE = 'ACTIVE',
    INACTIVE = 'INACTIVE',
    BANNED = 'BANNED'
}

registerEnumType(UserStatus, {
    name: 'UserStatus'
});
