import * as d3 from "d3";
import { useEffect, useRef } from "react";

const Barchart = (props) => {
    const ref = useRef();
    const margin = { top: 20, right: 40, bottom: 30, left: 50 }
    const width = 1300 - margin.left - margin.right
    const height = 500 - margin.top - margin.bottom

    const getaxisData = () => {
        let count = 0

        const { data } = props

        const freqMap = {}

        const xAxisDomain = []
        const yAxisDomain = [
            0, 
            d3.max(data, d => d.acv)
        ]

        console.log(yAxisDomain)

        for (let i = 0; i < data.length; i++) {
            const d = data[i]
            if (!freqMap[d.closed_fiscal_quarter]) {
                freqMap[d.closed_fiscal_quarter] = 1
                count += 1
                xAxisDomain.push(d.closed_fiscal_quarter)
            }
        }


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
            <svg ref={ref} style={{ "padding": "100px" }}
                width={width + margin.left + margin.right}
                height={height + margin.top + margin.bottom}>
            </svg >
        </>
    )
}

export default Barchart;