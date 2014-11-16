import os
import urllib2
import numpy as np
import pandas as pd
from bs4 import BeautifulSoup
from joblib import Parallel, delayed

os.chdir("/Users/danfrankj/src/bayesimpact")
DATA_FILE = "escort_all/escort_all_sampled.tsv"

df = pd.read_csv(DATA_FILE, sep='\t')
# inds = np.random.permutation(df.shape[0])[:100000]
# df = df.iloc[inds,:]
# df.to_csv('escort_all/escort_all_sampled.tsv', sep='\t')


#df = pd.read_pickle('escort_all.pkl')


def urlgetter(post):
    try:
        url = post.strip()
        if url[0:4] != 'http':
            return url
        html = urllib2.urlopen(url)
        soup = BeautifulSoup(html)
        txt = soup.find('body').get_text()
        return txt
    except:
        print post
        return post

postText = df.postText.astype('str').values.copy()
postText_parsed = Parallel(n_jobs=100, backend='threading')(delayed(urlgetter)(post) for post in postText)

df['postText_parsed'] = postText_parsed
df.to_pickle('escort_all/escort_all_sampled_postText_parsed.pkl', sep='\t')
