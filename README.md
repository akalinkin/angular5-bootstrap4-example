# News portal

## Requirements

- docker
- docker-compose

Create external volume for PGDATA

`docker volume create --name=dbdata`

Add dev domain to hosts

`sudo vim /etc/hosts`

```
# /etc/hosts

127.0.0.1	news.local
```

## UI

[http://news.local](http://news.local)

## API

[http://news.local/api](http://news.local/api)
