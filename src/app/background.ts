import {Plugins} from '@capacitor/core';

const {App, BackgroundTask} = Plugins;

export const backgroung = (data) => {
    console.log('backgroung')
    let taskId;
    App.addListener('appStateChange', (state) => {

        if (!state.isActive) {
            data.toString();
            // The app has become inactive. We should check if we have some work left to do, and, if so,
            // execute a background task that will allow us to finish that work before the OS
            // suspends or terminates our app:

            taskId = BackgroundTask.beforeExit(async () => {
                // In this function We might finish an upload, let a network request
                // finish, persist some data, or perform some other task


                // Must call in order to end our task otherwise
                // we risk our app being terminated, and possibly
                // being labeled as impacting battery life

                setTimeout(() => {
                    console.log(33333333333333333)
                    alert('after 10 mín');
                    BackgroundTask.finish({
                        taskId
                    });
                }, 10 * 1000 * 60)

            });
        } else if (taskId) {
            BackgroundTask.finish({
                taskId
            });
        }
    });
};
