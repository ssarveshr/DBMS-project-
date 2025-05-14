import React from 'react'

const Auth = () => {
    const [Role, setRole] = useState('student');
    const [payload, setpayload] = useState({});

    useEffect(() => {
        const pl = sessionStorage.getItem('user')

        if(!pl){
            console.log('No user found error occured')
            sessionStorage.removeItem('user')
        }
        const Payload = JSON.parse
        
        
    }, [])



  return (
    <div>
      Auth
    </div>
  )
}

export default Auth
