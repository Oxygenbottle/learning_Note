import { Outlet } from "react-router-dom"
import Navigation from "../../components/navigation"
import Card from "../../components/card"

import TabPages from "./tabPages"
import Creation from "./siderPages/creation"
import AdvancedBtns from "./siderPages/advancedBtns"
import SelfFuncs from "./siderPages/selfFuncs"

export default function Home(params) {
  return <div>
    <Navigation className="sticky top-0"></Navigation>
    <div className="mx-auto max-w-7xl w-320 flex">
      <Card className="w-2/3">
        <TabPages />
      </Card>
      <div className="w-1/3">
        <Card>
          <Creation></Creation>
        </Card>
        <Card>
          <AdvancedBtns></AdvancedBtns>
        </Card>
        <Card>
          <SelfFuncs></SelfFuncs>
        </Card>
      </div>

    </div>

  </div>
}