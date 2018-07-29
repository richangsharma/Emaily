if (process.env.NODE_ENV === 'production') {
    //Return production level keys
    module.exports=require('./prod');
}
else {
    // return development level keys
    module.exports=require('./dev');
}