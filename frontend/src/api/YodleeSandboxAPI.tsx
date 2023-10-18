import axios, {AxiosRequestConfig} from 'axios'

const baseURL = "https://backend-m6f5pdrxua-ue.a.run.app/"

export interface UserTokenResponse {
    token: UserToken
}

interface UserToken {
    accessToken: string
    issuedAt: string
    expiresIn: number
}
interface UserTokenPostBody {
    clientId: string
    secret: string
    userName: string
}

export const postUserToken = async (payload:UserTokenPostBody) => {
    try {
        const { data } = await axios.post<UserTokenResponse>(
            baseURL + "api/userToken",
            payload
        )
        return data
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.log('error message: ', error.message);
            return error.message;
        } else {
            console.log('unexpected error: ', error);
            return 'An unexpected error occurred';
        }
    }
}