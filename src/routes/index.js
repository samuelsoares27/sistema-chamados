import { Switch } from "react-router";
import Route from './Route';
import Dashboard from "../pages/Dashboard";
import SignIn from "../pages/SignIn"
import SignUp from '../pages/SignUp'

export default function Routes() {
    return (
        <Switch>
            <Route exact path="/" component={SignIn} />
            <Route exact path="/register" component={SignUp} />
            <Route exact path="/dashboard" component={Dashboard} isPrivate />
        </Switch>
    )
}