var max=-9999
function optionRecursion(obj,question,count){

    if(max<count)
    {
        max=count;
    }
    var keys=obj[question] && obj[question].optionDta ?Object.keys(obj[question].optionDta):[]

    for(var i=0;i<keys.length;i++)
    {
        optionRecursion(obj,obj[question].optionDta[keys[i]],count+1)   
    }

}

export function calculateDepth(obj){

    var keys=Object.keys(obj);

    for(var i=0;i<keys.length;i++)
    {
        let optionKeys=obj[keys[i]].optionDta ?Object.keys(obj[keys[i]].optionDta):[]
        for(var j=0;j<optionKeys.length;j++)
        {
            optionRecursion(obj,obj[keys[i]].optionDta[optionKeys[j]],1)
            let countVar=`${optionKeys[j]}-count`;
            if(obj[keys[i]].depth)
            {
                obj[keys[i]].depth[countVar]=max>0?max:0;
            }else{
                obj[keys[i]].depth={};
                obj[keys[i]].depth[countVar]=max>0?max:0;
            }
           // obj[keys[i]].optionDta[countVar]=
            max=-9999;
        }
    }
//return obj
}