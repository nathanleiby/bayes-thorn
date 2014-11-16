data.file <- '/Users/scott/Desktop/bayes/data/escort_all/escort_all_10percent.csv'
#data.file <- '/Users/scott/Desktop/bayes/github/bayes-thorn/escort_all_sampled_prices.csv'
#data.file <- '/Users/scott/Desktop/bayes/data/escort_all/escort_50k_pd.csv'
#data.prices <- read.csv(file=data.file, header=TRUE, fill=TRUE)

data <- read.csv(file=data.file, header=TRUE, fill=TRUE)
attach(data)

#num.cities <- 200
#top.cities <- names(head(sort(table(data$City), decreasing=TRUE), num.cities))

library(maps)
data(us.cities)
us.cities$city <- ""
for (r in 1:nrow(us.cities)) {
  us.cities[r, "city"] <- gsub( paste0(" ", us.cities[r, "country.etc"]), "", us.cities[r, "name"])
}

data(state.fips)
state.fips$cleaned.state <- gsub(":.*", "", state.fips$polyname)

GetStateCode <- function(city) { 
  match <- state.fips$cleaned.state == tolower(city)
  if (sum(match)) {
    return( as.character(state.fips$abb[which(match)[1]]))
  }
  
  match <- us.cities$city == city
  if (sum(match) > 0) {
    if (sum(match)==1) {
      return(us.cities[match, "country.etc"])
    } else {
      candidates <- us.cities$country.etc[match]
      return(candidates[which.max(us.cities$pop[match])])
    }
  } else {
    return(NA)
  }
}

data <- within(data, stateCode <- sapply(City, GetStateCode))

library(sets)
phone.set <- list()
states <- unique(as.character(state.fips$abb))
cc <- 0
for (state in states) {
  cc <- cc+1
  
  nums <- as.character(postPhone[data$stateCode==state])
  nums <- nums[!is.na(nums)]
  
  #remove leading 1
  nums <- gsub("^1", "", nums)  
  nums <- nums[nchar(nums)==10]
  #choose only 10-digit numbers

  phone.set[[cc]] <- as.set(nums)
}

num.states <- length(states)
j.vec <- rep(NA, num.states ^ 2)
j.mat <- matrix(0, num.states, num.states)
rownames(j.mat) <- states
colnames(j.mat) <- states
names.vec <- rep(NA, num.states ^ 2)

idx <- 0
for (c1 in 1:num.states) {
  state1 <- states[c1]
  for (c2 in 1:c1) {
    state2 <- states[c2]    
    
    idx <- idx + 1
    j.vec[idx] <- set_similarity(phone.set[[c1]], phone.set[[c2]], method="Jaccard")
    names.vec[idx] <- paste(state1, "x", state2)
    
    j.mat[c1, c2] <- j.vec[idx]
  }
}

names(j.vec) <- names.vec
j.vec[j.vec==1] <- 0
head(sort(j.vec, decreasing=TRUE), 50)

j.mat2 <- j.mat + t(j.mat) - diag(rep(1, num.states))
write.csv(j.mat2, file="/Users/scott/Desktop/bayes/github/bayes-thorn/stateSim.csv", row.names=FALSE)


#has.price <- computedPrice < 1000 & computedPrice > 0 & as.numeric(postAge) > 18
#price <- as.numeric(computedPrice[has.price])
#age <- as.numeric(postAge[has.price])

#plot(log(age), log(price))
#ss <- smooth.spline(log(age), log(price))
#lines(ss)

#head(sort(table(City[has.price]), decreasing=TRUE),10)
#ny.price <- as.numeric(computedPrice[City=="New York" & has.price])
#ny.age <- as.numeric(postAge[City=="New York" & has.price])

#nc <- as.numeric(computedPrice[City=="North Carolina" & has.price])
#plot(density(ny), ylim=c(0, 0.01))
#lines(density(nc))

#hi.price <- computedPrice >= 1000
#sum(hi.price)
#lin.fit <- lm(log(price) ~ log(age)
#abline(lin.fit)
