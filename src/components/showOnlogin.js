import React from "react";


const ShowUsername = ({ isLogin, logout }) => {
    if (isLogin.islogin) {
        return (
            <div>
                <div>
                    login as: {isLogin.username}
                </div>
                <div>
                    <button onClick={logout}>Exit</button>
                </div>
            </div>
        );
    }
    return null;
};

export default ShowUsername;