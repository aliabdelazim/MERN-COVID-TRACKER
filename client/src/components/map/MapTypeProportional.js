import React, { Component } from 'react';
import WorldLocations from "../../actions/WorldLocations";
import { connect } from 'react-redux';
import WorldUtils from "../../actions/WorldUtits"
import { IgrGeographicMapModule } from 'igniteui-react-maps';
import { IgrGeographicMap } from 'igniteui-react-maps';
import { IgrGeographicProportionalSymbolSeries } from 'igniteui-react-maps';
import { IgrDataChartInteractivityModule } from 'igniteui-react-charts';
import { IgrValueBrushScale } from 'igniteui-react-charts';
// import { IgrCustomPaletteBrushScale } from 'igniteui-react-charts';
import { IgrSizeScale } from 'igniteui-react-charts';
import { IgrDataContext } from 'igniteui-react-core';
import { MarkerType } from 'igniteui-react-charts';
import { getStatisticalData } from "../../actions/statisticalAction"
import PropTypes from "prop-types";
// import { BrushSelectionMode } from 'igniteui-react-charts';
import { bindActionCreators } from 'redux';

IgrGeographicMapModule.register();
IgrDataChartInteractivityModule.register();

class MapTypeScatterBubbleSeries extends Component {

    geoMap = new IgrGeographicMap();

    constructor(props) {
        super(props);

        this.state = {
           dataSource: []
          };

        this.onMapRef = this.onMapRef.bind(this);
        this.createTooltip = this.createTooltip.bind(this);
        this.props.statisticalData()
    }


    componentWillReceiveProps(nextProps) {
        console.log(nextProps.statData.stat);
        this.setState({
            dataSource: nextProps.statData.stat
        })

        this.addSeriesWith(nextProps.statData.stat);
      }
    
      onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
      };

    render() {
        

        return (
            <div className="igContainer" >
                <div className="igComponent" >
                    <IgrGeographicMap
                        ref={this.onMapRef}
                        width="700px"
                        height="500px"
                        zoomable="true" />
                </div>
            </div>
        );
    }

    onMapRef(geoMap) {
        if (!geoMap) { return; }

        this.geoMap = geoMap;
        this.geoMap.windowRect = { left: 0.2, top: 0.1, width: 0.6, height: 0.6 };

        
    }

    addSeriesWith(covid) {
        const sizeScale = new IgrSizeScale({});
        sizeScale.minimumValue = 4;
        sizeScale.maximumValue = 60;

        const brushes = [
            "rgba(14, 194, 14, 0.4)",  // semi-transparent green
            "rgba(252, 170, 32, 0.4)", // semi-transparent orange
            "rgba(252, 32, 32, 0.4)",  // semi-transparent red
        ];

        const brushScale = new IgrValueBrushScale({});
        brushScale.brushes = brushes;
        brushScale.minimumValue = 0;
        brushScale.maximumValue = 30;
        const symbolSeries = new IgrGeographicProportionalSymbolSeries({ name: "symbolSeries" });
        symbolSeries.dataSource = covid;
        symbolSeries.markerType = MarkerType.Circle;
        symbolSeries.radiusScale = sizeScale;
        symbolSeries.fillScale = brushScale;
        symbolSeries.fillMemberPath = "totalInfected";
        symbolSeries.radiusMemberPath = "totalInfected";
        symbolSeries.latitudeMemberPath = "lat";
        symbolSeries.longitudeMemberPath = "lon";
        symbolSeries.markerOutline = "rgba(255, 0, 0, 0.8)";
        symbolSeries.markerOutlineUsesFillScale = true
        symbolSeries.tooltipTemplate = this.createTooltip;

        this.geoMap.series.add(symbolSeries);
    }


    createTooltip(context) {
        const dataContext = context.dataContext;
        if (!dataContext) return null;

        const dataItem = dataContext.item;
        if (!dataItem) return null;

        const totalInfected = dataItem.totalInfected;
        const lat = WorldUtils.toStringLat(dataItem.lat);
        const lon = WorldUtils.toStringLon(dataItem.lon);

        return <div>
            <div className="tooltipTitle">{dataItem.name}</div>
            <div className="tooltipBox">
                <div className="tooltipRow">
                    <div className="tooltipLbl">Country:</div>
                    <div className="tooltipVal">{dataItem.country}</div>
                </div>
                <div className="tooltipRow">
                    <div className="tooltipLbl">Total Infected:</div>
                    <div className="tooltipVal">{totalInfected}</div>
                </div>
                <div className="tooltipRow">
                    <div className="tooltipLbl">Latitude:</div>
                    <div className="tooltipVal">{lat}</div>
                </div>
                <div className="tooltipRow">
                    <div className="tooltipLbl">Longitude:</div>
                    <div className="tooltipVal">{lon}</div>
                </div>
            </div>
        </div>
    }

}

const mapDispatchToProps = dispatch => {
    return {
        
        statisticalData: () => dispatch(getStatisticalData())
    };
 };

const mapStateToProps = state => {
    return {
        statData: state.stat
    };
};



export default connect(mapStateToProps, mapDispatchToProps)(MapTypeScatterBubbleSeries)
