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
        const yAxisDomain = [0, maxAcv + 200000]

        return {
            xAxisDomain,
            yAxisDomain,
        }
    }

    const drawXYAxis = (xScale, yScale, yInterval) => {
        const svg = d3.select(ref.current)

        const xAxis = d3.axisBottom(xScale)
        const yAxis = d3.axisLeft(yScale)
            .tickValues(d3.range(...yInterval))
            .tickFormat(d3.format("~s"))

        svg.append("g")
            .call(xAxis)
            .attr("transform", `translate(${margin.left},${height + margin.top})`)
            .style('font-size', '12px')

        svg.append("g")
            .call(yAxis)
            .attr("transform", `translate(${margin.left},${margin.top})`)
            .style('font-size', '12px')
    }

    const drawBar = (svgRef, xScale, yScale) => {
        const series = d3.stack()
            .keys(d3.union(props.data.map(d => d[props.typeKey])))
            .value((mapVal, key) => {
                if (mapVal[1].get(key)) {
                    return mapVal[1].get(key).acv
                }

                return null
            })
            (d3.index(props.data, d => d.closed_fiscal_quarter, d => d[props.typeKey]))

        const color = d3.scaleOrdinal()
            .domain(series.map(d => d.key))
            .range(d3.schemeSpectral[series.length + 2])
            .unknown("#ccc")
        
        svgRef.append("g")
            .selectAll()
            .data(series)
            .join("g")
            .attr("fill", d => color(d.key))
            .selectAll("rect")
            .data(D => D.map(d => (d.key = D.key, d)))
            .join("rect")
            .attr("x", d => {
                return xScale(d.data[0]) + margin.left + xScale.bandwidth() * 0.3
            })
            .attr("y", d => yScale(d[1]) + margin.top)
            .attr("width", xScale.bandwidth() * 0.4)
            .attr("height", d => yScale(d[0]) - yScale(d[1]))
        
        // percentage inside the bar
        svgRef.append("g")
            .selectAll("g")
            .data(series)
            .join("g")
            .selectAll("text")
            .data(D => D.map(d => (d.key = D.key, d)))
            .join("text")
            .attr("x", d => {
                return xScale(d.data[0]) + margin.left + xScale.bandwidth() * 0.5
            })
            .attr("y", d => yScale((d[0] + d[1]) / 2) + margin.top + 5)
            .attr("text-anchor", "middle")
            .attr("fill", "black")
            .style("font-size", "11px")
            .text(d => {
                const segmentValue = d[1] - d[0]
                const total = d.data[1]
                const sum = d3.sum(Array.from(total.values()), v => v.acv)
                const percent = (segmentValue / sum) * 100
                return percent > 0 ? `${Math.round(percent)}%` : ""
            });
        
        // group for name and colors
        const nameAndColorGrp = svgRef.append("g")
                                    .selectAll("g")
                                    .data(series)
                                    .join("g")
                                    .attr("transform", (d, i) => `translate(${margin.left + i * 150} ${height + margin.top + 100})`)
        
        nameAndColorGrp.append("rect")
            .attr("fill", d => color(d.key))
            .attr("width", 20)
            .attr("height", 20)
        
        nameAndColorGrp.append("text")
            .attr("x", 30)
            .attr("y", 15)
            .style("font-size", "14px")
            .text(d => d.key)
    }

    useEffect(() => {
        const axisData = getaxisData()

        const svg = d3.select(ref.current)

        const xScale = d3.scaleBand().domain(axisData.xAxisDomain).rangeRound([0, width]).padding(0.2)
        const yScale = d3.scaleLinear().domain(axisData.yAxisDomain).rangeRound([height, 0])
        const yInterval = [0, axisData.yAxisDomain[1] + 1, 200000]

        drawXYAxis(xScale, yScale, yInterval)
        drawBar(svg, xScale, yScale)
    }, []);

    return (
        <>
            <svg id="barchart" ref={ref} style={{ "padding": "40px" }}
                width={width + margin.left + margin.right + 500}
                height={height + margin.top + margin.bottom + 100}>
            </svg >
        </>
    )
}

export default Barchart;