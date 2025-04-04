import pandas as pd
import numpy as np
import pickle
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.linear_model import LogisticRegression
from sklearn.preprocessing import LabelEncoder
from sklearn.metrics import accuracy_score

# Load dataset
file_path =  r"C:\Users\night\Desktop\csai_Copy\backend\payment_2.csv" # Adjust the path if needed
df = pd.read_csv(file_path)

# Encode categorical feature 'type'
label_encoder = LabelEncoder()
df["type"] = label_encoder.fit_transform(df["type"])

# Select features and target
features = ["amount", "type", "oldbalanceOrg", "newbalanceOrig", "oldbalanceDest", "newbalanceDest"]
X = df[features]
y = df["isFraud"]  # Target variable

# Split data
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Train Random Forest
rf_model = RandomForestClassifier(n_estimators=100, random_state=42)
rf_model.fit(X_train, y_train)

# Train Logistic Regression
lr_model = LogisticRegression(max_iter=1000)
lr_model.fit(X_train, y_train)

# Evaluate models
rf_acc = accuracy_score(y_test, rf_model.predict(X_test))
lr_acc = accuracy_score(y_test, lr_model.predict(X_test))
print(f"Random Forest Accuracy: {rf_acc:.2f}")
print(f"Logistic Regression Accuracy: {lr_acc:.2f}")

# Save models and label encoder
with open("random_forest.pkl", "wb") as f:
    pickle.dump(rf_model, f)

with open("logistic_regression.pkl", "wb") as f:
    pickle.dump(lr_model, f)

with open("label_encoder.pkl", "wb") as f:
    pickle.dump(label_encoder, f)

print("Models saved successfully!")
