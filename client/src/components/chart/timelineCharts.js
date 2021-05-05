
import React, { useState, useEffect, useRef } from 'react';
import { IgrDataChart, IgrNumericXAxis, IgrLegend, IgrNumericYAxis, IgrLineSeries, IgrColumnSeries, IgrCategoryXAxis } from 'igniteui-react-charts';
import { IgrCategoryChartModule } from 'igniteui-react-charts';
import { getHistoricalData } from '../../actions/historyAction'
import { useDispatch, useSelector } from 'react-redux'
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

IgrCategoryChartModule.register();
const TimelineCharts = () => {
    // const [ data, setData ] = useState([]);
    const dispatch = useDispatch()
    const parentRef = React.useRef();

    const hist = useSelector(state => state.hist)

    const [showLoader, setShowLoader] = useState(true)

    useEffect(() => {
        dispatch(getHistoricalData())
    }, [])

    useEffect(() => {
        console.log(hist);
        hist.length == 0 ? setShowLoader(true) : setShowLoader(false)
        console.log(showLoader);
    }, [hist])

    // useEffect(() => {
    //     setLegend(legend)
    //     if (chart) {
    //         setChart({...chart, legend:legend})
    //     }
    // }, [legend])

    // useEffect(() => {
    //     setChart(chart)
    //     if (legend) {
    //         setChart({...chart, legend:legend})
    //     }
    // }, [chart])


    return (
        <div >
            <div >

                {!showLoader && <div>
                    <div style={{ height: "calc(100% - 1.25rem)", marginTop: "50px" }} >
                        <div style={{marginBottom: "0px", marginTop:"0px"}} className="igOptions-horizontal">
                            <span className="igLegend-title">Legend: </span>
                            <div className="row"  className="igLegend">
                                <div className="col"  style={{marginBottom: "0px", marginTop:"0px"}}>
                                    <p style={{ color: "yellow" }}  className="col"><strong>yellow:</strong ></p><p className="col"> Total Infected</p>
                                </div>
                                <div className="col" style={{marginTop: "0px"}}>
                                    <p style={{ color: "red" }}   className="col"><strong>red:</strong></p><p className="col"> Total Deaths</p>
                                </div>
                            </div>
                        </div>
                        <IgrDataChart


                            dataSource={hist}
                            width="500px"
                            height="200px"
                            isHorizontalZoomEnabled={true}
                            isVerticalZoomEnabled={true}
                            legend={document.getElementById("actual")}
                        >
                            <IgrCategoryXAxis name="xAxis" label="day" />
                            <IgrNumericYAxis name="yAxis" minimumValue={0} />
                            <IgrLineSeries
                                name="series1"
                                xAxisName="xAxis"
                                yAxisName="yAxis"
                                title="day"
                                valueMemberPath="totalDeath"
                                showDefaultTooltip="true"
                                markerOutline="blue"
                                brush="red"
                            />

                            <IgrLineSeries
                                name="series3"
                                xAxisName="xAxis"
                                yAxisName="yAxis"
                                title="day"
                                valueMemberPath="totalInfected"
                                showDefaultTooltip="true"
                                markerOutline="blue"
                                brush="yellow"
                            />
                        </IgrDataChart>
                    </div>
                    <div className="igComponent" style={{ height: "calc(100% - 1.25rem)", marginTop: "50px" }} >
                        <IgrDataChart dataSource={hist}
                            width="500px"
                            height="200px">
                            <IgrCategoryXAxis name="xAxis" />
                            <IgrNumericYAxis name="yAxis" minimumValue={0} />
                            <IgrColumnSeries
                                name="series1"
                                xAxisName="xAxis"
                                yAxisName="yAxis"
                                title="day"
                                valueMemberPath="totalDeath"
                                showDefaultTooltip="true"
                                brush="red"
                            />
                            <IgrColumnSeries
                                name="series2"
                                xAxisName="xAxis"
                                yAxisName="yAxis"
                                title="day"
                                valueMemberPath="totalInfected"
                                showDefaultTooltip="true"
                                brush="yellow"
                            />

                        </IgrDataChart>
                    </div>
                </div>}

                {showLoader &&
                    <div style={{ marginLeft: "50px", marginTop:"40px"}}>
                        <Loader
                            type="Grid"
                            color="#00bfff"
                            height={400}
                            width={400}

                        //3 secs
                        />
                    </div>}
            </div>
        </div>
    );
}

export default TimelineCharts;