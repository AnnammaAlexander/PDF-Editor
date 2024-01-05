//type for the form data
 export interface RegisterFormValues {
    
    name: string;
    email: string;
    
    password: string;
 }

//type for the registration API response

export interface signupResponse {
    status: string;
    message: string;
    user: {
        name: string;
        email: string;
        password: string;
    };
    token: string;
}
//Login form values
export interface LoginFormValues {
    email:string,
    password: string
}