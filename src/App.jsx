import ACVDashborad from "./components/ACVDashboard"

import customer_type from "../data/customer_type.json"
import team from "../data/team.json"
import acv_range from "../data/acv_range.json"
import acc_industry from "../data/acc_industry.json"

function App() {
  return (
    <>
      <div>
        <ACVDashborad type="Customer Type" data={customer_type} />
        <ACVDashborad type="Team" data={team} />
        <ACVDashborad type="ACV Range" data={acv_range} />
        <ACVDashborad type="Account Industry" data={acc_industry} />
      </div>
    </>
  )
}

export default App
