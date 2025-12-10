import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder
from sklearn.ensemble import RandomForestClassifier
import pickle
import os

HERE = os.path.dirname(os.path.abspath(__file__))
DATA_PATH = os.path.join(HERE, "../../DataSets/fertilizer.csv")

df = pd.read_csv(DATA_PATH)

# Label encode Crop_string and soil_string
crop_enc = LabelEncoder()
soil_enc = LabelEncoder()
fert_enc = LabelEncoder()

df['Crop_encoded'] = crop_enc.fit_transform(df['Crop_string'])
df['Soil_encoded'] = soil_enc.fit_transform(df['soil_string'])
df['Fertilizer_encoded'] = fert_enc.fit_transform(df['Fertilizer'])

# Features
X = df[['Nitrogen','Phosphorus','Potassium','pH','Rainfall','Temperature',
        'Crop_encoded','Soil_encoded']]

y = df['Fertilizer_encoded']

# Train-test
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

model = RandomForestClassifier()
model.fit(X_train, y_train)

print("Training complete!")

# Save model + encoders
with open(os.path.join(HERE,"fertilizer_model.pkl"), "wb") as f:
    pickle.dump(model, f)

with open(os.path.join(HERE,"crop_encoder.pkl"), "wb") as f:
    pickle.dump(crop_enc, f)

with open(os.path.join(HERE,"soil_encoder.pkl"), "wb") as f:
    pickle.dump(soil_enc, f)

with open(os.path.join(HERE,"fertilizer_encoder.pkl"), "wb") as f:
    pickle.dump(fert_enc, f)
