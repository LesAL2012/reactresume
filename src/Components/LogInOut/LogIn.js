import React, { Suspense, lazy } from 'react';
import { Redirect } from 'react-router-dom';
import { gdLogin } from '../../redux/commonReducer';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Form, Button } from 'react-bootstrap';

//import AgroBunner from '../AgroBunner/AgroBunner';
const AgroBunner = lazy(() => import('../AgroBunner/AgroBunner'));

class LogIn extends React.Component {


    logIn = (event) => {
        event.preventDefault();
        let name = event.target["formBasicEmail"].value;
        let pass = event.target["formBasicPassword"].value;
        this.props.gdLogin(name, pass);
    }

    render() {
        return <>

            {
                this.props.commonData.authLogin === false
                    ?
                    <div>
                        <Form onSubmit={this.logIn}>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Control type="email" defaultValue="mechanic34@ent" />
                            </Form.Group>

                            <Form.Group controlId="formBasicPassword">
                                <Form.Control type="password" defaultValue="Mechanic34" />
                            </Form.Group>

                            <p><span className="text-primary font-weight-bold">Use for enter:</span><br />
                                <b>Login:</b> mechanic34@ent<br />
                                <b>Password:</b> Mechanic34
                        </p>
                            <Button variant="primary" type="submit">
                                Submit
                        </Button>
                        </Form>
                        <Suspense fallback={<div className="text-primary font-weight-bold mt-5">Loading...</div>}>
                            <AgroBunner />
                        </Suspense>

                    </div>
                    :
                    <Redirect to="/agrodata" />

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
        gdLogin

    }),
)(LogIn);




