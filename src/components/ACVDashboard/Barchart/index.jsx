import * as d3 from "d3";
import { useEffect, useRef } from "react";

const Barchart = (props) => {
    const ref = useRef();
    const margin = { top: 20, right: 40, bottom: 30, left: 50 }
    const width = 800 - margin.left - margin.right
    const height = 500 - margin.top - margin.bottom

    const getMaxAcv = () => {
        const { acvData } = props

        let max = 0;
        for (const acv in acvData) {
            const total = acvData[acv]["total"]
            if (total.acv > max) {
                max = total.acv
            }
        }

        return max
    }

    const getaxisData = () => {
        const { acvData } = props

        const maxAcv = getMaxAcv()

        const xAxisDomain = Object.keys(acvData)
        const yAxisDomain = [0, maxAcv]

        return {
            xAxisDomain,
            yAxisDomain,
        }
    }

    useEffect(() => {
        const axisData = getaxisData()

        const svg = d3.select(ref.current)

        const xScale = d3.scaleBand().domain(axisData.xAxisDomain).range([0, width]).padding(0.2)
        const yScale = d3.scaleLinear().domain(axisData.yAxisDomain).range([height, 0])

        const yTicks = d3.range(0, axisData.yAxisDomain[1] + 1, 200000)

        const xAxis = d3.axisBottom(xScale)
        const yAxis = d3.axisLeft(yScale)
                    .tickValues(yTicks)
                    .tickFormat(d3.format("~s"))

        svg.append("g")
            .call(xAxis)
            .attr("transform", `translate(${margin.left},${height + margin.top})`)
            .style('font-size', '12px')

        svg.append("g")
            .call(yAxis)
            .attr("transform", `translate(${margin.left},${margin.top})`)
            .style('font-size', '12px')

    }, []);

    return (
        <>
            <svg ref={ref} style={{ "padding": "40px" }}
                width={width + margin.left + margin.right}
                height={height + margin.top + margin.bottom}>
            </svg >
        </>
    )
}

export default Barchart;