import React from "react";
import Button from "@material-ui/core/Button";
import { getInstallationData } from "../containers/apiVRM";
import { TextField } from "@material-ui/core";


const buttonText = (site) => {
    const date = new Date(site.last_timestamp * 1000);
    const year = date.getFullYear();
    console.log("Why ???  ", date.getMonth());
    const month = (date.getMonth() > 9)? date.getMonth(): "0" + date.getMonth();
    const day = (date.getDate() > 9)? date.getDate(): "0" + date.getDate();
    const hour = (date.getHours() > 9)? date.getHours(): "0" + date.getHours();
    const minute = (date.getMinutes() > 9)? date.getMinutes(): "0" + date.getMinutes();

    if (site.alarm === true ) {
        return `${site.name} ( last connect: ${hour}:${minute} ${day}.${month}.${year} ) !alarm!`;
    }
    return `${site.name} ( last connect: ${hour}:${minute} ${day}.${month}.${year} )`;
};
    
const dataFilterParams = [143, 215];
const dataFilterEnergie = ["consumption", "solar_yield", "from_to_grid"];

const SmallSiteData = ({ extended }) => {
    const params = extended.filter(elem => (dataFilterParams.indexOf(elem.idDataAttribute) !== -1));
    // console.log(extended);
    const energie = (extended.filter(elem => (dataFilterEnergie.indexOf(elem.code) !== -1)));
    // console.log(energie);
    const data = params.concat(energie);
    // console.log(data);
    return (
        <div className="small-site-data">
            {data.map((data) => (
                <div key={data.idDataAttribute || data.code}>{data.description} {data.formattedValue}</div>
                // <TextField type="checkbox" key={data.idDataAttribute} />
            ))}
        </div>
    );
};

const ButtonForSite = ({ site, selectInst, selectedInst, isLogin, addInstData }) => {
    if (site.idSite === selectedInst) {
        return (
            <div> 
            <Button
                color="primary"
                // onClick={() => selectInst(site.idSite)}
                disabled
            >{buttonText(site)}</Button>
            <SmallSiteData
            extended={site.extended} />
            </div>
        )
    }
    // console.log(site);
    // console.log(site.extended);
    return (
        <div>
        <Button
            color="primary" 
            onClick={() => {
                selectInst(site.idSite);
                getInstallationData(site.idSite, isLogin.headerWithToken).then((responce) => {
                    const data = {}
                    console.log(responce);
                    data[site.idSite] = responce;
                    addInstData(data);
                })
            }}
        >{buttonText(site)}</Button>
        <SmallSiteData
        extended={site.extended} />
        </div>
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