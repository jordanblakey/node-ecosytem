# Node Features

## Useful shell commands

```sh
# Find node processes occupying ports
sudo netstat -tulpn | grep /node

# Find all node processes
ps | grep node

# Kill the process you want
kill 6193

# Directly find and kill
kill (ps aux | grep '2-server.js' | awk '{print $2}')
```

## Forever (auto restarting process manager)

Start a resilient process
```sh
yarn global add forever
forever 2-server.js # Start a resilient process with forever
forever stop 2-server.js # Stop a process started by forever
forever stopall # Stop all processes started by forever
```

Run a script on boot

```sh
> vi /etc/rc.local # This file runs on boot (Good for server config)
# then, add the line
forever /etc/www/example/2-server.js
```

