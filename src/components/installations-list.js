import React from "react";
import Button from "@material-ui/core/Button";
import { getInstallationData } from "../containers/apiVRM";


const ButtonForSite = ({ site, selectInst, selectedInst, isLogin, addInstData }) => {
    if (site.idSite === selectedInst) {
        return (
            <Button
                color="primary"
                // onClick={() => selectInst(site.idSite)}
                disabled
            >{site.name}</Button>
        );
    }

    return (
        <Button
            color="primary" 
            onClick={() => {
                selectInst(site.idSite);
                getInstallationData(site.idSite, isLogin.headerWithToken).then((responce) => {
                    const data = {}
                    data[site.idSite] = responce
                    addInstData(data);
                })
            }}
        >{site.name}</Button>
    );
};

const InstallationList = ({ installationResponce, selectInst, selectedInst, isLogin, addInstData}) => {
    // console.log(installationResponce)

    if (installationResponce){
        if (installationResponce.data.success) {
            return (
                <div className="installation-menu">
                {installationResponce.data.records.map((site) => (
                    <div key={site.idSite}>
                        <ButtonForSite
                        site={site}
                        selectInst={selectInst}
                        selectedInst={selectedInst}
                        isLogin={isLogin}
                        addInstData={addInstData} />
                    </div>
                ))}
            </div>
                
            );
        }
    }

    return (
        <div>Can`t receive installations list</div>
    );
};

export default InstallationList;