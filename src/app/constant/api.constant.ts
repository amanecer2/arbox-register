import { format } from 'date-fns';

export const BASE_URL = 'https://apiapp.arboxapp.com/index.php/api/v1';
export const BASE_URL_SERVER = 'https://arbox-register.herokuapp.com';
//export const BASE_URL_SERVER = `http://localhost:3000`; // 'https://arbox-register.herokuapp.com';

export const API = {
    login: (email: string) => `${BASE_URL}/user/${email}/session`, // POST
    getWeeklyRegisteredUserSchedule: () => `${BASE_URL}/getWeeklyRegisteredUserSchedule`, // POST
    membership: (userID) => `${BASE_URL}/membership/${userID}`, // GET
    scheduleByDateList: (boxID: number, userId: number, date: string | Date) => {
        const yyyyMMDD = format(new Date(date), 'yyyy-MM-dd');
        return `${BASE_URL}/scheduleByDateList/${boxID}/?date=${yyyyMMDD}&userId=${userId}`;
    }, // GET
    getBoxData: (userId) => `${BASE_URL}/userBox/${userId}`,
    deleteWatingList: (userId, wodId) => `${BASE_URL}/scheduleStandby/${userId}/${wodId}`, // DELETE
    enterWaitList: () => `${BASE_URL}/scheduleStandby/create`, // POST
    enterWorout: () => `${BASE_URL}/scheduleUser`, /// POST,
    registerUser: () => `${BASE_URL_SERVER}/arbox/register-user`,
    scheduleWorkout: () => `${BASE_URL_SERVER}/arbox/schedule`,
    isUserRegister: () => `${BASE_URL_SERVER}/is-user-login`,
};
