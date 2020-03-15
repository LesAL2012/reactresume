import React from 'react';
import css from './Header.module.css';

const HeaderContainer = () => {

        return <div className={css.header}>
                <div className="container" >
                        React Redux Reselect Lazy&Suspense <i className="fab fa-reacteurope"></i>
                        &nbsp;API Axios Promise: async/await <i className="fab fa-reacteurope"></i>
                        &nbsp;Bootstrap Module-CSS Carousel Preloader <i className="fab fa-reacteurope"></i>
                        &nbsp;Leaflet-Maps, HERE-Maps & Google-Maps <i className="fas fa-database"></i>
                        &nbsp;SQL & PHP

                </div>
        </div>
}

export default HeaderContainer;