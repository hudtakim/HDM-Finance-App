import style from './style.module.scss';

interface NavbarProps{
  pageTitle?: string
}

function Navbar({pageTitle} : NavbarProps) {
  return (
    <div className={style['main']}>
        <h1>{pageTitle !== 'Landing Page' ? pageTitle : ''}</h1>
    </div>
  )
}

export default Navbar