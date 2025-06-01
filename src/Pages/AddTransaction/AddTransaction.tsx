import { useEffect, useState } from 'react';
import style from './style.module.scss'

interface AddTransactionProps {
  setCurrentPage: React.Dispatch<React.SetStateAction<string>>
}

function AddTransaction({setCurrentPage}: AddTransactionProps) {
  const [googleFormUrl, setGoogleFormUrl] = useState<string>('')
  
  useEffect(() => {
    setGoogleFormUrl(import.meta.env.VITE_GOOGLE_FORM_URL ?? '');
  }, []);

  return (
    <div className={style['main']}>
        <div className={style['header']}>
            <div className={style['action-left']}>
                <button onClick={() => setCurrentPage('Landing Page')} className={style['back-btn']}>Back</button>
            </div>
            <h2></h2>
            <div className={style['action-right']}>
            </div>
        </div>
        <div className={style['content']}>
            {
              googleFormUrl ? (            
                <iframe 
                  src= {googleFormUrl}
                  width="100%" 
                  height="100%" 
                  frameBorder="0"
                  marginHeight={0}
                  marginWidth={0}
              >
                      Memuat…
              </iframe>) : (<div>Loading data...</div>)
            }

        </div>
    </div>
  )
}

export default AddTransaction