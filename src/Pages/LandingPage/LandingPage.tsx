import style from './style.module.scss';

interface LandingPageProps {
  setCurrentPage: React.Dispatch<React.SetStateAction<string>>
}

function LandingPage({setCurrentPage}:LandingPageProps) {

  const menus = [
    {
      id: 1, label: 'Add Transaction', iconUrl: ''
    },
        {
      id: 2, label: 'History', iconUrl: ''
    },
  ]

  const GetMenusComponents = (menus:any) => {
    const list = menus.map((row:any) => {
      return (
      <div className={style['menu']} onClick={() => setCurrentPage(row.label)} key={row.id}>
        <div className={style['icon']}>{row.iconUrl}</div>
        <div className={style['label']}>{row.label}</div>
      </div>
      )
    }); 


    return list;
  }
  
  return (
    <div className={style['main']}>
      <div className={style['title']}>
        <h1>Welcome to HDM Finance App</h1>
      </div>
      <div className={style['menus']}>
        {GetMenusComponents(menus)}
      </div>
    </div>
  )
}

export default LandingPage