from sklearn import cluster
import numpy as np
import scipy.cluster
import pandas as pd
import matplotlib.pyplot as plt

os.chdir("/Users/danfrankj/src/bayes-thorn")
DATA_FILE = 'stateSim.csv'


def load_data():
    X = pd.read_csv(DATA_FILE)
    names = X.columns
    X
    return names, X.values


def spectral_cluster(names, X):
    krange = np.arange(2, 25)

    simmat = X
    # degmat = np.diag(np.sum(simmat, axis=1))
    degmatinv = np.diag(1. / np.sum(simmat, axis=1))
    laplacian = np.eye(X.shape[0]) - np.dot(np.dot(np.sqrt(degmatinv), simmat), np.sqrt(degmatinv))
    eigvals, eigvecs = np.linalg.eigh(laplacian)

    distortions_k = []
    distortions = []
    results = {}
    for k in krange:
        eigvecs_k = np.copy(eigvecs[:, 0:k])
        for i in xrange(X.shape[0]):
            eigvecs_k[i, :] = eigvecs_k[i, :] / np.linalg.norm(eigvecs_k[i, :])
        codebook, distortion = scipy.cluster.vq.kmeans(eigvecs_k, k_or_guess=k)
        results[k] = (eigvecs_k, codebook, distortion)
        distortions_k.append(distortion / float(k))
        distortions.append(distortion)
    plt.figure()
    plt.plot(krange, distortions, 'b-')
    plt.title('distortion/k vs. k')
    plt.xlabel('k')
    plt.ylabel('distortion')
    plt.savefig('distortion.png')

    kchosen = 15  # based on visual inspection of distortion.png and spectrum.png
    eigvecs_k, codebook, distortion = results[kchosen]
    print 'chose k=', kchosen, ' distortion ', distortion
    membership, _ = scipy.cluster.vq.vq(eigvecs_k, codebook)
    for i in xrange(kchosen):
        print 'cluster', i
        print ','.join(names[membership == i])

names, X = load_data()
spectral = cluster.SpectralClustering(n_clusters=17,
                                      eigen_solver='arpack',
                                      affinity="precomputed")
spectral.fit(X)
spectral.labels_
for label in np.unique(spectral.labels_):
    print label
    print names[spectral.labels_ == label]

if __name__ == "__main__":
    spectral_cluster(names, X)



# choose k= 3  distortion  0.290646553712
# cluster 0 - networks?
# network systems,social networks,wireless networks,sensor networks,
# information and coding theory,signal processing,image and video processing,
# control systems,optimization stochastic optimization,medical imaging,
# statistical inference graphical models,photovoltaics and energy conversion devices
# cluster 1 - devices?
# energy systems smart grids,biomedical devices,nanoelectronic devices,
# opto-electronic devices,optical interconnects,nanofabrication technology,
# circuit design,nano electromechanical systems,semiconductor materials and nanostructures,
# nanophotonics,quantum electronics and lasers,remote sensing,antennas and radio propagation,
# fiber optics,optical communications,plasmonic devices,optical MEMS
# cluster 2 - computing?
# wireless communications digital communications,computational modeling and simulation,
# quantum information,computer architecture,digital design,embedded systems,
# operating systems,computer aided design,parallel and distributed computing,
# computer graphics,compilers,computational electromagnetism,
# plasmas and ionospheric physics,imaging systems and microscopy
