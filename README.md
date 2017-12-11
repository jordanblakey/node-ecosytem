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

```sh
yarn global add forever
forever 2-server.js
```
