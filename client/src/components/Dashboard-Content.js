import React, { Component } from 'react';
import Location from './Dashboard-Content-Location';
import System from './Dashboard-Content-System';
import Position from './Dashboard-Content-Position';
import Detail from './Dashboard-Content-Detail';


import StepZilla from 'react-stepzilla';
import '../style/Content.css'

class Content extends Component{


    render(){
    const steps =
    [
      {name: 'Location', component: <Location />},
      {name: 'System Size', component: <System />},
      {name: 'Position', component: <Position />},
      {name: 'Save/Edit', component: <Detail />},
    ]

        return (
            <div>
                <div className='step-progress'>
                <StepZilla
                   steps={steps}
                   preventEnterSubmission={true}
                   nextTextOnFinalActionStep={"Next"}
                   nextButtonCls={"nextButton"}
                   nextButtonText= {"Next"}
                   backButtonCls={"backButton"}
                   backButtonText= {"Previous"}
                   startAtStep={window.localStorage.getItem('step') ? parseFloat(window.localStorage.getItem('step')) : 0}
                   onStepChange={(step) => window.localStorage.setItem('step', step)}
                />
                </div>
            </div>
        )
    }
}
export default Content;