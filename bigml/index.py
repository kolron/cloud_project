from bigml.api import BigML

api = BigML('kolskyron', '275ca144362abdd066a28fe126fb2f545fd5bca9')
source = api.create_source(r"C:\Users\Andrey\Documents\GitHub\cloud_project\bigml\data\iris.csv")
print("1")
dataset = api.create_dataset(source)
print("2")
model = api.create_model(dataset)
print("3")
prediction = api.create_prediction(model, \
    {"petal width": 1.75, "petal length": 2.45})
    