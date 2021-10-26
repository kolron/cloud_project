const bigml = require("bigml");
connection = new bigml.BigML(
  "kolskyron",
  "275ca144362abdd066a28fe126fb2f545fd5bca9"
);

function generateItemSets(){
return new Promise(async (resolve,reject) => {
var source = new bigml.Source(connection);
  source.create('../bigml/data/test.csv', (error, sourceInfo) => {
    if (!error && sourceInfo) {
      var dataset = new bigml.Dataset(connection);
      dataset.create(sourceInfo, (error, datasetInfo) => {
        if (!error && datasetInfo) {
          var association = new bigml.Association(connection);
          association.create(datasetInfo,async (error, modelInfo) => {
            if (!error && modelInfo) {
              var rules = await getRules(modelInfo.resource)
              resolve(rules)
              
            }
            else{
              console.log("problem")
            }
          });
        }
      });
    }
  });
})
}


 function getRules(associationId){
  return new Promise(async (resolve,reject) => {
  let rules = [];       
  var association = new bigml.Association(connection)
 
  association.get(associationId, true,
                  'only_model=true;limit=-1',
                 async (error, resource)=> {
          if (!error && resource) {
              try{
          var localAssociation = new bigml.LocalAssociation(resource);
              } catch(error){return;}
          
          let itemsMap ={};
          
          localAssociation.items.forEach((item)=>{
              itemsMap[item.index]=item.name;
          })
          localAssociation.getRules().forEach((rule)=>{
              let lhs = rule.lhs;
              let items="";
              lhs.forEach((index)=>{
                  items+=itemsMap[index]+","
              })
  
              let rhs = rule.rhs;
              let compliment="";
              rhs.forEach((index)=>{
                compliment+=itemsMap[index]+","
              })
  
              let confidence = rule.confidence;
              let support = rule.support;
              rules.push({items: items, compliment: compliment,support: support,confidence: confidence})
          })
          var final = rules 
          resolve(final)
          }
      })                  
  })
}


module.exports = { generateItemSets }
