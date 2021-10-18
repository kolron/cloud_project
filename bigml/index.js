var bigml = require('bigml');
var source = new bigml.Source();
var connection = new bigml.BigML('AndreFriedman', '7455965742f09f96ecf0c7bf9ee4a0f6725faf87')
source.create('./data/iris.csv', function(error, sourceInfo) {
  if (!error && sourceInfo) {
    var dataset = new bigml.Dataset();
    dataset.create(sourceInfo, function(error, datasetInfo) {
      if (!error && datasetInfo) {
        var model = new bigml.Model();
        model.create(datasetInfo, function (error, modelInfo) {
          if (!error && modelInfo) {
            var prediction = new bigml.Prediction();
            prediction.create(modelInfo, {'petal length': 1})
          }
        });
      }
    });
  }
});
