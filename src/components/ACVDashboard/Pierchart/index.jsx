import * as d3 from "d3";
import { useEffect, useRef } from "react";

const Piechart = (props) => {
    const ref = useRef();

    useEffect(() => {
        const gRef = d3.select(ref.current)
        const data = [{ "name": "<5", "value": 19912018 }, { "name": "5-9", "value": 20501982 }, { "name": "10-14", "value": 20679786 }, { "name": "15-19", "value": 21354481 }, { "name": "20-24", "value": 22604232 }, { "name": "25-29", "value": 21698010 }, { "name": "30-34", "value": 21183639 }, { "name": "35-39", "value": 19855782 }, { "name": "40-44", "value": 20796128 }, { "name": "45-49", "value": 21370368 }, { "name": "50-54", "value": 22525490 }, { "name": "55-59", "value": 21001947 }, { "name": "60-64", "value": 18415681 }, { "name": "65-69", "value": 14547446 }, { "name": "70-74", "value": 10587721 }, { "name": "75-79", "value": 7730129 }, { "name": "80-84", "value": 5811429 }, { "name": "≥85", "value": 5938752 }]
        const radius = 150;

        const arc = d3.arc()
            .innerRadius(radius * 0.67)
            .outerRadius(radius - 1)

        const pie = d3.pie()
            .padAngle(1 / radius)
            .sort(null)
            .value(d => d.value);

        const color = d3.scaleOrdinal()
            .domain(data.map(d => d.name))
            .range(d3.quantize(t => d3.interpolateSpectral(t * 0.8 + 0.1), data.length).reverse());


        gRef.append("g")
            .selectAll()
            .data(pie(data))
            .join("path")
            .attr("fill", d => color(d.data.name))
            .attr("transform", "translate(250 250)")
            .attr("d", arc)
            .append("title")
            .text(d => `${d.data.name}: ${d.data.value.toLocaleString()}`);

    }, [])

    return (
        <>
            <g ref={ref}>
            </g >
        </>
    )
}

export default Piechart