import SpareCutting from "./SpareCutting";
import ExchangeRate from "./ExchangeRate";
import PriceDeviation from "./PriceDeviation";

export default function AdvancedSettings() {
    return (
        <>
            <div className="grid grid-cols-1 gap-6 mb-6 w-full sm-grid-cols:1 md:grid-cols-2 xl:grid-cols-3 bg-white shadow-lg shadow-gray-200 rounded-md p-2 ">
                <div>
                    <PriceDeviation />
                </div>
                <div>
                    <SpareCutting />
                </div>
                <div>
                    <ExchangeRate />
                </div>
            </div>
        </>
    )
}