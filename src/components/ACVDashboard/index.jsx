import { Card, CardContent, CardActionArea, Typography } from '@mui/material'
import Box from '@mui/material/Box'

import Barchart from './Barchart';

const ACVDashborad = (props) => {
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
            <Barchart data={props.data} />
          </CardContent>
        </CardActionArea>
      </Card>
    </Box>
  );
}

export default ACVDashborad
