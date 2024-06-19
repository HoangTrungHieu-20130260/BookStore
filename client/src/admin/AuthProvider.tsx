import { AuthProvider } from 'react-admin';
import jwtDecode, {JwtPayload} from 'jwt-decode';

export const authProvider : AuthProvider = {
    checkAuth(params: any): Promise<void> {
        return Promise.resolve(undefined);
    }, checkError(error: any): Promise<void> {
        return Promise.resolve(undefined);
    }, getPermissions(params: any): Promise<any> {
        return Promise.resolve(undefined);
    }, login(params: any): Promise<any> {
        return Promise.resolve(undefined);
    }, logout(params: any): Promise<void | false | string> {
        return Promise.resolve(undefined);
    }

}