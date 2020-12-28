export interface IScheduleInterface {
    [box: string]: IGym;
}

export interface IGym {
    [index: number]: IScheduleItem[];
}

export interface IScheduleItem {
    alreadyMember: boolean; // are you on the schedule or not
    category: string; // "Open Gym" "W.O.D"
    coach: string;
    membershipUserFkRegister: null;
    numberOfUsers: number;
    schedule: ISchedule;
    standbyUser: boolean; // are you on standby
    users: IUser[];
}

export interface ISchedule {
    boxCategoryFk: number;
    boxFk: number;
    cancelLimit: number & null;
    cancelledBy: number & null;
    coachFk: number | null;
    date: string; // "2020-06-16";
    disableCancellationTime: number;
    enableLateCancellation: number;
    enableRegistrationTime: number;
    endTime: string; // "10:00:00"
    id: number;
    liveLink: null;
    locationsBoxFk: number;
    maxUsers: number;
    minUsers: number;
    seriesFk: number;
    status: string; // "active";
    time: string; // "06:30:00";
    transparent: number;
    workoutId: null;
}

export interface IUser {
    firstName: string;
    id: number;
    image: string; // "https://s3-eu-central-1.amazonaws.com/profile-image-users/profileImage-57914.png?1592304717"
    lastName: string;
}
