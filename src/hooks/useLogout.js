import { useState } from "react"
import { firebaseAuth, firebaseFirestore } from "../firebase/config"
import { useAuthContext } from './useAuthContext'

export const useLogout = () => {
  const [isPending, setIsPending] = useState(false)
  const [error, setError] = useState(null)
  const { dispatch, user } = useAuthContext()

  const logout = async () => {
    setError(null)
    setIsPending(true)

    // sign user out
    try {
      // update online status
      const { uid } = user
      await firebaseFirestore.collection('users').doc(uid).update({ online: false })

      await firebaseAuth.signOut()

      // dispatch logout action
      dispatch({ type: 'LOGOUT' })

      // update state
      setIsPending(false)
      setError(null)
    }
    
    //catch error if any
    catch(err) {
      setError(err.message)
      setIsPending(false)
    }
  }

  return { isPending, error, logout }
}