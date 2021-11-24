import { Switch } from "react-router";
import Route from './Route';
import Dashboard from "../pages/Dashboard";
import SignIn from "../pages/SignIn"
import SignUp from '../pages/SignUp'
import Customers from "../pages/customers";
import Profile from "../pages/Profile";
import Erro from "../pages/Erro";

export default function Routes() {
    return (
        <Switch>
            <Route exact path="/" component={SignIn} />
            <Route exact path="/register" component={SignUp} />
            <Route exact path="/dashboard" component={Dashboard} isPrivate />
            <Route exact path="/customers" component={Customers} isPrivate />
            <Route exact path="/profile" component={Profile} isPrivate />
            <Route path="*" component={Erro} />
        </Switch>
    )
}