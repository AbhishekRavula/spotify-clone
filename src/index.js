import reactDom from 'react-dom';
import WelcomeHome from './spotify/components/Welcome';
import UserAuthenticate from './spotify/components/UserAuthenticate';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';



reactDom.render(<WelcomeHome />, document.getElementById("root"))


function IsLoggedIn() {
    if (localStorage.getItem('token') !== null) {
        return <WelcomeHome/>
    }
    else {
        return <UserAuthenticate/>
    }
}
