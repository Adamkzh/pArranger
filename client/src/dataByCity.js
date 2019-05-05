var exports = module.exports = {};

//PaloAlto
const numberOfSolarPanelsHistorySingleCityPaloAlto = [
    {"Month":"Oct 2018","PaloAlto":1000,"AllCitiesAverage":2400},
    {"Month":"Nov 2018","PaloAlto":1200,"AllCitiesAverage":2600},
    {"Month":"Dec 2018","PaloAlto":1300,"AllCitiesAverage":2900},
    {"Month":"Jan 2019","PaloAlto":1350,"AllCitiesAverage":3000},
    {"Month":"Feb 2019","PaloAlto":1500,"AllCitiesAverage":3400},
    {"Month":"Mar 2019","PaloAlto":1800,"AllCitiesAverage":3600}];

const dailyPowerGenerationByCityPaloAlto = [
    {"date":"2019-3-1","PaloAlto":4000,"AllCitiesAverage":6400},
    {"date":"2019-3-2","PaloAlto":3000,"AllCitiesAverage":7398},
    {"date":"2019-3-3","PaloAlto":2000,"AllCitiesAverage":6800},
    {"date":"2019-3-4","PaloAlto":2780,"AllCitiesAverage":6908},
    {"date":"2019-3-5","PaloAlto":1890,"AllCitiesAverage":6800},
    {"date":"2019-3-6","PaloAlto":2390,"AllCitiesAverage":7800},
    {"date":"2019-3-7","PaloAlto":3490,"AllCitiesAverage":5300}];

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



// Sunnyvale
const numberOfSolarPanelsHistorySingleCitySunnyvale = [
    {"Month":"Oct 2018","Sunnyvale":1000,"AllCitiesAverage":2400},
    {"Month":"Nov 2018","Sunnyvale":1200,"AllCitiesAverage":2600},
    {"Month":"Dec 2018","Sunnyvale":1300,"AllCitiesAverage":2900},
    {"Month":"Jan 2019","Sunnyvale":1350,"AllCitiesAverage":3000},
    {"Month":"Feb 2019","Sunnyvale":1500,"AllCitiesAverage":3400},
    {"Month":"Mar 2019","Sunnyvale":1800,"AllCitiesAverage":3600}];

const dailyPowerGenerationByCitySunnyvale = [
    {"date":"2019-3-1","Sunnyvale":4000,"AllCitiesAverage":6400},
    {"date":"2019-3-2","Sunnyvale":3000,"AllCitiesAverage":7398},
    {"date":"2019-3-3","Sunnyvale":2000,"AllCitiesAverage":6800},
    {"date":"2019-3-4","Sunnyvale":2780,"AllCitiesAverage":6908},
    {"date":"2019-3-5","Sunnyvale":1890,"AllCitiesAverage":6800},
    {"date":"2019-3-6","Sunnyvale":2390,"AllCitiesAverage":7800},
    {"date":"2019-3-7","Sunnyvale":3490,"AllCitiesAverage":5300}];

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





// San Jose
const numberOfSolarPanelsHistorySingleCity = [
    {"Month":"Oct 2018","SanJose":1000,"AllCitiesAverage":2400},
    {"Month":"Nov 2018","SanJose":1200,"AllCitiesAverage":2600},
    {"Month":"Dec 2018","SanJose":1300,"AllCitiesAverage":2900},
    {"Month":"Jan 2019","SanJose":1350,"AllCitiesAverage":3000},
    {"Month":"Feb 2019","SanJose":1500,"AllCitiesAverage":3400},
    {"Month":"Mar 2019","SanJose":1800,"AllCitiesAverage":3600}];

const dailyPowerGenerationByCity = [
    {"date":"2019-3-1","SanJose":4000,"AllCitiesAverage":6400},
    {"date":"2019-3-2","SanJose":3000,"AllCitiesAverage":7398},
    {"date":"2019-3-3","SanJose":2000,"AllCitiesAverage":6800},
    {"date":"2019-3-4","SanJose":2780,"AllCitiesAverage":6908},
    {"date":"2019-3-5","SanJose":1890,"AllCitiesAverage":6800},
    {"date":"2019-3-6","SanJose":2390,"AllCitiesAverage":7800},
    {"date":"2019-3-7","SanJose":3490,"AllCitiesAverage":5300}];

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


exports.data = {
    SanJose: {
        numberOfSolarPanelsHistorySingleCity_data: numberOfSolarPanelsHistorySingleCity,
        dailyPowerGenerationByCity: dailyPowerGenerationByCity,
        electricityGeneratedMonthlyCompareToCitiesAvgSingleCity: electricityGeneratedMonthlyCompareToCitiesAvgSingleCity,
        moneySavedMonthlyCompareToCitiesAvgSingleCity: moneySavedMonthlyCompareToCitiesAvgSingleCity,
        totalHHInstalled: 1000,
        totalHHNotInstalled: 2000,
        totalElectricityGeneratedYTD: 38999,
        totalMoneySavedYTD: 777700,
    },
    Sunnyvale: {
        numberOfSolarPanelsHistorySingleCity_data: numberOfSolarPanelsHistorySingleCitySunnyvale,
        dailyPowerGenerationByCity: dailyPowerGenerationByCitySunnyvale,
        electricityGeneratedMonthlyCompareToCitiesAvgSingleCity: electricityGeneratedMonthlyCompareToCitiesAvgSingleCitySunnyvale,
        moneySavedMonthlyCompareToCitiesAvgSingleCity: moneySavedMonthlyCompareToCitiesAvgSingleCitySunnyvale,
        totalHHInstalled: 2000,
        totalHHNotInstalled: 3000,
        totalElectricityGeneratedYTD: 3999,
        totalMoneySavedYTD: 771700,
    },
    PaloAlto: {
        numberOfSolarPanelsHistorySingleCity_data: numberOfSolarPanelsHistorySingleCityPaloAlto,
        dailyPowerGenerationByCity: dailyPowerGenerationByCityPaloAlto,
        electricityGeneratedMonthlyCompareToCitiesAvgSingleCity: electricityGeneratedMonthlyCompareToCitiesAvgSingleCityPaloAlto,
        moneySavedMonthlyCompareToCitiesAvgSingleCity: moneySavedMonthlyCompareToCitiesAvgSingleCityPaloAlto,
        totalHHInstalled: 1120,
        totalHHNotInstalled: 2020,
        totalElectricityGeneratedYTD: 3999,
        totalMoneySavedYTD: 11110,
    }
};