while [ 1 ]
do
    date >> log
    curl https://bormeserver.herokuapp.com >> log
    sleep 30m
done
