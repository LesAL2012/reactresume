import React from 'react';
import preloader from './preloader2.gif';
import Image from 'react-bootstrap/Image';


let Preloader = (props) => {
    return <div className="row text-center">
        <div className="w-50 text-center mx-auto">
            <Image src={preloader} className="w-50 mx-auto" alt="preloader" />
        </div >
    </div >
}

export default Preloader;