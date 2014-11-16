import pandas as pd
import matplotlib.pyplot as plt
import numpy as np
import seaborn as sns
import collections
import json

df = pd.read_csv('escort_all_with_prices.csv', encoding='utf-8')

stateDict = pd.io.parsers.read_csv('stateDict.csv', index_col=1).to_dict()
states = collections.defaultdict(lambda: np.nan)
for k, v in stateDict['stateCode'].items():
    states[k] = v
df['stateCode'] = df['City'].map(lambda text: states[text])

clustersIn = pd.io.parsers.read_csv('clusters.txt', index_col=0).to_dict()
clusters = collections.defaultdict(lambda: np.nan)
for k,v in clustersIn['1'].items():
    clusters[k] = v
df['cluster'] = df['stateCode'].map(lambda text: clusters[text])

cities = df.groupby('cluster').size()
cities.sort(ascending=False)

results = {}
plt.figure(1)
for city in cities.head(16).index:
    prices = df[(df.cluster == city)].computedPrice.convert_objects(convert_numeric=True).values
    prices = prices[~np.isnan(prices)]
    result = np.histogram(prices[prices < 350], bins=17)
    results[str(city)] = {}
    results[str(city)]['price'] = result[1].tolist()
    results[str(city)]['num'] = result[0].tolist()
    plt.figure()
    plt.plot(results[str(city)]['price'][:-1], results[str(city)]['num'])
    # plt.show()
    # sns.kdeplot(prices, label=city, cumulative=True)

    # ages = df[(df.City == city)].postAge.convert_objects(convert_numeric=True).values
    # both = np.where(~np.isnan(prices) & ~np.isnan(ages))
    # sns.jointplot(ages[both], prices[both], kind="hex")

with open('cluster_histogram_price_data.json', 'w', encoding='utf-8') as outfile:
    json.dump(results, outfile)

plt.xlim([0, 300])
plt.legend()
plt.show()
