import style from './style.module.scss'
import { googleFormUrl } from '../../config'

interface AddTransactionProps {
  setCurrentPage: React.Dispatch<React.SetStateAction<string>>
}

function AddTransaction({setCurrentPage}: AddTransactionProps) {
  return (
    <div className={style['main']}>
        <div className={style['header']}>
            <div className={style['action-left']}>
                <button onClick={() => setCurrentPage('Landing Page')} className={style['back-btn']}>Back</button>
            </div>
            <h2>Add Transaction</h2>
            <div className={style['action-right']}>
            </div>
        </div>
        <div className={style['content']}>
            <iframe 
                src= {googleFormUrl}
                width="100%" 
                height="100%" 
                frameBorder="0"
                marginHeight={0}
                marginWidth={0}
            >
                    Memuat…
            </iframe>
        </div>
    </div>
  )
}

export default AddTransaction