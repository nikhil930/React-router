import classses from './Layout.module.css';
import MainNavigation from './MainNavigation';

const Layout = (props)=>{
    return  <>
    <MainNavigation />
    <main className={classses.active}>{props.children}</main>
    </>
};
export default Layout