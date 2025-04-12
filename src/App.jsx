import { useEffect, useState } from "react"

import ACVDashborad from "./components/ACVDashboard"
import acvApi from "./api/acv"

function App() {
  const [acvData, setAcvData] = useState([])

  useEffect(() => {
    (async () => {
      const response = await acvApi.getAcv()
      const acvData = JSON.parse(response.data)
      setAcvData(acvData)
    }
    )();
  }, [])
  return (
    <>
      <div>
        {
          acvData.map((acv) => {
            return (
              <ACVDashborad type={acv.type} data={acv.acvData} />
            )
          })
        }
      </div>
    </>
  )
}

export default App
