
filename = '/Users/scott/Desktop/bayes/github/bayes-thorn/stateSim.csv';
A = csvread(filename, 1);

kmax = 20;
[S,Q] = modclust(A,kmax);

states = {'AL','AZ','AR','CA','CO','CT','DE','DC','FL','GA','ID','IL','IN','IA','KS','KY','LA','ME','MD','MA','MI','MN','MS','MO','MT','NE','NV','NH','NJ','NM','NY','NC','ND','OH','OK','OR','PA','RI','SC','SD','TN','TX','UT','VT','VA','WA','WV','WI','WY'};

for k = 1:length(S)
    disp(sprintf('cluster %d:\n', k))
    disp(states(S{k}))
    disp('\n')
end