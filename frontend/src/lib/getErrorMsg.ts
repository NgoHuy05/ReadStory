import { AxiosError } from "axios";

export default function getErrorMsg(error: unknown, defaultMsg: string): string {
    if (error instanceof AxiosError) {
        return error.response?.data?.message || error.message;
    }
    return defaultMsg;
}