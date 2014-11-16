# Price Extractor

import re

dollar_at_front = re.compile('\s\$(\d{1,8}(\.\d{1,4})?)\s')
dollar_at_end = re.compile('\s(\d{1,8}(\.\d{1,4})?)\$\s')
no_dollar_sign = re.compile('\s+(\d{1,8}(\.\d{1,4})?)')

price_matchers = [
    dollar_at_front,
    dollar_at_end,
    # no_dollar_sign,
]

# number_year -> DONT take those ones


def get_prices(text):
    """ Given text, returns a list of floats of prices found in the text """
    output = []
    unformatted_prices = []
    for regex in price_matchers:
        unformatted_prices.extend(regex.findall(text))

    for price_tuple in unformatted_prices:
        # e.g. [('5.00', '.00'), ...]
        for t in price_tuple:
            try:
                # filter things that look like phone numbers
                if len(t) > 5:
                    break

                p = float(t)
                if p >= 1:
                    output.append(p)
            except:
                pass

    # remove dups
    output = list(set(output))
    return output


def has_price(text):
    """ Given text, returns bool of whether any prices were found in the text """
    return len(get_prices(text)) > 0
