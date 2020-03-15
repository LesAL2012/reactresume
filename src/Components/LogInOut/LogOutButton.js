import React from 'react';
import { gdLogOut } from '../../redux/commonReducer';

import { compose } from 'redux';
import { connect } from 'react-redux';

class LogOutButton extends React.Component {

  logOut = () => {
    this.props.gdLogOut();
    window.location.href = "/";
  }

  render() {
    return <>
      {
        localStorage.getItem('reactUserLogin')
          ?
          <div className="form-inline my-2 my-lg-0">
            <button onClick={this.logOut} className="btn btn-outline-success my-2 my-sm-0" type="submit">
              {JSON.parse(localStorage.getItem('reactUserLogin')).name} -
              Log OUT</button>
          </div>
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
    gdLogOut,
  }),
)(LogOutButton);



