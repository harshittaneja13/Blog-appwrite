import conf from "../conf/conf";
import { Client, Account, ID } from "appwrite";

export class AuthService {
    client = new Client()

    account ;

    constructor(){
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId)

        this.account = new Account(this.client)

    }

    //to not tell that we are using appwrite or firebase (we create a wrapper to use services of appwrite)

    async createAccount({email ,password ,name}){
        try {
            const userAccount = await this.account.create( ID.unique() , email , password ,name)
            if (userAccount) {
                //call another method - to direct login on account creation 
                return this.login({email ,password})
                // return userAccount
            } else {
                return userAccount
            }
        } catch (error) {
            console.log("Appwrite service :: createAccount :: error" , error);
        }
    }

    async login({email, password}){
        try {
            return await this.account.createEmailPasswordSession(email ,password)
        } catch (error) {
            console.log("Appwrite service :: login :: error" , error);
        }
    }

   async getCurrentUser() {
        try {
            return await this.account.get();
        } catch (error) {
            console.log("Appwrite serive :: getCurrentUser :: error", error);
        }

        return null;
    }

    async logout(){
         try {
            await this.account.deleteSessions()
         } catch (error) {
            console.log("Appwrite service :: logout :: error" , error);
         }
    }
}

const authService = new AuthService()

export default authService