var exports = module.exports = {};

//PaloAlto
const numberOfSolarPanelsHistorySingleCityPaloAlto = [
    {"Month":"Oct 2018","PaloAlto":1000,"AllCitiesAverage":2400},
    {"Month":"Nov 2018","PaloAlto":1200,"AllCitiesAverage":2600},
    {"Month":"Dec 2018","PaloAlto":1300,"AllCitiesAverage":2900},
    {"Month":"Jan 2019","PaloAlto":1350,"AllCitiesAverage":3000},
    {"Month":"Feb 2019","PaloAlto":1500,"AllCitiesAverage":3400},
    {"Month":"Mar 2019","PaloAlto":1800,"AllCitiesAverage":3600}];

const numberOfSolarPanelsPerHHSingleCityPaloAlto = [
    {"Month":"Oct 2018","PaloAlto":270,"AllCitiesAverage":250},
    {"Month":"Nov 2018","PaloAlto":280,"AllCitiesAverage":260},
    {"Month":"Dec 2018","PaloAlto":290,"AllCitiesAverage":250},
    {"Month":"Jan 2019","PaloAlto":290,"AllCitiesAverage":240},
    {"Month":"Feb 2019","PaloAlto":288,"AllCitiesAverage":250},
    {"Month":"Mar 2019","PaloAlto":290,"AllCitiesAverage":220}];

const dailyPowerGenerationByCityPaloAlto = [
    {"date":"2019-3-1","PaloAlto":50,"AllCitiesAverage":50},
    {"date":"2019-3-2","PaloAlto":19,"AllCitiesAverage":20},
    {"date":"2019-3-3","PaloAlto":50,"AllCitiesAverage":45},
    {"date":"2019-3-4","PaloAlto":50,"AllCitiesAverage":50},
    {"date":"2019-3-5","PaloAlto":30,"AllCitiesAverage":40},
    {"date":"2019-3-6","PaloAlto":77,"AllCitiesAverage":80},
    {"date":"2019-3-7","PaloAlto":85,"AllCitiesAverage":80}];

const electricityGeneratedMonthlyCompareToCitiesAvgSingleCityPaloAlto =
    [{ Month: "Nov 2018",  PaloAlto: 4300, AllCitiesAverage: 3200},
        { Month: "Dec 2018",  PaloAlto: 4300, AllCitiesAverage: 3200},
        { Month: "Jan 2019",  PaloAlto: 4300, AllCitiesAverage: 3200},
        { Month: "Feb 2019",  PaloAlto: 4300, AllCitiesAverage: 3200},
        { Month: "Mar 2019",  PaloAlto: 4200, AllCitiesAverage: 3100},
        { Month: "Apr 2019",  PaloAlto: 4000, AllCitiesAverage: 3000},
    ];

const moneySavedMonthlyCompareToCitiesAvgSingleCityPaloAlto = [
    { Month: "Nov 2018",  PaloAlto: 4300, AllCitiesAverage: 3200},
    { Month: "Dec 2018",  PaloAlto: 4300, AllCitiesAverage: 3200},
    { Month: "Jan 2019",  PaloAlto: 4300, AllCitiesAverage: 3200},
    { Month: "Feb 2019", PaloAlto: 4010, AllCitiesAverage: 3000},
    { Month: "Mar 2019", PaloAlto: 4100, AllCitiesAverage: 3010},
    { Month: "Apr 2019", PaloAlto: 4000, AllCitiesAverage: 3000},
];

const totalElectricityGeneratedPerHHMonthlyPaloAlto =
    [{ Month: "Nov 2018",  PaloAlto: 450, AllCitiesAverage: 450},
    { Month: "Dec 2018",  PaloAlto: 430, AllCitiesAverage: 400},
    { Month: "Jan 2019",  PaloAlto: 550, AllCitiesAverage: 500},
    { Month: "Feb 2019",  PaloAlto: 540, AllCitiesAverage: 550},
    { Month: "Mar 2019",  PaloAlto: 650, AllCitiesAverage: 690},
    { Month: "Apr 2019",  PaloAlto: 750, AllCitiesAverage: 780},
];



// Sunnyvale
const numberOfSolarPanelsHistorySingleCitySunnyvale = [
    {"Month":"Oct 2018","Sunnyvale":1000,"AllCitiesAverage":2400},
    {"Month":"Nov 2018","Sunnyvale":1200,"AllCitiesAverage":2600},
    {"Month":"Dec 2018","Sunnyvale":1300,"AllCitiesAverage":2900},
    {"Month":"Jan 2019","Sunnyvale":1350,"AllCitiesAverage":3000},
    {"Month":"Feb 2019","Sunnyvale":1500,"AllCitiesAverage":3400},
    {"Month":"Mar 2019","Sunnyvale":1800,"AllCitiesAverage":3600}];

const numberOfSolarPanelsPerHHSingleCitySunnyvale = [
    {"Month":"Oct 2018","Sunnyvale":260,"AllCitiesAverage":250},
    {"Month":"Nov 2018","Sunnyvale":250,"AllCitiesAverage":260},
    {"Month":"Dec 2018","Sunnyvale":240,"AllCitiesAverage":250},
    {"Month":"Jan 2019","Sunnyvale":240,"AllCitiesAverage":240},
    {"Month":"Feb 2019","Sunnyvale":230,"AllCitiesAverage":250},
    {"Month":"Mar 2019","Sunnyvale":240,"AllCitiesAverage":220}];

const dailyPowerGenerationByCitySunnyvale = [
    {"date":"2019-3-1","Sunnyvale":50,"AllCitiesAverage":50},
    {"date":"2019-3-2","Sunnyvale":19,"AllCitiesAverage":20},
    {"date":"2019-3-3","Sunnyvale":43,"AllCitiesAverage":45},
    {"date":"2019-3-4","Sunnyvale":50,"AllCitiesAverage":50},
    {"date":"2019-3-5","Sunnyvale":40,"AllCitiesAverage":40},
    {"date":"2019-3-6","Sunnyvale":78,"AllCitiesAverage":80},
    {"date":"2019-3-7","Sunnyvale":80,"AllCitiesAverage":80}];

const electricityGeneratedMonthlyCompareToCitiesAvgSingleCitySunnyvale =
    [{ Month: "Nov 2018",  Sunnyvale: 4300, AllCitiesAverage: 3200},
        { Month: "Dec 2018",  Sunnyvale: 4300, AllCitiesAverage: 3200},
        { Month: "Jan 2019",  Sunnyvale: 4300, AllCitiesAverage: 3200},
        { Month: "Feb 2019",  Sunnyvale: 4300, AllCitiesAverage: 3200},
        { Month: "Mar 2019",  Sunnyvale: 4200, AllCitiesAverage: 3100},
        { Month: "Apr 2019",  Sunnyvale: 4000, AllCitiesAverage: 3000},
    ];

const moneySavedMonthlyCompareToCitiesAvgSingleCitySunnyvale = [
    { Month: "Nov 2018",  Sunnyvale: 4300, AllCitiesAverage: 3200},
    { Month: "Dec 2018",  Sunnyvale: 4300, AllCitiesAverage: 3200},
    { Month: "Jan 2019",  Sunnyvale: 4300, AllCitiesAverage: 3200},
    { Month: "Feb 2019", Sunnyvale: 4010, AllCitiesAverage: 3000},
    { Month: "Mar 2019", Sunnyvale: 4100, AllCitiesAverage: 3010},
    { Month: "Apr 2019", Sunnyvale: 4000, AllCitiesAverage: 3000},
];

const totalElectricityGeneratedPerHHMonthlySunnyvale =[
        { Month: "Nov 2018",  Sunnyvale: 450, AllCitiesAverage: 450},
        { Month: "Dec 2018",  Sunnyvale: 430, AllCitiesAverage: 400},
        { Month: "Jan 2019",  Sunnyvale: 550, AllCitiesAverage: 500},
        { Month: "Feb 2019",  Sunnyvale: 540, AllCitiesAverage: 550},
        { Month: "Mar 2019",  Sunnyvale: 650, AllCitiesAverage: 690},
        { Month: "Apr 2019",  Sunnyvale: 750, AllCitiesAverage: 780},
    ];



// San Jose
const numberOfSolarPanelsHistorySingleCity = [
    {"Month":"Oct 2018","SanJose":1000,"AllCitiesAverage":2400},
    {"Month":"Nov 2018","SanJose":1200,"AllCitiesAverage":2600},
    {"Month":"Dec 2018","SanJose":1300,"AllCitiesAverage":2900},
    {"Month":"Jan 2019","SanJose":1350,"AllCitiesAverage":3000},
    {"Month":"Feb 2019","SanJose":1500,"AllCitiesAverage":3400},
    {"Month":"Mar 2019","SanJose":1800,"AllCitiesAverage":3600}];

const numberOfSolarPanelsPerHHSingleCity = [
    {"Month":"Oct 2018","SanJose":200,"AllCitiesAverage":250},
    {"Month":"Nov 2018","SanJose":220,"AllCitiesAverage":260},
    {"Month":"Dec 2018","SanJose":200,"AllCitiesAverage":250},
    {"Month":"Jan 2019","SanJose":210,"AllCitiesAverage":240},
    {"Month":"Feb 2019","SanJose":230,"AllCitiesAverage":250},
    {"Month":"Mar 2019","SanJose":240,"AllCitiesAverage":220}];

const dailyPowerGenerationByCity = [
    {"date":"2019-3-1","SanJose":40,"AllCitiesAverage":50},
    {"date":"2019-3-2","SanJose":19,"AllCitiesAverage":20},
    {"date":"2019-3-3","SanJose":43,"AllCitiesAverage":45},
    {"date":"2019-3-4","SanJose":50,"AllCitiesAverage":50},
    {"date":"2019-3-5","SanJose":40,"AllCitiesAverage":40},
    {"date":"2019-3-6","SanJose":78,"AllCitiesAverage":80},
    {"date":"2019-3-7","SanJose":80,"AllCitiesAverage":80}];

const electricityGeneratedMonthlyCompareToCitiesAvgSingleCity =
    [{ Month: "Nov 2018",  SanJose: 4300, AllCitiesAverage: 3200},
    { Month: "Dec 2018",  SanJose: 4300, AllCitiesAverage: 3200},
    { Month: "Jan 2019",  SanJose: 4300, AllCitiesAverage: 3200},
    { Month: "Feb 2019",  SanJose: 4300, AllCitiesAverage: 3200},
    { Month: "Mar 2019",  SanJose: 4200, AllCitiesAverage: 3100},
    { Month: "Apr 2019",  SanJose: 4000, AllCitiesAverage: 3000},
];

const moneySavedMonthlyCompareToCitiesAvgSingleCity = [
    { Month: "Nov 2018",  SanJose: 4300, AllCitiesAverage: 3200},
    { Month: "Dec 2018",  SanJose: 4300, AllCitiesAverage: 3200},
    { Month: "Jan 2019",  SanJose: 4300, AllCitiesAverage: 3200},
    { Month: "Feb 2019", SanJose: 4010, AllCitiesAverage: 3000},
    { Month: "Mar 2019", SanJose: 4100, AllCitiesAverage: 3010},
    { Month: "Apr 2019", SanJose: 4000, AllCitiesAverage: 3000},
];



const totalElectricityGeneratedPerHHMonthlySanJose =
    [{ Month: "Nov 2018",  SanJose: 450, AllCitiesAverage: 450},
        { Month: "Dec 2018",  SanJose: 430, AllCitiesAverage: 400},
        { Month: "Jan 2019",  SanJose: 550, AllCitiesAverage: 500},
        { Month: "Feb 2019",  SanJose: 540, AllCitiesAverage: 550},
        { Month: "Mar 2019",  SanJose: 650, AllCitiesAverage: 690},
        { Month: "Apr 2019",  SanJose: 750, AllCitiesAverage: 780},
    ];


exports.data = {
    SanJose: {
        numberOfSolarPanelsHistorySingleCity_data: numberOfSolarPanelsHistorySingleCity,
        numberOfSolarPanelsPerHHSingleCity: numberOfSolarPanelsPerHHSingleCity,
        dailyPowerGenerationByCity: dailyPowerGenerationByCity,
        electricityGeneratedMonthlyCompareToCitiesAvgSingleCity: electricityGeneratedMonthlyCompareToCitiesAvgSingleCity,
        moneySavedMonthlyCompareToCitiesAvgSingleCity: moneySavedMonthlyCompareToCitiesAvgSingleCity,
        totalElectricityGeneratedPerHHMonthly: totalElectricityGeneratedPerHHMonthlySanJose,
        totalHHInstalled: 1000,
        totalHHNotInstalled: 2000,
        totalElectricityGeneratedYTD: 38999,
        totalMoneySavedYTD: 777700,
    },
    Sunnyvale: {
        numberOfSolarPanelsHistorySingleCity_data: numberOfSolarPanelsHistorySingleCitySunnyvale,
        numberOfSolarPanelsPerHHSingleCity: numberOfSolarPanelsPerHHSingleCitySunnyvale,
        dailyPowerGenerationByCity: dailyPowerGenerationByCitySunnyvale,
        electricityGeneratedMonthlyCompareToCitiesAvgSingleCity: electricityGeneratedMonthlyCompareToCitiesAvgSingleCitySunnyvale,
        moneySavedMonthlyCompareToCitiesAvgSingleCity: moneySavedMonthlyCompareToCitiesAvgSingleCitySunnyvale,
        totalElectricityGeneratedPerHHMonthly: totalElectricityGeneratedPerHHMonthlySunnyvale,
        totalHHInstalled: 2000,
        totalHHNotInstalled: 3000,
        totalElectricityGeneratedYTD: 3999,
        totalMoneySavedYTD: 771700,
    },
    PaloAlto: {
        numberOfSolarPanelsHistorySingleCity_data: numberOfSolarPanelsHistorySingleCityPaloAlto,
        numberOfSolarPanelsPerHHSingleCity: numberOfSolarPanelsPerHHSingleCityPaloAlto,
        dailyPowerGenerationByCity: dailyPowerGenerationByCityPaloAlto,
        electricityGeneratedMonthlyCompareToCitiesAvgSingleCity: electricityGeneratedMonthlyCompareToCitiesAvgSingleCityPaloAlto,
        moneySavedMonthlyCompareToCitiesAvgSingleCity: moneySavedMonthlyCompareToCitiesAvgSingleCityPaloAlto,
        totalElectricityGeneratedPerHHMonthly: totalElectricityGeneratedPerHHMonthlyPaloAlto,
        totalHHInstalled: 1120,
        totalHHNotInstalled: 2020,
        totalElectricityGeneratedYTD: 3999,
        totalMoneySavedYTD: 11110,
    }
};