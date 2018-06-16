getData=function() {
  categories=c('Category A','Category B');
  groups=c('Group A','Group B');
  data.df=data.frame(
    Date=seq(from=as.Date( Sys.Date()), length.out = 100, by='days'),
    count=rnorm(100,mean=20,sd=10),
    group=groups[round(runif(100,1,length(groups)))],
    category=categories[round(runif(100,1,length(categories)))]
  );
  return(data.df)
}

data.df=getData()

using(ggplot2)

ggplot(mapping=aes(x=Date,y=count),data=data.df)+
  geom_col(mapping=aes(colour=category))
  
  geom_point()
    geom_line()+