# Build a gradient boosting model to predict ColorPurple from the dataset C:\Users\srish\OneDrive\Documents\Code PGSS\L5-7122024\ColorPurple - Sheet1.csv

import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.ensemble import GradientBoostingClassifier

# Load the data
data = pd.read_csv("L5-7122024\ColorPurple - Sheet1.csv")

data.head()

data = data.dropna()
# use all the data to build the model for now
X = data.drop(columns=['PurpleOrNot', 'Gender',	'AndrewID'])
y = data["PurpleOrNot"]


# Build the model and save the model to a file named model.pkl
model = GradientBoostingClassifier()
model.fit(X, y)

import joblib
joblib.dump(model, "model.pkl")

print("Model saved to model.pkl")

# Test the model by creating some test data and making predictions
# Load the model
model = joblib.load("model.pkl")

# Create some test data with R, G and B columns ranging from 0 to 255
test_data = pd.DataFrame({
    "R": np.random.randint(0, 255, 1),
    "G": np.random.randint(0, 255, 1),
    "B": np.random.randint(0, 255, 1)
})

# make a prediction
prediction = model.predict(test_data)
prediction_proba = model.predict_proba(test_data)

print("Prediction:", prediction)
print("Prediction probability:", round(prediction_proba[0][1],2))