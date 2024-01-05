import dotenv from 'dotenv';
dotenv.config()
export const configKeys={
    MONGO_URL:process.env.MONGODB_URL as string,
    PORT:process.env.PORT as string,
    jwtTokenKey:process.env.JWT_TOKEN_KEY as string
}