import React from  "react"

const OptionComponent=(props)=>{

    return <div onClick={(event)=>props.clickHandler(event)}>
        {
            props.options && props.options.map((val,index)=><div><input key={`${props.questionId}-${val}`} question={props.questionId} optionvalue={val} type="radio"/><label>{index}</label></div>)
        }
    </div>
}


export default OptionComponent