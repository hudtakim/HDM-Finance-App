import style from './style.module.scss'
import { useState, useEffect } from 'react'
import TransactionTable from './Components/TransactionTable/TransactionTable'
import Dropdown from '../../Components/Dropdown/Dropdown'

import { FormatRupiah, ConvertToObjects, GetTotal, FilterRecords, GetDefaultDateRange, GetDropdownList, GetDataForBarChart } from './Functions'
import BarChart from './Components/BarChart/BarChart'

interface HistoryProps {
  setCurrentPage: React.Dispatch<React.SetStateAction<string>>
}

function History({setCurrentPage}: HistoryProps) {
  const modeList = ['Table View', 'Chart View'];
  const [mode, setMode] = useState<number>(0); //Table View - Dashboard View
  const [data, setData] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [userListD, setUserListD] = useState<any>([]);
  const [kategoriListD, setKategoriListD] = useState<any>([]);
  const [timestampListD, setTimestampListD] = useState<any>([]);
  const [jumlahListD, setJumlahListD] = useState<any>([]);

  const [error, setError] = useState<string | null>(null);
    const [filters, setFilters] = useState<any>({
    startDate: '',
    endDate: '',
    user: '',
    kategori: ''
  });

  useEffect(() => {
    const {startDate, endDate}  = GetDefaultDateRange(); 
    setFilters({...filters, startDate, endDate})
  }, [])
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const spreadsheetApi = import.meta.env.VITE_SPREADSHEET_API;
        if(spreadsheetApi && filters.startDate && filters.endDate && mode + 1 > 0){
          console.log('Fetch run');
          const response = await fetch(spreadsheetApi);

          if (!response.ok) throw new Error("Network response was not ok");
          const json = await response.json();
          const jsonObj = ConvertToObjects(json.data || json); // Adjust based on structure
          const filteredJson = FilterRecords(jsonObj, filters);
          const {userList, kategoriList} = GetDropdownList(filteredJson);
          setUserListD(userList);
          setKategoriListD(kategoriList);
          if(mode === 1){
            const {timestampList, jumlahList} = GetDataForBarChart(filteredJson);
            setTimestampListD(timestampList);
            setJumlahListD(jumlahList);
          }
          setData(filteredJson);
          //console.log(jsonObj);
        }
      } catch (err: any) {
        setError(err.message || "Unknown error");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [filters, mode]);

  const GetContent = () => {
    if(loading){
        return (<div>Loading data...</div>);
    }else if(error){
        return (<div>Error: {error}</div>);
    }else{
        return (
            <>
                {mode === 0 ? <TransactionTable data={data}/> : <BarChart titleText='' xAxisData={timestampListD} seriesData={jumlahListD} /> }
                <div className={style['Summary']}>
                    <a href='https://docs.google.com/spreadsheets/d/1VFvSB2jnqm0An6mj9_D6T-ns-00eYkzGYIJqfMwJQmo/edit?resourcekey=&gid=1911872600#gid=1911872600' target='_blank'>Link Spreadsheet</a>
                    <span className='total'>Total: {FormatRupiah(GetTotal(data))}</span>
                </div>
            </>
        )
    }
  }

  return (
    <div className={style['main']}>
        <div className={style['header']}>
            <div className={style['action-left']}>
                <button onClick={() => setCurrentPage('Landing Page')} className={style['back-btn']}>Back</button>
                <button onClick={() => setMode(prevMode => (prevMode + 1 < modeList.length ? prevMode + 1 : 0))} className={style['back-btn']}>{modeList[mode]}</button>
            </div>
            <h2></h2>
            <div className={style['action-right']}>
                <Dropdown type={'User'} options={userListD} selectedValue={filters.user} onChange={(value) => setFilters({...filters, user: value})}/>
                <Dropdown type={'Kategori'} options={kategoriListD} selectedValue={filters.kategori} onChange={(value) => setFilters({...filters, kategori: value})}/>
                <input
                    type="date"
                    value={filters.startDate}
                    onChange={e => setFilters({...filters, startDate: e.target.value})}
                />
                <input
                    type="date"
                    value={filters.endDate}
                    onChange={e => setFilters({...filters, endDate: e.target.value})}
                />
            </div>
        </div>
        <div className={style['content']}>
            {GetContent()}
        </div>
    </div>
  )
}

export default History