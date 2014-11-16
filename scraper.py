import os
import pandas as pd
from urlparse import urlparse
import urllib2
import extract_prices
from bs4 import BeautifulSoup


os.chdir("/Users/danfrankj/src/bayes-thorn")

df = pd.read_csv('escort_all_sampled.csv')
df['postAge'] = df['postAge'].convert_objects(convert_numeric=True)


def parse_backpage_url(url, seen_urls=[]):
    """crawl all posts by this user"""
    if url in seen_urls:
        return {}
    url_parsed = urlparse(url)
    url_city = url_parsed.netloc.split('.')[0]
    html = urllib2.urlopen(url)
    soup = BeautifulSoup(html)
    post_text = soup.find("div", {"class": "postingBody"}).get_text().strip()
    post_age = float(soup.find('p', {'class': 'metaInfoDisplay'}).get_text().split(':')[1].strip())
    post_links = soup.find('div', id='OtherAdsByThisUser').findAll('a', {'class': ''})
    post_links = [link['href'] for link in post_links]

    prices = extract_prices.get_prices(post_text)
    seen_urls.append(url)

    stats = {'url_cities': url_city,
             'post_ages': post_age,
             'post_texts': post_text,
             'post_links': post_links,
             'post_prices': prices}
    # for post_link in post_links:
    #     if post_link in seen_urls:
    #         continue

    return stats
