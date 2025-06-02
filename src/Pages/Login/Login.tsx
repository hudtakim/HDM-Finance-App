
import style from './style.module.scss'
import { useState } from 'react';
import { encryptString, decryptString } from './Functions';

interface LoginProps {
  setCurrentPage: React.Dispatch<React.SetStateAction<string>>
}

function Login({setCurrentPage} : LoginProps) {
  const [result, setResult] = useState<boolean|string>(false);
  const [passKeyInput, setPassKeyInput] = useState<string>("");

  const HandleSubmit = (e:React.KeyboardEvent<HTMLInputElement> | React.MouseEvent<HTMLButtonElement>) => {
     if('key' in e && e.key !== 'Enter') return null;

    const runCrypto = async () => {
        const passKey = import.meta.env.VITE_APP_PASS_KEY;
        const secretMsg = import.meta.env.VITE_APP_SECRET_MSG;

        try {
            const encrypted = await encryptString(secretMsg, passKey);
            const decrypted = await decryptString(encrypted, passKeyInput);
            
            if(secretMsg === decrypted){
                setCurrentPage('Landing Page');
                localStorage.setItem('hdmfinance-login-status', 'true');
            }
            
            setResult(secretMsg === decrypted);
        
        } catch (err) {
            setPassKeyInput('');
            console.error("Crypto error:", err);
            setResult("Wrong Pass Key!!!");
        }
    };

    runCrypto(); // call the async function inside useEffect
    
  }

  return (
    <div className={style['main']}>
        <div className={style['content']}>
            <input type="password" value={passKeyInput} placeholder='Enter the app key' onChange={(e) => setPassKeyInput(e.target.value)} onKeyDown={(e) => HandleSubmit(e)}/>
            <button onClick={(e) => HandleSubmit(e)}> Launch App </button>
            <span>{result}</span>
        </div>
    </div>
  )
}

export default Login