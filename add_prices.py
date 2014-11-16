import ipdb
import pandas as pd
import numpy
import extract_prices
import langid

# Display options
pd.set_option("display.height", 20)
pd.set_option("display.max_rows", 101)
pd.set_option("display.max_colwidth", 101)

print "Loading data..."
df = pd.DataFrame.from_csv('/Users/pika/dev/bayes-thorn/escort_all_sampled_prices_lang.csv', sep=',', index_col='postCreationDate')
print "Done loading data."
ipdb.set_trace()

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

def get_language(text):
    """ Assigns a language code or '' http://en.wikipedia.org/wiki/List_of_ISO_639-1_codes """
    try:
        return langid.classify(text)[0]
    except:
        return ''

print "Computing price..."
print "SKIPPED"
# df['computedPrice'] = df['postText'].map(lambda text: get_avg_price(text))
print "Done computing prices."

print "Computing language..."
print "SKIPPED"
# df['language'] = df['postText'].map(lambda text: get_language(text))
print "Done computing language."


# print "Writing escort_all_sampled_prices.csv..."
# df.to_csv('escort_all_sampled_prices_lang.csv')
# print "Done writing csv."

ipdb.set_trace()
