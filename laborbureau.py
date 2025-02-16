import requests

# Extended occupation series mapping
occupation_series = {
    'software developer': 'OEUN000000000000015125213',
    'nurse': 'OEUN000000000000029117113',
    'doctor': 'OEUN000000000000029000004',
    'data scientist': 'OEUN000000000000015205113',
    'construction worker': 'OEUN000000000000047000013',
    'lawyer': 'OEUN000000000000023101013',
    'postsecondary teacher': 'OEUN000000000000025108113',
}

# Function to get salary data based on user input
def get_salary_data(occupation):
    occupation = occupation.lower()
    # Check if the occupation exists in the dictionary
    if occupation not in occupation_series:
        print("Sorry, data for that occupation is not available.")
        return
    
    # Get the series ID for the occupation
    series_id = occupation_series[occupation]
    
    # Define the BLS API URL
    url = f"https://api.bls.gov/publicAPI/v2/timeseries/data/{series_id}"
    
    # Define the parameters (you can customize the years based on the user's request)
    params = {
        'seriesid': series_id,
        'startyear': '2020',
        'endyear': '2023'
    }
    
    # Make the API request
    response = requests.get(url, params=params)
    
    # Check if the request was successful
    if response.status_code == 200:
        data = response.json()
        if 'Results' in data and 'series' in data['Results']:
            salary_data = data['Results']['series'][0]['data']
            print(f"Salary data for {occupation}:")
            for entry in salary_data:
                print(f"Year: {entry['year']}, Wage: {entry['value']}")
        else:
            print("No salary data available for this occupation.")
    else:
        print(f"Error: {response.status_code}")

# Example usage
occupation = input("Enter an occupation: ")
get_salary_data(occupation)

def main():
  while True:  
    # Prompt the user for the occupation/job title
    occupation = input("Enter an occupation, or type \'exit': ")
    occupation = occupation.lower()

    # Exit the loop if the user types 'exit'
    if occupation.lower() == 'exit':
        break

    # Check if the occupation exists in the predefined mapping
    if occupation in occupation_series:
        get_salary_data(occupation)

    else:
        print(f"Sorry, we don't have data for '{occupation}'. Please try another occupation.")

if __name__ == "__main__":
    main()