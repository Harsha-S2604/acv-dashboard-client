const utilities = {
    getACVByQuarter: (data) => {
        const quarterAcv = {}

        for (let i = 0; i < data.length; i++) {
            const d = data[i]
            const fiscalQuarter = d["closed_fiscal_quarter"]
            if (!quarterAcv[fiscalQuarter]) {
                quarterAcv[fiscalQuarter] = d.acv
            } else {
                quarterAcv[fiscalQuarter] += d.acv
            }
        }

        return quarterAcv
    },

    getACVData: (data) => {
        const acvData = {}
        const acvTotal = {}

        for (let i = 0; i < data.length; i++) {
            const d = data[i]

            const quarter = d.closed_fiscal_quarter
            const type = d.type

            if (!acvData[quarter]) {
                acvData[quarter] = {}
            }

            if (!acvData[quarter][type]) {
                acvData[quarter][type] = {
                    count: d.count,
                    acv: d.acv
                }
            } else {
                acvData[quarter][type].count += d.count
                acvData[quarter][type].acv += d.acv
            }

            if (!acvData[quarter]["total"]) {
                acvData[quarter]["total"] = {
                    count: d.count,
                    acv: d.acv
                }
            } else {
                acvData[quarter]["total"].count += d.count
                acvData[quarter]["total"].acv += d.acv
            }

            if (!acvTotal[type]) {
                acvTotal[type] = {
                    count: d.count,
                    acv: d.acv,
                }
            } else {
                acvTotal[type].count += d.count
                acvTotal[type].acv += d.acv
            }

            if (!acvTotal["total"]) {
                acvTotal["total"] = {
                    count: d.count,
                    acv: d.acv
                }
            } else {
                acvTotal["total"].count += d.count
                acvTotal["total"].acv += d.acv
            }
        }

        acvData["total"] = acvTotal
        return acvData
    }
}

export default utilities