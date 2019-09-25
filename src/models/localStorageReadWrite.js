import React from "react";

export function setLocalStorage(key, value) {
    const myStorage = localStorage;
    myStorage.setItem(key, value);
};
