delay=2000
while [ 1 ]
do
    date >> log
    startTime=`date +%s%3N`
    curl https://bormeserver.herokuapp.com >> log
    finishTime=`date +%s%3N`
    lapstime=$((finishTime-startTime))
    if [ $lapstime -gt 2000 ]
    then
      echo "lapstime > 2000 milisegundos" >> log
      delay=$((delay-10))
    fi
    echo "Milisecond: $lapstime"  >> log
    echo "Delay $delay seconds" >> log
    sleep $delay
done
