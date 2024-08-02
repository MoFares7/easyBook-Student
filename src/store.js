import { configureStore } from '@reduxjs/toolkit';


const store = configureStore({
        reducer: {
                // auth: loginReducer,
        }
});

export default store;