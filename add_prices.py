import ipdb
import pandas as pd
import numpy
from extract_prices import get_prices

# Display options
pd.set_option("display.height", 20)
pd.set_option("display.max_rows", 101)
pd.set_option("display.max_colwidth", 101)

df = pd.DataFrame.from_csv('/Users/pika/dev/bayes-thorn/escort_all_sampled.csv', sep=',', index_col='postCreationDate')

print "Loading data..."
df = pd.DataFrame.from_csv('/Users/pika/dev/bayes-thorn/escort_all_sampled.csv', sep=',', index_col='postCreationDate')
print "Done loading data."

# subset for quick work
# df = df.head()

# Apply a filter
# criterion = lambda row: has_price(row['postText']) or has_price(row['postTitle'])
# df_filtered = df[df.apply(criterion, axis=1)]

def get_avg_price(text):
  try:
    prices = get_prices(text)
  except:
    return 0

  if len(prices) == 0:
    return 0
  else:
    return numpy.mean(prices)

print "Computing price..."
df['computedPrice'] = df['postText'].map(lambda x: get_avg_price(x))
print "Done computing prices."

print "Writing escort_all_sampled_prices.csv..."
df.to_csv('escort_all_sampled_prices.csv')
print "Done writing csv."

ipdb.set_trace()
