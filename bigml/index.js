const bigml = require("bigml");
connection = new bigml.BigML(
  "kolskyron",
  "275ca144362abdd066a28fe126fb2f545fd5bca9"
);
let rules = []
function bigML(){
var source = new bigml.Source(connection);
  source.create('data/test.csv', function(error, sourceInfo) {
    if (!error && sourceInfo) {
      var dataset = new bigml.Dataset(connection);
      dataset.create(sourceInfo, function(error, datasetInfo) {
        if (!error && datasetInfo) {
          var model = new bigml.Model(connection);
          var association = new bigml.Association(connection);
          association.create(datasetInfo, function (error, modelInfo) {
            console.log(modelInfo)
            if (!error && modelInfo) {
              console.log(modelInfo)
                rules = getRules(modelInfo.resource)
            }
            else{
              console.log("problem")
            }
          });
        }
      });
    }
  });
}


function getRules(associationId){
  let rules = [];       
  var association = new bigml.Association(connection)
 
  association.get(associationId, true,
                  'only_model=true;limit=-1',
                 function (error, resource) {
          if (!error && resource) {
              try{
          var localAssociation = new bigml.LocalAssociation(resource);
              } catch(error){return;}
          
          let itemsMap ={};
          
          localAssociation.items.forEach((item)=>{
              itemsMap[item.index]=item.name;
          })
          console.log("asos")
          
          
          localAssociation.getRules().forEach((rule)=>{
              let lhs = rule.lhs;
              let leftSide="";
              lhs.forEach((index)=>{
                  leftSide+=itemsMap[index]+","
              })
  
              let rhs = rule.rhs;
              let rightSide="";
              rhs.forEach((index)=>{
                  rightSide+=itemsMap[index]+","
              })
  
              let conf = rule.confidence;
              let support = rule.support;
              let lift = rule.lift;
              rules.push({leftSide: leftSide, rightSide: rightSide,support: support,confidence: conf, lift:lift})
          })
          console.log("done with rules")
          console.log(rules);
          }
         
      })
      console.log('here')      
      return rules;                           
  }
bigML()

