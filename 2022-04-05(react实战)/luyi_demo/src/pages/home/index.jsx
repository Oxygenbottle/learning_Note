import { Outlet } from "react-router-dom";
// components
import Navigation from "../../components/navigation";
import Card from '../../components/card';
// pages
import TabPages from './tabPages';
import Creation from './siderPages/creation';
import AdvancedBtns from './siderPages/advancedBtns';
import SelfFuncs from './siderPages/selfFuncs';

export default function Home(params) {
    return <div>
        <Navigation className="sticky top-0" />
        <div className="mx-auto max-w-7xl w-320 flex m-2">
            <Card className="w-2/3">
                <TabPages />
            </Card>
            <div className="w-1/3">
                <Card>
                    <Creation />
                </Card>
                <Card>
                    <AdvancedBtns />
                </Card>
                <Card>
                    <SelfFuncs />
                </Card>
            </div>

        </div>

    </div>
};
