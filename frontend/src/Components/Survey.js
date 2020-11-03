import React, { Component } from 'react'
import OptionComponent from './Option';
import data from "./Data.js"
import {calculateDepth} from "./Common"

export class Survey extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
             surveyData:{},
             optionData:{},
             questionCount:1,
             flag:false,
             questionAnswered:0,
             progress:0
        }
    }

    componentDidMount=()=>{

        calculateDepth(data.form);
 console.log(data)

     this.setState({surveyData:data})
    }


    optionClickHandler=(event)=>{

        //console.log(event);
        let question=event.target.getAttribute("question"),
         optionChoose=event.target.getAttribute("optionvalue"),
         data=this.state.surveyData.form[question],
         questionAnswered=this.state.questionAnswered +1,
         progress=100;
        if(data.optionDta && data.optionDta[optionChoose] ){
            progress=parseInt((questionAnswered/(questionAnswered + (data.depth ?data.depth[`${optionChoose}-count`]:0)))*100);
        if(!this.state.optionData[question])
        {
            this.setState((prevState)=>{

                let obj={...prevState.optionData}
                obj[question]={value:optionChoose}
                return {
                    optionData:obj,
                    questionAnswered,
                    progress
                }
            })
        }
        else
        {
            this.setState((prevState)=>{

                let obj={...prevState.optionData}
                obj[question].value=optionChoose
                return {
                    optionData:obj,
                    questionAnswered,
                    progress
                }
            })

        }

}else{
 this.setState({flag:true,progress})
}
        

    }
    
    render() {
        const surveyKeys=this.state.surveyData && this.state.surveyData.form ? Object.keys( this.state.surveyData.form):[];
        const optionKeys=this.state.optionData ?Object.keys(this.state.optionData):[];
        //let progressWidth=parseInt((this.state.questionAnswered/(this.state.questionAnswered + 8))*100);
    return <div style={{top:"3"}}>
        <div style={{width:`${this.state.progress}%`,height:"40px",backgroundColor:"red"}}>
            <p>{ `${this.state.progress} % progress`}</p>
        </div>
        {
        
        !this.state.flag ? <div>
                {
                    this.state.surveyData && surveyKeys.length >0 && (
                        <div>
                             {
                               <>
                                 <p>{`${ this.state.surveyData.form[surveyKeys[0]].value.name}`}</p>
                                  <OptionComponent options={ this.state.surveyData.form[surveyKeys[0]].value.options} questionId={surveyKeys[0]} clickHandler={this.optionClickHandler}/>
                                  </>
                             }
                        </div>

                    )
                }
                {
                     this.state.optionData && optionKeys.length >0 && (
                        <div>
                             {
                              optionKeys.map((ele,index)=><>
                              <p>{`${ this.state.surveyData.form[this.state.surveyData.form[ele].optionDta[this.state.optionData[ele].value]].value.name}`}</p>
                               <OptionComponent options={ this.state.surveyData.form[this.state.surveyData.form[ele].optionDta[this.state.optionData[ele].value]].value.options} questionId={this.state.surveyData.form[ele].optionDta[this.state.optionData[ele].value]} clickHandler={this.optionClickHandler}/>
                               </>) 
                             }
                        </div>

                    )
                }
                
            </div>
        :<div>
             <h4>Survey Completed</h4>
        </div>
        
        
        
        }
        </div>
    }
}



export default (Survey)
