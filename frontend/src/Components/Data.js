
const questions={
    question1:{
        name:"Question 1",
        options:["option1","option2","option3","option4"]
    },
    question2:{
        name:"Question 2",
        options:["option1","option2"]
    },
    question3:{
        name:"Question 3",
        options:["option1","option2"]
    },
    question4:{
        name:"Question 4",
        options:["option1","option2"]
    },
    question5:{
        name:"Question 5",
        options:["option1","option2"]
    },
    question6:{
        name:"Question 6",
        options:["option1","option2"]
    },
    question7:{
        name:"Question 7",
        options:["option1","option2"]
    },
    question8:{
        name:"Question 8",
        options:["option1","option2"]
    }
}


const obj ={

    form:{
        "question1":{
            value:questions["question1"],
            optionDta:{
                option1:"question2",
                option2:"question3",
                option3:"question4",
                option4:"question4"

            }
        },
        "question2":{
            value:questions["question2"],
            optionDta:{
                option1:"question5",
                option2:"question6",

            }
        },
        "question3":{
            value:questions["question3"],
            optionDta:{
                option1:"question6",
                option2:"question4",

            }
        },
        "question4":{
            value:questions["question4"],
            optionDta:{
                option1:"question7"
            }
        },
        "question5":{
            value:questions["question5"],
            optionDta:{
                option1:"question8"
            }
        },
        "question6":{
            value:questions["question6"]
        },
        "question7":{
            value:questions["question7"]
        },
        "question8":{
            value:questions["question7"]
        },

    },
    

    
}

export default obj