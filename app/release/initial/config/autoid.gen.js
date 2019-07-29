
const Autoidmodule= {
    autogenerateId:(request,callback)=>{
        console.log(request)
        var milliseconds = new Date().getTime();
        const finalId=request+milliseconds;
        callback(null,finalId)
    },
}

module.exports = Autoidmodule;




        
