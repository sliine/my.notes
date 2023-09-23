# Установка Pure-FTPd

По умолчанию **Pure FTPd** доступен в стандартном репозитории **Ubuntu 20.04**. Устанавливаем его некст командами:

```bash
apt-get install pure-ftpd -y
```

После установки **Pure FTPd** проверяем состояние **Pure FTPd** с помощью следующей команды:

```bash
systemctl status pure-ftpd
```

Далее создаём в системе юзера **FTP.** Создаём его командой:

```bash
adduser vyom
```

Потом предложит установить пароль, как показано ниже:

```bash
Adding user `vyom' ... 
Adding new group `vyom' (1000) ... 
Adding new user `vyom' (1000) with group `vyom' ...
Creating home directory `/home/vyom' ... 
Copying files from `/etc/skel' ... 
New password: 
Retype new password: 
passwd: password updated successfully 
Changing the user information for vyom 
Enter the new value, or press ENTER for the default 
	Full Name []: 
	Room Number []: 
	Work Phone []: 
	Home Phone []: 
	Other []: 
Is the information correct? [Y/n] Y
```

Далее генерим самоподписанный сертификат для **Pure FTPd**. Генерим его командой:

```bash
openssl req -x509 -nodes -newkey rsa:2048 -keyout /etc/ssl/private/pure-ftpd.pem -out /etc/ssl/private/pure-ftpd.pem -days 365
```

Отвечаем на все вопросы, используя ответы, относящиеся к нашей установке, как показано ниже:

```bash
Generating a RSA private key 
.......................+++++ 
....+++++ 
writing new private key to '/etc/ssl/private/pure-ftpd.pem' 
----- 
You are about to be asked to enter information that will be incorporated 
into your certificate request. 
What you are about to enter is what is called a Distinguished Name or a DN. 
There are quite a few fields but you can leave some blank 
For some fields there will be a default value, 
If you enter '.', the field will be left blank. 
----- 
Country Name (2 letter code) [AU]:IN 
State or Province Name (full name) [Some-State]:GUJ 
Locality Name (eg, city) []:JUN 
Organization Name (eg, company) [Internet Widgits Pty Ltd]:Atlantic 
Organizational Unit Name (eg, section) []:IT 
Common Name (e.g. server FQDN or YOUR name) []:example 
Email Address []:admin@example.com
```

Далее необходимо настроить **Pure FTPd** на использование сертификата, который мы сгенерили выше. Настроить его можно, отредактировав файл **pure-ftpd.conf**:

```bash
nano /etc/pure-ftpd/pure-ftpd.conf
```

Изменяем следующие строки:

```bash
TLS                  2 
TLSCipherSuite       HIGH:MEDIUM:+TLSv1:!SSLv2:!SSLv3 
CertFile             /etc/ssl/private/pure-ftpd.pem
```

После завершения работы сохраняем и закрываем файл. Затем перезапускаем службу **Pure FTPd.** чтобы применить изменения:

```bash
systemctl restart pure-ftpd
```

Из личного опыта.

Заметка больше для себя, но авось ещё кому поможет.

Есть сервер на Debian, на котором крутится **PureFTPd**. Нужно настроить так, чтоб **FTP-сервер** работал на **3000** порту без проблем.

1. Для начала пропишем порт **3000** для **FTPd echo "3000" > /etc/pure-ftpd/conf/Bind**
2. Затем пропишем диапазон портов для открытия пассивного соединения. **echo "40110 40210" > /etc/pure-ftpd/conf/PassivePortRange**
3. Пропишем наш внешний IP, который нам выдаёт **NAT**. **echo "НАШ_IP" > /etc/pure-ftpd/conf/ForcePassiveIP**
4. Рестартуем **PureFTPd** (команду для **FTPd** для **Debian** я искал очень долго) **/etc/init.d/pure-ftpd-mysql restart**
5. На **NAT**, в роли которого стоит роутер открываем порты для нашего сервера: **3000, 40110:40210**
6. **PureFTPd** работает.

Отключение анонимного входа на **pure-ftp-сервере /FTP /Disable anonymous login on pure-ftp server January 20, 2016 FTP Как отключить анонимный вход на pure-ftpd-сервере с помощью CWP**

Требуется внести изменения в конфигурационный файл **pure-ftpd: /etc/pure-ftpd/pure-ftpd.conf** Не разрешать аутентифицированным пользователям - иметь только публичный анонимный **FTP**.

**AnonymousOnly - no** Запретить анонимные соединения. Разрешить только аутентифицированных пользователей.

**NoAnonymous yes** Теперь перезапустите сервер **pure-ftpd**


```bash
service pure-ftpd restart
```

Если вы хотите сделать это для всех активных подключений, то вам нужно остановить сервер **pure-ftpd** и убить все процессы **pure-ftpd**.

```bash
service pure-ftpd stop ps uaxf
grep pure-ftp
awk {'print $2'}
xargs kill -9 
service pure-ftpd start
```