import { Switch } from "react-router";
import Route from './Route';
import Dashboard from "../pages/Dashboard";
import SignIn from "../pages/SignIn"
import SignUp from '../pages/SignUp'
import Customers from "../pages/Customers";
import Profile from "../pages/Profile";
import Erro from "../pages/Erro";
import NewServices from "../pages/NewServices";

export default function Routes() {
    return (
        <Switch>
            <Route exact path="/" component={SignIn} />
            <Route exact path="/register" component={SignUp} />
            <Route exact path="/dashboard" component={Dashboard} isPrivate />
            <Route exact path="/customers" component={Customers} isPrivate />
            <Route exact path="/profile" component={Profile} isPrivate />
            <Route exact path="/newservices" component={NewServices} isPrivate />
            <Route path="*" component={Erro} />
        </Switch>
    )
}