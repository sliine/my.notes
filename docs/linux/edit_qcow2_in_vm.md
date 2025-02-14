---
title: 'Как редактировать файлы qcow2 для KVM'
sidebar_position: 1
tags: [kvm, qcow2, vps, редактирование_файла, linux]
---

В данной теме пойдет диалог о том, как же редактировать файлы виртальной машины. Давай разберём эту тему на примере восстановления утерянного пароля к виртуальной машине на KVM.

Для редактирования образа нам потребуется утилита ```guestfish```. Установить её можно с помощью следующей команды, которая подходит для всех популярных дистрибутивов: ```libguestfs-tools```

```
VM - Виртуальная машина
```

Debian/Ubuntu
```bash
sudo apt install libguestfs-tools
```

CentOS/Alma Linxu
```bash
sudo yum makecache
sudo yum -y install libguestfs
```

## Шаг 1 - Выключение VM

После установки **libguestfs-tools**, нам нужно выключить VM. Для начала нам нужно проверить все запущенные ВМ (если запуск осуществлялся через команду), если через интерфейс Proxmox, Virtualizor, VMManager - там можно и через гуи остановить нужную вам VM. Но мы разберем на запущенной ВМ через следующую команду:

```bash
virsh list
```

После того, как ввели данную команду - мы должны получить примерно такой вывод (у всех он будет разный):

```bash
 Id    Name                           State
----------------------------------------------------
 1     vm-ubuntu                     running
 2     vm-debian                     running
 3     vm-debian                     running
 4     vm-ubuntu                     running
 5     vm-ubuntu                     running
```

Для выключения ВМ, используем эту команду
```bash
virsh shutdown vm-ubuntu
```

## Шаг 2 - Определяем расположения файлов VM

В первом шаге, мы выключили ВМ, теперь нам нужно определить, где находятся файлы от виртуальной машины, сделать это можно так:
```bash
virsh dumpxml vm-ubuntu | grep 'source file'
```

```bash
Вывод должен будет быть примерно таким:
<source file='/var/lib/libvirt/images/vm-ubuntu.qcow2'/>
```

## Шаг 3 - Подготавливаем хэша пароля пользователя root для замены

Для генерации, пароля будем использовать утилиту ```openssl```:
```bash
openssl passwd -1 myNewPassword $1$snYRmJA1$1vpz.ii09.BcDf6AY6ZPj/
```

```bash
openssl passwd -6 myNewPassword $6$4ofbn2TGn3xXCExZ$2o8NxDUsiaYh14sEtNYMwyifRUjgOhw/NKgDli/w853YzpH0iP2ky0NlWy6AoAOe1En2fmHR31ndQy2wEQLYG0
```

В данном моменте, вам еще нужно обратить внимание на - алгоритм, хеширования паролей, так как он может быть разным. Вот пример как их различать:
```bash
openssl passwd -1 password      # MD5 hash
openssl passwd -5 password      # SHA-256 hash
openssl passwd -6 password      # SHA-512 hash
openssl passwd -apr1 password   # MD5 Apache variant hash
openssl passwd -aixmd5 password # MD5 AIX variant hash
openssl passwd -crypt password  # Standard Unix hash
```

Еще у нас есть возможность добавить соль, для того, чтобы изменить пароль.
```bash
openssl passwd -1 -salt "OKgLCmVl" "myNewPassword" $1$OKgLCmVl$mroGe0I8pVZcPC91VTFaE.
```

## Шаг 4 - Редактирование файла внути qcow2 файла VM

Используем утилиту ```guestfish```, затем открываем файл ```qcow2```, запускаем, смотрим какие файловые системы есть внутри, монтируем ```root``` раздел и открываем редактор ```vi``` для файла ```/etc/shadow```
```bash
guestfish --rw -a /var/lib/libvirt/images/vm-ubuntu.qcow2
><fs>
><fs> launch
><fs> list-filesystems
/dev/sda1: ext4
><fs> mount /dev/sda1 /
><fs> vi /etc/shadow
```

В файле ```shadow``` находим строку для ```root пользователя```, они будет выглядеть примерно так:
```bash
root:$6$d431Zi5mfQN5sRXj$9SUQhRSR.tKMp64KyTe.yip8U4ysal55doO/xVnaIjV8Bholwrecqa387B6hFkiu4jDsl2DISoJ7G3UDilXNk0:18669:0:99999:7:::
```

Дальше нам нужно заменить часть, которая содержит хэш пароля на новый хэш:
```bash
root:$6$4ofbn2TGn3xXCExZ$2o8NxDUsiaYh14sEtNYMwyifRUjgOhw/NKgDli/w853YzpH0iP2ky0NlWy6AoAOe1En2fmHR31ndQy2wEQLYG0:18669:0:99999:7:::
```

После чего, выполняем сохранение изменений в файле ```shadow``` и закрываем vi. Далее выходим из редактора ```guestfish```:
```bash
><fs> flush
><fs> quit
```

## Шаг 5 - Запуск VM

Перед запуском, нам нужно проверить, что у нас получлиось. Для этого введем команду:

```bash
virsh start vm-ubuntu
Domain vm-ubuntu started
```

После чего пробуем авторизоваться под новым паролем ```root```. Если вы сделали все правильно, то авторизация должна пройти успешно.

## Шаг 6 - Альтернативное решение

Если у вас задача в редактировании файлов ```qcow2``` довольно стандартаная, как выше описанная, то есть смысл попробовать применить другую утилиту — ```virt-customize```:
```bash
virsh shutdown vm-ubuntu
```

```bash
virt-customize -a /var/lib/libvirt/images/vm-ubuntu.qcow2 --root-password password:myNewPassword --uninstall cloud-init
```

После этого снова запускаем VM и пароль будет уже новый.



