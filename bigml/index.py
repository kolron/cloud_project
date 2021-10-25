from bigml.api import BigML

api = BigML('kolskyron', '275ca144362abdd066a28fe126fb2f545fd5bca9')
source = api.create_source("data/test.csv")
# waiting for the source to be finished. Results will be stored in `source`
print(api.ok(source))
# step 3: creating a dataset from the previously created `source`
dataset = api.create_dataset(source)
# waiting for the dataset to be finished
print(api.ok(dataset))
# step 5: creating an association
association = api.create_association(dataset)
# waiting for the association to be finished
print(api.ok(association))
# the new input data to predict for
input_data = {"products": "backpack"}
# creating a single association set
association_set = api.create_association_set(association, input_data)
print(association_set)