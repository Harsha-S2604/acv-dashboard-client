import { Card, CardContent, CardActionArea, Typography } from '@mui/material'
import Box from '@mui/material/Box'

import Barchart from './Barchart';
import utilities from '../../utilities';

const typeKey = {
    "Customer Type": "Cust_Type",
    "Team": "Team",
    "ACV Range": "ACV_Range",
    "Account Industry": "Acct_Industry",
}

const ACVDashborad = (props) => {
    const acvByQuarter = utilities.getACVByQuarter(props.data)
    const acvData = utilities.getACVData(props.data, typeKey[props.type])

    return (
        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            gap={2}
            height="100vh"
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
                        <Barchart data={props.data} acvByQuarter={acvByQuarter} acvData={acvData} />
                    </CardContent>
                </CardActionArea>
            </Card>
        </Box>
    );
}

export default ACVDashborad
