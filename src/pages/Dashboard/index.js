import { useContext } from "react";
import { AuthContext } from "../../contexts/auth";
import { Button } from "react-bootstrap";

export default function Dashboard() {
    
    const { signOut } = useContext(AuthContext);
    return (
        <div>
            <h1>Dashboard</h1>
            <Button variant="primary" onClick={() => signOut()}>Sair</Button>
        </div>
    );
}