from bigml.api import BigML

api = BigML('kolskyron', '275ca144362abdd066a28fe126fb2f545fd5bca9')
print('here 1')
source = api.create_source('./data/iris.csv')
print('here 2')
dataset = api.create_dataset(source)
print('here 3')
model = api.create_model(dataset)
prediction = api.create_prediction(model, \
{"sepal length": 3, "sepal width": 6.2})
api.pprint(prediction)