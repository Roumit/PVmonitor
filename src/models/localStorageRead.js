import React from "react";

const rawloginVRM = localStorage.getItem("loginVRM");
const rawInst = localStorage.getItem("installationsVRM");
const rawDashboards = localStorage.getItem("dashboards");
const rawinstallationsObjectData = localStorage.getItem("installationsObjectData");
// console.log("-- write to store from Local Storage --");
if (rawloginVRM) this.props.setIsLogin(JSON.parse(rawloginVRM))   
if (rawInst) this.props.setInst(JSON.parse(rawInst))
if (rawDashboards) this.props.setDashboards(JSON.parse(rawDashboards))
if (rawinstallationsObjectData) this.props.setInstallationObjectData(JSON.parse(rawinstallationsObjectData))