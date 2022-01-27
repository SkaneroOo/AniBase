kill $(netstat -pnltu | grep 127.0.0.1:8899 | awk '{print$NF}' | awk -F'/' '{print $1}')
git pull origin master
python3 main.py &