import * as d3 from "d3";
import { useEffect, useRef } from "react";

const Piechart = (props) => {
    const ref = useRef();

    useEffect(() => {
        const gRef = d3.select(ref.current)
        const radius = 150;
        let total = 0;

        const arc = d3.arc()
            .innerRadius(radius * 0.67)
            .outerRadius(radius - 1)

        const series = d3.stack()
            .keys(d3.union(props.data.map(d => d.type)))
            .value((mapVal, key) => {
                if (mapVal[1].get(key)) {
                    return mapVal[1].get(key).acv
                }

                return null
            })
            (d3.index(props.data, d => d.closed_fiscal_quarter, d => d.type))

        const color = d3.scaleOrdinal()
            .domain(series.map(d => d.key))
            .range(d3.schemeSpectral[series.length + 2])
            .unknown("#ccc")

        const flattened = series.map(layer => {
            const totalValue = d3.sum(layer, d => d[1] - d[0])
            total += totalValue
            return {
                key: layer.key,
                total: d3.sum(layer, d => d[1] - d[0])
            }
        })

        const pie = d3.pie()
            .padAngle(1 / radius)
            .sort(null)
            .value(d => d.total);


        gRef.append("g")
            .selectAll("path")
            .data(pie(flattened))
            .join("path")
            .attr("fill", d => color(d.data.key))
            .attr("d", arc)

        gRef.append("text")
            .attr("text-anchor", "middle")
            .attr("dominant-baseline", "middle")
            .attr("x", 0)
            .attr("y", -10)
            .text("Total")
            .style("font-size", "16px")
            .style("fill", "#333")

        gRef.append("text")
            .attr("text-anchor", "middle")
            .attr("dominant-baseline", "middle")
            .attr("x", 0)
            .attr("y", 12)
            .text(`$${Math.round(total).toLocaleString()}`)
            .style("font-size", "14px")
            .style("fill", "#666")

    }, [])

    return (
        <>
            <g transform="translate(250 250)" ref={ref}>
            </g >
        </>
    )
}

export default Piechart