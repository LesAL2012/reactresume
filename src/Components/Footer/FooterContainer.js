import React from 'react';
import css from './Footer.module.css';

const FooterContainer = () => {

    return <div className={css.footer}>
        <div className="container" >
            <div className='row text-center' >

                <div className='col-lg-2 col-md-4 col-sm-4 col-4' >
                    <a href='https://resume.ts.biz.ua/' target='_blank' className='text-white' rel="noopener noreferrer">
                        {new Date().getFullYear()} &copy; O.LES
                    </a>
                </div>
                <div className='col-lg-2 col-md-4 col-sm-4 col-4'>
                    <i className="fab fa-react"></i> REACT
                </div>
                <div className='col-lg-2 col-md-4 col-sm-4 col-4'>
                    <i className="fab fa-html5"></i> HTML &nbsp;{'&'}&nbsp; <i className="fab fa-css3-alt"></i> CSS
                </div>
                <div className='col-lg-2 col-md-4 col-sm-4 col-4'>
                    <i className="fab fa-js-square"></i> JS
                </div>
                <div className='col-lg-2 col-md-4 col-sm-4 col-4'>
                    <i className="fab fa-php"></i> PHP
                </div>

                <div className='col-lg-2 col-md-4 col-sm-4 col-4' >
                    <a href='https://github.com/LesAL2012?tab=repositories' target='_blank' className='text-white' rel="noopener noreferrer">
                        <i className="fab fa-github"></i> GITHUB
                    </a>
                </div>

            </div >
        </div >
    </div>
}

export default FooterContainer;