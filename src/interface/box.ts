export interface IBoxDataInterface {
    [index: number]: IBoxData;
}

export interface IBoxData {
    id: number;
    name: string;
    address: string;
    city: string;
    country: string;
    phone: string;
    active: number;
    userFk: number;
    rivhitId: string;
    boxType: number;
    enableWaiver: number;
    showingClassesWeekAgo?: any;
    showingClassesDayAgo?: any;
    showingClassesTimeAgo: string;
    has_restrictions: number;
    epidemic_mode: number;
    users?: any;
}