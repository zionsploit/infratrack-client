import { createSlice } from "@reduxjs/toolkit";
import { AccountRegistration } from "../ServerTypes/Account";
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from "../provider/reduxStore";

export interface ReturnAccountRegistration extends Omit<AccountRegistration, "confirmpassword"> {
    id: number
    created_at: Date,
    updated_at: Date,
}

interface AccountState {
    accountInformation: ReturnAccountRegistration
}

export const accountSlice = createSlice({
    name: 'account-slice',
    initialState: <AccountState> <unknown>{
        accountInformation: {
            id: '',
            firstname: '',
            middlename: '',
            lastname: '',
            username: '',
            password: '',
            created_at: '',
            updated_at: ''
        }
    },
    reducers: {
        setAccountInformation: (state, action: PayloadAction<ReturnAccountRegistration>) => {
            state.accountInformation = action.payload
        }
    }
})

export const { setAccountInformation } = accountSlice.actions

export const getAccountInformation = (state: RootState) => state.accountInformation.accountInformation

export default accountSlice.reducer