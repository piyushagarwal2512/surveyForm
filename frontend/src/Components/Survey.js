import React, { Component } from 'react'
import OptionComponent from './Option';
import data from "./Data.js"
import {calculateDepth} from "./Common"

export class Survey extends Component {

    //optionData stored the answer of every question
    //flag is used to track the survey completion if true then survey is completed
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
        //calculate depth
        calculateDepth(data.form);
        console.log(data);
        this.setState({surveyData:data});
    }


    optionClickHandler=(event)=>{

        let question=event.target.getAttribute("question"),
         optionChoose=event.target.getAttribute("optionvalue"),
         
         data=this.state.surveyData.form[question],

         questionAnswered=Object.keys(this.state.optionData).length,

         progress=100;

        if(data.optionDta && data.optionDta[optionChoose] ){
           
        if(!this.state.optionData[question])
        {
            questionAnswered+=1;
            progress=parseInt((questionAnswered/(questionAnswered + (data.depth ?data.depth[`${optionChoose}-count`]:0)))*100);
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
            progress=parseInt((questionAnswered/(questionAnswered + (data.depth ?data.depth[`${optionChoose}-count`]:0)))*100);
            this.setState((prevState)=>{

                let keyIndex=Object.keys(prevState.optionData).findIndex((ele)=>ele===question);
                let keys=Object.keys(prevState.optionData);
                let obj={...prevState.optionData}
                obj[question].value=optionChoose
                 for(var i=0;i<keys.length;i++)
                 {
                     if(i>keyIndex)
                     {
                         delete obj[keys[i]]
                     }
                 }
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
        const form=this.state.surveyData && this.state.surveyData.form
        const optionForm=this.state.optionData;

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
                                 <p>{`${ form[surveyKeys[0]].value.name}`}</p>
                                  <OptionComponent options={ form[surveyKeys[0]].value.options} questionId={surveyKeys[0]} clickHandler={this.optionClickHandler}/>
                                  </>
                             }
                        </div>

                    )
                }
                {
                     this.state.optionData && optionKeys.length >0 && (
                        <div>
                             {
                              optionKeys.map((ele,index)=><React.Fragment key={`${ele}-${index}`}>
                              <p>{`${ form[form[ele].optionDta[optionForm[ele].value]].value.name}`}</p>
                               <OptionComponent options={ form[form[ele].optionDta[optionForm[ele].value]].value.options} questionId={form[ele].optionDta[optionForm[ele].value]} clickHandler={this.optionClickHandler}/>
                               </React.Fragment>) 
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
