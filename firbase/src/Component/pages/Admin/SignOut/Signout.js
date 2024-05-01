import {signOut} from 'firebase/auth'
import { auth } from '../../../firebase';
import { redirect } from 'react-router-dom';
const logout = async()=>{
          try {
          await signOut(auth);
          alert('Succesful sign out');
          } catch (error) {
         
          }
}
export default logout