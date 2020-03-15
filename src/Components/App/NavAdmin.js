import React from 'react';
import {
    NavDropdown
} from 'react-bootstrap';
import { compose } from 'redux';
import { connect } from 'react-redux';

class NavAdmin extends React.Component {

    render() {

        return <>

            {
                JSON.parse(localStorage.getItem('reactUserLogin')).rights === 'admin'
                    ?
                    <NavDropdown.Item href="/admin">Admin Panel</NavDropdown.Item>
                    :
                    ''
            }

        </>
    }

}


let mapStateToProps = (state) => {
    return {
        commonData: state.common,
    }
}

export default compose(
    connect(mapStateToProps, {
    }),
)(NavAdmin);




