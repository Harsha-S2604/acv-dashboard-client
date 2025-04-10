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
    }
}

export default utilities