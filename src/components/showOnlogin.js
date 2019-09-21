import React from "react";
import { Button } from "@material-ui/core";


const ShowOnLogin = ({ isLogin, logout }) => {
    if (isLogin.islogin) {
        return (
            <div>
                <div>
                    {`login as: ${isLogin.username}`}
                </div>
                <div>
                    <Button 
                    color="secondary" 
                    onClick={() => {
                        logout();
                    }}>Exit</Button>
                </div>
            </div>
        );
    }
    return null;
};

export default ShowOnLogin;
