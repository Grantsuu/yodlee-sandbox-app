import axios, {AxiosRequestConfig} from 'axios'

interface UserToken {
    accessToken: string
    issuedAt: string
    expiresIn: number
}

export const getUserToken = async () => {
    try {
        const { data } = await axios.get<UserToken>(
            'http://127.0.0.1:8080/api/getUserToken'
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