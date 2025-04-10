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

    getACVData: (data, key = '') => {
        const acvData = {}

        for (let i = 0; i < data.length; i++) {
            const d = data[i]

            const quarter = d.closed_fiscal_quarter
            const type = d[key]

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
        }

        return acvData
    }
}

export default utilities