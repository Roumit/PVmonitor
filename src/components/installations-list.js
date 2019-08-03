import React from "react";

const InstallationList = ({ installationResponce, selectInst}) => {
    console.log(installationResponce)

    if (installationResponce){
        if (installationResponce.data.success) {
            return (
                <div className="installation-menu">
                {installationResponce.data.records.map((site) => (
                    <div key={site.idSite}>
                        <button  
                        onClick={() => selectInst(site.idSite)}
                        >{site.name}</button>
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