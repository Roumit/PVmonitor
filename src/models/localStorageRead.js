import React from "react";




export default function writeStoreFromLocalStorage(key) {
    const data = localStorage.getItem(key);
    if (data) return JSON.parse(data);
    return null;
};
