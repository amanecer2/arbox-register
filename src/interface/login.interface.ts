export declare module ILogin {

    export interface LocationBox {
        id: number;
        location: string;
        boxFk: number;
        address: string;
        logo: string;
        timeZone?: any;
        rivhitPaymentGroupPrivateToken?: any;
        rivhitPaymentGroupId: string;
    }

    export interface User {
        id: number;
        email: string;
        firstName: string;
        lastName: string;
        originalImage: string;
        image: string;
        birthday: string;
        gender: string;
        phone: string;
        active: number;
        suspend: number;
        medicalCert: number;
        weight: number;
        height: number;
        country?: any;
        city?: any;
        address?: any;
        locationBox: LocationBox;
        restricted: number;
        timeFormatPreferred: string;
        resetPasswordToken?: any;
        counterFailLogin: number;
        blockUntilLogin?: any;
        lastLogin: string;
    }

    export interface Role {
        id: number;
        role: string;
        description: string;
    }

    export interface LoginInterface {
        user: User;
        roles: Role[];
        token: string;
    }

}

export interface IUserServer {
    userFk: number;
    membrshipUserFk: number;
}
