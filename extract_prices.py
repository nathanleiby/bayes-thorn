# Price Extractor
import re

dollar_at_front = re.compile('(\$\s?\d{2,3}(\.\d{1,2})?)\s?')
dollar_at_end = re.compile('(\s?\d{2,3}(\.\d{1,2})?)\s?\$\s?')
general_three_digit = re.compile('[^\d(\-][1-2][0-9][0-9][^\d)\-%]')
general_two_digit = re.compile('([^1-9][5-9][05][^1-9])')
general = re.compile('[0-9]{2,3}')

price_matchers = [
    dollar_at_front,
    dollar_at_end,
    general_three_digit,
    general_two_digit
]

def get_prices(text):
    """ Given text, returns a list of floats of prices found in the text """
    output = []
    unformatted_prices = []
    for regex in price_matchers:
        unformatted_prices.extend(regex.findall(text))

    for price_tuple in unformatted_prices:
        try:
            price = general.findall(price_tuple)[0]
            p = float(price)
            output.append(p)
        except:
            pass

    # remove dups
    output = list(set(output))
    return output
