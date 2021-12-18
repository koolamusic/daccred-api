# Infrastructure Code

Shared infrastructure code, we keep configuration wide stuff like 

- db
- redis
- AmazonMQ
- errors
- logger
- config

most of the code written here are dependencies of the application, without which most features if not all won't work. so it's safe to terminate the application is something in infra isn't working right.