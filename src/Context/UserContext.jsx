import { createContext, useState } from "react";


export let UserTokenContext = createContext();


export default function UserTokenContextProvider(props) {


    let [userToken , setUserToken] = useState(null)
    let [userData , setUserData] = useState(null)


    return <UserTokenContext.Provider value={{userToken , setUserToken ,  userData , setUserData}}>
    
                 {props.children}
        
            </UserTokenContext.Provider>

}