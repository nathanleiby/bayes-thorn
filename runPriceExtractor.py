import pandas as pd
import extract_prices
import re

df = pd.read_csv('escort_all_sampled.csv', nrows=80000)

testForAnyNumber = re.compile('[0-9]{1,10}')

nWithPrice = 0
for row in df.iterrows():
    idx, data = row
    title = data.postTitle
    age = data.postAge
    if isinstance(title, str):
        numbersInTitle = testForAnyNumber.findall(title)
        try:
            numbersInTitle.remove(str(int(age)))
        except:
            pass
        if numbersInTitle: #If there's any number (besides age) in the title, check if we found the price
            print(str(title))
            price = extract_prices.get_prices(title)
            if price:
                print('price-----------> ' + str(price) + '\n')
                nWithPrice += 1
            else:
                print('price-----------> PRICE NOT FOUND' + '\n')

print('Prices found: %s' % nWithPrice)

