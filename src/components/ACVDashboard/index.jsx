import { Card, CardContent, CardActionArea, Typography, Stack, Paper } from '@mui/material'
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box'

import Barchart from './Barchart';
import utilities from '../../utilities';
import Piechart from './Pierchart';
import CTable from './CTable';

const typeKey = {
    "Customer Type": "Cust_Type",
    "Team": "Team",
    "ACV Range": "ACV_Range",
    "Account Industry": "Acct_Industry",
}

const ACVDashborad = (props) => {
    const acvData = utilities.getACVData(props.data, typeKey[props.type])

    const margin = { top: 20, right: 40, bottom: 30, left: 50 }
    const width = 800 - margin.left - margin.right
    const height = 500 - margin.top - margin.bottom

    return (
        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            gap={2}
            height="100%"
            style={{ marginBottom: "100px"}}
        >
            <Card sx={{ boxShadow: 3 }}>
                <CardActionArea>
                    <CardContent>
                        <Typography
                            variant="h5"
                            component="div"
                            align="center"
                            sx={{
                                fontWeight: 'bold',
                                color: 'primary.main',
                            }}
                        >
                            {`Won ACV mix by ${props.type}`}
                        </Typography>

                        <svg id="d3-chart"
                            width={width + margin.left + margin.right + 600}
                            height={height + margin.top + margin.bottom + 200}>
                            <g id="barchart" transform={`translate(${margin.left}, ${margin.top})`}>
                                <Barchart data={props.data} typeKey={typeKey[props.type]} acvData={acvData} width={width} height={height} margin={margin} />
                            </g>
                            <g id="piechart" transform={`translate(${width + margin.left + 100}, ${margin.top})`}>
                                <Piechart data={props.data} typeKey={typeKey[props.type]} acvData={acvData} width={width} height={height} margin={margin} />
                            </g>
                        </svg>
                        
                        <CTable acvData={acvData} typeKey={typeKey[props.type]} data={props.data} />
                    </CardContent>
                </CardActionArea>
            </Card>
        </Box>
    );
}

export default ACVDashborad
