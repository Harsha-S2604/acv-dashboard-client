import React from "react"
import { Table, TableCell, TableContainer, TableHead, TableRow, Typography, Paper, TableBody } from '@mui/material';

const typeHeaders = {
    Cust_Type: "Cust Type",
    Team: "Team",
    ACV_Range: "ACV Range",
    Acct_Industry: "Account Industry",

}

const CTable = (props) => {

    const getTableConfig = () => {
        const { acvData } = props
        const headings = Object.keys(acvData)
        const types = Object.keys(acvData[headings[0]])
        return {
            headings,
            types
        }
    }

    const tableConfig = getTableConfig()

    return (
        <TableContainer component={Paper}>
            <Table aria-label="fiscal data table">
                <TableHead>
                    <TableRow>
                        <TableCell align="center" style={{ fontWeight: "600" }} rowSpan={1}>
                            Closed Fiscal Quarter
                        </TableCell>
                        {tableConfig.headings?.map((fiscalYear, idx) => (
                            <TableCell
                                align="center"
                                colSpan={3}
                                style={{
                                    backgroundColor: idx % 2 === 0 ? '#f0f0f0' : '#ffffff', // Alternate colors
                                    fontWeight: "600"
                                }} key={`year-${idx}`}>
                                {fiscalYear}
                            </TableCell>
                        ))}
                    </TableRow>
                    <TableRow>
                        <TableCell style={{ fontWeight: "600" }} align="center">
                            {typeHeaders[props.typeKey]}
                        </TableCell>
                        {tableConfig.headings?.map((_, idx) => (
                            <React.Fragment key={`subhead-${idx}`}>
                                <TableCell align="center">
                                    <span style={{ fontWeight: "600" }}># of Opps</span>
                                </TableCell>
                                <TableCell align="center">
                                    <span style={{ fontWeight: "600" }}>ACV</span>
                                </TableCell>
                                <TableCell align="center">
                                    <span style={{ fontWeight: "600" }}>% of Total</span>
                                </TableCell>
                            </React.Fragment>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        tableConfig.types.map((type) => {
                            if (type == "total") {
                                return null
                            }
                            return (
                                <React.Fragment>
                                    <TableRow>
                                        <TableCell align="center">{type}</TableCell>
                                        {tableConfig.headings.map((heading) => {
                                            const count = props.acvData[heading][type]?.count || 0
                                            const acv = Math.round(props.acvData[heading][type]?.acv) || 0
                                            const acvFormat = `$${acv.toLocaleString('en-US')}`

                                            // percentage calculation
                                            const totalAcv = props.acvData[heading]["total"].acv
                                            const percentage = Math.round((acv / totalAcv) * 100)
                                            const percentageFormat = `${percentage}%`

                                            return (
                                                <>
                                                    <TableCell align="center">{count}</TableCell>
                                                    <TableCell align="center">{acvFormat}</TableCell>
                                                    <TableCell align="center">{percentageFormat}</TableCell>
                                                </>
                                            )
                                        })}
                                    </TableRow>

                                </React.Fragment>
                            )
                        })
                    }
                    <TableRow>
                        <TableCell align="center" style={{ fontWeight: "600" }}>Total</TableCell>

                        {tableConfig.headings.map((heading) => {
                            const count = props.acvData[heading]["total"]?.count || 0
                            const acv = Math.round(props.acvData[heading]["total"]?.acv) || 0
                            const acvFormat = `$${acv.toLocaleString('en-US')}`

                            // percentage calculation
                            const totalAcv = props.acvData[heading]["total"].acv
                            const percentage = Math.round((acv / totalAcv) * 100)
                            const percentageFormat = `${percentage}%`

                            return (
                                <>
                                    <TableCell align="center" style={{ fontWeight: "600" }}>{count}</TableCell>
                                    <TableCell align="center" style={{ fontWeight: "600" }}>{acvFormat}</TableCell>
                                    <TableCell align="center" style={{ fontWeight: "600" }}>{percentageFormat}</TableCell>
                                </>
                            )
                        })}
                    </TableRow>
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default CTable