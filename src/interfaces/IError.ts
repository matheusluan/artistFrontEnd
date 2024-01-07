export interface IError {
    code: string;
    response: {
        status: number,
        data: {
            message: string
        }
    };
}