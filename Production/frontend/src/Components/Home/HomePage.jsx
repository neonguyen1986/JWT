import { useDispatch, useSelector } from "react-redux";
import "./home.css";
import { useEffect, useState } from "react";
import { deleteUser, getAllUsers } from "../../redux1/apiRequest";
import { useNavigate } from "react-router-dom";
import { loginSuccess } from "../../redux1/authSlice";
import { persistor } from '../../redux1/store'

//JWT refresh Token
import { createAxiosJWT } from "../../createInstance";
window.addEventListener('beforeunload', () => {
   // Call persistor.purge() to clear persisted data
   persistor.purge();
});

const HomePage = () => {
   const dispatch = useDispatch()
   const navigate = useNavigate()

   const [allUsersList, setAllUsersList] = useState(null)
   const [countdown, setCountdown] = useState(10);
   const [isTokenValid, setIsTokenValid] = useState(true)


   const user = useSelector((state) => state.auth.login?.currentUser)
   const allUsers = useSelector((state) => state.user.users?.allUsers)
   const msg = useSelector((state) => state.user.delUser?.msg)

   let axiosJWT = createAxiosJWT(user, dispatch, loginSuccess)

   useEffect(() => {
      if (!user) {
         navigate('/login')
      }
      if (user?.accessToken) {
         getAllUsers(user?.accessToken, dispatch, axiosJWT)
      }
   }, [])

   useEffect(() => {
      if (allUsers) setAllUsersList(allUsers)
   }, [allUsers])

   //refresh page after user deleted
   useEffect(() => {
      if (msg === 'Delete successfully') {
         getAllUsers(user?.accessToken, dispatch, axiosJWT)
      }
   }, [msg])

   const handleDelete = async (item) => {
      // console.log('check delete=========1', user?.accessToken)
      await deleteUser(user?.accessToken, dispatch, item._id)//, axiosJWT)

      // console.log('check delete=========2', user?.accessToken)
      //re-load the page
   }

   // console.log('---------access', user?.accessToken)

   const handleRefreshTokens = () => {
      getAllUsers(user?.accessToken, dispatch, axiosJWT)
      setCountdown(10)
      setIsTokenValid(true)
   }

   //=========count down timer==========
   useEffect(() => {
      // Exit the countdown when it reaches 0
      if (countdown === 0) {
         setIsTokenValid(false)
         return;
      }

      // Set up an interval to decrement the countdown every second
      const timer = setInterval(() => {
         setCountdown((prevCountdown) => prevCountdown - 1);
      }, 1000);

      // Clean up the interval when the component unmounts
      return () => {
         clearInterval(timer);
      };
   }, [countdown]);
   return (
      <>
         <div className="home-access-token">
            <span className='home-access-token-title'>Your access token lifespan: &nbsp; {countdown} </span>

            {user?.accessToken ? user.accessToken : ''}
         </div>
         <main className="home-container">
            <div className="home-title">User List</div>
            {isTokenValid === false &&
               <button className='refresh-tokens' onClick={handleRefreshTokens}>
                  Refresh Tokens
               </button>
            }
            <div className="home-role">
               {` Your role: ${user?.admin === true ? 'admin' : 'user'}`}
            </div>
            <div className="home-userlist">
               {allUsersList?.map((item, index) => {
                  return (
                     <div key={index} className="user-container">
                        <div className="home-user">{item.username}</div>
                        <div className="delete-user" onClick={() => handleDelete(item)}> Delete </div>
                     </div>
                  );
               })}
            </div>
            <div className="home-delete-message"><br />{msg}</div>

         </main>
      </>
   );
};

export default HomePage;
