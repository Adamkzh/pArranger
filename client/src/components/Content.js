import React, { Component } from 'react';
import Map from './Map';
import System from './System';
import Position from './Position';


import StepZilla from 'react-stepzilla';
import '../style/Content.css'

class Content extends Component{


    render(){
    const steps =
    [
      {name: 'Location', component: <Map />},
      {name: 'System Size', component: <System />},
      {name: 'Position', component: <Position />},
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