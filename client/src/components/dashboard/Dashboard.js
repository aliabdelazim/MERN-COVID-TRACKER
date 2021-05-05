import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import { IgrGeographicMapModule } from 'igniteui-react-maps';
import { IgrDataChartInteractivityModule } from 'igniteui-react-charts';
import MapTypeScatterBubbleSeries from '../map/MapTypeProportional'
import TimelineCharts from "../../components/chart/timelineCharts"

IgrGeographicMapModule.register();
IgrDataChartInteractivityModule.register();

class Dashboard extends Component {
  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };

  render() {

    return (

      <div >
        <div className="navbar-fixed">
          <nav className="z-depth-0">
            <div className="nav-wrapper blue" style={{ alignItems: "end" }}>
              <button
                style={{
                  borderRadius: "3px",
                  letterSpacing: "1.5px",
                  marginRight: "2px",
                  alignItems: "end",
                  marginTop: "0px",
                  color: "black",
                  marginLeft: "90%"
                }}
                onClick={this.onLogoutClick}
                className="btn  waves-effect waves-light hoverable white accent-3"
              >
                Logout
              </button>
            </div>
          </nav>
        </div>
        <div className="row">
          <div className="col">
            <MapTypeScatterBubbleSeries />
          </div>
          <div className="col">
            <TimelineCharts />
          </div>
        </div>
      </div>

    );
  }
}

Dashboard.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(Dashboard);
