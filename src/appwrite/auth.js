import conf from '../../conf.js'

import {Client, Account, ID} from "appwrite"


export class AuthService{
    client = new Client()
    account

    constructor(){
        this.client.setEndpoint(conf.appwriteUrl).setProject(conf.appwriteProjectId)
        this.account = new Account(this.client)
    }

async createAccount({email, password, name}){
try {
    const account = await this.account.create(
        ID.unique(),
        email, password, name
    )
    if(!account){
        console.log('Appwrite Account Creation Error: Account not created');
        throw new Error('Account not created')
    }
    return this.login({email, password})
} catch (error) {
    console.log(`Appwrite Account Creation Error: ${error}`);
    throw error
    
}


}
async login({email, password}){
    try {
       const loginAccount =  await this.account.createEmailPasswordSession(email, password)
       if(!loginAccount){
              console.log('Appwrite Login Error: Login Failed');
              throw new Error('Login Failed')
       }
       return loginAccount
    } catch (error) {
        console.log(`Appwrite Login Error: ${error}`);
            throw error
        
    }
}


async getCurrentUser(){
    try {
       const user =  await this.account.get()
       if(!user){
                console.log('Appwrite Get Current User Error: User not found');
                throw new Error('User not found')
       }
       return user
    } catch (error) {
        console.log(`Appwrite Get Current User Error: ${error}`);
        
    }
}
async logout(){
    try {
        const logoutUser = await this.account.deleteSessions()
        if(!logoutUser){
            console.log('Appwrite Logout Error: Logout Failed');
            throw new Error('Logout Failed')
        }
        return logoutUser
    } catch (error) {
        console.log(`Appwrite Logout Error: ${error}`);
        throw error
        
    }
}

}
const authService = new AuthService()
export default authService