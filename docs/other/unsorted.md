# Не рассортировано

## Backup internet

```shell
ipconfig /flushdns
ipconfig /registerdns
ipconfig /renew
ipconfig /release
```

## CF Deleted applications

```shell
sudo systemctl disable cloudflared
sudo systemctl daemon-reload
sudo deluser cloudflared
sudo rm /etc/default/cloudflared
sudo rm /etc/systemd/system/cloudflared.service
sudo rm /usr/local/bin/cloudflared
```

## Brew install

Установка

```shell
brew /bin/bash -c "$(curl -fsSL  https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```
Исправление brew; command not found

```shell
echo 'eval "$(/home/linuxbrew/.linuxbrew/bin/brew shellenv)"'>> /home/$user/.profile
```

## Tun Tap

```shell
lxc.cgroup.devices.allow: c 10:200 rwm
lxc.mount.entry: /dev/net dev/net none bind,create=dir
```