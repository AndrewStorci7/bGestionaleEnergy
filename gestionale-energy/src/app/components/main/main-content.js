'use client';

import React, { useState } from "react";
import SearchInput from "./search/search";
import Table from "./table/table";

import PropTypes from 'prop-types'; // per ESLint

/**
 * Main Content Component
 * @author Andrea Storci from Oppimittinetworking
 * 
 * @param {string} type     [ 'presser' | 'wheelman' | 'both' | 'admin' ] 
 * 
 * @param {*} props  
 */
export default function MainContent({ 
    type, 
    implant, 
    idUser, 
    ...props
}) {

    const _CMNSTYLE_DIV_EMPTY = "fixed top-0 left-0 h-screen w-screen"
    const _CMNSTYLE_EMPTY = "text-2xl w-screen h-screen flex justify-center items-center"

    const [isEmpty, setEmpty] = useState(false);
    const [msgEmpty, setMsg] = useState("");

    const noData = (msg) =>  {
        setEmpty(!isEmpty)
        setMsg(msg)
    }

    return(
        <div 
            {...props}
        >
            <SearchInput type={type} />
            <Table
                type={type}
                implant={implant}
                idUser={idUser}
            />
        </div>
    );
}

MainContent.propTypes = {
    type: PropTypes.string.isRequired,
    implant: PropTypes.string.isRequired,
    idUser: PropTypes.string.isRequired
};